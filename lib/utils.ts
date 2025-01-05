import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatePrice = (price: number) => { 
  const formatter = new Intl.NumberFormat("en-US", { // this is raw JS formatter system to formate number of prices
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};
