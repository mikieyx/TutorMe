module.exports = {
    purge: [], // Paths to your HTML/JS files to remove unused CSS (This is where you specify your components for purging)
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {}, // Extend the default Tailwind CSS theme or add new customizations
    },
    variants: {
      extend: {}, // Extend or customize the default variants for Tailwind CSS utilities
    },
    plugins: [
      require("daisyui"),
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
    ],
  };
  