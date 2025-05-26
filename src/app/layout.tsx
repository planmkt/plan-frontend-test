import React from 'react'

import { Inter } from 'next/font/google'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

import Image from 'next/image'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="w-screen min-h-screen max-h-auto sm:h-auto bg-orange-400 flex flex-col">
        <main className="w-screen min-h-screen px-20 max-h-auto bg-orange-400 flex flex-col" >
          {children}
        </main>
        <footer className="w-screen flex items-end justify-end h-28 bg-black" >
          <p className="text-white text-sm font-medium pb-5 pr-10" >Grupo Plan Marketing (C) Todos os direitos reservados - 2025</p>
        </footer>
      </body>
    </html>
  )
}
