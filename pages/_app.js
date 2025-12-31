import "@/styles/globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import themeConfig from '@/src/theme';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: themeConfig.colors.brand.primary,
      light: themeConfig.colors.beaches.light,
      dark: themeConfig.colors.brand.primary,
      contrastText: '#ffffff',
    },
    secondary: {
      main: themeConfig.colors.brand.secondary,
      light: themeConfig.colors.status.warning,
      dark: themeConfig.colors.brand.secondary,
      contrastText: '#000000',
    },
    background: {
      default: themeConfig.colors.background.primary,
      paper: themeConfig.colors.background.secondary,
    },
    text: {
      primary: themeConfig.colors.text.primary,
      secondary: themeConfig.colors.text.secondary,
    },
  },
  typography: {
    fontFamily: themeConfig.typography.fontFamily.primary,
    fontSize: 16,
  },
  shape: {
    borderRadius: 12,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
