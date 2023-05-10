import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      overpass: ["PT Sans, sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;

// font-family: 'PT Sans', sans-serif;
