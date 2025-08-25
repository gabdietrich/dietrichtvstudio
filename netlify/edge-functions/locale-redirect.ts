export default async (request: Request, context: any) => {
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
    pathname.startsWith('/public/')
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
    // No valid cookie, use geo detection
    const country = context.geo?.country?.toUpperCase() || '';
    
    // If in Brazil, use Portuguese; otherwise English
    if (country === 'BR') {
      detectedLang = 'pt';
    }
    
    // Fallback: Check Accept-Language header if geo fails
    if (!country) {
      const acceptLanguage = request.headers.get('accept-language') || '';
      if (acceptLanguage.toLowerCase().includes('pt-br') || acceptLanguage.toLowerCase().includes('pt')) {
        detectedLang = 'pt';
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
};

export const config = {
  path: "/*",
  excludedPath: [
    "/pt/*", 
    "/en/*", 
    "/api/*", 
    "/_*", 
    "/favicon.*", 
    "/logo*", 
    "/src/*", 
    "/public/*",
    "/*.css",
    "/*.js",
    "/*.png",
    "/*.jpg",
    "/*.jpeg",
    "/*.gif",
    "/*.svg",
    "/*.ico",
    "/*.woff",
    "/*.woff2",
    "/*.ttf"
  ]
};
