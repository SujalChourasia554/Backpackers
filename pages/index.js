import Navbar from "@/Components/Navbar";
import Link from 'next/link';
import { Box, Container, Typography, Button, Grid, Card, CardMedia, CardContent, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import HeroSection from "@/Components/HeroSection";


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
  const categories = [
    {
      title: "Beaches",
      description: "Discover pristine beaches and coastal paradise",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
      link: "/beaches",
      color: "#00a8cc"
    },
    {
      title: "Mountains",
      description: "Explore majestic peaks and scenic trails",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
      link: "/mountains",
      color: "#2d5016"
    },
    {
      title: "Cultural & Heritage",
      description: "Experience rich history and traditions",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
      link: "/cultural",
      color: "#8b4513"
    },
  ];

  const dayPlanData = [
    "✔ Check in The Hostel",
    "✔ Visit the Waterfall",
    "✔ Trek the Mountains"
  ];


  // ============================================================================
  // THIS SECTION IS FOR STYLING

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* ----------- THIS IS HERO SECTION ------------------ */}
        <HeroSection></HeroSection>

        <Box id="destinations-section" sx={{ py: 6, scrollMarginTop: '100px' }}>
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              mb: 5,
              color: 'var(--text-primary)',
            }}
          >
            Choose Your <Box component="span" sx={{ color: '#4b8ca8' }}>Destination</Box>
          </Typography>

          <Grid container spacing={4}>
            {categories.map((category) => (
              <Grid item xs={12} sm={6} md={4} key={category.title}>
                <Link href={category.link} passHref style={{ textDecoration: 'none' }}>
                  <CategoryCard >
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
                        sx={{ mb: 2, color: 'var(--text-secondary)' }}
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
                  color: 'var(--text-primary)',
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
                  color: 'var(--text-secondary)',
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


                {/* THIS IS THE SECTION WHICH HANDLE DAY PLAN DATA */}
                <Box component="ul" sx={{ listStyle: 'none', p: 0, mb: 3 }}>
                  {dayPlanData.map((item, index) => (
                    <Typography component="li" key={index} sx={{ mb: 1.5, fontSize: '1.1rem' }}>
                      {item}
                    </Typography>
                  ))}
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
