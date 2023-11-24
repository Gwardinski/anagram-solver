"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  formRequest,
  AnagramFormType,
  ChatGPTResponseType,
} from "./_form-server";
import { ButtonOutline, ButtonPrimary } from "./components/buttons";

export const AnagramForm: React.FC = () => {
  const [data, setData] = useState<ChatGPTResponseType | null>();
  const [loading, setLoading] = useState<boolean>(false);
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
    const data = await formRequest(form);
    setData(data);
    setLoading(false);
  };

  const reSubmit = async () => {
    setLoading(true);
    const data = await formRequest(getValues());
    setData(data);
    setLoading(false);
  };

  const resetForm = () => {
    reset();
    setLoading(false);
    setData(null);
  };

  const title = watch("anagram");

  if (loading) {
    return (
      <div className="max-w-md flex flex-col gap-2 w-full border-2 border-neutral-800 rounded-md bg-neutral-700 px-4 py-8 lg:px-8 shadow-lg h-32">
        Thinking...
      </div>
    );
  }

  if (data) {
    return (
      <div className="max-w-md flex flex-col gap-2 w-full border-2 border-neutral-800 rounded-md bg-neutral-700 p-4 lg:p-8 shadow-lg h-fit">
        <h4 className="text-lg w-full text-center">{title}</h4>
        <p className="w-full py-16">{data.message.content}</p>
        <ButtonPrimary fullWidth onClick={reSubmit}>
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
      className="max-w-md flex flex-col gap-4 w-full border-2 border-neutral-800 rounded-md bg-neutral-900 px-4 py-8 lg:px-8 shadow-lg h-[680px]"
    >
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="anagram" className="text-neutral-100">
          Anagram
        </label>
        <input
          id="anagram"
          {...register("anagram", { required: true, maxLength: 100 })}
          type="text"
          className="bg-neutral-800 h-10 rounded-md w-full px-2"
        />
        <p className="text-sm text-neutral-500 italic">
          A Shrew Most Moist, Intellectual Orangutan...
        </p>
      </div>

      <div className="w-full flex flex-col items-center justify-center py-4">
        <h4 className="text-xl">Hints...</h4>
        <p className="text-xs text-neutral-400">
          Does the Anagram come with any hints?
        </p>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="category" className="text-neutral-300">
          Category?
        </label>
        <input
          id="category"
          {...register("category", { maxLength: 40 })}
          type="text"
          className="bg-neutral-800 h-10 rounded-md w-full px-2"
        />
        <p className="text-sm text-neutral-500 italic">
          Sports, Music, Film...
        </p>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="clue" className="text-neutral-300">
          Clue?
        </label>
        <textarea
          id="clue"
          {...register("clue", { maxLength: 120 })}
          className="bg-neutral-800 h-10 rounded-md w-full px-2 min-h-[40px] max-h-[120px]"
        />
        <p className="text-sm text-neutral-500 italic">
          A film, a famous poet, a catchphrase, a town in Belgium...
        </p>
      </div>

      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="wordCount" className="text-neutral-300">
          Number of words?
        </label>
        <input
          id="wordCount"
          {...register("noOfWords", { min: 1, max: 10 })}
          type="number"
          min={1}
          max={10}
          className="bg-neutral-800 h-10 rounded-md px-2 w-6/12"
        />
        <p className="text-sm text-neutral-500 italic">
          Do you know how many words to expect?
        </p>
      </div>

      <ButtonPrimary fullWidth type="submit" disabled={loading}>
        Submit!
      </ButtonPrimary>
    </form>
  );
};
