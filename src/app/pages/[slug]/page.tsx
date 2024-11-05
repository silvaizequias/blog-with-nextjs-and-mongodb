import {
  actionArticleParseContent,
  actionFindArticleBySlug,
} from '@/app/core/actions/articleActions'
import { Metadata } from 'next'
import { Fragment } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { environment } from '@/environments'
import ArticleView from './views/ArticleView'

export async function generateMetadata({
  params,
}: // eslint-disable-next-line @typescript-eslint/no-explicit-any
any): Promise<Metadata | null> {
  const { slug } = await params
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ArticlePage({ params }: any) {
  const { slug } = await params
  const article = await actionFindArticleBySlug(slug)

  const content = article && (await actionArticleParseContent(article.content))

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
          <Fragment>
            <section className="w-full max-w-7xl p-2 flex flex-col">
              <h6 className="text-sky-800/80 uppercase mb-4">
                {article.category} | {article.subtitle}
              </h6>
              <article className="w-full mx-auto p-4 flex justify-center items-center">
                <h2 className="text-center text-sky-800 text-pretty font-thin">
                  {article.resume}
                </h2>
              </article>
            </section>
            <ArticleView content={content as string} />
          </Fragment>
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
