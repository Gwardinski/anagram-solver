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
      <body className="h-screen w-screen bg-gradient-to-b from-neutral-800 to-neutral-950 bg-no-repeat">
        <main>{children}</main>
        <footer className="text-neutral-400 absolute bottom-0 w-full justify-center items-center flex h-32 gap-2">
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
