import { AnagramForm } from "./_form-client";

export default function Home() {
  return (
    <section className="justify-center flex flex-col items-center mx-auto px-4 gap-2 lg:gap-4">
      <header className="h-32 w-full flex flex-col justify-center items-center gap-2 text-center">
        <h2 className="text-4xl bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text font-extrabold tracking-wider text-transparent">
          Anagram Solver
        </h2>
        <h4 className="text-md bg-gradient-to-b from-orange-400 to-orange-500 bg-clip-text font-semibold tracking-wide text-transparent">
          Provide the details for your anagram, then hit Submit to cheat!
        </h4>
      </header>

      <AnagramForm />
    </section>
  );
}
