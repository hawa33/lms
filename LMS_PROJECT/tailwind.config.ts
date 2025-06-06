import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors:{

SanSky: "#808080",         // Standard gray  
SanSkyLight: "#D3D3D3",    // Light gray  
SanPurple: "#A9A9A9",      // Dark gray  
SanPurpleLight: "#E0E0E0", // Very light gray  
SanYellow: "#C0C0C0",      // Silver gray  
SanYellowLight: "#FFFFFF", // Pure white  



      }
    },
  },
  plugins: [],
};
export default config;
