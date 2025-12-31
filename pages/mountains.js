import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { Button, Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LandscapeIcon from '@mui/icons-material/Landscape';
import styles from '@/styles/Mountains.module.css';
import theme from '@/src/theme';

export default function Mountains() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const mountainDestinations = [
    {
      name: "Manali",
      location: "Himachal Pradesh, India",
      description: "Snow-capped peaks and adventure sports paradise",
      price: "₹2000",
      image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop&q=80",
      rating: 4.8
    },
    {
      name: "Leh-Ladakh",
      location: "Jammu & Kashmir, India",
      description: "High altitude desert with breathtaking landscapes",
      price: "₹3500",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80",
      rating: 4.9
    },
    {
      name: "Kasol",
      location: "Himachal Pradesh, India",
      description: "Mini Israel of India with serene mountain vibes",
      price: "₹1800",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop&q=80",
      rating: 4.7
    },
    {
      name: "Shimla",
      location: "Himachal Pradesh, India",
      description: "Colonial charm meets Himalayan beauty",
      price: "₹2200",
      image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop&q=80",
      rating: 4.6
    },
    {
      name: "Darjeeling",
      location: "West Bengal, India",
      description: "Tea gardens and stunning sunrise views",
      price: "₹2500",
      image: "https://images.unsplash.com/photo-1563979303-5c5eeea0e5e5?w=800&h=600&fit=crop&q=80",
      rating: 4.7
    },
    {
      name: "Mussoorie",
      location: "Uttarakhand, India",
      description: "Queen of Hills with colonial architecture",
      price: "₹2300",
      image: "https://images.unsplash.com/photo-1571211905393-4c8e0f3a7e8f?w=800&h=600&fit=crop&q=80",
      rating: 4.6
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {/* Hero Section */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80)'
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>MOUNTAINS</h1>
          <p className={styles.heroSubtitle}>
            Majestic Peaks Await
          </p>
          <p className={styles.heroDescription}>
            Conquer the heights and find your peace
          </p>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className={styles.heroButton}
            sx={{
              backgroundColor: theme.colors.mountains.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.colors.mountains.dark,
                transform: 'scale(1.05)',
              }
            }}
          >
            Explore Mountains
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
                color: theme.colors.mountains.primary,
                marginBottom: '1rem'
              }}
            >
              Popular Mountain Destinations
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.sectionSubtitle}
              sx={{
                color: theme.colors.text.secondary,
                fontSize: '1.1rem'
              }}
            >
              Explore majestic peaks and scenic trails across the Himalayas
            </Typography>
          </div>

          <Grid container spacing={4} className={styles.destinationsGrid}>
            {mountainDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  className={styles.destinationCard}
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
                      <LandscapeIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
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
                        color: theme.colors.mountains.primary,
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
              Ready to Conquer the Peaks?
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
              Book your mountain adventure today and experience nature at its finest
            </Typography>
            <Button 
              variant="contained"
              size="large"
              className={styles.bookButton}
              sx={{
                backgroundColor: 'white',
                color: theme.colors.mountains.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.colors.mountains.accent,
                  color: 'white',
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
              color: theme.colors.mountains.primary,
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

