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
        "medical-blue": " #1E40AF", // Blue
        "medical-secondary": ' #3b82f6',
        "medical-light": " #E0F2FE", // Light Blue
        "medical-primary": " #2563EB", //Dark Blue
        "medical-green":' #10b981',
        "medical-red": "  #ef4444",
        "medical-purple": ' #8b5cf6',
        "medical-amber": '  #f59e0b',
        "medical-sky": '  #06b6d4',
        "card": " #FFFFFF",
        "card-foreground": " #111827",
        "text-muted-foreground": " #6B7280"
      }
    }
  },
  plugins: [],
};
