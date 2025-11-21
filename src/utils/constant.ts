import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const allFontSizes = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl",
  "7xl",
  "8xl",
  "9xl",
  "display-L",
  "display-M",
  "display-S",
  "heading-L",
  "heading-M",
  "heading-S",
  "heading-XS",
  "title-L",
  "title-M",
  "title-S",
  "body-XL",
  "body-L",
  "body-M",
  "body-S",
  "label-XL",
  "label-L",
  "label-M",
  "label-S",
]

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: allFontSizes,
        },
      ],
      "text-color": [
        {
          text: [(value: string) => !allFontSizes.includes(value)],
        },
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs))
}

const api_root = import.meta.env.VITE_API_ENDPOINT

export const API_ROOT = api_root
