import Link from 'next/link'
import { ReactNode } from 'react'
import moment from 'moment'
import 'moment/locale/pt-br'
import { MdMarkUnreadChatAlt } from 'react-icons/md'

export default function MainLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const date: Date = new Date()

  return (
    <div className="w-full mx-auto min-h-screen bg-gradient-to-b from-sky-200/80 via-slate-200/60 to-slate-200">
      <div className="fixed w-full p-2 min-h-12 z-10 backdrop-blur-md bg-white/20 flex items-center justify-center gap-4">
        <div className="w-full max-w-7xl flex justify-between items-center">
          <Link href={'/'} className="hover:text-sky-800/60">
            <MdMarkUnreadChatAlt size={32} />
          </Link>
          <nav className="w-full p-2 flex justify-end items-center">
            <ul className="lex items-center gap-2">
              <li className="text-xs md:text-sm text-sky-800 uppercase">
                <Link href="/" className="hover:text-sky-800/60">
                  Início
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="w-full min-h-screen pb-10 flex flex-col items-center gap-4">
        {children}
      </div>
      <div className="w-full mx-auto">
        <footer className="w-full py-10 bg-gradient-to-b from-slate-200/40 to-sky-200/80 items-center gap-2">
          <div className="w-full max-w-7xl mx-auto flex flex-col justify-center items-center">
            <Link href={'/'} className="text-xl hover:text-sky-800/80">
              comentando
            </Link>
            <small className="text-center mb-4">
              Partes ou todo o conteúdo produzido por esse canal utiliza
              inteligência artificial, e os comentários são feitos a partir de
              fontes publicadas por outros canais de notícias.
            </small>
            <small>
              Direitos reservados a{' '}
              <Link href="https://www.sistemadedicado.com" target="_blank">
                Dedicado
              </Link>
            </small>
            <small>
              &copy; 2023 - {moment(date).format('YYYY')} | 52.378.516/0001-78
            </small>
          </div>
        </footer>
      </div>
    </div>
  )
}
