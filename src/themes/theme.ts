export const theme = {
    colors: {
      primary: {
        DEFAULT: '#ffa800',
        foreground: '#ffffff',
      },
      secondary: {
        DEFAULT: '#1f1f1f',
        foreground: '#ffffff',
      },
      background: {
        DEFAULT: '#ffffff',
        dark: '#111111',
      },
      text: {
        DEFAULT: '#1f1f1f',
        muted: '#666666',
        dark: '#ffffff',
        darkMuted: '#999999',
      },
      border: {
        DEFAULT: '#e5e5e5',
        dark: '#333333',
      }
    },
    fonts: {
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
    },
  }
  
  export type Theme = typeof theme
  
  