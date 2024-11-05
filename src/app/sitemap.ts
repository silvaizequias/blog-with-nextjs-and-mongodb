import { MetadataRoute } from 'next'
import { mainUrl } from './core/helpers'
import { actionFindManyArticles } from './core/actions/articleActions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await actionFindManyArticles()
  const articles =
    data &&
    data.map((article) => {
      return {
        url: mainUrl + '/' + article.slug,
        lastModified: article.createdAt,
      }
    })

  return articles as MetadataRoute.Sitemap
}
