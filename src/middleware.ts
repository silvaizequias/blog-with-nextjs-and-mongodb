import { NextRequest, NextResponse } from 'next/server'
import { environment } from './environments'

export const config = {
  matcher: ['/((?!api/|api/:path*|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(request: NextRequest) {
  const url = request.nextUrl
  const baseUrl = environment.BASE_URL

  let hostname = request.headers
    .get('host')!
    .replace(`.${baseUrl}`, `.${baseUrl}`)

  if (hostname.includes('---') && hostname.endsWith(`.${baseUrl}`)) {
    hostname = `${hostname.split('---')[0]}.${baseUrl}`
  }

  const searchParams = request.nextUrl.searchParams.toString()
  const path = `${url.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ''
  }`

  if (hostname == `api.${baseUrl}`) {
    return NextResponse.rewrite(
      new URL(`/api${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `www.${baseUrl}`) {
    return NextResponse.rewrite(
      new URL(`/pages${path === '/' ? '' : path}`, request.url),
    )
  }

  if (hostname == `${baseUrl}`) {
    return NextResponse.rewrite(
      new URL(`/pages${path === '/' ? '' : path}`, request.url),
    )
  }

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, request.url))
}
