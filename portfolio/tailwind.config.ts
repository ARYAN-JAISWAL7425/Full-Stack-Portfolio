import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: {
          DEFAULT: "#ECE7DD",
          2: "#F4F0E8",
        },
        ink: {
          DEFAULT: "#131210",
          2: "#0E0E0C",
        },
        muted: {
          DEFAULT: "#6F6A60",
          dark: "#8A8478",
        },
        line: {
          DEFAULT: "#131210",
        },
        vermillion: {
          DEFAULT: "#F23A1D",
          soft: "#FF8A6E",
        },
        /* Warm near-black canvas for dark mode (dark Option A) */
        night: {
          DEFAULT: "#14110C",
          2: "#1C1813",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "ui-sans-serif", "sans-serif"],
        sans: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.85", letterSpacing: "-0.04em" }],
        "11xl": ["13rem", { lineHeight: "0.82", letterSpacing: "-0.045em" }],
      },
      letterSpacing: {
        mono: "0.18em",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
        "in-out-quint": "cubic-bezier(0.83, 0, 0.17, 1)",
      },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "grain-shift": {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-10%, 10%)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 28s linear infinite",
        "grain-shift": "grain-shift 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
