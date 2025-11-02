import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      mobile: "320px",
      sm: "375px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1920px",
    },
    extend: {
      borderRadius: {
        1: "var(--radius-1)",
        2: "var(--radius-2)",
        3: "var(--radius-3)",
        4: "var(--radius-4)",
      },
      spacing: {
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        7: "var(--space-7)",
        8: "var(--space-8)",
        9: "var(--space-9)",
        10: "var(--space-10)",
      },
      colors: {
        primary: {
          600: "var(--color-primary-600)",
        },
        secondary: {
          200: "var(--color-secondary-200)",
        },
        text: {
          body: "var(--color-text-body-1000)",
          alt: "var(--color-text-alt-1000)",
          inactive: "var(--color-text-inactive-700)",
          disabled: "var(--color-text-disabled-500)",
          white: "var(--color-text-white-100)",
          error: "var(--color-text-error-600)",
          success: "var(--color-text-success-600)",
        },
        bg: {
          card: "var(--color-bg-card-100)",
          cardAlt: "var(--color-bg-card-alt-100)",
          disabled: "var(--color-bg-disabled-200)",
        },
        error: {
          200: "var(--color-error-200)",
          700: "var(--color-error-700)",
        },
        warning: {
          300: "var(--color-warning-300)",
          700: "var(--color-warning-700)",
        },
        success: {
          400: "var(--color-success-400)",
          700: "var(--color-success-700)",
        },
      },
      fontFamily: {
        inter: "var(--font-inter)",
        sfpro: "var(--font-sfpro)",
      },
      fontSize: {
        h1: [
          "var(--h1-size)",
          {
            lineHeight: "var(--h1-line)",
            letterSpacing: "var(--h1-spacing)",
            fontWeight: "700",
          },
        ],
        h2: [
          "var(--h2-size)",
          {
            lineHeight: "var(--h2-line)",
            letterSpacing: "var(--h2-spacing)",
            fontWeight: "700",
          },
        ],
        h3: [
          "var(--h3-size)",
          {
            lineHeight: "var(--h3-line)",
            letterSpacing: "var(--h3-spacing)",
            fontWeight: "700",
          },
        ],
        h4: [
          "var(--h4-size)",
          {
            lineHeight: "var(--h4-line)",
            letterSpacing: "var(--h4-spacing)",
            fontWeight: "700",
          },
        ],
        h5: [
          "var(--h5-size)",
          {
            lineHeight: "var(--h5-line)",
            letterSpacing: "var(--h5-spacing)",
            fontWeight: "700",
          },
        ],
        h6: [
          "var(--h6-size)",
          {
            lineHeight: "var(--h6-line)",
            letterSpacing: "var(--h6-spacing)",
            fontWeight: "700",
          },
        ],
        h7: [
          "var(--h7-size)",
          {
            lineHeight: "var(--h7-line)",
            letterSpacing: "var(--h7-spacing)",
            fontWeight: "700",
          },
        ],

        b1: [
          "var(--b1-size)",
          { lineHeight: "var(--b1-line)", fontWeight: "500" },
        ],
        b2: [
          "var(--b2-size)",
          { lineHeight: "var(--b2-line)", fontWeight: "500" },
        ],
        b3: [
          "var(--b3-size)",
          { lineHeight: "var(--b3-line)", fontWeight: "400" },
        ],
        b4: [
          "var(--b4-size)",
          { lineHeight: "var(--b4-line)", fontWeight: "400" },
        ],
      },
    },
  },
  plugins: [],
};
export default config;
