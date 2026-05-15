import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#4B9C7A",
          secondary: "#A7D8B3",
          accent: "#FCE18A",
          warm: "#FFB163",
          success: "#5CC08B",
          magic: "#8F6DDC",
          danger: "#FF6B6B",
        },
        'color-moon-cream': '#FCFBF7',
        'color-forest-parchment': '#F3F1E8',
      },
    },
  },
  plugins: [],
};
export default config;
