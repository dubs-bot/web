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
      <body className={classnames(inter.className)}>
        {children}
      </body>
    </html>
  )
}
