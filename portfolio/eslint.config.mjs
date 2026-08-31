import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/** eslint-config-next ships native flat configs, so no FlatCompat needed. */
const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "public/**"] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      /**
       * Warn, don't error. Every current hit is the legitimate "read something
       * only the browser knows, on mount" pattern — matchMedia for the custom
       * cursor, prefers-reduced-motion in the intro and hero, the theme class
       * the no-flash script already put on <html>. None of it can run during
       * SSR, so the state has to be set from an effect. Still worth surfacing
       * for genuinely new code.
       */
      "react-hooks/set-state-in-effect": "warn",
    },
  },
];

export default config;
