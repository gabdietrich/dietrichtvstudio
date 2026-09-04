import { useEffect, useRef } from 'react';
import type { Tratamento } from '../data/tratamentos';

interface TratamentoPageProps {
  tratamento: Tratamento;
}

const OFF_WHITE = '#FAFAFA';
const MID_GRAY = '#888888';
const DIM_GRAY = '#6E6E6E';

// Tipagem mínima da Player API do Vimeo (não há @types oficial para isso).
interface VimeoPlayer {
  enableTextTrack(language: string): Promise<{ language: string }>;
}
interface VimeoPlayerConstructor {
  new (el: HTMLIFrameElement): VimeoPlayer;
}
declare global {
  interface Window {
    Vimeo?: { Player: VimeoPlayerConstructor };
  }
}

export default function TratamentoPage({ tratamento }: TratamentoPageProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { texttrack } = tratamento.vimeo;

  // Injeta robots noindex/nofollow e ajusta título sem expor o cliente publicamente.
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Tratamento · Dietrich.tv';

    const robotsMeta = document.createElement('meta');
    robotsMeta.name = 'robots';
    robotsMeta.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(robotsMeta);

    const previousBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#000';

    return () => {
      document.title = previousTitle;
      robotsMeta.remove();
      document.body.style.backgroundColor = previousBodyBg;
    };
  }, []);

  // Player API do Vimeo como fallback para legendas.
  // O parâmetro &texttrack= na URL já ativa as legendas na maioria dos casos;
  // a API entra caso o player ignore o parâmetro (ex: algumas contas Vimeo
  // bloqueiam parâmetros de URL e requerem a chamada via JS).
  useEffect(() => {
    if (!texttrack || !iframeRef.current) return;

    const iframe = iframeRef.current;

    const activate = () => {
      if (window.Vimeo?.Player) {
        try {
          const player = new window.Vimeo.Player(iframe);
          player.enableTextTrack(texttrack).catch(() => {
            // Se pt-x-autogen falhar, tenta só o código de língua base.
            const baseLang = texttrack.split('-')[0];
            if (baseLang !== texttrack) {
              player.enableTextTrack(baseLang).catch(() => {});
            }
          });
        } catch {
          // Player API indisponível — o parâmetro de URL é suficiente.
        }
      }
    };

    // Carrega o SDK do player se ainda não estiver na página.
    if (window.Vimeo?.Player) {
      // Aguarda o iframe terminar de carregar antes de instanciar o player.
      iframe.addEventListener('load', activate, { once: true });
    } else {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      script.onload = () => {
        iframe.addEventListener('load', activate, { once: true });
      };
      document.head.appendChild(script);
    }

    return () => {
      iframe.removeEventListener('load', activate);
    };
  }, [texttrack]);

  // Camada 1 (mais confiável): parâmetro &texttrack= diretamente na URL do src.
  const texttrackParam = texttrack ? `&texttrack=${encodeURIComponent(texttrack)}` : '';
  const vimeoSrc = `https://player.vimeo.com/video/${tratamento.vimeo.videoId}?h=${tratamento.vimeo.hash}&badge=0&autopause=0&player_id=0&app_id=58479${texttrackParam}`;

  return (
    <div
      className="min-h-screen w-full"
      style={{ backgroundColor: '#000', color: OFF_WHITE }}
    >
      <main className="mx-auto max-w-5xl px-6 sm:px-8 md:px-10">
        {/* Player de vídeo (16:9, centralizado).
            Padding-top compensa a barra de navegação fixa do site. */}
        <section style={{ paddingTop: 'clamp(112px, 14vh, 160px)' }}>
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%',
              backgroundColor: '#000',
            }}
          >
            <iframe
              ref={iframeRef}
              src={vimeoSrc}
              title={tratamento.vimeo.iframeTitle}
              frameBorder={0}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
              }}
            />
          </div>
        </section>

        {/* Rodapé minimal */}
        <footer
          className="flex flex-col items-start"
          style={{
            marginTop: 'clamp(80px, 12vh, 120px)',
            paddingBottom: 'clamp(96px, 14vh, 160px)',
          }}
        >
          <div
            className="text-sm md:text-base"
            style={{
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 400,
              color: MID_GRAY,
              lineHeight: 1.9,
            }}
          >
            <div>
              <span style={{ color: DIM_GRAY }}>Direção</span>
              <span style={{ color: MID_GRAY }}>{'  '}·{'  '}</span>
              <span style={{ color: OFF_WHITE }}>
                {tratamento.rodape.direcao}
              </span>
            </div>
            <div>
              <span style={{ color: DIM_GRAY }}>Produtora</span>
              <span style={{ color: MID_GRAY }}>{'  '}·{'  '}</span>
              <span style={{ color: OFF_WHITE }}>
                {tratamento.rodape.produtora}
              </span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
