import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AU Pet Breed Encyclopedia — Dog & Cat Breeds Australia",
  description: "Comprehensive encyclopedia of 260+ dog and cat breeds. Find breed information, photos, and traits for Australian pet owners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="cupcake">
      <body>
        <div className="navbar bg-primary text-primary-content">
          <div className="container mx-auto">
            <a href="/" className="btn btn-ghost text-xl">🐾 AU Pet Breed Encyclopedia</a>
            <div className="flex-none gap-2">
              <a href="/dogs" className="btn btn-ghost">🐕 Dogs</a>
              <a href="/cats" className="btn btn-ghost">🐱 Cats</a>
            </div>
          </div>
        </div>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
          <p>© 2026 AU Pet Breed Encyclopedia. Data sourced from Dog CEO API & CatFact.ninja.</p>
        </footer>
      </body>
    </html>
  );
}
