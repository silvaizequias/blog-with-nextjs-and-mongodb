'use serve'

import { remark } from 'remark'
import html from 'remark-html'
import { Article } from '../interfaces/article.interface'
import ArticlesService from '../services/ArticlesService'

export const { findBySlug, findMany } = new ArticlesService()

export async function actionFindArticleBySlug(slug: string) {
  return await findBySlug(slug)
    .then((data: Article) => data)
    .catch((error) => console.error(error))
}

export async function actionFindManyArticles() {
  return await findMany()
    .then((data: Article[]) => data)
    .catch((error) => console.error(error))
}

export async function actionArticleParseContent(content: string) {
  const parseContent = await remark().use(html).process(content)

  return parseContent.toString()
}
