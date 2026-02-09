const theme = require('./theme.json')

function getThemeValue(path, fallback = null) {
  const keys = path.split('.')
  let value = theme
  for (const key of keys) {
    value = value?.[key]
    if (value === undefined) return fallback
  }
  return value
}

function mapColors(palette) {
  if (!palette) return {}
  const colors = {}
  palette.forEach(({ slug, color }) => {
    colors[slug] = color
  })
  return colors
}

function mapFontSizes(sizes) {
  if (!sizes) return {}
  const fontSizes = {}
  sizes.forEach(({ slug, size }) => {
    fontSizes[slug] = size
  })
  return fontSizes
}

function mapFontFamilies(families) {
  if (!families) return {}
  const fonts = {}
  families.forEach(({ slug, fontFamily }) => {
    fonts[slug] = fontFamily.split(',').map(f => f.trim())
  })
  return fonts
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        ...mapColors(getThemeValue('settings.color.palette')),
        dark: {
          50: '#F9FAFB',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0EA5E9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14B8A6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
      },
      fontSize: mapFontSizes(getThemeValue('settings.typography.fontSizes')),
      fontFamily: mapFontFamilies(getThemeValue('settings.typography.fontFamilies')),
      maxWidth: {
        content: getThemeValue('settings.layout.contentSize', '1152px'),
        wide: getThemeValue('settings.layout.wideSize', '1280px'),
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: getThemeValue('settings.layout.wideSize', '1280px'),
      '2xl': '1440px',
    },
  },
  plugins: [],
}
