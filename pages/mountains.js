import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { Button, Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LandscapeIcon from '@mui/icons-material/Landscape';
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
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, rgba(45, 80, 22, 0.7) 0%, rgba(74, 124, 44, 0.5) 100%)',
  },
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
    boxShadow: '0 8px 30px rgba(45, 80, 22, 0.2)',
  },
});

export default function Mountains() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const mountainDestinations = [
    {
      name: "Manali",
      location: "Himachal Pradesh, India",
      description: "Snow-capped peaks and adventure sports paradise",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Leh-Ladakh",
      location: "Jammu & Kashmir, India",
      description: "High altitude desert with breathtaking landscapes",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Kasol",
      location: "Himachal Pradesh, India",
      description: "Mini Israel of India with serene mountain vibes",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Shimla",
      location: "Himachal Pradesh, India",
      description: "Colonial charm meets Himalayan beauty",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Darjeeling",
      location: "West Bengal, India",
      description: "Tea gardens and stunning sunrise views",
      image: "https://images.unsplash.com/photo-1563979303-5c5eeea0e5e5?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Mussoorie",
      location: "Uttarakhand, India",
      description: "Queen of Hills with colonial architecture",
      image: "https://images.unsplash.com/photo-1571211905393-4c8e0f3a7e8f?w=800&h=600&fit=crop&q=80",
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <HeroSection
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80)'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            MOUNTAINS
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 500,
              mb: 1,
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            Majestic Peaks Await
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 4,
              opacity: 0.95,
            }}
          >
            Conquer the heights and find your peace
          </Typography>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: theme.colors.mountains.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: theme.colors.mountains.dark,
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            Explore Mountains
          </Button>
        </Box>
      </HeroSection>

      <Box sx={{ py: 8, background: 'var(--background)' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h3" 
              sx={{
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: 700,
                color: theme.colors.mountains.primary,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Popular Mountain Destinations
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem'
              }}
            >
              Explore majestic peaks and scenic trails around the world
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {mountainDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => router.push(`/package/${destination.name.toLowerCase().replace(/\s+/g, '-')}?category=mountains`)}
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index 
                      ? '0 20px 40px rgba(45, 80, 22, 0.3)' 
                      : '0 4px 20px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    background: 'var(--card-bg)',
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 250,
                        backgroundImage: `url(${destination.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.3s ease',
                        transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)',
                        display: 'flex',
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        pb: 2,
                      }}
                    >
                      <LandscapeIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
                    </Box>
                  </Box>
                  <CardContent sx={{ padding: '1.5rem' }}>
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        mb: 0.5,
                        color: 'var(--text-primary)',
                        fontFamily: theme.typography.fontFamily.primary
                      }}
                    >
                      {destination.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: theme.colors.mountains.primary,
                        mb: 1,
                        fontWeight: 500
                      }}
                    >
                      📍 {destination.location}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6
                      }}
                    >
                      {destination.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          py: 8,
          background: `linear-gradient(135deg, ${theme.colors.mountains.primary} 0%, ${theme.colors.mountains.dark} 100%)`,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography 
              variant="h3" 
              sx={{
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: 700,
                color: 'white',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Ready for Your Mountain Adventure?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                fontSize: '1.1rem'
              }}
            >
              Book your dream mountain vacation today and create unforgettable memories
            </Typography>
            <Button 
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: theme.colors.mountains.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: theme.colors.mountains.accent,
                  color: theme.colors.mountains.dark,
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 8, background: 'var(--background)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            sx={{
              fontFamily: theme.typography.fontFamily.primary,
              fontWeight: 700,
              color: theme.colors.mountains.primary,
              textAlign: 'center',
              mb: 6,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            Reasons for Choosing Us
          </Typography>
          <Grid container spacing={4}>
            {[
              { icon: '🤝', title: 'Trust', description: 'Verified reviews from real travelers' },
              { icon: '💪', title: 'Support', description: '24/7 customer service for your journey' },
              { icon: '🎯', title: 'One-stop Travel', description: 'Everything you need in one place' }
            ].map((reason, index) => (
              <Grid item xs={12} md={4} key={index}>
                <ReasonCard>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>{reason.icon}</Typography>
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: 'var(--text-primary)'
                    }}
                  >
                    {reason.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {reason.description}
                  </Typography>
                </ReasonCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
