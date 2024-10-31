import { Fragment } from 'react'
import { actionFindManyArticles } from '../core/actions/articleActions'
import ArticleBoxView from './views/ArticleBoxView'

export default async function LandingPage() {
  const articles = await actionFindManyArticles()

  const background = 'commentingHeader.svg'

  return (
    <Fragment>
      <header
        style={{ backgroundImage: `url(${background})` }}
        className="w-full mx-auto bg-sky-800 bg-cover bg-center bg-no-repeat bg-opacity-50"
      >
        <div className="w-full min-h-48 h-full p-2 pt-10 flex flex-col justify-center items-center text-sky-800/80">
          <div className="mx-auto w-full max-w-7xl flex flex-col justify-center">
            <h1 className="text-center text-white lowercase">Comentando...</h1>
            <small className="text-center text-slate-900/80">
              Notícias da atualidade comentadas por uma Inteligência Artificial!
            </small>
          </div>
        </div>
      </header>
      <main className="w-full mx-auto flex flex-col items-center gap-4">
        <section className="w-full max-w-7xl p-2 flex flex-col md:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-2">
          {articles ? (
            articles.map((article) => (
              <ArticleBoxView article={article} key={article._id} />
            ))
          ) : (
            <h1 className="text-center">Carregando...</h1>
          )}
        </section>
      </main>
    </Fragment>
  )
}
