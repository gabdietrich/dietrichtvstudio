import { useTranslation } from 'react-i18next';

export default function ClientsCarousel() {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language === 'pt';
  // Real client logos from public/logos_clients/
  const clientLogos = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    logoUrl: `/logos_clients/${String(i + 1).padStart(3, '0')}.png`
  }));

  // Duplicate the array to create seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <div className="w-full mb-20">
      {/* Trusted by title */}
      <div className="mb-8">
        <h3 className="text-lg text-black font-['Instrument_Sans'] text-[31px]">
          {isPortuguese ? 'Confiança de' : 'Trusted by'}
        </h3>
      </div>
      
      {/* Client logos carousel */}
      <div className="h-[100px] overflow-hidden relative">
        <div className="absolute inset-0 flex items-center">
          <div className="flex space-x-8 animate-scroll-continuous">
            {duplicatedLogos.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-[200px] h-[100px] flex items-center justify-center p-2"
                style={{ aspectRatio: '2/1' }}
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="w-full h-full object-contain"
                  style={{ 
                    filter: 'none',
                    maxWidth: '100%',
                    maxHeight: '100%'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}