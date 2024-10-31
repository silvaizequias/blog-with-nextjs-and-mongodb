import { MetadataRoute } from 'next'
import { mainUrl } from './core/helpers'
import { actionFindManyArticles } from './core/actions/articleActions'

export default async function sitemap(): Promise<
  MetadataRoute.Sitemap | void | undefined
> {
  const data = await actionFindManyArticles()
  const articles =
    data &&
    data.map((article) => {
      return {
        url: mainUrl + '/' + article.slug,
        lastModified: article.createdAt,
      }
    })

  articles.push({
    url: mainUrl,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  })

  return articles
}
