import { actionFindArticleBySlug } from '@/app/core/actions/articleActions'
import { Metadata } from 'next'
import { Fragment } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { remark } from 'remark'
import html from 'remark-html'
import { environment } from '@/environments'

export async function generateMetadata({
  params,
}: Readonly<{
  params: { slug: string }
}>): Promise<Metadata | null> {
  const { slug } = params
  const article = await actionFindArticleBySlug(slug)

  return {
    title: {
      default: article ? article.title : 'Conteúdo não encontrado!',
      template: `%s | Comentando...`,
    },
    description: article ? article.resume : 'Conteúdo não encontrado!',
    openGraph: {
      title: article ? article.title : 'Conteúdo não encontrado!',
      description: article ? article.resume : 'Conteúdo não encontrado!',
      images: `https://${article?.channel}.${environment.IMG_REPOSITORY}/${article?.image}`,
      siteName: 'Comentando...',
      locale: 'pt_BR',
      type: 'article',
      publishedTime: moment(article?.createdAt).format('lll'),
      authors: [`${article?.author}`],
    },
    creator: article?.author,
  }
}

export default async function ArticlePage({
  params,
}: Readonly<{
  params: { slug: string }
}>) {
  const { slug } = params
  const article = await actionFindArticleBySlug(slug)

  const parseContent = article
    ? await remark().use(html).process(article.content)
    : ''

  const content = parseContent.toString()

  const background = article
    ? `https://${article.channel}.${environment.IMG_REPOSITORY}/${article.image}`
    : ''

  return (
    <Fragment>
      <header
        style={{ backgroundImage: `url(${background})` }}
        className={`w-full h-auto mx-auto bg-sky-800 bg-cover bg-center bg-no-repeat bg-opacity-50`}
      >
        <div className="w-full min-h-80 h-full p-2 pt-20 backdrop-blur-sm bg-black/40 flex flex-col justify-center items-center text-white">
          <div className="w-full p-2 max-w-7xl flex flex-col justify-center gap-2">
            <h1 className="text-center text-balance leading-tight font-bold uppercase">
              {article ? article.title : 'Conteúdo não encontrado!'}
            </h1>
            <small className="text-center opacity-60 pb-2">
              {article ? moment(article.createdAt).format('ll') : ''}
            </small>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto flex flex-col items-center gap-4">
        {article ? (
          <section className="w-full max-w-7xl p-2 flex flex-col">
            <article className="w-full mx-auto max-w-7xl flex justify-center items-center">
              <p
                dangerouslySetInnerHTML={{ __html: content }}
                className="text-sky-800 py-4 prose prose-xl text-justify"
              />
            </article>
          </section>
        ) : (
          <section className="w-full max-w-7xl p-2 flex flex-col">
            <h2 className="text-center text-balance font-bold uppercase">
              Conteúdo não encontrado!
            </h2>
          </section>
        )}
      </main>
    </Fragment>
  )
}
