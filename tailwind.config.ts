import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#9800cb',
        cyanSoft: '#00d4ff'
      },
      fontFamily: {
        sans: ['\"Space Grotesk\"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 30px rgba(152,0,203,.35), 0 0 60px rgba(0,212,255,.20)'
      },
      backdropBlur: {
        glass: '16px'
      },
      backgroundImage: {
        'cosmic-gradient': 'radial-gradient(circle at 20% 20%, rgba(152,0,203,0.4), transparent 55%), radial-gradient(circle at 80% 0%, rgba(0,212,255,0.25), transparent 60%)'
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(152,0,203,0)' },
          '50%': { boxShadow: '0 0 25px rgba(152,0,203,0.35)' }
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(-2px)' },
          '50%': { transform: 'translateY(4px)' }
        }
      },
      animation: {
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite',
        floaty: 'floaty 6s ease-in-out infinite'
      }
    }
  },
  plugins: [
    plugin(({ addUtilities, theme }) => {
      addUtilities({
        '.glass': {
          background: 'linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))',
          border: '1px solid rgba(255,255,255,0.14)',
          backdropFilter: 'blur(' + theme('backdropBlur.glass') + ')',
          borderRadius: theme('borderRadius.2xl'),
          boxShadow: theme('boxShadow.glow')
        },
        '.card-hover': {
          transition: 'transform 300ms ease, box-shadow 300ms ease'
        },
        '.card-hover:hover': {
          transform: 'translateY(-4px) scale(1.01)',
          boxShadow: theme('boxShadow.glow')
        }
      });
    })
  ]
} satisfies Config;
