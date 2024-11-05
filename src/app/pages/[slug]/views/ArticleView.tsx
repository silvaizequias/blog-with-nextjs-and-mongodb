'use client'

export default function ArticleView({
  content,
}: Readonly<{ content: string }>) {
  return (
    <section className="w-full max-w-7xl p-2 flex flex-col">
      <article className="w-full mx-auto flex justify-center items-center">
        <p
          dangerouslySetInnerHTML={{ __html: content }}
          className="text-sky-800 py-4 prose-base text-justify"
        />
      </article>
    </section>
  )
}
