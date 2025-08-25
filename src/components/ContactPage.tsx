import ClientsCarousel from './ClientsCarousel';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <div className="max-w-7xl mx-auto px-[15px] py-12">
        {/* Studio name at top */}
        <div className="mb-16">
          <h1 className="text-lg text-black font-['Instrument_Sans']">dietrich.tv studio</h1>
        </div>

        {/* Main heading */}
        <div className="mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-black leading-tight max-w-4xl font-['Instrument_Sans']">
            Merging cinema, design, and artificial intelligence to craft images where art and brand meet.
          </h2>
        </div>

        {/* Separator line */}
        <div className="border-t border-gray-200 mb-16"></div>

        {/* What we do section */}
        <div className="mb-20">
          <h3 className="text-3xl md:text-4xl text-black mb-12 font-['Instrument_Sans']">What we do</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* FILM & IMAGE */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">FILM & IMAGE</div>
              <div className="space-y-3">
                <div className="text-base text-black">Commercials</div>
                <div className="text-base text-black">Fashion Film</div>
                <div className="text-base text-black">Art Projects</div>
                <div className="text-base text-black">16mm / Digital</div>
              </div>
            </div>

            {/* AI & INNOVATION */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">AI & INNOVATION</div>
              <div className="space-y-3">
                <div className="text-base text-black">AI Cinema</div>
                <div className="text-base text-black">Media Experiments</div>
                <div className="text-base text-black">Generative Tools</div>
                <div className="text-base text-black">New Mediums</div>
              </div>
            </div>

            {/* DESIGN & RESEARCH */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">DESIGN & RESEARCH</div>
              <div className="space-y-3">
                <div className="text-base text-black">Art Direction</div>
                <div className="text-base text-black">Set Design</div>
                <div className="text-base text-black">Creative Research</div>
                <div className="text-base text-black">Visual Concepts</div>
              </div>
            </div>

            {/* BRAND & STORYTELLING */}
            <div className="space-y-6">
              <div className="text-xs text-gray-500 uppercase tracking-wide">BRAND & STORYTELLING</div>
              <div className="space-y-3">
                <div className="text-base text-black">Brand Films</div>
                <div className="text-base text-black">Cultural Strategy</div>
                <div className="text-base text-black">Narrative Design</div>
                <div className="text-base text-black">Content Campaigns</div>
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
                Users and visitors interacted with our websites
              </div>
            </div>

            {/* 36 */}
            <div className="text-center md:text-left border-l-0 md:border-l border-gray-200 pl-0 md:pl-12">
              <div className="text-5xl md:text-6xl text-black mb-4 font-['Instrument_Sans']">36</div>
              <div className="text-base text-black max-w-xs">
                Active campaigns for companies and brands
              </div>
            </div>

            {/* 25+ */}
            <div className="text-center md:text-left border-l-0 md:border-l border-gray-200 pl-0 md:pl-12">
              <div className="text-5xl md:text-6xl text-black mb-4 font-['Instrument_Sans']">25+</div>
              <div className="text-base text-black max-w-xs">
                Different clients have sought our expertise
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
              Connect with us to explore your project's potential.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Office info */}
            <div className="space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">OFFICE</div>
                <div className="space-y-1 text-base text-black">
                  <div>Rua Lira, 151 - Sala 12 - Vila Madalena</div>
                  <div>São Paulo - Brazil</div>
                  <div>05443-060</div>
                </div>
              </div>
            </div>
            
            {/* Social and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Social */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">SOCIAL</div>
                <div className="space-y-1 text-base text-black">
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">Instagram</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">Behance</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">LinkedIn</div>
                </div>
              </div>
              
              {/* Contact */}
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-3">CONTACT</div>
                <div className="space-y-1 text-base text-black">
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">+55 11 99306 8428</div>
                  <div className="cursor-pointer hover:text-gray-600 transition-colors">contact@dietrich.tv</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Large logo */}
        <div className="text-center pt-12">
          <div className="text-5xl md:text-6xl lg:text-8xl text-black font-['Instrument_Sans']">
            dietrich.tv studio
          </div>
        </div>
      </div>
    </div>
  );
}