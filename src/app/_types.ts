type Role = "assistant" | "user" | "system";
type FinishReason =
  | "stop"
  | "length"
  | "function_call"
  | "content_filter"
  | "null";

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
