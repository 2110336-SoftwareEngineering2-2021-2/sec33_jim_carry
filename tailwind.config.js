// tailwind.config.js
module.exports = {
  content: ['{pages,app}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      ink: {
        darkest: '#1B120C',
        darker: '#2E251F',
        dark: '#40362F',
        base: '#4D4642',
        light: '#5F5854',
        lighter: '#7D736E',
      },
      sky: {
        dark: '#9E9B97',
        base: '#D0CFCD',
        light: '#E6E5E3',
        lighter: '#F5F4F2',
        lightest: '#FAF9F7',
        white: '#FFFFFF',
      },
      primary: {
        dark: '#956C4E',
        base: '#AF8B70',
        light: '#CEB19C',
        lighter: '#E2D0C2',
        lightest: '#F8F2ED',
      },
      success: '#23C180',
      error: '#E94F3A',
      yellow: '#FFC700',
    },
    fontFamily: {
      serif: ['Cantata One', 'serif'],
      sans: ['DM Sans', 'IBM Plex Sans Thai', 'sans-serif'],
      mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
      ],
    },
    fontSize: {
      tiny: '.75rem',
      small: '.875rem',
      regular: '1rem',
      large: '1.125rem',
      title3: '1.5rem',
      title2: '2rem',
      title1: '3rem',
    },
    fontWeight: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
    extend: {
      lineHeight: {
        14: '3.5rem',
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      animation: {
        'typing-indicator-1': '1s blink infinite',
        'typing-indicator-2': '1s blink infinite 0.333s',
        'typing-indicator-3': '1s blink infinite 0.667s',
      },
      keyframes: {
        blink: {
          '50%': {
            opacity: 1,
          },
        },
      },
    },
  },
  plugins: [],
}
