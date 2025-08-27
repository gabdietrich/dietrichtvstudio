import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface StructuredDataProps {
  type: 'organization' | 'website' | 'project' | 'breadcrumb';
  data?: {
    projectTitle?: string;
    projectDescription?: string;
    projectClient?: string;
    projectType?: string;
    projectSlug?: string;
    breadcrumbs?: Array<{ name: string; url: string; }>;
  };
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    const baseUrl = 'https://www.dietrich.tv';
    const currentLocale = i18n.language;
    
    let structuredData: any = {};

    switch (type) {
      case 'organization':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Dietrich TV Studio",
          "alternateName": "Dietrich.tv",
          "url": baseUrl,
          "logo": `${baseUrl}/logo_dietrich_BLACK.svg`,
          "image": `${baseUrl}/og-image.jpg`,
          "description": currentLocale === 'pt' 
            ? "Dietrich é um estúdio de produção premiado que une cinema, design e inteligência artificial para criar imagens com impacto cultural."
            : "Dietrich is an award-winning production studio combining cinema, design and artificial intelligence to create images with cultural impact.",
          "foundingDate": "2009",
          "founders": {
            "@type": "Person",
            "name": "Gabriel Dietrich"
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Rua Lira, 151 - Room 12 - Vila Madalena",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "05443-060",
            "addressCountry": "BR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service",
            "email": "hello@dietrich.tv"
          },
          "sameAs": [
            "https://www.instagram.com/dietrich.tv",
            "https://vimeo.com/dietrichtv"
          ],
          "knowsAbout": [
            "Film Production",
            "Video Production", 
            "Artificial Intelligence",
            "Creative Direction",
            "Post-Production",
            "Animation",
            "Commercial Films",
            "Music Videos",
            "Documentary",
            "Art Direction"
          ],
          "serviceArea": {
            "@type": "Place",
            "name": "Global"
          },
          "areaServed": "Worldwide"
        };
        break;

      case 'website':
        structuredData = {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Dietrich TV Studio",
          "url": baseUrl,
          "description": currentLocale === 'pt'
            ? "Dietrich é um estúdio de produção premiado que une cinema, design e inteligência artificial para criar imagens com impacto cultural."
            : "Dietrich is an award-winning production studio combining cinema, design and artificial intelligence to create images with cultural impact.",
          "inLanguage": [
            {
              "@type": "Language",
              "name": "English",
              "alternateName": "en"
            },
            {
              "@type": "Language", 
              "name": "Portuguese",
              "alternateName": "pt"
            }
          ],
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        };
        break;

      case 'project':
        if (data?.projectTitle) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": data.projectTitle,
            "description": data.projectDescription || "",
            "producer": {
              "@type": "Organization",
              "name": "Dietrich TV Studio",
              "url": baseUrl
            },
            "creator": {
              "@type": "Organization", 
              "name": "Dietrich TV Studio",
              "url": baseUrl
            },
            "director": {
              "@type": "Person",
              "name": "Gabriel Dietrich"
            },
            "productionCompany": {
              "@type": "Organization",
              "name": "Dietrich TV Studio",
              "url": baseUrl
            },
            "client": data.projectClient || "",
            "genre": data.projectType || "Commercial",
            "inLanguage": currentLocale,
            "url": `${baseUrl}/${currentLocale}/${data.projectSlug}`,
            "thumbnailUrl": `${baseUrl}/projects/${data.projectSlug}/gallery/1.jpg`,
            "uploadDate": new Date().toISOString(),
            "keywords": [
              "film production",
              "video production", 
              "commercial",
              "creative direction",
              "artificial intelligence",
              "brazil",
              "são paulo"
            ]
          };
        }
        break;

      case 'breadcrumb':
        if (data?.breadcrumbs && data.breadcrumbs.length > 0) {
          structuredData = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": data.breadcrumbs.map((crumb, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "name": crumb.name,
              "item": `${baseUrl}${crumb.url}`
            }))
          };
        }
        break;
    }

    // Add structured data to head
    if (Object.keys(structuredData).length > 0) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(structuredData);
      document.head.appendChild(script);
    }

  }, [type, data, i18n.language]);

  return null; // This component doesn't render anything
}
