import { cva, type VariantProps } from "class-variance-authority";

export const inputStyles = cva("", {
  variants: {
    intent: {
      auth: "relative mt-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:outline-none",
    },
  },
});

export const buttonStyles = cva("", {
  variants: {
    intent: {
      auth: "group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:hover:bg-indigo-600",
    },
  },
});

export type InputType = NonNullable<VariantProps<typeof inputStyles>["intent"]>;
export type ButtonType = NonNullable<
  VariantProps<typeof buttonStyles>["intent"]
>;
