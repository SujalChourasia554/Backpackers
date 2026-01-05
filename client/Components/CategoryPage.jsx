import { useState, useEffect } from 'react';
import Navbar from "@/Components/Navbar";
import DestinationCard from "@/Components/DestinationCard";
import { Button, Typography, Box, Container, Grid, useTheme, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import theme from '@/src/theme';
import { fetchDestinationsByCategory } from '@/utils/api';

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
  marginTop: '-60px',
  paddingTop: '140px',
});

// Helper: Transform destination data
const transformDestination = (dest) => {
  // Helper to safely convert location to string
  const getLocationString = (loc) => {
    if (!loc) return `${dest.name}, ${dest.state || 'India'}`;
    if (typeof loc === 'string') return loc;
    if (typeof loc === 'object' && loc !== null && !Array.isArray(loc)) {
      // It's an object, use fallback
      return `${dest.name}, ${dest.state || 'India'}`;
    }
    return String(loc);
  };

  return {
    _id: dest._id,
    name: dest.name,
    location: getLocationString(dest.location),
    description: dest.description || `Discover the amazing ${dest.name}`,
    image: dest.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
    rating: dest.rating,
    totalReviews: dest.totalReviews,
    budgetPerDay: dest.budgetPerDay,
    state: dest.state,
    category: dest.category,
  };
};

export default function CategoryPage({ category, config, icon: Icon }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(20);
  const muiTheme = useTheme();
  const colors = theme.colors[category];

  const scrollToDestinations = () => {
    document.getElementById('destinations-section')?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  useEffect(() => {
    const loadDestinations = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDestinationsByCategory(category, 100);
        setDestinations(data.map(transformDestination));
      } catch (error) {
        console.error('Error loading destinations:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadDestinations();
  }, [category]);

  const displayedDestinations = destinations.slice(0, displayCount);
  const hasMore = displayCount < destinations.length;

  const heroOverlayStyles = {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(135deg, ${colors.primary}B3 0%, ${colors.secondary}80 100%)`,
  };

  const buttonStyles = {
    backgroundColor: colors.primary,
    padding: '12px 32px',
    fontSize: '1rem',
    fontWeight: 600,
    borderRadius: '50px',
    textTransform: 'none',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    '&:hover': { 
      backgroundColor: colors.dark, 
      transform: 'scale(1.05)', 
      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)' 
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: muiTheme.palette.background.default }}>
      <Navbar />

      <HeroSection sx={{ backgroundImage: `url(${config.heroImage})`, '&::before': heroOverlayStyles }}>
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
          <Button variant="contained" endIcon={<ArrowForwardIcon />} onClick={scrollToDestinations} sx={buttonStyles}>
            {config.buttonText}
          </Button>
        </Box>
      </HeroSection>

      <Box id="destinations-section" sx={{ py: 8, background: muiTheme.palette.background.default }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" sx={{ fontFamily: theme.typography.fontFamily.primary, fontWeight: 700, color: colors.primary, mb: 2, fontSize: { xs: '2rem', md: '2.5rem' } }}>
              {config.sectionTitle}
            </Typography>
            <Typography variant="body1" sx={{ color: muiTheme.palette.text.secondary, fontSize: '1.1rem', mb: 2 }}>
              {config.sectionDescription}
            </Typography>
          </Box>

          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
              <CircularProgress sx={{ color: colors.primary }} size={60} />
            </Box>
          ) : displayedDestinations.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h5" sx={{ color: muiTheme.palette.text.secondary }}>
                No destinations found
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={4}>
                {displayedDestinations.map((destination, index) => (
                  <Grid item xs={12} sm={6} md={4} key={destination._id || index}>
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

              {hasMore && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => setDisplayCount(prev => prev + 20)}
                    sx={{
                      backgroundColor: colors.primary,
                      color: 'white',
                      padding: '14px 48px',
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      boxShadow: `0 8px 24px ${colors.primary}40`,
                      '&:hover': {
                        backgroundColor: colors.primary,
                        filter: 'brightness(0.9)',
                        boxShadow: `0 12px 32px ${colors.primary}60`,
                      }
                    }}
                  >
                    Load More
                  </Button>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
