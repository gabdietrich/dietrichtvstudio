import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "./ui/button";
import AutoScrollCarousel from './AutoScrollCarousel';

const categories = ['all', 'commercial', 'ai', 'beauty', 'documentary', 'musicVideo'];

// Generate URL-friendly slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/['']/g, '') // Remove apostrophes
    .replace(/[,]/g, '') // Remove commas
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Helper functions for slug-based navigation
export function getProjectBySlug(slug: string) {
  return mockWorks.find(work => work.slug === slug);
}

export function getProjectById(id: number) {
  return mockWorks.find(work => work.id === id);
}

// Mock data with project content
export const mockWorks = [
  {
    id: 1,
    title: "Grand Soir, by Maison Francis Kurkdjian",
    slug: "grand-soir-by-maison-francis-kurkdjian",
    category: ["beauty", "commercial", "ai"],
    description: "Grand Soir, by Maison Francis Kurkdjian. A spec film crafted entirely with artificial intelligence. 100% AI-made",
    client: "Maison Francis Kurkdjian",
    fullDescription: "Perfume is a bridge between moments, a place where past and future breathe together. We live in a time when creation expands beyond the hands, guided also by the intelligence we have imagined and built. Like perfume, this technology dissolves boundaries, uniting who we have been with who we are yet to become, turning the invisible into emotion. We crafted this A.I. spec film for Maison Francis Kurkdjian to celebrate the encounter where innovation and essence dance together.",
    projectType: "Case Study",
    credits: "Direction by Dietrich.tv Studio. 100% AI-made.",
    vimeoId: "1108168421",
    carouselImages: [
      "/projects/grand-soir-maison-francis/gallery/grand-soir-maison-francis-gallery1.jpg",
      "/projects/grand-soir-maison-francis/gallery/grand-soir-maison-francis-gallery2.jpg",
      "/projects/grand-soir-maison-francis/gallery/grand-soir-maison-francis-gallery3.jpg"
    ],
    videos: [
      { 
        id: 1, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/grand-soir-maison-francis/carousel/grand-soir-maison-francis-video1-desktop.mp4",
        mobileVideoUrl: "/projects/grand-soir-maison-francis/carousel/grand-soir-maison-francis-video1-mobile.mp4"
      },
      { 
        id: 2, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/grand-soir-maison-francis/carousel/grand-soir-maison-francis-video2-desktop.mp4",
        mobileVideoUrl: "/projects/grand-soir-maison-francis/carousel/grand-soir-maison-francis-video2-mobile.mp4"
      },
      { 
        id: 3, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/grand-soir-maison-francis/carousel/grand-soir-maison-francis-video3-desktop.mp4",
        mobileVideoUrl: "/projects/grand-soir-maison-francis/carousel/grand-soir-maison-francis-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 2,
    title: "Ernesto Neto for Le Bon Marché Rive Gauche",
    slug: "ernesto-neto-for-le-bon-marche-rive-gauche",
    category: "documentary",
    description: "Capturing the artist before and after the exhibition. Where brand and art meet through cinema.",
    client: "Le Bon Marché Rive Gauche",
    fullDescription: "Filming an artist in their studio is very different from documenting an exhibition. It is stepping into the space where the work is born, where matter and gesture are still uncertainty, experiment, discovery. At DietrichTV, we had the privilege of following Ernesto Neto in his Rio de Janeiro studio, capturing the creative process that both preceded and followed his exhibition at Le Bon Marché in Paris. Our film doesn't simply show the finished artwork. It reveals the artist's breath, the intimacy of manual work, the transition from the silence of the studio to the monumentality of an installation in one of the world's most iconic spaces. For us, this project reinforces something essential: brands can truly connect with art not only by showcasing results, but by embracing processes. That's where authentic resonance is built, beyond the borders of advertising.",
    projectType: "Case Study",
    credits: "Directed by Dietrich.tv Studio. Filmed in Rio de Janeiro for Le Bon Marché Rive Gauche.",
    vimeoId: "1030777862",
    carouselImages: [
      "/projects/ernesto-neto-le-bon-marche/gallery/ernesto-neto-le-bon-marche-gallery1.jpg",
      "/projects/ernesto-neto-le-bon-marche/gallery/ernesto-neto-le-bon-marche-gallery2.jpg",
      "/projects/ernesto-neto-le-bon-marche/gallery/ernesto-neto-le-bon-marche-gallery3.jpg"
    ],
    videos: [
      { 
        id: 4, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/ernesto-neto-le-bon-marche/carousel/ernesto-neto-le-bon-marche-video1-desktop.mp4",
        mobileVideoUrl: "/projects/ernesto-neto-le-bon-marche/carousel/ernesto-neto-le-bon-marche-video1-mobile.mp4"
      },
      { 
        id: 5, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/ernesto-neto-le-bon-marche/carousel/ernesto-neto-le-bon-marche-video2-desktop.mp4",
        mobileVideoUrl: "/projects/ernesto-neto-le-bon-marche/carousel/ernesto-neto-le-bon-marche-video2-mobile.mp4"
      },
      { 
        id: 6, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/ernesto-neto-le-bon-marche/carousel/ernesto-neto-le-bon-marche-video3-desktop.mp4",
        mobileVideoUrl: "/projects/ernesto-neto-le-bon-marche/carousel/ernesto-neto-le-bon-marche-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 3,
    title: "Three Short Films",
    slug: "three-short-films",
    category: "musicVideo",
    description: "Three short films with Manu Gavassi, blending fashion, music, and cinema. A trilogy that explores image as performance and persona.",
    client: "Manu Gavassi",
    fullDescription: "With Manu Gavassi, Dietrich directed a trilogy of short films that blurred the lines between cinema, fashion, and performance. Each piece is both intimate and theatrical, exploring how image can construct and deconstruct persona. The films were conceived as a dialogue with Manu's own artistic universe: ironic yet delicate, pop yet deeply personal. Through bold visual language and precise storytelling, they move beyond conventional music video aesthetics, embracing a hybrid form that belongs as much to cinema as to contemporary culture. Together, the three shorts form a mosaic of identity, revealing how narrative and style can amplify an artist's voice across different platforms while remaining unmistakably authentic.",
    projectType: "Trilogy",
    credits: "Directed by Dietrich.tv Studio in collaboration with Manu Gavassi.",
    vimeoId: "929593577,900776547,900237522",
    carouselImages: [
      "/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery1.jpg",
      "/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery2.jpg",
      "/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery3.jpg",
      "/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery4.jpg",
      "/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery5.jpg",
      "/projects/manu-gavassi-three-films/gallery/manu-gavassi-three-films-gallery6.jpg"
    ],
    videos: [
      { 
        id: 7, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Film 1",
        videoUrl: "/projects/manu-gavassi-three-films/carousel/manu-gavassi-three-films-video1-desktop.mp4",
        mobileVideoUrl: "/projects/manu-gavassi-three-films/carousel/manu-gavassi-three-films-video1-mobile.mp4"
      },
      { 
        id: 8, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Film 2",
        videoUrl: "/projects/manu-gavassi-three-films/carousel/manu-gavassi-three-films-video2-desktop.mp4",
        mobileVideoUrl: "/projects/manu-gavassi-three-films/carousel/manu-gavassi-three-films-video2-mobile.mp4"
      },
      { 
        id: 9, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Film 3",
        videoUrl: "/projects/manu-gavassi-three-films/carousel/manu-gavassi-three-films-video3-desktop.mp4",
        mobileVideoUrl: "/projects/manu-gavassi-three-films/carousel/manu-gavassi-three-films-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 4,
    title: "Elsa Schiaparelli's Private Album",
    slug: "elsa-schiaparellis-private-album",
    category: "documentary",
    description: "Elsa Schiaparelli remembered through an animated short film. A dialogue between fashion, memory, and the cosmos.",
    client: "Biblioteca Mário de Andrade",
    fullDescription: "Dietrich directed this documentary film about Elsa Schiaparelli built around personal memories of the fashion designer's granddaughter: the actress, supermodel and cultural icon Marisa Berenson. Narrated by Marisa herself, the animated short film showcased never before seen images of the Schiaparelli family, in a creative initiative specially made for Brazil's most important public library, Biblioteca Mário de Andrade, in the context of the centenary of André Breton's Surrealist Manifesto.",
    projectType: "Animated Documentary",
    credits: "Directed by Dietrich.tv Studio. Narrated by Marisa Berenson.",
    vimeoId: "1112761795",
    carouselImages: [
      "/projects/elsa-schiaparelli-private-album/gallery/elsa-schiaparelli-private-album-gallery1.png",
      "/projects/elsa-schiaparelli-private-album/gallery/elsa-schiaparelli-private-album-gallery2.png"
    ],
    videos: [
      { 
        id: 10, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/elsa-schiaparelli-private-album/carousel/elsa-schiaparelli-private-album-video1-desktop.mp4",
        mobileVideoUrl: "/projects/elsa-schiaparelli-private-album/carousel/elsa-schiaparelli-private-album-video1-mobile.mp4"
      },
      { 
        id: 11, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/elsa-schiaparelli-private-album/carousel/elsa-schiaparelli-private-album-video2-desktop.mp4",
        mobileVideoUrl: "/projects/elsa-schiaparelli-private-album/carousel/elsa-schiaparelli-private-album-video2-mobile.mp4"
      },
      { 
        id: 12, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/elsa-schiaparelli-private-album/carousel/elsa-schiaparelli-private-album-video3-desktop.mp4",
        mobileVideoUrl: "/projects/elsa-schiaparelli-private-album/carousel/elsa-schiaparelli-private-album-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 5,
    title: "Gisele Bündchen and Cauã Raymond",
    slug: "gisele-bundchen-and-caua-raymond",
    category: "commercial",
    description: "A cinematic launch set to Jorge Ben Jor's classic Lá Vem Ela.",
    client: "Democrata",
    fullDescription: "For Democrata's launch film, we brought together two of Brazil's most iconic figures — Gisele Bündchen and Cauã Reymond — in a story that celebrates style, presence, and rhythm. The soundtrack, Jorge Ben Jor's Lá Vem Ela, sets the tone: timeless, magnetic, unmistakably Brazilian. Each frame captures a dialogue between elegance and energy, masculinity and femininity, intimacy and spectacle. The film was conceived as more than a commercial. It is a cultural encounter, weaving fashion and music into a narrative that places the brand in the heart of Brazil's creative heritage. Shot with cinematic precision, the piece amplifies Democrata's vision: sophistication with soul, classic with contemporary, craft with charisma.",
    projectType: "Launch Film",
    credits: "Directed by Dietrich.tv Studio. Featuring Gisele Bündchen and Cauã Reymond.",
    vimeoId: "1006728704",
    carouselImages: [
      "/projects/democrata-gisele-caua/gallery/democrata-gisele-caua-gallery1.jpg",
      "/projects/democrata-gisele-caua/gallery/democrata-gisele-caua-gallery2.jpg",
      "/projects/democrata-gisele-caua/gallery/democrata-gisele-caua-gallery3.jpg"
    ],
    videos: [
      { 
        id: 13, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/democrata-gisele-caua/carousel/democrata-gisele-caua-video1-desktop.mp4",
        mobileVideoUrl: "/projects/democrata-gisele-caua/carousel/democrata-gisele-caua-video1-mobile.mp4"
      },
      { 
        id: 14, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/democrata-gisele-caua/carousel/democrata-gisele-caua-video2-desktop.mp4",
        mobileVideoUrl: "/projects/democrata-gisele-caua/carousel/democrata-gisele-caua-video2-mobile.mp4"
      },
      { 
        id: 15, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/democrata-gisele-caua/carousel/democrata-gisele-caua-video3-desktop.mp4",
        mobileVideoUrl: "/projects/democrata-gisele-caua/carousel/democrata-gisele-caua-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 6,
    title: "Mother's Day '25",
    slug: "mothers-day-25",
    category: "commercial",
    description: "Sasha, Bruna Marquezine, Xuxa and Neide — a celebration of generations and love.",
    client: "Hering",
    fullDescription: "For Hering's Mother's Day campaign, we brought together Sasha Meneghel, Bruna Marquezine, Xuxa and Neide. More than a film, it became a portrait of affection across generations, weaving family bonds into the fabric of one of Brazil's most iconic brands. The narrative is intimate yet universal: mothers and daughters, friendship and legacy, the simple gestures that define love. Each scene was crafted to highlight authenticity, where fashion becomes secondary to emotion, and presence becomes more powerful than performance. In this project, cinema and brand storytelling converge to honor motherhood — not as a concept, but as lived experience.",
    projectType: "Campaign",
    credits: "Directed by Dietrich.tv Studio. Starring Sasha, Bruna Marquezine, Xuxa and Neide.",
    vimeoId: "1112761195,1112760986",
    carouselImages: [],
    videos: [
      { 
        id: 16, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/mothers-day-hering-1/carousel/mothers-day-hering-1-video1-desktop.mp4",
        mobileVideoUrl: "/projects/mothers-day-hering-1/carousel/mothers-day-hering-1-video1-mobile.mp4"
      },
      { 
        id: 17, 
        thumbnail: "/projects/mothers-day-hering-1/carousel/mothers-day-hering-1-video2-desktop.jpg", 
        title: "Scene 2"
      },
      { 
        id: 18, 
        thumbnail: "/projects/mothers-day-hering-1/carousel/mothers-day-hering-1-video3-desktop.jpg", 
        title: "Scene 3"
      }
    ]
  },
  {
    id: 7,
    title: "Il Neige Rive Gauche",
    slug: "il-neige-rive-gauche",
    category: "commercial",
    description: "An animated winter tale for Le Bon Marché, where Paris becomes poetry.",
    client: "Le Bon Marché Rive Gauche",
    fullDescription: "We were commissioned by Le Bon Marché to create Il Neige Rive Gauche, an animated film that transforms the Parisian winter into a poetic narrative. The project was conceived not as a campaign in the traditional sense, but as a dreamlike gesture: snow falling on the Rive Gauche, the city turning into a stage where imagination takes over reality. Animation became the language to capture the ephemeral, blending design and storytelling in a way that feels both timeless and unexpected. At the intersection of cinema, design, and brand identity, Il Neige Rive Gauche is more than a seasonal film. It is a sensorial invitation, a reminder that a brand can also be a curator of emotions.",
    projectType: "Animated Film",
    credits: "Directed by Dietrich.tv Studio. Commissioned by Le Bon Marché Rive Gauche.",
    vimeoId: "190538952",
    carouselImages: [],
    videos: [
      { 
        id: 19, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/il-neige-rive-gauche/carousel/il-neige-rive-gauche-video1-desktop.mp4",
        mobileVideoUrl: "/projects/il-neige-rive-gauche/carousel/il-neige-rive-gauche-video1-mobile.mp4"
      },
      { 
        id: 20, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/il-neige-rive-gauche/carousel/il-neige-rive-gauche-video2-desktop.mp4",
        mobileVideoUrl: "/projects/il-neige-rive-gauche/carousel/il-neige-rive-gauche-video2-mobile.mp4"
      },
      { 
        id: 21, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/il-neige-rive-gauche/carousel/il-neige-rive-gauche-video3-desktop.mp4",
        mobileVideoUrl: "/projects/il-neige-rive-gauche/carousel/il-neige-rive-gauche-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 8,
    title: "Desejo",
    slug: "desejo",
    category: ["beauty", "commercial"],
    description: "A sensorial film where intimacy, fragrance, and memory intertwine.",
    client: "Natura",
    fullDescription: "For Natura's Desejo, Dietrich (with O2 Filmes) directed a film that explores the subtle tension between intimacy and expression. Desire is not shown directly — it is suggested through gestures, textures, and the rhythm of fragrance in motion. The narrative unfolds in layers: close-ups that evoke touch, frames that blur the line between skin and atmosphere, a sensorial approach where perfume becomes both memory and anticipation. Rather than illustrating the product, the film creates an emotional territory, where Natura's language of beauty resonates as something intimate, poetic, and deeply human.",
    projectType: "Campaign",
    credits: "Directed by Dietrich.tv Studio in collaboration with O2 Filmes.",
    vimeoId: "680559680",
    carouselImages: [
      "/projects/desejo-natura/gallery/desejo-natura-gallery1.jpg",
      "/projects/desejo-natura/gallery/desejo-natura-gallery2.jpg",
      "/projects/desejo-natura/gallery/desejo-natura-gallery3.jpg",
      "/projects/desejo-natura/gallery/desejo-natura-gallery4.jpg"
    ],
    videos: [
      { 
        id: 22, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/desejo-natura/carousel/desejo-natura-video1-desktop.mp4",
        mobileVideoUrl: "/projects/desejo-natura/carousel/desejo-natura-video1-mobile.mp4"
      },
      { 
        id: 23, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/desejo-natura/carousel/desejo-natura-video2-desktop.mp4",
        mobileVideoUrl: "/projects/desejo-natura/carousel/desejo-natura-video2-mobile.mp4"
      },
      { 
        id: 24, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/desejo-natura/carousel/desejo-natura-video3-desktop.mp4",
        mobileVideoUrl: "/projects/desejo-natura/carousel/desejo-natura-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 9,
    title: "Brilho Lamelar",
    slug: "brilho-lamelar",
    category: ["beauty", "commercial"],
    description: "Technology and beauty meet in a film where hair becomes light.",
    client: "TRESemmé",
    fullDescription: "For the launch of TRESemmé Brilho Lamelar, Dietrich directed (at O2 Filmes) a film that bridges fashion and technology. Shot in virtual production, the narrative moves between real and virtual spaces, where Sabrina Sato embodies the elegance and energy of the brand. The aesthetic is sharp and sophisticated: dark backdrops, sculpted lighting, and movements that highlight shine as performance. Each transition dives into hair as if it were a portal, leading us into new scenes with rhythm and precision.",
    projectType: "Launch Film",
    credits: "Directed by Dietrich.tv Studio at O2 Filmes. Featuring Sabrina Sato.",
    vimeoId: "880317712",
    carouselImages: [
      "/projects/tresemme-brilho-lamelar/gallery/tresemme-brilho-lamelar-gallery1.jpg",
      "/projects/tresemme-brilho-lamelar/gallery/tresemme-brilho-lamelar-gallery2.jpg",
      "/projects/tresemme-brilho-lamelar/gallery/tresemme-brilho-lamelar-gallery3.jpg"
    ],
    videos: [
      { 
        id: 25, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/tresemme-brilho-lamelar/carousel/tresemme-brilho-lamelar-video1-desktop.mp4",
        mobileVideoUrl: "/projects/tresemme-brilho-lamelar/carousel/tresemme-brilho-lamelar-video1-mobile.mp4"
      },
      { 
        id: 26, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/tresemme-brilho-lamelar/carousel/tresemme-brilho-lamelar-video2-desktop.mp4",
        mobileVideoUrl: "/projects/tresemme-brilho-lamelar/carousel/tresemme-brilho-lamelar-video2-mobile.mp4"
      },
      { 
        id: 27, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/tresemme-brilho-lamelar/carousel/tresemme-brilho-lamelar-video3-desktop.mp4",
        mobileVideoUrl: "/projects/tresemme-brilho-lamelar/carousel/tresemme-brilho-lamelar-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 10,
    title: "Gracinha",
    slug: "gracinha",
    category: "musicVideo",
    description: "A music film that blends pop, fantasy, and cinema. Directed by Dietrich with Manu Gavassi.",
    client: "Manu Gavassi",
    fullDescription: "Directed by Dietrich and Manu Gavassi, Gracinha is a music film that transcends the boundaries of the music video format, merging pop sensibility with fashion aesthetics and cinematic storytelling. The project became a cultural milestone, reaching over 20 million views within 24 hours of release, and resonated as one of the most striking audiovisual works in the Brazilian market. Dietrich.tv Studio was responsible for the direction and execution, creating a layered visual journey that balances intimacy and spectacle — a portrait of Manu Gavassi's artistry elevated to a cinematic scale.",
    projectType: "Music Film",
    credits: "Directed by Dietrich.tv Studio with Manu Gavassi.",
    vimeoId: "650425603",
    carouselImages: [
      "/projects/gracinha-disney/gallery/gracinha-disney-gallery1.jpg",
      "/projects/gracinha-disney/gallery/gracinha-disney-gallery2.jpg",
      "/projects/gracinha-disney/gallery/gracinha-disney-gallery3.jpg"
    ],
    videos: [
      { 
        id: 28, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/gracinha-disney/carousel/gracinha-disney-video1-desktop.mp4",
        mobileVideoUrl: "/projects/gracinha-disney/carousel/gracinha-disney-video1-mobile.mp4"
      },
      { 
        id: 29, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/gracinha-disney/carousel/gracinha-disney-video2-desktop.mp4",
        mobileVideoUrl: "/projects/gracinha-disney/carousel/gracinha-disney-video2-mobile.mp4"
      },
      { 
        id: 30, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/gracinha-disney/carousel/gracinha-disney-video3-desktop.mp4",
        mobileVideoUrl: "/projects/gracinha-disney/carousel/gracinha-disney-video3-mobile.mp4"
      }
    ]
  },
  {
    id: 11,
    title: "Mother's Day Fernandas",
    slug: "mothers-day-fernandas",
    category: "commercial",
    description: "Fernanda Torres and Fernanda Montenegro star in an intimate film celebrating motherhood and timeless connection. Directed by Dietrich.",
    client: "Hering",
    fullDescription: "For Mother's Day, Hering brought together two of Brazil's most iconic actresses — Fernanda Torres and Fernanda Montenegro — in a touching film that celebrates maternal bonds and timeless connection. Directed by Dietrich, the piece combines intimacy and elegance, highlighting gestures and emotions with simplicity and truth, in line with Hering's essential identity. Dietrich.tv Studio led the direction and production, crafting a cinematic narrative where fashion, affection, and heritage intertwine in a tribute that is as universal as it is personal.",
    projectType: "Campaign",
    credits: "Directed by Dietrich.tv Studio. Featuring Fernanda Montenegro and Fernanda Torres.",
    vimeoId: "524394640",
    carouselImages: [
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery1.jpg",
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery2.jpg",
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery3.jpg",
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery4.jpg",
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery5.jpg",
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery6.jpg",
      "/projects/mothers-day-hering-fernandas/gallery/mothers-day-hering-fernandas-gallery7.jpg"
    ],
    videos: [
      { 
        id: 31, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 1",
        videoUrl: "/projects/mothers-day-hering-fernandas/carousel/mothers-day-hering-fernandas-video1-desktop.mp4",
        mobileVideoUrl: "/projects/mothers-day-hering-fernandas/carousel/mothers-day-hering-fernandas-video1-mobile.mp4"
      },
      { 
        id: 32, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 2",
        videoUrl: "/projects/mothers-day-hering-fernandas/carousel/mothers-day-hering-fernandas-video2-desktop.mp4",
        mobileVideoUrl: "/projects/mothers-day-hering-fernandas/carousel/mothers-day-hering-fernandas-video2-mobile.mp4"
      },
      { 
        id: 33, 
        thumbnail: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='480' height='480' viewBox='0 0 480 480'%3E%3Crect width='480' height='480' fill='%23f3f4f6'/%3E%3C/svg%3E", 
        title: "Scene 3",
        videoUrl: "/projects/mothers-day-hering-fernandas/carousel/mothers-day-hering-fernandas-video3-desktop.mp4",
        mobileVideoUrl: "/projects/mothers-day-hering-fernandas/carousel/mothers-day-hering-fernandas-video3-mobile.mp4"
      }
    ]
  }
];



// Individual project wrapper with fade-in effect
function ProjectWrapper({ work, speed, onNavigate, delay }: {
  work: any;
  speed: number;
  onNavigate?: (page: string, projectId?: number) => void;
  delay: number;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldFadeIn, setShouldFadeIn] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset states when component remounts (category change)
    setIsVisible(false);
    setShouldFadeIn(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Add a delay before fading in
          setTimeout(() => {
            setShouldFadeIn(true);
          }, delay);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, work.id]); // Add work.id to dependencies to reset on category change

  return (
    <div 
      ref={ref} 
      className={`transition-opacity duration-700 ease-out ${
        isVisible && shouldFadeIn ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <AutoScrollCarousel
        work={work}
        speed={speed}
        onNavigate={onNavigate}
      />
    </div>
  );
}

interface WorkPageProps {
  onNavigate?: (page: string, projectId?: number) => void;
}

// Helper function to get localized project data for WorkPage
function getLocalizedProjectForWorkPage(project: any, t: any) {
  const projectKey = {
    1: 'grandSoir',
    2: 'ernestoNeto', 
    3: 'threeShortFilms',
    4: 'elsaSchiaparelli',
    5: 'giseleCaua',
    6: 'mothersDay25',
    7: 'ilNeige',
    8: 'desejo',
    9: 'tresemmeBrilho',
    10: 'gracinha',
    11: 'heringFernandas'
  }[project.id];

  if (!projectKey) return project;

  return {
    ...project,
    title: t(`projects.${projectKey}.title`),
    description: t(`projects.${projectKey}.description`),
    client: t(`projects.${projectKey}.client`)
  };
}

export default function WorkPage({ onNavigate }: WorkPageProps) {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedCategory, setDisplayedCategory] = useState('all');

  const handleCategoryChange = (newCategory: string) => {
    if (newCategory === selectedCategory || isTransitioning) return;
    
    setIsTransitioning(true);
    
    // After fade-out completes, change the category and fade back in
    setTimeout(() => {
      setSelectedCategory(newCategory);
      setDisplayedCategory(newCategory);
      setIsTransitioning(false);
    }, 300); // 300ms for fade-out
  };

  const getWorksByCategory = (category: string) => {
    const baseWorks = category === 'all' 
      ? mockWorks 
      : mockWorks.filter(work => work.category.includes(category));
    
    // Return localized projects
    return baseWorks.map(work => getLocalizedProjectForWorkPage(work, t));
  };

  const filteredWorks = getWorksByCategory(displayedCategory);

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div className="max-w-full py-12">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-[15px] mb-16">
          {/* Main statement */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight max-w-4xl font-['Instrument_Sans']">
              {t('homepage.mainText')}
            </h1>
          </div>
          
          {/* Another horizontal line */}
          <div className="w-full h-px bg-black mb-8"></div>
          
          {/* Our work title */}
          <div className="mb-6">
            <h2 className="text-black font-['Instrument_Sans'] mb-4 text-[21px] font-normal no-underline">{t('common.ourWork')}</h2>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-4">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  onClick={() => handleCategoryChange(category)}
                  className={`text-base capitalize transition-all duration-200 ${
                    selectedCategory === category
                      ? 'text-black bg-black/5'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                  } ${isTransitioning ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}
                >
                  {t(`homepage.categories.${
                    category === 'all' ? 'all' :
                    category === 'commercial' ? 'commercial' :
                    category === 'ai' ? 'ai' :
                    category === 'beauty' ? 'beauty' :
                    category === 'documentary' ? 'documentary' :
                    category === 'musicVideo' ? 'musicVideo' : 'all'
                  }`)}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Works with Auto-scrolling Videos and Transition Effects */}
        <div 
          className={`space-y-20 transition-opacity duration-300 ease-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {filteredWorks.map((work, index) => (
            <ProjectWrapper
              key={`${displayedCategory}-${work.id}`} // Include category in key to force re-render
              work={work}
              speed={15 + (index * 3)} // Slower speeds for visual interest
              onNavigate={onNavigate}
              delay={isTransitioning ? 0 : index * 200} // Faster staggering during transitions, none during category change
            />
          ))}
        </div>

        {/* Bottom section with statistics and contact */}
        <div className="max-w-7xl mx-auto mt-20 px-[15px]">
          {/* Statistics section */}
          <div className="mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              {/* Left column - Statement */}
              <div>
                <p className="text-black text-base">
                  {t('footer.tagline', { defaultValue: '' })}
                </p>
              </div>
              
              {/* Right column - Statistics */}
              <div className="space-y-12">
                {/* 15+ */}
                <div>
                  <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">{t('footer.stats.years.value', { defaultValue: '15+' })}</div>
                  <div className="text-black text-sm max-w-xs">
                    {t('footer.stats.years.label', { defaultValue: '' })}
                  </div>
                </div>
                
                {/* 5 */}
                <div className="border-t border-black pt-8">
                  <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">{t('footer.stats.continents.value', { defaultValue: '5' })}</div>
                  <div className="text-black text-sm max-w-xs">
                    {t('footer.stats.continents.label', { defaultValue: '' })}
                  </div>
                </div>
                
                {/* 1 */}
                <div className="border-t border-black pt-8">
                  <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">{t('footer.stats.pioneering.value', { defaultValue: '1' })}</div>
                  <div className="text-black text-sm max-w-xs">
                    {t('footer.stats.pioneering.label', { defaultValue: '' })}
                  </div>
                </div>
                
                {/* About link */}
                <div className="pt-8">
                  <button 
                    className="text-black text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
                    onClick={() => onNavigate?.('contact')}
                  >
                    {t('footer.aboutLink', { defaultValue: 'About →' })}
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Horizontal line */}
          <div className="w-full h-px bg-black mb-8"></div>
          
          {/* Connect text */}
          <div className="mb-8">
            <p className="text-black text-base">
              {t('footer.ctaLine', { defaultValue: 'Connect with us to create your next project.' })}
            </p>
          </div>
          
          {/* Horizontal line */}
          <div className="w-full h-px bg-black mb-12"></div>
          
          {/* Contact information */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Office */}
              <div>
                <div className="text-xs text-black uppercase tracking-wide mb-4">{t('footer.columns.office', { defaultValue: 'OFFICE' })}</div>
                <div className="space-y-1 text-sm text-black">
                  <div>Rua Lira, 151 - Sala 12 - Vila Madalena</div>
                  <div>São Paulo - Brazil</div>
                  <div>05443-060</div>
                </div>
              </div>
              
              {/* Social */}
              <div>
                <div className="text-xs text-black uppercase tracking-wide mb-4">{t('footer.columns.social', { defaultValue: 'SOCIAL' })}</div>
                <div className="space-y-1 text-sm text-black">
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Instagram</div>
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Behance</div>
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">LinkedIn</div>
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <div className="text-xs text-black uppercase tracking-wide mb-4">{t('footer.columns.contact', { defaultValue: 'CONTACT' })}</div>
                <div className="space-y-1 text-sm text-black">
                  <div className="cursor-pointer hover:opacity-70 transition-opacity">+55 11 99306 8428</div>
                  <div className="cursor-pointer hover:opacity-70 transition-opacity underline">contact@dietrich.tv</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Large logo */}
          <div className="text-center">
            <div className="text-5xl md:text-6xl lg:text-8xl text-black font-['Instrument_Sans']">
              dietrich.tv studio
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}