import animated from "tailwindcss-animated";

/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        background: "#fcf9f8",
        foreground: "#3a302d",
        brand: {
          primary: "#3a302d",
          "primary-foreground": "#fcf9f8",
          background: "#fcf9f8",
          surface: "#ffffff",
          accent: "#e05a37",
          "accent-foreground": "#ffffff",
          muted: "#f4f1ef",
          "muted-foreground": "#6f625c",
          border: "#e7e2df",
          focus: "#92492f",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      transitionTimingFunction: {
        material: "cubic-bezier(0.2, 0, 0, 1)",
      },
      keyframes: {
        "header-border-sweep": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(286%)" },
        },
      },
      animation: {
        "header-border-sweep": "header-border-sweep 4s linear infinite",
      },
    },
  },
  plugins: [
    animated,
    ({ addBase }) =>
      addBase({
        ":root": {
          "--default-animation-timing-function": "cubic-bezier(0.2, 0, 0, 1)",
        },
        "::selection": {
          backgroundColor: "var(--color-brand-primary)",
          color: "var(--color-brand-primary-foreground)",
        },
        ":focus-visible": {
          outline: "2px solid var(--color-brand-focus)",
          outlineOffset: "3px",
        },
      }),
  ],
};

export default tailwindConfig;
