import OpenAI from "openai";

// TODO: replace string with actual types
type Role = "assistant" | string;
type FinishReason = "stop" | string;

export type ChatGPTResponseType = {
  index: number;
  finish_reason: FinishReason;
  message: {
    content: string;
    role: Role;
  };
};

export type AnagramFormType = {
  anagram: string;
  category?: string;
  clue?: string;
  noOfWords?: number;
};

export const formRequest = async (
  form: AnagramFormType
): Promise<ChatGPTResponseType> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  const content = createContent(form);
  const completion = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-3.5-turbo",
  });

  return completion.choices[0] as ChatGPTResponseType;
};

const createContent = (form: AnagramFormType) => {
  const { anagram, category, clue, noOfWords } = form;
  let prompt = `Try to solve this anagram: ${anagram}.`;
  if (category) {
    prompt += `It is in the category of ${category}.`;
  }
  if (clue) {
    prompt += `The clue is: ${clue}`;
  }
  if (noOfWords && noOfWords > 1) {
    prompt += `The answer is made up of ${noOfWords} words`;
  }
  return prompt;
};
