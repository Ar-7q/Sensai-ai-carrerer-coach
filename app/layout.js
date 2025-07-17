// import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { Toaster } from "sonner";


const inter = Inter({ subsets: ["latin"] })


export const metadata = {
  title: "SensAI",
  description: "Placement Assistant for Students",
};

export default function RootLayout({ children }) {
  return (

    <ClerkProvider appearance={{
      baseTheme: [ neobrutalism],
      variables: { colorPrimary: 'red' },
      signIn: {
        baseTheme: [neobrutalism],
        variables: { colorPrimary: 'blue' },
      },
    }} >

      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.className}`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange

          >

            {/* header */}
            <Header />

            {/* main content */}



            <main className="min-h-screen">{children}</main>

            <Toaster richColors />

            {/* footer */}

            <footer className="bg-muted/50 py-12">
              <div className="container mx-auto px-4 text-center text-gray-500">
                <p>

                  From the Creators of Arpit and Co.
                </p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
