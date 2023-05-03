const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        't-lg':
          'var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), 0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }

        'md': '768px',
        // => @media (min-width: 768px) { ... }

        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }

        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }

        '2xl': '1536px',
        // => @media (min-width: 1536px) { ... }
        'xs': {'max': '720px'}
      },
      colors: {
        dark: {
          bg: '#151823',
          'eval-1': '#222738',
          'eval-2': '#2A2F42',
          'eval-3': '#2C3142',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),

    // TODO: use `https://github.com/Kamona-WD/tailwindcss-perspective` package when it support tailwindcss v3.
    require('./tailwindcss-perspective'),
  ],
}
