import { Button, Typography, Box, Container, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import themeConfig from '@/src/theme';

export default function HeroSection({ onUploadClick }) {

  const heroSectionStyle = {
    marginTop : 5,
    marginLeft: 15,
    display: 'flex',
    gap: 3,
    py: 4,
    minHeight: '80vh',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: { xs: 'column', md: 'row' },
    textAlign: { xs: 'center', md: 'left' },
    minHeight: { xs: 'auto', md: '80vh' },
  }

  const heroSectionButtonStyle = {
    background: 'linear-gradient(135deg, #4b8ca8 0%, #3a7a8f 100%)',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 600,
    padding: '14px 40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(75, 140, 168, 0.3)',
    '&:hover': {
      background: 'linear-gradient(135deg, #3a7a8f 0%, #2d6a7f 100%)',
      boxShadow: '0 12px 32px rgba(75, 140, 168, 0.4)',
    },
  }

  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById('destinations-section');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const muiTheme = useTheme();

  return (
    <Box id="HeroSection" sx={heroSectionStyle}>

      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
            fontWeight: 700, fontFamily: "'Montserrat', 'Poppins', sans-serif",
            lineHeight: 1.2, mb: 3, color: 'var(--text-primary)',
          }}
        >
          Travel Smarter. <br />
          Backpack lighter.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.125rem' }, lineHeight: 1.6,
            mb: 4, color: 'var(--text-secondary)', maxWidth: '600px',
          }}
        >
          Plan stays, food and unforgettable experience that
          match your budget and vibe – powered by AI and
          real backpacker journeys.
        </Typography>

        <Button variant="contained" size="large"
          onClick={scrollToDestinations}
          sx={heroSectionButtonStyle}
        >
          Start My Journey
        </Button>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/logo.png"
          alt="Backpackers Logo"
          sx={{
            maxWidth: { xs: '300px', md: '400px', lg: '500px' },
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.2))',
            animation: 'float 3s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        />
      </Box>
    </Box>
  );
}
