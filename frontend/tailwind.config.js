import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [daisyui],

	daisyui: {
		themes: [
			"dark",
			{
				black: {
					...daisyUIThemes["garden"],
					primary: "#1f2937",
					secondary: "#9ca3af",

				},
			},
		],
	},
};