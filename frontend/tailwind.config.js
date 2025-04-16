// /** @type {import('tailwindcss').Config} */
// export default {
//     content: [ "./src/**/*.{html,js,jsx,ts,tsx}", 
//       "./public/index.html",
//     ],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   }
  

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "medical-secondary": "#1E40AF", // Blue
        "medical-light": "#E0F2FE", // Light Blue
        "medical-primary": "#2563EB", //Dark Blue
        "medical-green": "rgba(16, 185, 129, 0.9)",
        "medical-red": "#DC2626",
        "medical-sky": "rgb(143, 212, 227)",
        "card": "#FFFFFF",
        "card-foreground": "#111827",
        "text-muted-foreground": "#6B7280"
      }
    }
  },
  plugins: [],
};
