import { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode') || localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    const themeValue = newTheme ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', themeValue);
    localStorage.setItem('themeMode', themeValue);
    localStorage.setItem('theme', themeValue);
    
    window.location.reload();
  };

  return (
    <IconButton 
      onClick={toggleTheme}
      aria-label="Toggle theme"
      sx={{
        color: '#4b8ca8',
        padding: { xs: '6px', md: '8px' },
        '&:hover': {
          background: 'rgba(75, 140, 168, 0.1)',
        },
      }}
    >
      {isDark ? <Brightness7 /> : <Brightness4 />}
    </IconButton>
  );
}
