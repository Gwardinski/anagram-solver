// TODO: Expand for proper error handling
type ErrorCode = 1 | 2;

export type APIResponse<T> = {
  data?: T;
  error?: ErrorCode;
};

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
