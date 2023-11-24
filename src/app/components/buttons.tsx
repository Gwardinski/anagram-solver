import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export const ButtonPrimary: React.FC<ButtonProps> = ({
  fullWidth,
  ...rest
}) => (
  <button
    className={`
    h-12
    ${fullWidth ? "w-full" : "w-fit"}
    active:border-t-orange-700bg-gradient-to-br
    whitespace-nowrap
    rounded-md
    border
  border-orange-600
    bg-gradient-to-br
  from-orange-600
  to-orange-700
    px-6
  text-white
  hover:border-orange-700
  hover:border-l-orange-500
  hover:border-t-orange-600
  hover:from-orange-700
  hover:to-orange-800
  active:border-orange-800
  active:border-l-orange-600
  active:from-orange-800
  active:to-orange-900`}
    {...rest}
  />
);

export const ButtonOutline: React.FC<ButtonProps> = ({
  fullWidth,
  ...rest
}) => (
  <button
    className={`
    ${fullWidth ? "w-full" : "w-fit"}
    flex 
    h-12
    items-center
    justify-center
    gap-2
    whitespace-nowrap
    rounded-md
    border
  border-orange-600
  border-l-orange-400
  border-t-orange-500
  bg-neutral-900
  text-neutral-200
  hover:bg-neutral-800
  active:text-white`}
    {...rest}
  />
);
