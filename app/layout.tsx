import { ReactNode } from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import classnames from "classnames";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Dubs bot",
  description: "A bot for detecting digit patterns like dubs/trips/quads among your Discord messages",
}

export type RootLayoutProps = {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.png" sizes="any" />
      <body className={classnames(inter.className, "bg-discord-black text-discord-text flex flex-col items-stretch justify-stretch min-h-screen p-8 lg:p-10 container mx-auto")}>
        <header className="bg-discord-primary text-white p-4 rounded-t-xl">
          <h1 className="text-2xl font-black">Dubs bot</h1>
        </header>
        <main className="flex flex-col flex-grow bg-discord-dark rounded-b-xl p-4">
          {children}
        </main>
      </body>
    </html>
  )
}
