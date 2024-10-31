import { environment } from '@/environments'
import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  experimental: {
    mdxRs: true,
  },
  env: {
    ATLAS_URI: process.env.ATLAS_URI ?? '',
    BASE_URL: process.env.BASE_URL ?? '',
    G_TAG: process.env.G_TAG ?? '',
    IMG_REPOSITORY: process.env.IMG_REPOSITORY ?? '',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: `comentando-online.${environment.IMG_REPOSITORY}`,
        port: '',
        pathname: '/**',
      },
    ],
  },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
