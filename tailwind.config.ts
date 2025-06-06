/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: "class", // or "media" for automatic system detection without toggle
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
