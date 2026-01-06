import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, TextField, Button, Typography, Card, Container, IconButton, Alert, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default function Login() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error responses
        if (response.status === 400 || response.status === 401) {
          setError(data.message || 'Invalid email or password');
          setOpenSnackbar(true);
        } else {
          setError(data.message || 'Something went wrong. Please try again.');
          setOpenSnackbar(true);
        }
        setLoading(false);
        return;
      }

      // Success - user logged in or OTP sent
      if (data.token) {
        // User successfully logged in
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        // Dispatch event to update navbar
        window.dispatchEvent(new Event('auth-change'));
        router.push('/');
      } else if (data.requiresOTPVerification) {
        // OTP verification required (new user registration)
        // Store email in localStorage for signup page
        localStorage.setItem('pendingEmail', email);
        router.push('/signup');
      } else {
        // Default success case
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please check your connection and try again.');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  /* ===================== STYLES ===================== */

  const mainBoxStyle = {
    minHeight: '100vh', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    background: `url("https://media.istockphoto.com/id/2081121804/photo/tropical-summer-background-with-plaster-wall-pool-water-and-palm-shadow-luxury-hotel-resort.webp?a=1&b=1&s=612x612&w=0&k=20&c=bNU7g8eNIpRk89WXBhRxjpcy1HIQtTu3bSKgxYaEoVc=")
      center/cover no-repeat`,
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.3)',
    },
  };

  const rightBoxStyle = {
    flex: 1,
    bgcolor: '#37b6ff',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    p: 4,
  };

  const leftBoxStyle = {
    flex: 2,
    p: { xs: 3, md: '4rem 3.5rem' },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '10px',
      backgroundColor: '#fff',
      '& fieldset': { borderColor: '#cbd5e1' },
      '&:hover fieldset': { borderColor: '#6366f1' },
      '&.Mui-focused fieldset': {
        borderColor: '#4f46e5',
        borderWidth: 2,
      },
    },
    '& input::placeholder': {
      color: '#9ca3af',
      opacity: 1,
    },
  };
  
  const authButtonStyles = {
    padding: '16px', 
    borderRadius: '10px', 
    fontWeight: 600, 
    letterSpacing: '1.5px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
    },
  };
  
  const iconButtonStyle = {
    position: 'absolute', 
    top: 10, 
    right: 70, 
    bgcolor: 'white', 
    zIndex: 1,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    '&:hover': { transform: 'scale(1.1)' },
  };

  const cardStyle = {
    maxWidth: 800, 
    height: 500, 
    mx: 'auto', 
    display: 'flex', 
    borderRadius: 3, 
    overflow: 'hidden', 
    boxShadow: '0 25px 70px rgba(0,0,0,0.35)',
  };

  const signupButtonStyle = {
    px: 5, 
    py: 1.7, 
    color: 'white', 
    borderColor: 'white', 
    borderRadius: 2,
    fontWeight: 600,
    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
  };

  /* ===================== UI ===================== */

  return (
    <Box id="MainBox" sx={mainBoxStyle}>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={() => router.push('/')}
          sx={iconButtonStyle}
        >
          <CloseIcon />
        </IconButton>

        <Card sx={cardStyle}>
          {/* LEFT */}
          <Box sx={leftBoxStyle}>
            <Typography variant="h3" textAlign="center" mb={4} fontWeight={700}>
              Sign In
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'grid', gap: 3 }}>
              {error && (
                <Alert severity="error" sx={{ borderRadius: '10px' }}>
                  {error}
                </Alert>
              )}
              
              <TextField
                placeholder="Email"
                value={email}
                fullWidth
                required
                sx={textFieldStyles}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <TextField
                type="password"
                placeholder="Password"
                value={password}
                fullWidth
                required
                sx={textFieldStyles}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />

              <Typography fontSize={14} color="#777">
                Forgot your{' '}
                <Box component="span" sx={{ textDecoration: 'underline', cursor: 'pointer' }}>
                  password?
                </Box>
              </Typography>

              <Button
                type="submit"
                disabled={loading}
                sx={{ ...authButtonStyles, bgcolor: '#1a1a1a' }}
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </Button>
            </Box>
          </Box>

          {/* RIGHT */}
          <Box id="rightBox" sx={rightBoxStyle}>
            <Box>
              <Typography variant="h4" fontWeight={700} mb={2}>
                Welcome Back!
              </Typography>
              <Typography fontSize={14} mb={4}>
                Enter your personal account to explore amazing destinations
              </Typography>

              <Link href="/signup" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  sx={signupButtonStyle}
                >
                  SIGN UP
                </Button>
              </Link>
            </Box>
          </Box>
        </Card>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}