import Link from 'next/link';
import { AppBar, Toolbar, Box, Button, Container } from '@mui/material';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        borderRadius: '0 0 20px 20px',
        top: 0,
        left: 0,
        right: 0,
        margin: '10px auto 0',
        width: { xs: '95%', sm: '90%', md: '85%' },
        maxWidth: '1400px',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            padding: { xs: '8px 0', md: '12px 0' },
            minHeight: { xs: '56px', md: '64px' }
          }}
        >
          <Link href="/" passHref style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: { xs: '1.5rem', md: '1.8rem' },
                fontWeight: 700,
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
              }}
            >
              <Box 
                component="span" 
                sx={{ 
                  color: '#4b8ca8',
                  textShadow: '2px 2px 4px rgba(75, 140, 168, 0.2)',
                }}
              >
                Go
              </Box>
              <Box 
                component="span" 
                sx={{ 
                  color: '#ff9800',
                  textShadow: '2px 2px 4px rgba(255, 152, 0, 0.2)',
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
              gap: { xs: 1, md: 2 }
            }}
          >
            <Link href="/" passHref style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: '#171717',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 500,
                  padding: { xs: '6px 12px', md: '8px 16px' },
                  '&:hover': {
                    background: 'rgba(75, 140, 168, 0.1)',
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/explore" passHref style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: '#171717',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 500,
                  padding: { xs: '6px 12px', md: '8px 16px' },
                  '&:hover': {
                    background: 'rgba(75, 140, 168, 0.1)',
                  },
                }}
              >
                Search
              </Button>
            </Link>
            <Link href="/moments" passHref style={{ textDecoration: 'none' }}>
              <Button
                sx={{
                  color: '#171717',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 500,
                  padding: { xs: '6px 12px', md: '8px 16px' },
                  '&:hover': {
                    background: 'rgba(75, 140, 168, 0.1)',
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
                  background: 'rgba(75, 140, 168, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: '#4b8ca8',
                  border: '1px solid rgba(75, 140, 168, 0.3)',
                  fontSize: { xs: '0.9rem', md: '1rem' },
                  fontWeight: 600,
                  padding: { xs: '6px 16px', md: '8px 20px' },
                  borderRadius: '10px',
                  boxShadow: '0 4px 15px rgba(75, 140, 168, 0.2)',
                  '&:hover': {
                    background: 'rgba(75, 140, 168, 0.25)',
                    boxShadow: '0 6px 20px rgba(75, 140, 168, 0.3)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <ThemeToggle />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
