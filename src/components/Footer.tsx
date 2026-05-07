import { useTranslation } from 'react-i18next';
import { analytics } from '../utils/analytics';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { i18n } = useTranslation();
  const isPortuguese = i18n.language === 'pt';

  const footerData = {
    en: {
      tagline: "Dietrich.tv — Directing and creative post-production studio. Cinema, culture, and brand.",
      aboutLink: "About →",
      columns: {
        office: "OFFICE",
        social: "SOCIAL",
        contact: "CONTACT"
      }
    },
    pt: {
      tagline: "Dietrich.tv - Studio de direção e pós criativa. Cinema, cultura e marca.",
      aboutLink: "Sobre →",
      columns: {
        office: "ESCRITÓRIO",
        social: "REDES",
        contact: "CONTATO"
      }
    }
  };

  const data = isPortuguese ? footerData.pt : footerData.en;

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto mt-20 px-[15px]">
        {/* Tagline */}
        <div className="mb-8">
          <p className="text-black text-base">
            {data.tagline}
          </p>
        </div>

        {/* Horizontal line */}
        <div className="w-full h-px bg-black mb-12"></div>
        
        {/* Contact information */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Office */}
            <div>
              <div className="text-xs text-black uppercase tracking-wide mb-4">
                {data.columns.office}
              </div>
              <div className="space-y-1 text-sm text-black">
                <div>Rua Lira, 151 - Sala 12 - Vila Madalena</div>
                <div>São Paulo - Brazil</div>
                <div>05443-060</div>
              </div>
            </div>
            
            {/* Social */}
            <div>
              <div className="text-xs text-black uppercase tracking-wide mb-4">
                {data.columns.social}
              </div>
              <div className="space-y-1 text-sm text-black">
                <a 
                  href="https://www.instagram.com/dietrich.tv/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:opacity-70 transition-opacity underline"
                  onClick={() => analytics.clickSocialMedia('Instagram', 'Footer')}
                >
                  Instagram
                </a>
                <a 
                  href="https://vimeo.com/dietrichtv" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:opacity-70 transition-opacity underline"
                  onClick={() => analytics.clickSocialMedia('Vimeo', 'Footer')}
                >
                  Vimeo
                </a>
                <a 
                  href="https://www.linkedin.com/company/108177359" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block cursor-pointer hover:opacity-70 transition-opacity underline"
                  onClick={() => analytics.clickSocialMedia('LinkedIn', 'Footer')}
                >
                  LinkedIn
                </a>
              </div>
            </div>
            
            {/* Contact */}
            <div>
              <div className="text-xs text-black uppercase tracking-wide mb-4">
                {data.columns.contact}
              </div>
              <div className="space-y-1 text-sm text-black">
                <div className="cursor-pointer hover:opacity-70 transition-opacity">+55 11 99306 8428</div>
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">contact@dietrich.tv</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Large logo */}
        <div className="text-center">
          <div className="text-6xl md:text-8xl lg:text-9xl text-black font-['Area_Normal_SemiBold'] mb-12">
            dietrich.tv studio
          </div>
        </div>
      </div>
    </div>
  );
}
