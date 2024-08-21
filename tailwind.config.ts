import type { Config } from "tailwindcss";
// const colors = require('tailwind/css/colors')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true, // Center the container
        padding: "1rem", // Add padding inside the container
        screens: {
          sm: "100%", // Customize container width for small screens
          md: "100%", // Customize container width for medium screens
          lg: "100%", // Customize container width for large screens
          xl: "100%", // Customize container width for extra large screens
          "2xl": "100%", // Customize container width for 2xl screens
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        "20": "repeat(20, minmax(0, 1fr))",
        // "auto": "repeat(auto-fill, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-auto": "auto",
        "span-none": "none",
        "span-0": "span 0 / span 0",
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16",
        "span-17": "span 17 / span 17",
        "span-18": "span 18 / span 18",
        "span-19": "span 19 / span 19",
        "span-20": "span 20 / span 20",
      },
      colors: {
        // transparent: "transparent",
        // current: "currentColor",
        // primary: "#352F44",
        primary: {
          "50": "#eceaf0",
          "100": "#cbc6d6",
          "200": "#aaa1bb",
          "300": "#897da1",
          "400": "#675886",
          "500": "#352F44", // Base Color
          "600": "#2f2a3d",
          "700": "#282335",
          "800": "#211c2c",
          "900": "#1a1624",
          "950": "#120d1b",
        },
        // secondary: "#5C5470",
        secondary: {
          "50": "#eceaf1",
          "100": "#cbc7d9",
          "200": "#a9a4c1",
          "300": "#8780a9",
          "400": "#645c91",
          "500": "#5C5470", // Base Color
          "600": "#514a63",
          "700": "#453e55",
          "800": "#393247",
          "900": "#2e2739",
          "950": "#221d2b",
        },
        // error: "#FF204E",
        error: {
          50: "#ffe5ea",
          100: "#ffb8c2",
          200: "#ff8a99",
          300: "#ff5b70",
          400: "#ff2d48",
          500: "#FF204E", // Base Color
          600: "#e51c46",
          700: "#cc183e",
          800: "#b31436",
          900: "#990f2e",
          950: "#800c25",
        },
        // warning: "#EBE76C",
        warning: {
          "50": "#fffce6",
          "100": "#fef7b8",
          "200": "#fdf28a",
          "300": "#fcec5c",
          "400": "#fbe72e",
          "500": "#EBE76C", // Base Color
          "600": "#e1db61",
          "700": "#d6d056",
          "800": "#cbc54b",
          "900": "#c0b941",
          "950": "#b5ae36",
        },
        // info: "#5356FF",
        info: {
          "50": "#e6e7ff",
          "100": "#b3b4ff",
          "200": "#8081ff",
          "300": "#4e4eff",
          "400": "#1b1bff",
          "500": "#5356FF", // Base Color
          "600": "#4a4ddc",
          "700": "#4044b9",
          "800": "#363b96",
          "900": "#2d3273",
          "950": "#232950",
        },
        // success: "#14C38E",
        success: {
          "50": "#e5f7f1",
          "100": "#b8eada",
          "200": "#8bdcc4",
          "300": "#5edfae",
          "400": "#32d299",
          "500": "#14C38E", // Base Color
          "600": "#12b07f",
          "700": "#109e71",
          "800": "#0e8c63",
          "900": "#0b7a55",
          "950": "#096847",
        },
      },
    },
  },
  plugins: [],
};
export default config;
