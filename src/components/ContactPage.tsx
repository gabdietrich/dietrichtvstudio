import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import ClientsCarousel from './ClientsCarousel';

const contactSectionKeys = ['direction', 'postProduction', 'creativeDevelopment'] as const;

const CONTACT_BOLD_NAMES = [
  "Elsa Schiaparelli's Private Album",
  'Meet the Artists',
  'Manu Gavassi',
  'Thiago Pethit',
  'Le Bon Marché',
  'Ernesto Neto',
  'Art Basel',
  'Duda Beat',
  'Tresemmé',
  'Hering',
  'Natura',
  'Criolo',
  'Etérea',
  'LVMH',
  'Nike',
  'Jão',
];

const CONTACT_ITALIC_TERMS = ['director-led post-production'];

const CONTACT_UNDERLINE_TERMS = [
  'film, advertising, fashion, and art',
  'cinema, publicidade, moda e arte',
  'direction and creative finishing in the same hands',
  'direção e finalização criativa feitas pela mesma mão',
];

function renderContactText(text: string) {
  const allTerms = [...CONTACT_BOLD_NAMES, ...CONTACT_ITALIC_TERMS, ...CONTACT_UNDERLINE_TERMS];
  const pattern = new RegExp(
    `(${allTerms.map(n => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'g'
  );
  const parts = text.split(pattern);
  return parts.map((part, i) => {
    if (CONTACT_BOLD_NAMES.includes(part))
      return <strong key={i} style={{ fontWeight: 600 }}>{part}</strong>;
    if (CONTACT_ITALIC_TERMS.includes(part))
      return <em key={i} style={{ fontFamily: "'Poltawski Nowy', serif", fontStyle: 'italic', fontWeight: 400, fontSize: '1.05em' }}>{part}</em>;
    if (CONTACT_UNDERLINE_TERMS.includes(part))
      return <span key={i} style={{ textDecoration: 'underline', textUnderlineOffset: '4px' }}>{part}</span>;
    return part;
  });
}

export default function ContactPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div className="max-w-7xl mx-auto px-[15px] py-12">
        {/* Main heading and description with image */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight max-w-4xl mb-12" style={{ fontFamily: "'Geist', sans-serif", fontWeight: 300 }}>
            {t('contact.mainHeading')}
          </h2>
          
          {/* Two column layout: Text left, Image right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left column - Description paragraphs */}
            <div className="space-y-6">
              {(['paragraph1', 'paragraph2', 'paragraph3'] as const).map((key) => (
                <p key={key} className="text-lg text-black leading-relaxed font-['Instrument_Sans']">
                  {renderContactText(t(`contact.description.${key}`))}
                </p>
              ))}
            </div>
            
            {/* Right column - Image */}
            <div className="relative">
              <img 
                src="/contact-office-new.jpg" 
                alt="Dietrich.tv Studio office"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
                style={{ aspectRatio: '4/5' }}
              />
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-200 mb-16"></div>

        {/* What we do section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl text-black mb-12 font-['Instrument_Sans']">{t('contact.whatWeDo')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {contactSectionKeys.map((sectionKey) => (
              <div key={sectionKey} className="space-y-6">
                <div className="text-xs text-gray-500 tracking-wide">{t(`contact.sections.${sectionKey}.title`)}</div>
                <div className="space-y-3">
                  {(t(`contact.sections.${sectionKey}.items`, { returnObjects: true }) as string[]).map((item: string, index: number) => (
                    <div key={index} className="text-base text-black">{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-200 mb-16"></div>

        {/* Clients Carousel - Trusted by section */}
        <ClientsCarousel />

        {/* Contact section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Office info */}
            <div className="space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">{t('contact.office.title')}</div>
                <div className="space-y-1 text-base text-black">
                  <div>{t('contact.office.address')}</div>
                  <div>{t('contact.office.city')}</div>
                  <div>{t('contact.office.zip')}</div>
                </div>
              </div>
            </div>
            
            {/* Social and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Social */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">{t('contact.footer.social')}</div>
                <div className="space-y-1 text-base text-black">
                  <a 
                    href="https://www.instagram.com/dietrich.tv/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:text-gray-600 transition-colors underline"
                  >
                    Instagram
                  </a>
                  <a 
                    href="https://vimeo.com/dietrichtv" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:text-gray-600 transition-colors underline"
                  >
                    Vimeo
                  </a>
                  <a 
                    href="https://www.linkedin.com/company/108177359" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block cursor-pointer hover:text-gray-600 transition-colors underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">{t('contact.footer.getInTouch')}</div>
                <div className="space-y-1 text-base text-black">
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.email')}</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.phone')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large logo */}
        <div className="text-center pt-12">
          <div className="text-5xl md:text-6xl lg:text-8xl text-black font-['Instrument_Sans'] font-normal">
            Dietrich.tv Studio
          </div>
        </div>
      </div>
    </div>
  );
}