import { Article } from '@/app/core/interfaces/article.interface'
import { environment } from '@/environments'
import moment from 'moment'
import 'moment/locale/pt-br'
import Image from 'next/image'
import Link from 'next/link'

export default function ArticleBoxView({
  article,
}: Readonly<{ article: Article }>) {
  const thumbnail = `https://${article.channel}.${environment.IMG_REPOSITORY}/${article.thumbnail}`

  return (
    <Link href={article.slug}>
      <div className="w-full max-w-96 flex flex-col justify-center gap-2 cursor-pointer bg-slate-200/40 rounded-md hover:shadow-md">
        <figure>
          <Image
            className="mx-auto rounded-t-md hover:opacity-80 hover:animate-pulse"
            src={thumbnail}
            alt={article.title}
            width={380}
            height={380}
            priority
          />
        </figure>
        <div className="mx-auto p-2">
          <small>{moment(article.createdAt).format('ll')}</small>
          <h3>{article.title}</h3>
        </div>
      </div>
    </Link>
  )
}
