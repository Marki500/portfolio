import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#9800cb',
        cyanSoft: '#4fd4ff'
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        display: ['"Space Grotesk"', ...fontFamily.sans]
      },
      backgroundImage: {
        'gradient-glass': 'linear-gradient(135deg, rgba(152, 0, 203, 0.25) 0%, rgba(24, 24, 40, 0.8) 100%)',
        'orb-gradient': 'radial-gradient(circle at 20% 20%, rgba(152,0,203,0.45), transparent 60%)'
      },
      boxShadow: {
        glow: '0 0 25px rgba(152, 0, 203, 0.45)',
        'glow-soft': '0 0 40px rgba(79, 212, 255, 0.35)'
      },
      backdropBlur: {
        glass: '18px'
      },
      animation: {
        float: 'float 12s ease-in-out infinite',
        pulseGlow: 'pulseGlow 6s ease-in-out infinite',
        particle: 'particle 18s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -12px, 0)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 }
        },
        particle: {
          '0%': { transform: 'translate3d(0, 0, 0)', opacity: 0 },
          '10%': { opacity: 0.8 },
          '90%': { opacity: 0.4 },
          '100%': { transform: 'translate3d(0, -50px, 0)', opacity: 0 }
        }
      }
    }
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.glass-card': {
          background: theme('backgroundImage.gradient-glass'),
          backdropFilter: 'blur(' + theme('backdropBlur.glass') + ')',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: theme('boxShadow.glow-soft'),
          borderRadius: theme('borderRadius.3xl')
        },
        '.section-container': {
          '@apply max-w-6xl mx-auto px-6 lg:px-12': {}
        }
      });
    }
  ]
};
