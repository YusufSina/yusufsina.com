import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#757a80",
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-poppins)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;

