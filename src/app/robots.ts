import { MetadataRoute } from 'next/server';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://skills.tangison.com/sitemap.xml',
  };
}
