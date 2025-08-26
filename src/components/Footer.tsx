import { useTranslation } from 'react-i18next';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { i18n } = useTranslation();
  const isPortuguese = i18n.language === 'pt';

  const footerData = {
    en: {
      tagline: "We transform ideas into images that resonate across cultures.",
      stats: {
        years: { value: "15+", label: "Years of experience combining cinema, design and technology." },
        continents: { value: "5", label: "Continents where our films were exhibited or produced." },
        pioneering: { value: "1", label: "Pioneering studio in Brazil integrating A.I. as a creative language." }
      },
      aboutLink: "About →",
      ctaLine: "Connect with us to create your next project.",
      columns: {
        office: "OFFICE",
        social: "SOCIAL", 
        contact: "CONTACT"
      }
    },
    pt: {
      tagline: "Transformamos ideias em imagens que atravessam culturas.",
      stats: {
        years: { value: "15+", label: "Anos de experiência unindo cinema, design e tecnologia." },
        continents: { value: "5", label: "Continentes onde nossos filmes foram exibidos ou produzidos." },
        pioneering: { value: "1", label: "Estúdio pioneiro no Brasil integrando I.A. como linguagem criativa." }
      },
      aboutLink: "Sobre →",
      ctaLine: "Fale com a gente para criarmos seu próximo projeto.",
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
      {/* Bottom section with statistics and contact */}
      <div className="max-w-7xl mx-auto mt-20 px-[15px]">
        {/* Statistics section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left column - Statement */}
            <div>
              <p className="text-black text-base">
                {data.tagline}
              </p>
            </div>
            
            {/* Right column - Statistics */}
            <div className="space-y-12">
              {/* 15+ */}
              <div>
                <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">
                  {data.stats.years.value}
                </div>
                <div className="text-black text-sm max-w-xs">
                  {data.stats.years.label}
                </div>
              </div>
              
              {/* 5 */}
              <div className="border-t border-black pt-8">
                <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">
                  {data.stats.continents.value}
                </div>
                <div className="text-black text-sm max-w-xs">
                  {data.stats.continents.label}
                </div>
              </div>
              
              {/* 1 */}
              <div className="border-t border-black pt-8">
                <div className="text-8xl md:text-9xl text-black mb-2 font-['Instrument_Sans'] leading-none">
                  {data.stats.pioneering.value}
                </div>
                <div className="text-black text-sm max-w-xs">
                  {data.stats.pioneering.label}
                </div>
              </div>
              
              {/* About link */}
              <div className="pt-8">
                <button 
                  className="text-black text-sm hover:opacity-70 transition-opacity flex items-center gap-1"
                  onClick={() => onNavigate?.('contact')}
                >
                  {data.aboutLink}
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
            {data.ctaLine}
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
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Instagram</div>
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">Behance</div>
                <div className="cursor-pointer hover:opacity-70 transition-opacity underline">LinkedIn</div>
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
