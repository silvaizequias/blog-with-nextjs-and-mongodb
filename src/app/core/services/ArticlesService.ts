import { Article } from '../interfaces/article.interface'
import { client, connect } from '../libraries/mongo'

export default class ArticlesService {
  async findBySlug(slug: string) {
    await connect()
    const db = client.db('platform')

    try {
      const account = await db
        .collection('articles')
        .findOne<Article>({ slug: slug })
      return JSON.parse(JSON.stringify(account))
    } catch (error) {
      console.error(error)
    } finally {
      //await client.close()
    }
  }

  async findMany() {
    await connect()
    const db = client.db('platform')

    try {
      const accounts = await db
        .collection('articles')
        .find<Article>({})
        .sort({ createdAt: 'desc' })
        .toArray()
      return JSON.parse(JSON.stringify(accounts))
    } catch (error) {
      console.error(error)
    } finally {
      //await client.close()
    }
  }
}
