import { MetadataRoute } from 'next'
import { mainUrl } from './core/helpers'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${mainUrl}/sitemap.xml`,
  }
}
