/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './public/**/*.{js,ts,jsx,tsx,mdx}',
    ],
  
    daisyui: {
      themes: ["light"],
    },
   
    theme: {
      extend: {
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic':
            'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
        boxShadow: {
          '3xl': '0 10px 40px rgba(0, 0, 0, 0.1)'
        },
        fontFamily: {
          lato: ['Lato'],
        },
      },
    },
    
    plugins: [
      require("daisyui"),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };