import "../styles/globals.css";
import Header from "./(components)/Header";

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
      <html lang="en">
        <body>
          <Header />
          <div>{children}</div>
        </body>
      </html>
    </>
  );
}
