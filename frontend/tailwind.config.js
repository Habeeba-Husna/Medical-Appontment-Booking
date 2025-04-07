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
        "medical-secondary": "#1E40AF", // Example: Blue
        "medical-light": "#E0F2FE", // Example: Light Blue
        "medical-primary": "#2563EB", // Example: Dark Blue
        "card": "#FFFFFF",
        "card-foreground": "#111827",
        "text-muted-foreground": "#6B7280"
      }
    }
  },
  plugins: [],
};
