import { CommonDataProps } from './common.interface'

export interface Article extends CommonDataProps {
  channel: string
  isPrivate: boolean
  isDraft: boolean
  isSpotlight: boolean
  slug: string
  title: string
  subtitle: string
  category: string
  resume: string
  image: string
  thumbnail: string
  keywords: string[]
  content: string
  author: string
  write: string
  aiModel: string
  sources: string[]
}
