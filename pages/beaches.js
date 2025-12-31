import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { Button, Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import WavesIcon from '@mui/icons-material/Waves';
import styles from '@/styles/Beaches.module.css';
import theme from '@/src/theme';

export default function Beaches() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const beachDestinations = [
    {
      name: "Goa Beaches",
      location: "Goa, India",
      description: "Golden sands, vibrant nightlife, and Portuguese heritage",
      price: "₹1500",
      image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop&q=80",
      rating: 4.8
    },
    {
      name: "Maldives",
      location: "Indian Ocean",
      description: "Crystal clear waters and luxury overwater bungalows",
      price: "₹8500",
      image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&q=80",
      rating: 4.9
    },
    {
      name: "Andaman Islands",
      location: "Bay of Bengal",
      description: "Pristine beaches and incredible marine life",
      price: "₹3500",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80",
      rating: 4.7
    },
    {
      name: "Kerala Beaches",
      location: "Kerala, India",
      description: "Serene backwaters meet the Arabian Sea",
      price: "₹2000",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop&q=80",
      rating: 4.6
    },
    {
      name: "Phuket",
      location: "Thailand",
      description: "Tropical paradise with vibrant culture",
      price: "₹4500",
      image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop&q=80",
      rating: 4.8
    },
    {
      name: "Bali Beaches",
      location: "Indonesia",
      description: "Surf, sunsets, and spiritual vibes",
      price: "₹5000",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop&q=80",
      rating: 4.9
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {/* Hero Section */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80)'
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>BEACH</h1>
          <p className={styles.heroSubtitle}>
            The Wonders Of Nature
          </p>
          <p className={styles.heroDescription}>
            Enjoy the beauty of world
          </p>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className={styles.heroButton}
            sx={{
              backgroundColor: theme.colors.beaches.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.colors.beaches.dark,
                transform: 'scale(1.05)',
              }
            }}
          >
            Explore Beaches
          </Button>
        </div>
      </section>

      {/* Destinations Grid Section */}
      <section className={styles.destinationsSection}>
        <Container maxWidth="xl">
          <div className={styles.sectionHeader}>
            <Typography 
              variant="h3" 
              className={styles.sectionTitle}
              sx={{
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: theme.typography.fontWeight.bold,
                color: theme.colors.beaches.primary,
                marginBottom: '1rem'
              }}
            >
              Popular Beach Destinations
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.sectionSubtitle}
              sx={{
                color: theme.colors.text.secondary,
                fontSize: '1.1rem'
              }}
            >
              Discover pristine beaches and coastal paradise around the world
            </Typography>
          </div>

          <Grid container spacing={4} className={styles.destinationsGrid}>
            {beachDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  className={styles.destinationCard}
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
                  }}
                >
                  <div className={styles.cardImageWrapper}>
                    <CardMedia
                      component="div"
                      className={styles.cardImage}
                      sx={{
                        height: 250,
                        backgroundImage: `url(${destination.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        transition: 'transform 0.3s ease',
                        transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                      }}
                    />
                    <div className={styles.cardOverlay}>
                      <WavesIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
                    </div>
                  </div>
                  <CardContent sx={{ padding: '1.5rem' }}>
                    <Typography 
                      variant="h5" 
                      component="h3"
                      sx={{
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.primary
                      }}
                    >
                      {destination.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: theme.colors.beaches.primary,
                        marginBottom: '0.75rem',
                        fontWeight: 500
                      }}
                    >
                      📍 {destination.location}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: theme.colors.text.secondary,
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
      </section>

      {/* Book Now Section */}
      <section className={styles.bookSection}>
        <Container maxWidth="md">
          <Box className={styles.bookContainer}>
            <Typography 
              variant="h3" 
              className={styles.bookTitle}
              sx={{
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: theme.typography.fontWeight.bold,
                color: 'white',
                marginBottom: '1rem'
              }}
            >
              Ready for Your Beach Adventure?
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.bookDescription}
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '2rem',
                fontSize: '1.1rem'
              }}
            >
              Book your dream beach vacation today and create unforgettable memories
            </Typography>
            <Button 
              variant="contained"
              size="large"
              className={styles.bookButton}
              sx={{
                backgroundColor: 'white',
                color: theme.colors.beaches.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.colors.beaches.accent,
                  color: theme.colors.beaches.dark,
                  transform: 'scale(1.05)',
                }
              }}
            >
              Book Now
            </Button>
          </Box>
        </Container>
      </section>

      {/* Reasons Section */}
      <section className={styles.reasonsSection}>
        <Container maxWidth="lg">
          <Typography 
            variant="h3" 
            className={styles.reasonsTitle}
            sx={{
              fontFamily: theme.typography.fontFamily.primary,
              fontWeight: theme.typography.fontWeight.bold,
              color: theme.colors.beaches.primary,
              textAlign: 'center',
              marginBottom: '3rem'
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
                <Box className={styles.reasonCard}>
                  <div className={styles.reasonIcon}>{reason.icon}</div>
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700,
                      marginBottom: '0.5rem',
                      color: theme.colors.text.primary
                    }}
                  >
                    {reason.title}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{
                      color: theme.colors.text.secondary
                    }}
                  >
                    {reason.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>
    </div>
  );
}

