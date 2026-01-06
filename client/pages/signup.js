import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Box, TextField, Button, Typography, Card, Container, IconButton, Alert, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '@/src/theme';

export default function Signup() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  // Get email from localStorage on component mount
  useEffect(() => {
    const pendingEmail = localStorage.getItem('pendingEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    } else {
      // If no email found, redirect back to login
      router.push('/login');
    }
  }, [router]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 4 && /^\d$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    
    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs[nextIndex].current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      setOpenSnackbar(true);
      return;
    }

    if (!email) {
      setError('Email not found. Please try logging in again.');
      setOpenSnackbar(true);
      router.push('/login');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp: otpValue }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error responses
        if (response.status === 400 || response.status === 401) {
          setError(data.message || 'Invalid OTP');
        } else {
          setError(data.message || 'Something went wrong. Please try again.');
        }
        setOpenSnackbar(true);
        setLoading(false);
        return;
      }

      // Success - OTP verified and account created
      if (data.token) {
        // Store token and user data
        localStorage.setItem('token', data.token);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        // Remove pending email from localStorage
        localStorage.removeItem('pendingEmail');
        // Dispatch event to update navbar
        window.dispatchEvent(new Event('auth-change'));
        // Redirect to home page
        router.push('/');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      setError('Network error. Please check your connection and try again.');
      setOpenSnackbar(true);
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'white',
        padding: '20px',
      }}
    >
      <Container maxWidth="lg">
        <IconButton
          onClick={() => router.push('/')}
          sx={{
            position: 'absolute',
            top: 20,
            right: 20,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            zIndex: 10,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              transform: 'scale(1.1)',
            },
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Card
          sx={{
            maxWidth: '1150px',
            height: '650px',
            margin: '0 auto',
            display: 'flex',
            borderRadius: '25px',
            boxShadow: '0 15px 50px rgba(0, 0, 0, 0.12)',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              flex: 1.3,
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '25px 0 0 25px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1678084559483-65e6ba4d9aba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGJhY2twYWNraW5nfGVufDB8fDB8fHww")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: '#2d5016',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.4) 100%)',
                zIndex: 2,
              },
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                color: 'white',
                zIndex: 10,
                padding: '50px 45px',
                width: '100%',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: '3rem',
                  fontWeight: 700,
                  mb: 3,
                  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.4)',
                  letterSpacing: '-0.5px',
                }}
              >
                Hello, Backpacker!
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '1rem',
                  lineHeight: 1.7,
                  opacity: 0.98,
                  textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
                  padding: '0 20px',
                  mb: 4,
                }}
              >
                Register with your personal account to explore amazing destinations
              </Typography>
              <Link href="/login" passHref style={{ textDecoration: 'none' }}>
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
                  BACK TO LOGIN
                </Button>
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              background: '#f5f5f5',
              padding: { xs: '2rem', md: '4rem 3.5rem' },
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              borderRadius: '0 25px 25px 0',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '2.125rem',
                fontWeight: 700,
                color: '#000',
                mb: 6,
                textAlign: 'left',
                letterSpacing: '-0.5px',
              }}
            >
              Create Account
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
              }}
            >
              {error && (
                <Alert severity="error" sx={{ borderRadius: '10px' }}>
                  {error}
                </Alert>
              )}

              {email && (
                <Typography
                  variant="body2"
                  sx={{
                    color: '#666',
                    fontSize: '0.875rem',
                    mb: -2,
                  }}
                >
                  Verifying OTP for: {email}
                </Typography>
              )}

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  justifyContent: 'flex-start',
                  mb: 1.5,
                }}
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    inputRef={inputRefs[index]}
                    type="text"
                    inputMode="numeric"
                    inputProps={{ maxLength: 1 }}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    required
                    disabled={loading}
                    sx={{
                      width: '70px',
                      '& .MuiOutlinedInput-root': {
                        height: '70px',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        '& input': {
                          textAlign: 'center',
                        },
                      },
                    }}
                  />
                ))}
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: '#888',
                  fontSize: '0.875rem',
                  mt: -1.5,
                  mb: 1.5,
                }}
              >
                Verify OTP
              </Typography>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{
                  mt: 5,
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
                {loading ? 'VERIFYING...' : 'SIGN UP'}
              </Button>
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