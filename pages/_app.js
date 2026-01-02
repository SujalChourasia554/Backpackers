import "@/styles/globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState, useEffect } from 'react';
import themeConfig from '@/src/theme';

const getMuiTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: themeConfig.colors.brand.primary,
      light: themeConfig.colors.primary.light,
      dark: themeConfig.colors.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: themeConfig.colors.brand.secondary,
      light: '#ffe44d',
      dark: '#ccaa00',
      contrastText: '#000000',
    },
    background: {
      default: mode === 'light' ? themeConfig.colors.background.primary : '#0f1419',
      paper: mode === 'light' ? themeConfig.colors.background.secondary : '#1a1f26',
    },
    text: {
      primary: mode === 'light' ? themeConfig.colors.text.primary : '#e8e8e8',
      secondary: mode === 'light' ? themeConfig.colors.text.muted : '#a0a0a0',
    },
    beaches: {
      main: themeConfig.colors.beaches.primary,
      light: themeConfig.colors.beaches.light,
      dark: themeConfig.colors.beaches.dark,
    },
    mountains: {
      main: themeConfig.colors.mountains.primary,
      light: themeConfig.colors.mountains.light,
      dark: themeConfig.colors.mountains.dark,
    },
    cultural: {
      main: themeConfig.colors.cultural.primary,
      light: themeConfig.colors.cultural.light,
      dark: themeConfig.colors.cultural.dark,
    },
  },
  typography: {
    fontFamily: themeConfig.typography.fontFamily.primary,
    h1: {
      fontFamily: themeConfig.fonts.heading,
      fontWeight: 700,
      fontSize: '3rem',
    },
    h2: {
      fontFamily: themeConfig.fonts.heading,
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h3: {
      fontFamily: themeConfig.fonts.heading,
      fontWeight: 600,
      fontSize: '2rem',
    },
    h4: {
      fontFamily: themeConfig.fonts.heading,
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    themeConfig.shadows.sm,
    themeConfig.shadows.sm,
    themeConfig.shadows.md,
    themeConfig.shadows.md,
    themeConfig.shadows.md,
    themeConfig.shadows.lg,
    themeConfig.shadows.lg,
    themeConfig.shadows.xl,
    themeConfig.shadows.xl,
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
    themeConfig.shadows['2xl'],
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: themeConfig.shadows.md,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: themeConfig.shadows.lg,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
          },
        },
      },
    },
  },
});

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState('light');

  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode') || 'light';
    setMode(savedMode);
    document.documentElement.setAttribute('data-theme', savedMode);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={getMuiTheme(mode)}>
      <CssBaseline />
      <Component {...pageProps} themeMode={mode} setThemeMode={setMode} />
    </ThemeProvider>
  );
}
