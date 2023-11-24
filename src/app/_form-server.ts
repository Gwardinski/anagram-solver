"use server";

import OpenAI from "openai";
import { AnagramFormType, ChatGPTResponseType } from "./_types";

const apiKey = process.env.OPENAI_API_KEY;

let openAi: OpenAI;

const createInstance = () => {
  if (!apiKey) {
    console.log("No API Key", apiKey);
    return;
  }
  if (openAi) {
    console.log("Already instantiated");
    return;
  }
  openAi = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
};

createInstance();

export const formRequest = async (
  form: AnagramFormType
): Promise<ChatGPTResponseType | null> => {
  if (!openAi) {
    createInstance();
  }
  const content = createContent(form);
  const completion = await openAi.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0] as ChatGPTResponseType;
};

const createContent = (form: AnagramFormType) => {
  const { anagram, category, clue, noOfWords } = form;
  let prompt = `Try to solve this anagram: "${anagram}".`;
  if (category) {
    prompt += `It is in the category of ${category}.`;
  }
  if (clue) {
    prompt += `The clue is: ${clue}`;
  }
  if (noOfWords && noOfWords > 1) {
    prompt += `The answer is made up of ${noOfWords} words`;
  }
  prompt += logic;
  prompt += formatting;
  return prompt;
};

const logic =
  "It must follow standard anagram rules: The answer must include every letter of the anagram and each letter can only be used once.";
const formatting =
  "Please return the answer in the format of 'The anagram {anagram} is most likely to be {answer}'. If there are other possible answers then return them in a new line as 'Other possible answers include: {answers}'";
