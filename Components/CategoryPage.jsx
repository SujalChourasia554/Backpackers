import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import DestinationCard from "@/Components/DestinationCard";
import { Button, Typography, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '@/src/theme';

const HeroSection = styled(Box)({
  position: 'relative',
  height: '70vh',
  minHeight: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
});

const ReasonCard = styled(Box)({
  textAlign: 'center',
  padding: '2rem',
  borderRadius: '16px',
  background: 'var(--card-bg)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
  },
});

const reasons = [
  { icon: '🤝', title: 'Trust', description: 'Verified reviews from real travelers' },
  { icon: '💪', title: 'Support', description: '24/7 customer service for your journey' },
  { icon: '🎯', title: 'One-stop Travel', description: 'Everything you need in one place' }
];

export default function CategoryPage({ category, config, destinations, icon: Icon }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();
  const colors = theme.colors[category];

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
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

      <Box sx={{ py: 8, background: 'var(--background)' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily.primary, fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {config.sectionTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
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

      <Box sx={{ py: 8, background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.dark} 100%)` }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily.primary, fontWeight: 700, color: 'white', mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {config.ctaTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: 'rgba(255, 255, 255, 0.9)', mb: 4, fontSize: '1.1rem' }}>
              {config.ctaDescription}
            </Typography>
            <Button 
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: colors.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': { backgroundColor: colors.accent, color: colors.dark, transform: 'scale(1.05)', boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)' }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 8, background: 'var(--background)' }}>
        <Container maxWidth="lg">
          <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily.primary, fontWeight: 700, color: colors.primary, textAlign: 'center', mb: 6, fontSize: { xs: '2rem', md: '2.5rem' } }}>
            Reasons for Choosing Us
          </Typography>
          <Grid container spacing={4}>
            {reasons.map((reason, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ReasonCard>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>{reason.icon}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'var(--text-primary)' }}>{reason.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>{reason.description}</Typography>
                </ReasonCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

