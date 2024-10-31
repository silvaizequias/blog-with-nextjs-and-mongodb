import type { Metadata } from 'next'
import { ReactNode } from 'react'
import { Comfortaa } from 'next/font/google'
import Providers from './providers'
import { onLive } from './core/helpers'
import { GoogleAnalytics } from '@next/third-parties/google'
import { environment } from '@/environments'

const comfortaa = Comfortaa({
  subsets: ['latin'],
  variable: '--font-comfortaa',
  weight: ['300', '400', '500', '600'],
})

export const metadata: Metadata = {
  title: {
    default: 'Comentando notícias da atualidade com inteligência',
    template: `%s | Comentando...`,
  },
  description:
    'Notícias da atualidade comentadas por uma Inteligência Artificial!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html
      lang="pt_BR"
      suppressHydrationWarning={true}
      className={`${comfortaa.variable} font-default`}
    >
      <body className="text-sky-800">
        <Providers>{children}</Providers>
      </body>
      {onLive !== 'development' && <GoogleAnalytics gaId={environment.G_TAG} />}
    </html>
  )
}
