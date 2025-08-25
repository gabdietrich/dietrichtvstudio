export default function ClientsCarousel() {
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
        <h3 className="text-lg text-black font-['Instrument_Sans'] text-[31px]">Trusted by</h3>
      </div>
      
      {/* Client logos carousel */}
      <div className="h-[100px] overflow-hidden relative">
        <div className="absolute inset-0 flex items-center">
          <div className="flex space-x-8 animate-scroll-continuous">
            {duplicatedLogos.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-[200px] h-[100px] flex items-center justify-center"
                style={{ aspectRatio: '2/1' }}
              >
                <img
                  src={client.logoUrl}
                  alt={client.name}
                  className="max-w-full max-h-full object-contain"
                  style={{ filter: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}