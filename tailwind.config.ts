import type { Config } from "tailwindcss";

export default {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			casbBluePrimary: "#01589A",
			casbSeaBlueSecondary: "#186788",
			casbHover: "#014273",
			casbSeaBlueLight: "#28ACE2",
			casbSuccess: "#77C053",
			casbError: "#A61D24",
			casbYellowWarning: "#D89614",
			casbGreyPrimary: "#E6E6E6",
			casbDisabled: "#999999",
			casbAction: "#01589A",
			background: "var(--background)",
			foreground: "var(--foreground)",
  		},
		  backgroundImage: {
			"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			"gradient-conic":
			  "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
