export default async (request: Request, context: any) => {
  try {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Skip if already has locale prefix or is an asset/api call
    if (
      pathname.startsWith('/pt/') || 
      pathname.startsWith('/en/') ||
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_') ||
      pathname.includes('.') || // Skip files with extensions
      pathname.startsWith('/favicon') ||
      pathname.startsWith('/logo') ||
      pathname.startsWith('/src/') ||
      pathname.startsWith('/public/') ||
      pathname.startsWith('/videos/') ||
      pathname.startsWith('/projects/') ||
      pathname.startsWith('/logos_clients/')
    ) {
      return context.next();
    }

    // Check for language cookie first (cookie always wins)
    const cookieHeader = request.headers.get('cookie') || '';
    const cookieMatch = cookieHeader.match(/(?:^|;\s*)lang=(pt|en)(?:;|$)/);
    const cookieLang = cookieMatch?.[1];

    let detectedLang = 'en'; // Default to English

    if (cookieLang && (cookieLang === 'pt' || cookieLang === 'en')) {
      // Cookie exists and is valid - use it
      detectedLang = cookieLang;
    } else {
      // No valid cookie, use geo detection if available
      try {
        const country = context?.geo?.country?.toUpperCase() || '';
        
        // If in Brazil, use Portuguese; otherwise English
        if (country === 'BR') {
          detectedLang = 'pt';
        }
      } catch (geoError) {
        // Geo detection failed, fallback to Accept-Language
        try {
          const acceptLanguage = request.headers.get('accept-language') || '';
          if (acceptLanguage.toLowerCase().includes('pt-br') || acceptLanguage.toLowerCase().includes('pt')) {
            detectedLang = 'pt';
          }
        } catch (langError) {
          // Keep default 'en'
        }
      }
    }

    // Redirect to appropriate locale
    const newUrl = new URL(request.url);
    
    // Handle root path
    if (pathname === '/') {
      newUrl.pathname = `/${detectedLang}/`;
    } else {
      // Handle other paths by prepending locale
      newUrl.pathname = `/${detectedLang}${pathname}`;
    }

    // Use 302 (temporary) redirect to allow for dynamic routing
    return Response.redirect(newUrl.toString(), 302);
  } catch (error) {
    // If anything fails, just pass through without redirecting
    console.error('Edge function error:', error);
    return context.next();
  }
};

export const config = {
  path: "/*"
};
