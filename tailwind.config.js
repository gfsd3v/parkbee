module.exports = {
  purge: {
    important: 'html',
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './node_modules/react-map-gl-geocoder/dist/mapbox-gl-geocoder.css',
      './node_modules/mapbox-gl/dist/mapbox-gl.css',
    ],
    safelist: ['mapboxgl-ctrl-geocoder', 'mapboxgl-ctrl'],
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
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
  },
}
