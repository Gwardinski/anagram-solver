import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Anagram Solver",
  description: "Cheat at Pub Quizzes with the power of AI & Chat GPT",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b flex flex-col from-neutral-800 to-neutral-950">
        <main>{children}</main>
        <footer className="text-neutral-400 mt-auto w-full h-32 justify-center items-center flex flex-col flex-wrap gap-2">
          v0.1
          <a
            href="https://github.com/Gwardinski"
            className="hover:underline hover:text-neutral-200"
          >
            @Gwardinski
          </a>
        </footer>
      </body>
    </html>
  );
}
