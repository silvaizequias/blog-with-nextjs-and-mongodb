import { environment } from '@/environments'

const baseUrl = environment.BASE_URL

export const onLive = process.env.NODE_ENV

export const mainUrl =
  onLive == 'production' ? `https://www.${baseUrl}` : `http://${baseUrl}`
