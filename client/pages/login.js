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
        router.push('/');
      } else if (data.requiresOTPVerification) {
        // OTP verification required (new user registration)
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

// ... existing code ...

  /* ===================== UI ===================== */

  return (
    <Box id= "MainBox"
      sx={mainBoxStyle}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <IconButton
          onClick={() => router.push('/')}
          sx={iconButtonStyle}
        >
          <CloseIcon />
        </IconButton>

        <Card
          sx={cardStyle}
        >
          {/* LEFT */}
          <Box
            sx={leftBoxStyle}
          >
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
          <Box id="rightBox"
            sx={rightBoxStyle}
          >
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