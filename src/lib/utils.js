import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const submitScoreValidation = (name) => {
  const response = {
    error: "",
    isValid: true,
  };

  if (typeof name !== "string" || name === "" || name.length < 2) {
    response.error = "Name must contain at least 2 characters";
    response.isValid = false;
  } else if (name.length > 12) {
    response.error = "Name can not contain more than 12 characters";
    response.isValid = false;
  }

  return response;
};
