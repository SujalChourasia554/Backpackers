import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, TextField, Button, Typography, Card, Container, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@/src/theme';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("https://media.istockphoto.com/id/2081121804/photo/tropical-summer-background-with-plaster-wall-pool-water-and-palm-shadow-luxury-hotel-resort.webp?a=1&b=1&s=612x612&w=0&k=20&c=bNU7g8eNIpRk89WXBhRxjpcy1HIQtTu3bSKgxYaEoVc=")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={() => router.push('/')}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#000',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 1)',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Card
          sx={{
            maxWidth: '800px',
            height: '500px',
            margin: '0 auto',
            display: 'flex',
            borderRadius: '25px',
            boxShadow: '0 25px 70px rgba(0, 0, 0, 0.35)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 2,
              background: 'white',
              padding: { xs: '2rem', md: '4rem 3.5rem' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '2.375rem',
                fontWeight: 700,
                color: '#000',
                textAlign: 'center',
                mb: 4,
                letterSpacing: '-0.5px',
              }}
            >
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3.5,
              }}
            >
              <TextField
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                  },
                }}
              />
              <TextField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                  },
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: '#888',
                  fontSize: '0.875rem',
                  mt: -1,
                  mb: 0.5,
                }}
              >
                Forgot Your <Box component="span" sx={{ textDecoration: 'underline', color: '#666', cursor: 'pointer' }}>Password?</Box>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  mt: 3,
                  padding: '16px',
                  background: '#1a1a1a',
                  color: 'white',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  letterSpacing: '1.5px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
                  '&:hover': {
                    background: '#2a2a2a',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.4)',
                  },
                }}
              >
                SIGN IN
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              background: '#37b6ffff',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '3rem',
              overflow: 'hidden',
              borderRadius: '0 25px 25px 0',
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '350px',
                height: '380px',
                background: '#249939ff',
                borderRadius: '50% 0 50% 50%',
                transform: 'rotate(-15deg)',
              }}
            />
            <Box
              sx={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                color: 'white',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontSize: '2.125rem',
                  fontWeight: 700,
                  mb: 3,
                  letterSpacing: '-0.5px',
                }}
              >
                Welcome Back!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.875rem',
                  lineHeight: 1.7,
                  mb: 5,
                  opacity: 0.98,
                  padding: '0 10px',
                }}
              >
                Enter your personal account to explore amazing destinations
              </Typography>
              <Link href="/signup" passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={{
                    padding: '14px 45px',
                    background: 'transparent',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '12px',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    letterSpacing: '1.2px',
                    boxShadow: '0 5px 18px rgba(0, 0, 0, 0.25)',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      border: '2px solid white',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 7px 22px rgba(0, 0, 0, 0.3)',
                    },
                  }}
                >
                  SIGN UP
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
