/** @type {import('tailwindcss').Config} */

// Design tokens mirror the reference storefront (Shopify Dawn base with
// body scale 1.15 / heading scale 1.4, i.e. 1rem = 11.5px in the original).
// Values below are converted to px so they render identically on a 16px root.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '750px', // Dawn "small-up"
      lg: '990px', // Dawn "medium-up" (desktop navigation)
      xl: '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        navy: {
          DEFAULT: '#042C64',
          600: '#073879',
          900: '#001B3E',
        },
        maroon: {
          DEFAULT: '#821717',
          600: '#A51E1E',
          900: '#5E1010',
        },
        ink: {
          DEFAULT: '#111111',
          body: 'rgb(17 17 17 / 0.75)',
          muted: 'rgb(104 104 104 / 0.75)',
          soft: '#686868',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F1F1F1',
          subtle: '#F7F7F7',
          slate: '#BAC2D2',
        },
        accent: {
          blue: '#4380C9',
          'blue-dark': '#336AAE',
          whatsapp: '#25D366',
        },
        line: {
          DEFAULT: 'rgb(17 17 17 / 0.08)',
          strong: 'rgb(17 17 17 / 0.55)',
          maroon: 'rgb(130 23 23 / 0.08)',
        },
      },
      fontFamily: {
        heading: ['Lora', 'Georgia', 'serif'],
        body: ['Roboto', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        poppins: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // [size, { lineHeight, letterSpacing }]
        body: ['17.25px', { lineHeight: '1.7', letterSpacing: '0.69px' }],
        'body-lg': ['18.4px', { lineHeight: '1.7', letterSpacing: '0.69px' }],
        nav: ['16.1px', { lineHeight: '1.26', letterSpacing: '0.69px' }],
        caption: ['13.8px', { lineHeight: '1.6', letterSpacing: '0.805px' }],
        small: ['12.65px', { lineHeight: '1.6', letterSpacing: '0.805px' }],
        btn: ['17.25px', { lineHeight: '1.17', letterSpacing: '1.15px' }],
        'h1-m': ['42px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        h1: ['56px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        'h2-m': ['28px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        h2: ['33.6px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        'h3-m': ['23.8px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        h3: ['25.2px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        h4: ['21px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        'h5-m': ['16.8px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
        h5: ['18.2px', { lineHeight: '1.246', letterSpacing: '0.84px' }],
      },
      maxWidth: {
        page: '1380px', // 120rem in the original
        narrow: '810px', // FAQ / text columns
        text: '900px',
      },
      spacing: {
        gutter: '17.25px', // mobile page padding (1.5rem)
        'gutter-lg': '57.5px', // desktop page padding (5rem)
        section: '36px',
        'section-m': '27px',
        header: '149px',
      },
      borderRadius: {
        pill: '40px',
      },
      boxShadow: {
        popup: '0 4px 5px rgb(17 17 17 / 0.05)',
        drawer: '-12px 0 40px rgb(0 0 0 / 0.12)',
        card: '0 10px 30px -12px rgb(4 44 100 / 0.25)',
      },
      transitionTimingFunction: {
        'out-slow': 'cubic-bezier(0, 0, 0.3, 1)',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
      },
      aspectRatio: {
        product: '5 / 4',
        banner: '6667 / 2050',
        collection: '5000 / 1537',
        cta: '6000 / 1406',
      },
    },
  },
  plugins: [],
};
