import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { Button, Card, CardContent, CardMedia, Typography, Box, Container, Grid } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import styles from '@/styles/Cultural.module.css';
import theme from '@/src/theme';

export default function Cultural() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const router = useRouter();

  const culturalDestinations = [
    {
      name: "Jaipur",
      location: "Rajasthan, India",
      description: "Pink City with magnificent forts and palaces",
      price: "₹2500",
      image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop&q=80",
      rating: 4.8
    },
    {
      name: "Varanasi",
      location: "Uttar Pradesh, India",
      description: "Ancient spiritual city on the banks of Ganges",
      price: "₹2000",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop&q=80",
      rating: 4.9
    },
    {
      name: "Hampi",
      location: "Karnataka, India",
      description: "UNESCO World Heritage Site with ancient ruins",
      price: "₹1800",
      image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop&q=80",
      rating: 4.8
    },
    {
      name: "Agra",
      location: "Uttar Pradesh, India",
      description: "Home to the magnificent Taj Mahal",
      price: "₹2200",
      image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80",
      rating: 4.9
    },
    {
      name: "Mysore",
      location: "Karnataka, India",
      description: "City of Palaces with rich cultural heritage",
      price: "₹2100",
      image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&h=600&fit=crop&q=80",
      rating: 4.7
    },
    {
      name: "Udaipur",
      location: "Rajasthan, India",
      description: "City of Lakes with romantic palaces",
      price: "₹2600",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop&q=80",
      rating: 4.8
    }
  ];

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {/* Hero Section */}
      <section 
        className={styles.heroSection}
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop&q=80)'
        }}
      >
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>CULTURAL & HERITAGE</h1>
          <p className={styles.heroSubtitle}>
            Journey Through Time
          </p>
          <p className={styles.heroDescription}>
            Experience the richness of history and traditions
          </p>
          <Button 
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            className={styles.heroButton}
            sx={{
              backgroundColor: theme.colors.cultural.primary,
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '50px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.colors.cultural.dark,
                transform: 'scale(1.05)',
              }
            }}
          >
            Explore Heritage
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
                fontWeight: 700,
                color: theme.colors.cultural.primary,
                marginBottom: '1rem'
              }}
            >
              Popular Cultural & Heritage Sites
            </Typography>
            <Typography 
              variant="body1" 
              className={styles.sectionSubtitle}
              sx={{
                color: theme.colors.text.secondary,
                fontSize: '1.1rem'
              }}
            >
              Discover ancient monuments, temples, and architectural marvels
            </Typography>
          </div>

          <Grid container spacing={4} className={styles.destinationsGrid}>
            {culturalDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  className={styles.destinationCard}
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
                      <TempleHinduIcon sx={{ fontSize: 40, color: 'white', opacity: 0.9 }} />
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
                        color: theme.colors.cultural.primary,
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
                fontWeight: 700,
                color: 'white',
                marginBottom: '1rem'
              }}
            >
              Ready to Explore History?
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
              Book your cultural journey today and immerse yourself in rich traditions
            </Typography>
            <Button 
              variant="contained"
              size="large"
              className={styles.bookButton}
              sx={{
                backgroundColor: 'white',
                color: theme.colors.cultural.primary,
                padding: '14px 40px',
                fontSize: '1.1rem',
                fontWeight: 700,
                borderRadius: '50px',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: theme.colors.cultural.accent,
                  color: theme.colors.cultural.dark,
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
              fontWeight: 700,
              color: theme.colors.cultural.primary,
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

