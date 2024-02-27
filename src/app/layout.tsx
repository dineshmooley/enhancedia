import "../styles/globals.css";
import { ThemeProvider } from "./(components)/ui/theme-provider";
import Header from "./(components)/Header";
import NextAuthSessionProvider from "./providers";

export const metadata = {
  title: "Enhancedia",
  description: "Reliable Performance Enhancer",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body>
          <NextAuthSessionProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              <div>{children}</div>
            </ThemeProvider>
          </NextAuthSessionProvider>
        </body>
      </html>
    </>
  );
}
