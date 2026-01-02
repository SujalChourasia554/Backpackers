import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { Button, Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WavesIcon from '@mui/icons-material/Waves';
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
    background: 'linear-gradient(135deg, rgba(0, 168, 204, 0.7) 0%, rgba(13, 202, 240, 0.5) 100%)',
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
    boxShadow: '0 8px 30px rgba(0, 168, 204, 0.2)',
  },
});

export default function Beaches() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const beachDestinations = [
    {
      name: "Goa Beaches",
      location: "Goa, India",
      description: "Golden sands, vibrant nightlife, and Portuguese heritage",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Maldives",
      location: "Indian Ocean",
      description: "Crystal clear waters and luxury overwater bungalows",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Andaman Islands",
      location: "Bay of Bengal",
      description: "Pristine beaches and incredible marine life",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Kerala Beaches",
      location: "Kerala, India",
      description: "Serene backwaters meet the Arabian Sea",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Phuket",
      location: "Thailand",
      description: "Tropical paradise with vibrant culture",
      image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop&q=80",
    },
    {
      name: "Bali Beaches",
      location: "Indonesia",
      description: "Surf, sunsets, and spiritual vibes",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop&q=80",
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <HeroSection
        sx={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80)'
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
            BEACH
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
            The Wonders Of Nature
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              mb: 4,
              opacity: 0.95,
            }}
          >
            Enjoy the beauty of world
          </Typography>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: theme.colors.beaches.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              '&:hover': {
                backgroundColor: theme.colors.beaches.dark,
                transform: 'scale(1.05)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            Explore Beaches
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
                color: theme.colors.beaches.primary,
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Popular Beach Destinations
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'var(--text-secondary)',
                fontSize: '1.1rem'
              }}
            >
              Discover pristine beaches and coastal paradise around the world
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {beachDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => router.push(`/package/${destination.name.toLowerCase().replace(/\s+/g, '-')}?category=beaches`)}
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index 
                      ? '0 20px 40px rgba(0, 168, 204, 0.3)' 
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
                      <WavesIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
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
                        color: theme.colors.beaches.primary,
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
          background: `linear-gradient(135deg, ${theme.colors.beaches.primary} 0%, ${theme.colors.beaches.dark} 100%)`,
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
              Ready for Your Beach Adventure?
            </Typography>
            <Typography 
              variant="body1" 
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 4,
                fontSize: '1.1rem'
              }}
            >
              Book your dream beach vacation today and create unforgettable memories
            </Typography>
            <Button 
              variant="contained"
              size="large"
              sx={{
                backgroundColor: 'white',
                color: theme.colors.beaches.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                '&:hover': {
                  backgroundColor: theme.colors.beaches.accent,
                  color: theme.colors.beaches.dark,
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
              color: theme.colors.beaches.primary,
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
