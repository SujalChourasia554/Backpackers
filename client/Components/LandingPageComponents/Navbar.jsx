import Link from 'next/link';
import { AppBar, Toolbar, Box, Button, useTheme } from '@mui/material';
import ThemeToggle from '../ThemeToggle';
import { useState, useEffect } from 'react';
import { Avatar, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Search' },
  { href: '/moments', label: 'Moments' },
];

const NavButton = ({ href, label, variant = 'text' }) => {
  const muiTheme = useTheme();
  
  const baseStyles = {
    color: muiTheme.palette.text.primary,
    fontSize: { xs: '0.9rem', md: '1rem' },
    fontWeight: 600,
    padding: { xs: '8px 14px', md: '10px 18px' },
    borderRadius: '12px',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
  };

  const textStyles = {
    ...baseStyles,
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.15), rgba(75, 140, 168, 0.05))',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      borderRadius: '12px',
    },
    '&:hover': {
      transform: 'translateY(-2px)',
      '&::before': { opacity: 1 },
    },
  };

  const loginStyles = {
    ...baseStyles,
    background: 'linear-gradient(135deg, rgba(75, 140, 168, 0.25) 0%, rgba(75, 140, 168, 0.15) 100%)',
    backdropFilter: 'blur(10px)',
    color: '#4b8ca8',
    border: '1px solid rgba(75, 140, 168, 0.4)',
    fontWeight: 700,
    padding: { xs: '8px 18px', md: '10px 24px' },
    borderRadius: '14px',
    boxShadow: '0 4px 20px rgba(75, 140, 168, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
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
      '&::before': { left: '100%' },
    },
  };

  return (
    <Link href={href} passHref style={{ textDecoration: 'none' }}>
      <Button variant={variant} sx={variant === 'contained' ? loginStyles : textStyles}>
        {label}
      </Button>
    </Link>
  );
};

const Logo = () => (
  <Link href="/" passHref style={{ textDecoration: 'none' }}>
    <Box sx={{
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
    }}>
      <Box component="span" sx={{
        background: 'linear-gradient(135deg, #4b8ca8 0%, #5a9db8 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 4px rgba(75, 140, 168, 0.3))',
      }}>
        Go
      </Box>
      <Box component="span" sx={{
        background: 'linear-gradient(135deg, #ff9800 0%, #ffa726 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        filter: 'drop-shadow(0 2px 4px rgba(255, 152, 0, 0.3))',
      }}>
        Trip
      </Box>
    </Box>
  </Link>
);

export default function Navbar() {
  const muiTheme = useTheme();
  const isDark = muiTheme.palette.mode === 'dark';
  const router = useRouter();
  const [isUserLogin, setIsUserLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from backend to verify token and get full user data
  const fetchUserFromBackend = async (token) => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const userData = data.user;
        setIsUserLogin(true);
        setUser(userData);
        // Update localStorage with fresh data
        localStorage.setItem('user', JSON.stringify(userData));
        return true;
      } else {
        // Token invalid or expired
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsUserLogin(false);
        setUser(null);
        return false;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      // On error, fall back to localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        try {
          setUser(JSON.parse(userData));
          setIsUserLogin(true);
        } catch (e) {
          setIsUserLogin(false);
          setUser(null);
        }
      }
      return false;
    }
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        // Verify token with backend and get full user data
        await fetchUserFromBackend(token);
      } else {
        setIsUserLogin(false);
        setUser(null);
      }
      setLoading(false);
    };

    // Check on mount
    checkAuth();

    // Listen for storage changes (e.g., login/logout from another tab)
    const handleStorageChange = () => {
      checkAuth();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('auth-change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsUserLogin(false);
    setUser(null);
    handleMenuClose();
    window.dispatchEvent(new Event('auth-change'));
    router.push('/');
  };

  const handleProfileClick = () => {
    handleMenuClose();
    // Navigate to profile page (you can create this later)
    router.push('/profile');
  };

  const appBarStyle = {
    background: isDark ? 'rgba(20, 25, 30, 0.4)' : 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(25px) saturate(180%)',
    WebkitBackdropFilter: 'blur(25px) saturate(180%)',
    boxShadow: isDark
      ? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)'
      : '0 8px 32px rgba(31, 38, 135, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(255, 255, 255, 0.4)',
    borderRadius: '50px',
    width: { xs: '96%', sm: '90%', md: '85%', lg: '80%' },
    maxWidth: '1400px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    pointerEvents: 'auto',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: isDark
        ? 'linear-gradient(135deg, rgba(75, 140, 168, 0.1) 0%, rgba(255, 152, 0, 0.05) 100%)'
        : 'linear-gradient(135deg, rgba(75, 140, 168, 0.05) 0%, rgba(255, 152, 0, 0.03) 100%)',
      borderRadius: '50px',
      opacity: 0.5,
      pointerEvents: 'none',
    },
  };
  
  return (
    <Box sx={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100,
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
    }}>
      <AppBar position="relative" sx={appBarStyle}>
        <Toolbar sx={{
          justifyContent: 'space-between',
          padding: { xs: '8px 24px', md: '10px 32px' },
          minHeight: 'auto',
          position: 'relative',
          zIndex: 1,
          gap: { xs: 2, md: 4 },
        }}>
          <Logo />
          <Box component="nav" sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 } }}>
            {navLinks.map(link => (
              <NavButton key={link.href} {...link} />
            ))}

            {!loading && (
              <>
                {isUserLogin ? (
                  <>
                    <Avatar
                      src={user?.profilePicture || undefined}
                      alt={user?.name || user?.email || 'User'}
                      onClick={handleAvatarClick}
                      sx={{
                        marginX: 2,
                        width: 42,
                        height: 42,
                        cursor: 'pointer',
                        border: '2px solid rgba(75, 140, 168, 0.6)',
                        boxShadow: '0 4px 15px rgba(75, 140, 168, 0.35)',
                        transition: 'all 0.3s ease',
                        bgcolor: '#4b8ca8',
                        '&:hover': {
                          transform: 'scale(1.08)',
                        },
                      }}
                    >
                      {user?.name ? user.name.charAt(0).toUpperCase() : (user?.email ? user.email.charAt(0).toUpperCase() : 'U')}
                    </Avatar>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem onClick={handleProfileClick}>
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        Logout
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <NavButton href="/login" label="Login" variant="contained" />
                )}
              </>
            )}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}