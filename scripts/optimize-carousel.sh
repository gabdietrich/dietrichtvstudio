#!/usr/bin/env bash
#
# optimize-carousel.sh
# ---------------------
# Converts raw source clips into the site's standard looped carousel videos:
#   - desktop: 720x720  (H.264 High, no audio, faststart)
#   - mobile:  360x360  (H.264 High, no audio, faststart)
#   - poster:  first-frame JPG (optional, for a seamless loop restart)
#
# Sources of any aspect ratio are center-cropped to a square. Audio is stripped
# (carousel videos are muted loops). Output is named <slug>-videoN-<variant>.
#
# Usage:
#   scripts/optimize-carousel.sh --slug <slug> [options] [SRC_FILES...]
#
# Options:
#   --slug <slug>        Project slug, e.g. "skol-beats-road" (required).
#   --src <dir>          Directory to read source clips from (sorted by name).
#                        Defaults to the current directory if no SRC_FILES given.
#   --out <dir>          Output directory.
#                        Defaults to public/projects/<slug>/carousel.
#   --desktop-crf <n>    x264 CRF for desktop (default 24; lower = higher quality).
#   --mobile-crf <n>     x264 CRF for mobile (default 27).
#   --fps <r>            Output frame rate (default 24000/1001 ~ 23.976).
#   --no-poster          Skip generating first-frame poster JPGs.
#
# Examples:
#   scripts/optimize-carousel.sh --slug my-project --src ~/Downloads/footage
#   scripts/optimize-carousel.sh --slug my-project clipA.mp4 clipB.mov
#
set -euo pipefail

# --- resolve repo root (parent of this script's directory) ---
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- defaults ---
SLUG=""
SRC_DIR=""
OUT_DIR=""
DESKTOP_CRF=24
MOBILE_CRF=27
FPS="24000/1001"
MAKE_POSTER=1
SRC_FILES=()

# --- parse args ---
while [[ $# -gt 0 ]]; do
  case "$1" in
    --slug)        SLUG="$2"; shift 2 ;;
    --src)         SRC_DIR="$2"; shift 2 ;;
    --out)         OUT_DIR="$2"; shift 2 ;;
    --desktop-crf) DESKTOP_CRF="$2"; shift 2 ;;
    --mobile-crf)  MOBILE_CRF="$2"; shift 2 ;;
    --fps)         FPS="$2"; shift 2 ;;
    --no-poster)   MAKE_POSTER=0; shift ;;
    -h|--help)     sed -n '2,40p' "$0"; exit 0 ;;
    -*)            echo "Unknown option: $1" >&2; exit 1 ;;
    *)             SRC_FILES+=("$1"); shift ;;
  esac
done

if [[ -z "$SLUG" ]]; then
  echo "Error: --slug is required. Run with --help for usage." >&2
  exit 1
fi

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "Error: ffmpeg not found in PATH." >&2
  exit 1
fi

# --- collect source files ---
if [[ ${#SRC_FILES[@]} -eq 0 ]]; then
  SEARCH_DIR="${SRC_DIR:-$PWD}"
  while IFS= read -r line; do
    [[ -n "$line" ]] && SRC_FILES+=("$line")
  done < <(find "$SEARCH_DIR" -maxdepth 1 -type f \( \
              -iname '*.mp4' -o -iname '*.mov' -o -iname '*.m4v' -o -iname '*.webm' \
            \) | sort)
fi

if [[ ${#SRC_FILES[@]} -eq 0 ]]; then
  echo "Error: no source clips found. Pass files or use --src <dir>." >&2
  exit 1
fi

# --- output dir ---
OUT_DIR="${OUT_DIR:-$REPO_ROOT/public/projects/$SLUG/carousel}"
mkdir -p "$OUT_DIR"

echo "Slug:       $SLUG"
echo "Output:     $OUT_DIR"
echo "Sources:    ${#SRC_FILES[@]} clip(s)"
echo "Recipe:     desktop 720² CRF $DESKTOP_CRF | mobile 360² CRF $MOBILE_CRF | fps $FPS | audio stripped"
echo

human() { du -h "$1" 2>/dev/null | cut -f1; }

encode() { # <src> <dst> <size> <crf>
  local src="$1" dst="$2" size="$3" crf="$4"
  ffmpeg -v error -y -i "$src" -an \
    -vf "scale=${size}:${size}:force_original_aspect_ratio=increase,crop=${size}:${size},fps=${FPS},format=yuv420p" \
    -c:v libx264 -profile:v high -crf "$crf" -preset veryslow -g 24 -movflags +faststart \
    "$dst"
}

SNIPPET="  videos: ["
i=0
for src in "${SRC_FILES[@]}"; do
  i=$((i + 1))
  base="$SLUG-video$i"
  desktop="$OUT_DIR/$base-desktop.mp4"
  mobile="$OUT_DIR/$base-mobile.mp4"
  poster="$OUT_DIR/$base-poster.jpg"

  echo "[$i] $(basename "$src")  ($(human "$src"))"
  encode "$src" "$desktop" 720 "$DESKTOP_CRF"
  encode "$src" "$mobile" 360 "$MOBILE_CRF"
  echo "     -> desktop $(human "$desktop")   mobile $(human "$mobile")"

  thumb="\"\""
  if [[ "$MAKE_POSTER" -eq 1 ]]; then
    ffmpeg -v error -y -i "$src" -vframes 1 \
      -vf "scale=720:720:force_original_aspect_ratio=increase,crop=720:720" -q:v 3 "$poster"
    thumb="\"/projects/$SLUG/carousel/$base-poster.jpg\""
    echo "     -> poster  $(human "$poster")"
  fi

  SNIPPET+=$'\n'"    { id: /* TODO */, thumbnail: $thumb, title: \"Scene $i\","
  SNIPPET+=$'\n'"      videoUrl: \"/projects/$SLUG/carousel/$base-desktop.mp4\","
  SNIPPET+=$'\n'"      mobileVideoUrl: \"/projects/$SLUG/carousel/$base-mobile.mp4\" },"
done
SNIPPET+=$'\n'"  ]"

echo
echo "Done. Paste this into the project's mockWorks entry (fill the ids):"
echo
echo "$SNIPPET"
