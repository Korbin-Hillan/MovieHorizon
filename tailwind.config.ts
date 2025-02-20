import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        "1250": "1250ms",
        "1500": "1500ms",
        "1750": "1750ms",
        "2000": "2000ms",
        "2500": "2500ms",
        "2750": "2750ms",
        "3000": "3000ms",
        "4000": "4000ms",
        "5000": "5000ms",
      },
      colors: {
        "custom-bg": "#6B2E2E",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

export default config;
