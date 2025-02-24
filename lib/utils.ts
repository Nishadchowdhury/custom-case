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

// Define all possible card types with strict types
const CARD_TYPES = {
  visa: { numberLength: 16, cardPng: "/cardCompanies/visa.png" },
  mastercard: {
    numberLength: 16,
    cardPng: "/cardCompanies/mastercard.png",
  },
  ae: { numberLength: 15, cardPng: "/cardCompanies/ae.png" }, // American Express
  discover: {
    numberLength: 16,
    cardPng: "/cardCompanies/discover.png",
  },
  dinersclub: {
    numberLength: 14,
    cardPng: "/cardCompanies/dinnersclub.png",
  },
  jcb: { numberLength: 16, cardPng: "/cardCompanies/jcb.png" },
  unionpay: {
    numberLength: 16,
    cardPng: "/cardCompanies/unionpay.png",
  },
  rupay: { numberLength: 16, cardPng: "/cardCompanies/rupay.png" },
} as const; // `as const` ensures readonly properties & autocomplete

// Define the type based on `CARD_TYPES`
type CardType = keyof typeof CARD_TYPES;

// Define return type
type CardData = {
  numberLength: number;
  cardName: CardType | null;
  cardPng: string;
};

export function getCardType(cardNumber: string): CardData {
  const firstDigits = cardNumber.replace(/\s+/g, "").substring(0, 6); // Remove spaces & get first 6 digits

  let cardName: CardType | null = null;

  if (/^4/.test(firstDigits)) {
    cardName = "visa";
  } else if (
    /^5[1-5]/.test(firstDigits) ||
    /^2[2-7]/.test(firstDigits)
  ) {
    cardName = "mastercard";
  } else if (/^3[47]/.test(firstDigits)) {
    cardName = "ae"; // American Express
  } else if (/^6011|^65|^64[4-9]|^622/.test(firstDigits)) {
    cardName = "discover";
  } else if (/^36|^38|^30[0-5]/.test(firstDigits)) {
    cardName = "dinersclub"; // DinersClub
  } else if (/^35[2-8]/.test(firstDigits)) {
    cardName = "jcb";
  } else if (/^62/.test(firstDigits)) {
    cardName = "unionpay";
  } else if (/^60|^65|^81|^82|^508/.test(firstDigits)) {
    cardName = "rupay";
  }

  return cardName
    ? {
        numberLength: CARD_TYPES[cardName].numberLength,
        cardName,
        cardPng: CARD_TYPES[cardName].cardPng,
      }
    : { numberLength: 16, cardName: null, cardPng: "" };
}
