import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import DestinationCard from "@/Components/DestinationCard";
import { Button, Typography, Box, Container, Grid, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '@/src/theme';

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '70vh',
  minHeight: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  marginTop: '-60px',
  paddingTop: '140px',
}));

export default function CategoryPage({ category, config, destinations, icon: Icon }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  const muiTheme = useTheme();
  const colors = theme.colors[category];

  return (
    <Box sx={{ minHeight: '100vh', background: muiTheme.palette.background.default }}>
      <Navbar />

      <HeroSection
        sx={{
          backgroundImage: `url(${config.heroImage})`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${colors.primary}B3 0%, ${colors.secondary}80 100%)`,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '5rem' }, fontWeight: 700, mb: 2, textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)' }}>
            {config.title}
          </Typography>
          <Typography variant="h4" sx={{ fontSize: { xs: '1.5rem', md: '2rem' }, fontWeight: 500, mb: 1, textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)' }}>
            {config.subtitle}
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.2rem' }, mb: 4, opacity: 0.95 }}>
            {config.description}
          </Typography>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: colors.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': { backgroundColor: colors.dark, transform: 'scale(1.05)', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)' }
            }}
          >
            {config.buttonText}
          </Button>
        </Box>
      </HeroSection>

      <Box sx={{ py: 8, background: muiTheme.palette.background.default }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily.primary, fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {config.sectionTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: muiTheme.palette.text.secondary, fontSize: '1.1rem' }}>
              {config.sectionDescription}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {destinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <DestinationCard
                  destination={destination}
                  category={category}
                  isHovered={hoveredCard === index}
                  onHover={(isHovered) => setHoveredCard(isHovered ? index : null)}
                  icon={Icon}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
