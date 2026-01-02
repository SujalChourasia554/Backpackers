import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { Button, Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
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
    background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.7) 0%, rgba(210, 105, 30, 0.5) 100%)',
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
    boxShadow: '0 8px 30px rgba(139, 69, 19, 0.2)',
  },
});

export default function Cultural() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const culturalDestinations = [
    {
      name: "Hampi",
      location: "Karnataka, India",
      description: "Ancient ruins and UNESCO World Heritage Site",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Varanasi",
      location: "Uttar Pradesh, India",
      description: "Spiritual capital and oldest living city",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Jaipur",
      location: "Rajasthan, India",
      description: "Pink City with royal palaces and forts",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Khajuraho",
      location: "Madhya Pradesh, India",
      description: "Exquisite temple architecture and sculptures",
      image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Ajanta & Ellora",
      location: "Maharashtra, India",
      description: "Ancient rock-cut caves and Buddhist art",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Mysore",
      location: "Karnataka, India",
      description: "Royal heritage and magnificent palaces",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&h=600&fit=crop&q=80",
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <HeroSection
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop&q=80)'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', color: 'white' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '5rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            CULTURAL & HERITAGE
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
            Journey Through Time
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 4,
              opacity: 0.95,
            }}
          >
            Discover the rich tapestry of history and tradition
          </Typography>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: theme.colors.cultural.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: theme.colors.cultural.dark,
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            Explore Heritage
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
                color: theme.colors.cultural.primary,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Popular Cultural Destinations
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem'
              }}
            >
              Experience rich history and traditions around the world
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {culturalDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => router.push(`/package/${destination.name.toLowerCase().replace(/\s+/g, '-')}?category=cultural`)}
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index 
                      ? '0 20px 40px rgba(139, 69, 19, 0.3)' 
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
                      <TempleHinduIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
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
                        color: theme.colors.cultural.primary,
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
          background: `linear-gradient(135deg, ${theme.colors.cultural.primary} 0%, ${theme.colors.cultural.dark} 100%)`,
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
              Ready for Your Cultural Journey?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                fontSize: '1.1rem'
              }}
            >
              Book your dream heritage vacation today and create unforgettable memories
            </Typography>
            <Button 
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: theme.colors.cultural.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: theme.colors.cultural.accent,
                  color: theme.colors.cultural.dark,
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
              color: theme.colors.cultural.primary,
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
