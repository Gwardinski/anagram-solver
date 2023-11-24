import { HTMLAttributes } from "react";

export const PageLayout: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <section className="flex flex-col gap-4 pt-4 h-full" {...props} />
);

export const PageHeader: React.FC<HTMLAttributes<HTMLHeadingElement>> = (
  props
) => <header className="" {...props} />;

export const PageTitle: React.FC<HTMLAttributes<HTMLHeadingElement>> = (
  props
) => (
  <h1
    className="bg-gradient-to-b from-neutral-100 to-neutral-400 bg-clip-text text-4xl font-extrabold tracking-wider text-transparent"
    {...props}
  />
);
