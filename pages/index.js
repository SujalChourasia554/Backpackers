import Navbar from "@/Components/Navbar";
import Link from 'next/link';
import { Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent, Chip, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3rem',
  padding: '4rem 0',
  minHeight: '80vh',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center',
    padding: '2rem 0',
    minHeight: 'auto',
  },
}));

const CategoryCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  },
}));

const PlanCard = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #4b8ca8 0%, #3a7a8f 100%)',
  borderRadius: '20px',
  padding: '2rem',
  color: 'white',
  boxShadow: '0 8px 24px rgba(75, 140, 168, 0.3)',
  [theme.breakpoints.down('md')]: {
    padding: '1.5rem',
  },
}));

export default function Home() {
  const theme = useTheme();
  const categories = [
    {
      title: "Beaches",
      description: "Discover pristine beaches and coastal paradise",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
      link: "/category/beaches",
      color: "#00a8cc"
    },
    {
      title: "Mountains",
      description: "Explore majestic peaks and scenic trails",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
      link: "/category/mountains",
      color: "#2d5016"
    },
    {
      title: "Cultural & Heritage",
      description: "Experience rich history and traditions",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
      link: "/category/cultural",
      color: "#8b4513"
    },
  ];

  const scrollToDestinations = () => {
    const destinationsSection = document.getElementById('destinations-section');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: theme.palette.background.default }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 4 }}>
        <HeroSection>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
                fontWeight: 700,
                fontFamily: "'Montserrat', 'Poppins', sans-serif",
                lineHeight: 1.2,
                mb: 3,
                color: theme.palette.text.primary,
              }}
            >
              Travel Smarter. <br />
              Backpack lighter.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                lineHeight: 1.6,
                mb: 4,
                color: theme.palette.text.secondary,
                maxWidth: '600px',
              }}
            >
              Plan stays, food and unforgettable experience that
              match your budget and vibe – powered by real
              backpacker journeys and travel expertise.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={scrollToDestinations}
              sx={{
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
              }}
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
        </HeroSection>

        <Box id="destinations-section" sx={{ py: 6, scrollMarginTop: '100px' }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 5,
              color: theme.palette.text.primary,
            }}
          >
            Choose Your <Box component="span" sx={{ color: '#4b8ca8' }}>Destination</Box>
          </Typography>

          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.title}>
                <Link href={category.link} passHref style={{ textDecoration: 'none' }}>
                  <CategoryCard>
                    <CardMedia
                      component="div"
                      sx={{
                        height: 250,
                        backgroundImage: `url(${category.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%)',
                        },
                      }}
                    >
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 20,
                          left: 20,
                          zIndex: 1,
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '1.5rem', md: '1.8rem' },
                          }}
                        >
                          {category.title}
                        </Typography>
                      </Box>
                    </CardMedia>
                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{ mb: 2, color: theme.palette.text.secondary }}
                      >
                        {category.description}
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          backgroundColor: category.color,
                          color: 'white',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: category.color,
                            filter: 'brightness(0.9)',
                          },
                        }}
                      >
                        Explore →
                      </Button>
                    </CardContent>
                  </CategoryCard>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ py: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip
                label="SMARTER TRAVEL"
                sx={{
                  backgroundColor: 'rgba(75, 140, 168, 0.1)',
                  color: '#4b8ca8',
                  fontWeight: 600,
                  mb: 2,
                }}
              />

              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 3,
                  color: theme.palette.text.primary,
                  lineHeight: 1.2,
                }}
              >
                Let Us Plan Your <br /> Dream Itinerary
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  mb: 4,
                  color: theme.palette.text.secondary,
                }}
              >
                Stop spending hours researching. Tell us your budget, dates and interest,
                and we'll generate a day-by-day plan with hotel booking and hidden places.
              </Typography>

              <Link href="/explore" passHref style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
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
                  }}
                >
                  Create My Trip
                </Button>
              </Link>
            </Grid>

            <Grid item xs={12} md={6}>
              <PlanCard>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 700, mb: 3 }}
                >
                  Your 3-Day Plan
                </Typography>

                <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 3 }}>
                  <Typography component="li" sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                    ✔ Check in The Hostel
                  </Typography>
                  <Typography component="li" sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                    ✔ Visit the Waterfall
                  </Typography>
                  <Typography component="li" sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                    ✔ Trek the Mountains
                  </Typography>
                </Box>

                <Chip
                  label="Budget Friendly"
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </PlanCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
