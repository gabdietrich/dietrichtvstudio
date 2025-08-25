import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useEffect } from 'react';
import VerticalCarousel from './VerticalCarousel';

// Import Grand Soir carousel images
import grandSoirImage1 from 'figma:asset/2214a44d45eec979984d423ac6b7107cff7df73c.png';
import grandSoirImage2 from 'figma:asset/fc19eaf31e4df66ff43bc3a4d1887ed44618a08c.png';
import grandSoirImage3 from 'figma:asset/8c2cf6a6819a84094ff542fa4590bd05ab7c3db5.png';

interface ProjectPageProps {
  projectId: number;
  onNavigate: (page: string, projectId?: number) => void;
}

// Project data with complete information
const mockWorks = [
  {
    id: 1,
    title: "Grand Soir, by Maison Francis Kurkdjian",
    category: ["A.I.", "Beauty", "Commercial"],
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
    ]
  },
  {
    id: 2,
    title: "Ernesto Neto for Le Bon Marché Rive Gauche",
    category: "Documentary",
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
    ]
  },
  {
    id: 3,
    title: "Three Short Films",
    category: "Music Video",
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
    ]
  },
  {
    id: 4,
    title: "Elsa Schiaparelli's Private Album",
    category: "Documentary",
    description: "Elsa Schiaparelli remembered through an animated short film. A dialogue between fashion, memory, and the cosmos.",
    client: "Biblioteca Mário de Andrade",
    fullDescription: "Dietrich directed this documentary film about Elsa Schiaparelli built around personal memories of the fashion designer's granddaughter: the actress, supermodel and cultural icon Marisa Berenson. Narrated by Marisa herself, the animated short film showcased never before seen images of the Schiaparelli family, in a creative initiative specially made for Brazil's most important public library, Biblioteca Mário de Andrade, in the context of the centenary of André Breton's Surrealist Manifesto.",
    projectType: "Animated Documentary",
    credits: "Directed by Dietrich.tv Studio. Narrated by Marisa Berenson.",
    vimeoId: "1112761795",
    carouselImages: [
      "/projects/elsa-schiaparelli-private-album/gallery/elsa-schiaparelli-private-album-gallery1.png",
      "/projects/elsa-schiaparelli-private-album/gallery/elsa-schiaparelli-private-album-gallery2.png"
    ]
  },
  {
    id: 5,
    title: "Gisele Bündchen and Cauã Raymond",
    category: "Commercial",
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
    ]
  },
  {
    id: 6,
    title: "Mother's Day '25",
    category: "Commercial",
    description: "Sasha, Bruna Marquezine, Xuxa and Neide — a celebration of generations and love.",
    client: "Hering",
    fullDescription: "For Hering's Mother's Day campaign, we brought together Sasha Meneghel, Bruna Marquezine, Xuxa and Neide. More than a film, it became a portrait of affection across generations, weaving family bonds into the fabric of one of Brazil's most iconic brands. The narrative is intimate yet universal: mothers and daughters, friendship and legacy, the simple gestures that define love. Each scene was crafted to highlight authenticity, where fashion becomes secondary to emotion, and presence becomes more powerful than performance. In this project, cinema and brand storytelling converge to honor motherhood — not as a concept, but as lived experience.",
    projectType: "Campaign",
    credits: "Directed by Dietrich.tv Studio. Starring Sasha, Bruna Marquezine, Xuxa and Neide.",
    vimeoId: "1112761195,1112760986",
    carouselImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23e5e7eb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 6 - Image 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23d1d5db'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 6 - Image 2%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 6 - Image 3%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f9fafb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 6 - Image 4%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23e5e7eb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 6 - Image 5%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23d1d5db'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 6 - Image 6%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 7,
    title: "Il Neige Rive Gauche",
    category: "Commercial",
    description: "An animated winter tale for Le Bon Marché, where Paris becomes poetry.",
    client: "Le Bon Marché Rive Gauche",
    fullDescription: "We were commissioned by Le Bon Marché to create Il Neige Rive Gauche, an animated film that transforms the Parisian winter into a poetic narrative. The project was conceived not as a campaign in the traditional sense, but as a dreamlike gesture: snow falling on the Rive Gauche, the city turning into a stage where imagination takes over reality. Animation became the language to capture the ephemeral, blending design and storytelling in a way that feels both timeless and unexpected. At the intersection of cinema, design, and brand identity, Il Neige Rive Gauche is more than a seasonal film. It is a sensorial invitation, a reminder that a brand can also be a curator of emotions.",
    projectType: "Animated Film",
    credits: "Directed by Dietrich.tv Studio. Commissioned by Le Bon Marché Rive Gauche.",
    vimeoId: "190538952",
    carouselImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 7 - Image 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23e5e7eb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 7 - Image 2%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 8,
    title: "Desejo",
    category: ["Commercial", "Beauty"],
    description: "A sensorial film where intimacy, fragrance, and memory intertwine.",
    client: "Natura",
    fullDescription: "For Natura's Desejo, Dietrich (with O2 Filmes) directed a film that explores the subtle tension between intimacy and expression. Desire is not shown directly — it is suggested through gestures, textures, and the rhythm of fragrance in motion. The narrative unfolds in layers: close-ups that evoke touch, frames that blur the line between skin and atmosphere, a sensorial approach where perfume becomes both memory and anticipation. Rather than illustrating the product, the film creates an emotional territory, where Natura's language of beauty resonates as something intimate, poetic, and deeply human.",
    projectType: "Campaign",
    credits: "Directed by Dietrich.tv Studio in collaboration with O2 Filmes.",
    vimeoId: "680559680",
    carouselImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23d1d5db'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 8 - Image 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f9fafb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 8 - Image 2%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 8 - Image 3%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 9,
    title: "Brilho Lamelar",
    category: ["Beauty", "Commercial"],
    description: "Technology and beauty meet in a film where hair becomes light.",
    client: "TRESemmé",
    fullDescription: "For the launch of TRESemmé Brilho Lamelar, Dietrich directed (at O2 Filmes) a film that bridges fashion and technology. Shot in virtual production, the narrative moves between real and virtual spaces, where Sabrina Sato embodies the elegance and energy of the brand. The aesthetic is sharp and sophisticated: dark backdrops, sculpted lighting, and movements that highlight shine as performance. Each transition dives into hair as if it were a portal, leading us into new scenes with rhythm and precision.",
    projectType: "Launch Film",
    credits: "Directed by Dietrich.tv Studio at O2 Filmes. Featuring Sabrina Sato.",
    vimeoId: "880317712",
    carouselImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23e5e7eb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 9 - Image 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23d1d5db'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 9 - Image 2%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 9 - Image 3%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f9fafb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 9 - Image 4%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 10,
    title: "Gracinha",
    category: "Music Video",
    description: "A music film that blends pop, fantasy, and cinema. Directed by Dietrich with Manu Gavassi.",
    client: "Manu Gavassi",
    fullDescription: "Directed by Dietrich and Manu Gavassi, Gracinha is a music film that transcends the boundaries of the music video format, merging pop sensibility with fashion aesthetics and cinematic storytelling. The project became a cultural milestone, reaching over 20 million views within 24 hours of release, and resonated as one of the most striking audiovisual works in the Brazilian market. Dietrich.tv Studio was responsible for the direction and execution, creating a layered visual journey that balances intimacy and spectacle — a portrait of Manu Gavassi's artistry elevated to a cinematic scale.",
    projectType: "Music Film",
    credits: "Directed by Dietrich.tv Studio with Manu Gavassi.",
    vimeoId: "650425603",
    carouselImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 10 - Image 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23e5e7eb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 10 - Image 2%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23d1d5db'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 10 - Image 3%3C/text%3E%3C/svg%3E"
    ]
  },
  {
    id: 11,
    title: "Mother's Day Fernandas",
    category: "Commercial",
    description: "Fernanda Torres and Fernanda Montenegro star in an intimate film celebrating motherhood and timeless connection. Directed by Dietrich.",
    client: "Hering",
    fullDescription: "For Mother's Day, Hering brought together two of Brazil's most iconic actresses — Fernanda Torres and Fernanda Montenegro — in a touching film that celebrates maternal bonds and timeless connection. Directed by Dietrich, the piece combines intimacy and elegance, highlighting gestures and emotions with simplicity and truth, in line with Hering's essential identity. Dietrich.tv Studio led the direction and production, crafting a cinematic narrative where fashion, affection, and heritage intertwine in a tribute that is as universal as it is personal.",
    projectType: "Campaign",
    credits: "Directed by Dietrich.tv Studio. Featuring Fernanda Montenegro and Fernanda Torres.",
    vimeoId: "524394640",
    carouselImages: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f9fafb'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 11 - Image 1%3C/text%3E%3C/svg%3E",
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600' viewBox='0 0 400 600'%3E%3Crect width='400' height='600' fill='%23f3f4f6'/%3E%3Ctext x='200' y='300' text-anchor='middle' fill='%236b7280' font-size='14'%3EProject 11 - Image 2%3C/text%3E%3C/svg%3E"
    ]
  }
];

// Component for rendering multiple videos when there are multiple vimeoIds
function VimeoPlayer({ vimeoId, title }: { vimeoId: string; title: string }) {
  const vimeoIds = vimeoId.split(',');
  
  return (
    <div className="space-y-8">
      {vimeoIds.map((id, index) => (
        <div key={index} className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src={`https://player.vimeo.com/video/${id.trim()}?h=0&badge=0&autopause=0&player_id=0&app_id=58479`}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            title={`${title} ${vimeoIds.length > 1 ? `- Part ${index + 1}` : ''}`}
          />
        </div>
      ))}
    </div>
  );
}

export default function ProjectPage({ projectId, onNavigate }: ProjectPageProps) {
  const currentProject = mockWorks.find(work => work.id === projectId);
  
  if (!currentProject) {
    return <div className="min-h-screen bg-white flex items-center justify-center">Project not found</div>;
  }

  // Get other projects (exclude current project) and take first 3
  const otherProjects = mockWorks.filter(work => work.id !== projectId).slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      {/* Header section */}
      <div className="max-w-7xl mx-auto px-[15px] py-12">
        {/* Project type and title */}
        <div className="mb-8 space-y-4">
          <div className="text-sm text-gray-500 uppercase tracking-wide">{currentProject.projectType}</div>
          <h1 className="text-4xl md:text-5xl text-black leading-tight font-['Instrument_Sans']">
            {currentProject.title}
          </h1>
        </div>

        {/* Project info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Left column - Project details */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Client</div>
                <div className="text-base text-black">{currentProject.client}</div>
              </div>

              <div>
                <div className="text-sm text-gray-500">Category</div>
                <div className="text-base text-black">
                  {Array.isArray(currentProject.category) 
                    ? currentProject.category.join(', ') 
                    : currentProject.category}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Credits</div>
                <div className="text-base text-black">{currentProject.credits}</div>
              </div>
            </div>
          </div>

          {/* Right column - Description */}
          <div className="space-y-6">
            <p className="text-base text-black leading-relaxed">
              {currentProject.fullDescription}
            </p>
          </div>
        </div>

        {/* Vertical Carousel for all projects */}
        {currentProject.carouselImages && currentProject.carouselImages.length > 0 && (
          <div className="mb-20">
            <VerticalCarousel 
              images={currentProject.carouselImages}
            />
          </div>
        )}

        {/* Vimeo video embed(s) */}
        <div className="mb-20">
          <VimeoPlayer vimeoId={currentProject.vimeoId} title={currentProject.title} />
        </div>

        {/* Other Projects section */}
        <div className="mt-[150px] mb-20">
          {/* Horizontal line 20px above title */}
          <div className="w-full h-px bg-black mb-5"></div>
          <h2 className="text-4xl md:text-5xl text-black mb-8 font-['Instrument_Sans']">Other Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherProjects.map((project) => {
              return (
                <div 
                  key={project.id}
                  className="cursor-pointer group"
                  onClick={() => onNavigate('project', project.id)}
                >
                  <div className="relative aspect-square overflow-hidden bg-gray-200">
                    {/* Placeholder for project thumbnail */}
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors duration-300">
                      <span className="text-gray-400 text-sm">Project Image</span>
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-3">
                    <div className="text-sm text-gray-500">Next Project →</div>
                    <div className="text-base text-black">{project.title}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Contact section */}
        <div className="border-t border-black pt-12 mb-20">
          <div className="space-y-4">
            <p className="text-lg text-black">
              Connect with us to explore your project's potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {/* Office info */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Office</div>
              <div className="space-y-1 text-sm text-black">
                <div>Rua Lira, 151 - Sala 12 - Vila Madalena</div>
                <div>São Paulo - Brazil</div>
                <div>05443-060</div>
              </div>
            </div>
            
            {/* Social */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Social</div>
              <div className="space-y-1 text-sm text-black">
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Instagram</div>
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Behance</div>
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">LinkedIn</div>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">Contact</div>
              <div className="space-y-1 text-sm text-black">
                <div className="cursor-pointer hover:opacity-70 transition-opacity">+55 11 99306 8428</div>
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">contact@dietrich.tv</div>
              </div>
            </div>
          </div>
        </div>

        {/* Large logo */}
        <div className="text-center">
          <div className="text-6xl md:text-8xl font-normal text-black font-['Instrument_Sans']">
            dietrich.tv studio
          </div>
        </div>
      </div>
    </div>
  );
}