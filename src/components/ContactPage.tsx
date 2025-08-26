import { useTranslation } from 'react-i18next';
import Footer from './Footer';
import ClientsCarousel from './ClientsCarousel';

export default function ContactPage() {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language === 'pt';
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div className="max-w-7xl mx-auto px-[15px] py-12">
        {/* Main heading */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight max-w-4xl font-['Instrument_Sans']">
            {t('contact.mainHeading')}
          </h2>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-200 mb-16"></div>

        {/* What we do section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl text-black mb-12 font-['Instrument_Sans']">{t('contact.whatWeDo')}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* FILM & IMAGE */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('contact.sections.filmImage.title')}</div>
              <div className="space-y-3">
                {(t('contact.sections.filmImage.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <div key={index} className="text-base text-black">{item}</div>
                ))}
              </div>
            </div>

            {/* AI & INNOVATION */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('contact.sections.aiInnovation.title')}</div>
              <div className="space-y-3">
                {(t('contact.sections.aiInnovation.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <div key={index} className="text-base text-black">{item}</div>
                ))}
              </div>
            </div>

            {/* DESIGN & RESEARCH */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('contact.sections.designResearch.title')}</div>
              <div className="space-y-3">
                {(t('contact.sections.designResearch.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <div key={index} className="text-base text-black">{item}</div>
                ))}
              </div>
            </div>

            {/* STRATEGY */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">{t('contact.sections.strategy.title')}</div>
              <div className="space-y-3">
                {(t('contact.sections.strategy.items', { returnObjects: true }) as string[]).map((item: string, index: number) => (
                  <div key={index} className="text-base text-black">{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-200 mb-16"></div>

        {/* Statistics section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* 1M+ */}
            <div className="text-center md:text-left">
              <div className="text-5xl md:text-6xl text-black mb-4 font-['Instrument_Sans']">1M+</div>
              <div className="text-base text-black max-w-xs">
                {isPortuguese ? 'Usuários e visitantes interagiram com nossos websites' : 'Users and visitors interacted with our websites'}
              </div>
            </div>

            {/* 36 */}
            <div className="text-center md:text-left border-l-0 md:border-l border-gray-200 pl-0 md:pl-12">
              <div className="text-5xl md:text-6xl text-black mb-4 font-['Instrument_Sans']">36</div>
              <div className="text-base text-black max-w-xs">
                {isPortuguese ? 'Campanhas ativas para empresas e marcas' : 'Active campaigns for companies and brands'}
              </div>
            </div>

            {/* 25+ */}
            <div className="text-center md:text-left border-l-0 md:border-l border-gray-200 pl-0 md:pl-12">
              <div className="text-5xl md:text-6xl text-black mb-4 font-['Instrument_Sans']">25+</div>
              <div className="text-base text-black max-w-xs">
                {isPortuguese ? 'Clientes diferentes buscaram nossa expertise' : 'Different clients have sought our expertise'}
              </div>
            </div>
          </div>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-200 mb-16"></div>

        {/* Clients Carousel - Trusted by section */}
        <ClientsCarousel />

        {/* Contact section */}
        <div className="mb-20">
          <div className="mb-12">
            <p className="text-lg text-black">
{t('contact.connectText')}
            </p>
          </div>
          
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
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.instagram')}</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.behance')}</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.linkedin')}</div>
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">{t('contact.footer.getInTouch')}</div>
                <div className="space-y-1 text-base text-black">
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.phone')}</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">{t('contact.footer.email')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large logo */}
        <div className="text-center pt-12">
          <div className="text-5xl md:text-6xl lg:text-8xl text-black font-['Instrument_Sans'] font-semibold">
            dietrich.tv studio
          </div>
        </div>
      </div>
    </div>
  );
}