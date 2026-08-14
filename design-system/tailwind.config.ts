import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#f7fbfb",
        foreground: "#193f43",
        card: "#ffffff",
        muted: "#f4faf8",
        border: "#d8e8e5",
        primary: { DEFAULT: "#00d1e2", foreground: "#05434a" },
        embarpet: { teal:"#05434a", deep:"#009dac", lime:"#c6d783", ink:"#193f43", muted:"#5e7f82" },
      },
      fontFamily: { sans: ["Montserrat", "Arial", "sans-serif"] },
      borderRadius: { ember:"10px" },
      boxShadow: { none:"none" },
    },
  },
  plugins: [],
} satisfies Config;
