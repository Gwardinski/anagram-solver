"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { formRequest } from "./_form-server";
import { ButtonOutline, ButtonPrimary } from "./components/buttons";
import { AnagramFormType } from "./_types";
import { FormControl, FormHint } from "./components/forms";

export const AnagramForm: React.FC = () => {
  const [showHints, setShowHints] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    getValues,
    formState: { errors },
  } = useForm<AnagramFormType>();

  const onSubmit = async (form: AnagramFormType) => {
    setLoading(true);
    const { data, error } = await formRequest(form);
    if (data) {
      setMessage(data?.message.content);
    }
    if (error) {
      // TODO: error handling
      console.log(error);
    }
    setLoading(false);
  };

  const resetForm = () => {
    reset();
    setLoading(false);
    setMessage(null);
  };

  const title = watch("anagram");

  if (loading) {
    return (
      <div className="animate-pulse max-w-md flex flex-col items-center justify-center gap-2 w-full border-2 border-neutral-600 rounded-md bg-gradient-radial to-neutral-800 from-neutral-700 px-4 py-8 lg:px-8 shadow-xl h-32">
        <h4 className="text-neutral-300 text-lg tracking-wider">Thinking...</h4>
      </div>
    );
  }

  if (message) {
    return (
      <div className="max-w-md flex flex-col items-center justify-center gap-2 w-full border-2 border-neutral-600 rounded-md bg-gradient-radial to-neutral-800 from-neutral-700 px-4 py-8 lg:px-8 shadow-xl">
        <h4 className="text-lg w-full text-center">
          {capitaliseEveryWord(title)}
        </h4>
        <p className="w-full py-16 whitespace-pre-line text-center">
          {`"${message}"`}
        </p>
        <ButtonPrimary fullWidth onClick={() => onSubmit(getValues())}>
          Not Right?
        </ButtonPrimary>
        <ButtonOutline fullWidth onClick={resetForm}>
          New Anagram
        </ButtonOutline>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md flex flex-col gap-2 w-full border-2 border-neutral-600 rounded-md bg-gradient-radial to-neutral-900 from-neutral-800 px-4 py-8 lg:px-8 shadow-xl"
    >
      <FormControl>
        <label htmlFor="anagram" className="text-neutral-100">
          Anagram
        </label>
        <input
          id="anagram"
          {...register("anagram", { required: true, maxLength: 100 })}
          type="text"
          className="bg-neutral-800 h-10 rounded-md w-full px-2 border border-neutral-600"
        />
        <FormHint>A Shrew Most Moist, Intellectual Orangutan...</FormHint>
      </FormControl>

      {showHints && (
        <div className="pt-4 flex flex-col gap-4">
          <FormControl>
            <label htmlFor="category" className="text-neutral-300">
              Category?
            </label>
            <input
              id="category"
              {...register("category", { maxLength: 40 })}
              type="text"
              className="bg-neutral-800 h-10 rounded-md w-full px-2 border border-neutral-600"
            />
            <FormHint>Sports, Music, Film...</FormHint>
          </FormControl>

          <FormControl>
            <label htmlFor="clue" className="text-neutral-300">
              Clue?
            </label>
            <textarea
              id="clue"
              {...register("clue", { maxLength: 120 })}
              className="bg-neutral-800 h-10 rounded-md w-full px-2 border border-neutral-600 min-h-[40px] max-h-[120px]"
            />
            <FormHint>
              A film, a famous poet, a catchphrase, a town in Belgium...
            </FormHint>
          </FormControl>

          <FormControl>
            <label htmlFor="wordCount" className="text-neutral-300">
              Number of words?
            </label>
            <input
              id="wordCount"
              {...register("noOfWords", { min: 1, max: 10 })}
              type="number"
              min={1}
              max={10}
              className="bg-neutral-800 h-10 rounded-md px-2 w-6/12 border border-neutral-600"
            />
            <FormHint>Do you know how many words to expect?</FormHint>
          </FormControl>
        </div>
      )}

      <div className="pt-8 flex flex-col gap-4">
        {!showHints && (
          <ButtonOutline fullWidth onClick={() => setShowHints(true)}>
            Add Hints
          </ButtonOutline>
        )}
        <ButtonPrimary fullWidth type="submit" disabled={loading}>
          Submit!
        </ButtonPrimary>
      </div>
    </form>
  );
};

function capitaliseEveryWord(input: string): string {
  return input
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
