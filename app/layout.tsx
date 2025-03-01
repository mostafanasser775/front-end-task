import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";


import { Navbar } from "@/components/navbar";
import { fontSans } from "@/fonts";
import { PageHeader } from "@/components/page-Header";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Next.js App Template",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html suppressHydrationWarning lang="en">
      <head />

      <body className={clsx("bg-background min-h-screen font-sans antialiased",
        fontSans.variable,)} suppressHydrationWarning={true}>

        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />

              <PageHeader />


            <main className="flex-grow px-6 mx-auto mt-4 max-w-7xl">
              {children}
            </main>

          </div>
        </Providers>
      </body>
    </html>
  );
}
