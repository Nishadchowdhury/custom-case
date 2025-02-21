import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatePrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    // this is raw JS formatter system to formate number of prices
    style: "currency",
    currency: "USD",
  });

  return formatter.format(price);
};

export function constructMetadata({
  title = "CustomCase - custom high-quality phone cases",
  description = "Create custom high-quality phone cases in seconds",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@NishadChowdhuri",
    },
    icons,
    metadataBase: new URL("https://custom-case-nishad.vercel.app"),
  };
}

export function getCardType(cardNumber: string) {
  const firstDigits = cardNumber.replace(/\s+/g, "").substring(0, 6); // Remove spaces & get first 6 digits
  let cardData: {
    numberLength: number;
    cardName: string | null;
    cardPng: string;
  } = {
    numberLength: 16,
    cardName: null,
    cardPng: ''
  };

  if (/^4/.test(firstDigits)) {
    cardData.numberLength = 16;
    cardData.cardName = "visa";
  } else if (
    /^5[1-5]/.test(firstDigits) ||
    /^2[2-7]/.test(firstDigits)
  ) {
    cardData.numberLength = 16;
    cardData.cardName = "mastercard";
  } else if (/^3[47]/.test(firstDigits)) {
    cardData.numberLength = 15;
    cardData.cardName = "ae"; // American Express (AMEX)
  } else if (/^6011|^65|^64[4-9]|^622/.test(firstDigits)) {
    cardData.numberLength = 16;
    cardData.cardName = "discover";
  } else if (/^36|^38|^30[0-5]/.test(firstDigits)) {
    cardData.numberLength = 14;
    cardData.cardName = "dinersClub";
  } else if (/^35[2-8]/.test(firstDigits)) {
    cardData.numberLength = 16;
    cardData.cardName = "JCB";
  } else if (/^62/.test(firstDigits)) {
    cardData.numberLength = 16;
    cardData.cardName = "UnionPay";
  } else if (/^60|^65|^81|^82|^508/.test(firstDigits)) {
    cardData.numberLength = 16;
    cardData.cardName = "RuPay";
  }

  return cardData;
}
