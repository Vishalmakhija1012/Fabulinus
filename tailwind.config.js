module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue
        lilac: '#b39ddb',
        accent: '#ede7f6', // Light Lilac
        darkBlue: '#1e40af',
        softBlue: '#e3f0ff',
        sky: '#e0e7ff',
        paleLilac: '#f6f2fa',
        lightGray: '#f8fafc',
        gray: '#e5e7eb',
        darkGray: '#64748b',
        white: '#ffffff',
        black: '#18181b',
        gold: '#ffd700',
        blush: '#ffe4ec',
        teal: '#4fd1c5',
        mint: '#e6fff7',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
