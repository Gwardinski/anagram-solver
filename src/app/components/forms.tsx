import { HTMLAttributes } from "react";

export const FormControl: React.FC<HTMLAttributes<HTMLDivElement>> = (
  props
) => <div className="flex flex-col gap-1 w-full" {...props} />;

export const FormHint: React.FC<HTMLAttributes<HTMLParagraphElement>> = (
  props
) => <p className="text-sm text-neutral-400 italic" {...props} />;
