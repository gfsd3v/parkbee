module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  variants: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        defaultTheme: {
          primary: '#8261f0',
          'primary-focus': '#5b3dbe',
          'primary-content': '#ffffff',
          secondary: '#f06aa9',
          'secondary-focus': '#dd5293',
          'secondary-content': '#ffffff',
          accent: '#63c6b4',
          'accent-focus': '#4fa898',
          'accent-content': '#1f2937',
          neutral: '#a3aab9',
          'neutral-focus': '#7a808e',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f2f3f4',
          'base-300': '#939ba6',
          'base-content': '#2c3b4f',
          info: '#4263eb',
          success: '#36c399',
          warning: '#ff9c44',
          error: '#ea5757',
        },
      },
      'dark',
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
  },
}
