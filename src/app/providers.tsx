'use client'

import { Fragment, ReactNode } from 'react'
import './globals.css'

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <Fragment>{children}</Fragment>
}
