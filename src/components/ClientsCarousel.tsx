export default function ClientsCarousel() {
  // Create 13 placeholder client logos - will be replaced with real logos later
  const clientLogos = Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    name: `Client ${i + 1}`,
    placeholder: true
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
                className="flex-shrink-0 w-[200px] h-[100px] bg-gray-100 border border-gray-200 flex items-center justify-center"
                style={{ aspectRatio: '2/1' }}
              >
                <div className="text-gray-400 text-sm font-['Instrument_Sans']">
                  {client.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}