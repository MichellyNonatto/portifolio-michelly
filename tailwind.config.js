import animated from "tailwindcss-animated";

/** @type {import("tailwindcss").Config} */
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        surface: "#fcf9f8",
        "surface-dim": "#dcd9d9",
        "surface-bright": "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "surface-container-highest": "#e5e2e1",
        "on-surface": "#1b1b1c",
        "on-surface-variant": "#59413b",
        "inverse-surface": "#303030",
        "inverse-on-surface": "#f3f0ef",
        outline: "#8c716a",
        "outline-variant": "#e0bfb7",
        "surface-tint": "#ab3514",
        primary: "#a83212",
        "on-primary": "#ffffff",
        "primary-container": "#ca4a29",
        "on-primary-container": "#fffbff",
        "inverse-primary": "#ffb4a1",
        secondary: "#556257",
        "on-secondary": "#ffffff",
        "secondary-container": "#d5e3d5",
        "on-secondary-container": "#59665b",
        tertiary: "#6c584e",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#867065",
        "on-tertiary-container": "#fffbff",
        error: "#ba1a1a",
        "on-error": "#ffffff",
        "error-container": "#ffdad6",
        "on-error-container": "#93000a",
        "primary-fixed": "#ffdbd2",
        "primary-fixed-dim": "#ffb4a1",
        "on-primary-fixed": "#3c0800",
        "on-primary-fixed-variant": "#891e00",
        "secondary-fixed": "#d8e6d8",
        "secondary-fixed-dim": "#bccabd",
        "on-secondary-fixed": "#131e16",
        "on-secondary-fixed-variant": "#3d4a40",
        "tertiary-fixed": "#f9ddd0",
        "tertiary-fixed-dim": "#dcc1b4",
        "on-tertiary-fixed": "#271810",
        "on-tertiary-fixed-variant": "#564339",
        background: "#fcf9f8",
        "on-background": "#1b1b1c",
        "surface-variant": "#e5e2e1",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        display: ["var(--font-space-grotesk)", "Arial", "Helvetica", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      fontSize: {
        "display-lg": ["64px", { lineHeight: "72px", letterSpacing: "-0.03em", fontWeight: "700" }],
        "display-lg-mobile": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg-mobile": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "18px", letterSpacing: "0.02em", fontWeight: "600" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.04em", fontWeight: "600" }],
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
          backgroundColor: "var(--color-primary)",
          color: "var(--color-on-primary)",
        },
        ":focus-visible": {
          outline: "2px solid var(--color-primary)",
          outlineOffset: "3px",
        },
      }),
  ],
};

export default tailwindConfig;
