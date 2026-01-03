import Link from 'next/link';
import { AppBar, Toolbar, Box, Button, Container, useTheme } from '@mui/material';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === 'dark';
  
  return (
    <Box
      sx={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <AppBar 
        position="relative"
        sx={{ 
          background: isDark 
            ? 'rgba(20, 25, 30, 0.4)'
            : 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(25px) saturate(180%)',
          WebkitBackdropFilter: 'blur(25px) saturate(180%)',
          boxShadow: isDark
            ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
            : '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
          border: isDark
            ? '1px solid rgba(255, 255, 255, 0.08)'
            : '1px solid rgba(255, 255, 255, 0.4)',
          borderRadius: '50px',
          width: { xs: '96%', sm: '90%', md: '85%', lg: '80%' },
        maxWidth: '1400px',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'auto',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: isDark
              ? 'linear-gradient(135deg, rgba(75, 140, 168, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(75, 140, 168, 0.05) 0%, rgba(255, 152, 0, 0.03) 100%)',
            borderRadius: '50px',
            opacity: 0.5,
            pointerEvents: 'none',
          },
        }}
      >
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            padding: { xs: '8px 24px', md: '10px 32px' },
            minHeight: 'auto',
            position: 'relative',
            zIndex: 1,
            gap: { xs: 2, md: 4 },
          }}
        >
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: { xs: '1.6rem', md: '2rem' },
                fontWeight: 800,
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  filter: 'drop-shadow(0 4px 8px rgba(75, 140, 168, 0.3))',
                }
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(135deg, #4b8ca8 0%, #5a9db8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 2px 4px rgba(75, 140, 168, 0.3))',
                }}
              >
                Go
              </Box>
              <Box 
                component="span" 
                sx={{ 
                  background: 'linear-gradient(135deg, #ff9800 0%, #ffa726 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 2px 4px rgba(255, 152, 0, 0.3))',
                }}
              >
                Trip
              </Box>
            </Box>
          </Link>

          <Box 
            component="nav" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: { xs: 0.5, md: 1.5 }
            }}
          >
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: muiTheme.palette.text.primary,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  padding: { xs: '8px 14px', md: '10px 18px' },
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.15), rgba(75, 140, 168, 0.05))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '12px',
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/explore" passHref style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: muiTheme.palette.text.primary,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  padding: { xs: '8px 14px', md: '10px 18px' },
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.15), rgba(75, 140, 168, 0.05))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '12px',
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
              >
                Search
              </Button>
            </Link>
            <Link href="/moments" passHref style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: muiTheme.palette.text.primary,
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  padding: { xs: '8px 14px', md: '10px 18px' },
                  borderRadius: '12px',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.15), rgba(75, 140, 168, 0.05))',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '12px',
                  },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    '&::before': {
                      opacity: 1,
                    },
                  },
                }}
              >
                Moments
              </Button>
            </Link>
            <Link href="/login" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.25) 0%, rgba(75, 140, 168, 0.15) 100%)',
                  backdropFilter: 'blur(10px)',
                  color: '#4b8ca8',
                  border: '1px solid rgba(75, 140, 168, 0.4)',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 700,
                  padding: { xs: '8px 18px', md: '10px 24px' },
                  borderRadius: '14px',
                  boxShadow: '0 4px 20px rgba(75, 140, 168, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
                    transition: 'left 0.5s ease',
                  },
                  '&:hover': {
                    background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.35) 0%, rgba(75, 140, 168, 0.25) 100%)',
                    boxShadow: '0 6px 24px rgba(75, 140, 168, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                    transform: 'translateY(-3px) scale(1.02)',
                    border: '1px solid rgba(75, 140, 168, 0.5)',
                    '&::before': {
                      left: '100%',
                    },
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <ThemeToggle />
          </Box>
        </Toolbar>
    </AppBar>
    </Box>
  );
}
