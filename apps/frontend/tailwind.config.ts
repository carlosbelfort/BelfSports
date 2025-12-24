import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0B",
        card: "#111111",
        border: "#1F1F1F",
        primary: "#E10600"
      }
    }
  },
  plugins: []
};

export default config;