import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Container, 
  Grid,
  TextField,
  Slider,
  FormControl,
  Select,
  MenuItem,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import theme from '@/src/theme';

export default function PackagePage() {
  const router = useRouter();
  const { destination, category } = router.query;
  const [budget, setBudget] = useState(25000);
  const [sortBy, setSortBy] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Wait for router to be ready
  useEffect(() => {
    if (router.isReady) {
      setIsLoading(false);
      // Validate destination
      if (!destination) {
        setError('Destination not specified');
      }
    }
  }, [router.isReady, destination]);

  // Get destination name formatted with validation
  const getDestinationName = () => {
    if (!destination) return 'Destination';
    try {
      return destination.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    } catch (e) {
      console.error('Error formatting destination name:', e);
      return 'Destination';
    }
  };

  const destinationName = getDestinationName();

  // Get theme colors based on category with fallback
  const getThemeColors = () => {
    const categoryColors = {
      beaches: {
        primary: theme.colors.beaches.primary,
        dark: theme.colors.beaches.dark,
        light: theme.colors.beaches.light,
        accent: theme.colors.beaches.accent,
      },
      mountains: {
        primary: theme.colors.mountains.primary,
        dark: theme.colors.mountains.dark,
        light: theme.colors.mountains.light,
        accent: theme.colors.mountains.accent,
      },
      cultural: {
        primary: theme.colors.cultural.primary,
        dark: theme.colors.cultural.dark,
        light: theme.colors.cultural.light,
        accent: theme.colors.cultural.accent,
      }
    };

    return categoryColors[category] || {
      primary: theme.colors.brand.primary,
      dark: theme.colors.brand.primary,
      light: '#e0f7fa',
      accent: '#80deea',
    };
  };

  const themeColors = getThemeColors();

  // Get destination-specific images with fallback
  const getPackageImages = () => {
    const imageMap = {
      beaches: {
        budget: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80',
        premium: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&q=80',
        luxury: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop&q=80'
      },
      mountains: {
        budget: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
        premium: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
        luxury: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&q=80'
      },
      cultural: {
        budget: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80',
        premium: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop&q=80',
        luxury: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop&q=80'
      }
    };
    return imageMap[category] || imageMap.beaches;
  };

  const packageImages = getPackageImages();

  // Get hero image with fallback
  const getHeroImage = () => {
    const heroImages = {
      beaches: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80',
      mountains: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
      cultural: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop&q=80'
    };
    return heroImages[category] || heroImages.beaches;
  };

  // Sample packages data
  const packages = [
    {
      title: `${destinationName} Budget Trip`,
      duration: '3 Days',
      price: 8000,
      image: packageImages.budget,
      features: ['Budget Hotels', 'Local Transport', 'Basic Meals', 'Sightseeing']
    },
    {
      title: `${destinationName} Standard Package`,
      duration: '4 Days',
      price: 12000,
      image: packageImages.premium,
      features: ['3-Star Hotels', 'AC Transport', 'Breakfast & Dinner', 'City Tours']
    },
    {
      title: `${destinationName} Premium Trip`,
      duration: '5 Days',
      price: 15000,
      image: packageImages.premium,
      features: ['Premium Hotels', 'Private Cab', 'All Meals', 'Guided Tours', 'Adventure Activities']
    },
    {
      title: `${destinationName} Deluxe Package`,
      duration: '6 Days',
      price: 20000,
      image: packageImages.luxury,
      features: ['4-Star Hotels', 'Luxury Car', 'Fine Dining', 'Exclusive Tours', 'Spa Access']
    },
    {
      title: `${destinationName} Luxury Experience`,
      duration: '7 Days',
      price: 25000,
      image: packageImages.luxury,
      features: ['5-Star Hotels', 'Luxury Transport', 'Fine Dining', 'Spa & Wellness', 'Exclusive Experiences']
    },
    {
      title: `${destinationName} Ultimate Escape`,
      duration: '10 Days',
      price: 35000,
      image: packageImages.luxury,
      features: ['Ultra-Luxury Resorts', 'Private Chauffeur', 'Gourmet Meals', 'VIP Experiences', 'Helicopter Tours']
    }
  ];

  // Handle budget change with validation
  const handleBudgetChange = (value) => {
    const numValue = Number(value);
    if (numValue < 0) {
      setBudget(0);
    } else if (numValue > 100000) {
      setBudget(100000);
    } else {
      setBudget(numValue);
    }
  };

  const filteredPackages = packages.filter(pkg => pkg.price <= budget);

  // Handle package click with proper mapping
  const handlePackageClick = () => {
    const packageMap = {
      'goa': 'goa',
      'goa beaches': 'goa',
      'manali': 'manali',
      'hampi': 'hampi',
      'maldives': 'goa',
      'andaman islands': 'goa',
      'kerala beaches': 'goa',
      'phuket': 'goa',
      'bali beaches': 'goa',
      'leh-ladakh': 'manali',
      'kasol': 'manali',
      'shimla': 'manali',
      'darjeeling': 'manali',
      'mussoorie': 'manali',
      'varanasi': 'hampi',
      'jaipur': 'hampi',
      'khajuraho': 'hampi',
      'ajanta & ellora': 'hampi',
      'mysore': 'hampi'
    };
    
    const packageId = packageMap[destinationName.toLowerCase()];
    
    if (packageId) {
      router.push(`/${packageId}`);
    } else {
      // Fallback to goa with notification
      console.warn(`No package found for ${destinationName}, redirecting to Goa`);
      router.push('/goa');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)' }}>
        <Navbar />
        <Box sx={{ textAlign: 'center', mt: 10 }}>
          <CircularProgress size={60} sx={{ color: theme.colors.brand.primary }} />
          <Typography sx={{ mt: 2, color: theme.colors.text.primary }}>Loading packages...</Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 10 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={() => router.push('/')} sx={{ backgroundColor: theme.colors.brand.primary }}>
            Go to Home
          </Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <Box 
        sx={{
          position: 'relative',
          height: '60vh',
          minHeight: '400px',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          backgroundImage: `url(${getHeroImage()})`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to bottom, ${themeColors.primary}80, ${themeColors.dark}CC)`,
          },
        }}
      >
        <Box 
          sx={{
            position: 'relative',
            zIndex: 1,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography 
            variant="h1"
            sx={{
              fontFamily: theme.typography.fontFamily.primary,
              fontWeight: 800,
              color: 'white',
              fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' },
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
              marginBottom: '1rem',
              letterSpacing: '0.1em'
            }}
          >
            {destinationName}
          </Typography>
          <Typography 
            variant="h5" 
            sx={{
              color: 'rgba(255, 255, 255, 0.95)',
              marginBottom: '2rem',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
            }}
          >
            Discover Amazing Packages
          </Typography>
        </Box>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ marginTop: '-80px', position: 'relative', zIndex: 10 }}>
        <Grid container spacing={4}>
          {/* Sidebar - Filters */}
          <Grid item xs={12} md={3}>
            <Card 
              sx={{ 
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                position: 'sticky',
                top: '100px'
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  marginBottom: '1.5rem',
                  fontWeight: 700,
                  color: themeColors.primary
                }}
              >
                Free Cancellation
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginBottom: '2rem',
                  color: theme.colors.text.muted
                }}
              >
                Book your trip worry-free!
              </Typography>

              <Typography 
                variant="h6" 
                sx={{ 
                  marginBottom: '1rem',
                  fontWeight: 700,
                  color: theme.colors.text.primary
                }}
              >
                Budget
              </Typography>
              <Box sx={{ padding: '0 0.5rem', marginBottom: '2rem' }}>
                <Slider
                  value={budget}
                  onChange={(e, newValue) => handleBudgetChange(newValue)}
                  min={8000}
                  max={40000}
                  step={1000}
                  valueLabelDisplay="auto"
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`}
                  sx={{
                    color: themeColors.primary,
                    '& .MuiSlider-thumb': {
                      backgroundColor: themeColors.primary,
                    }
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                  <Typography variant="body2" sx={{ color: theme.colors.text.muted }}>₹8,000</Typography>
                  <Typography variant="body2" sx={{ color: theme.colors.text.muted }}>₹40,000</Typography>
                </Box>
              </Box>

              <Typography 
                variant="h6" 
                sx={{ 
                  marginBottom: '1rem',
                  fontWeight: 700,
                  color: theme.colors.text.primary
                }}
              >
                Sort By
              </Typography>
              <FormControl fullWidth sx={{ marginBottom: '1rem' }}>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{
                    borderRadius: '12px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: themeColors.primary,
                    }
                  }}
                >
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="price-low">Price (Low to High)</MenuItem>
                  <MenuItem value="price-high">Price (High to Low)</MenuItem>
                  <MenuItem value="duration">Duration</MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          <Grid item xs={12} md={9}>
            <Card 
              sx={{ 
                padding: '2rem',
                marginBottom: '3rem',
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                background: `linear-gradient(135deg, ${themeColors.light} 0%, white 100%)`
              }}
            >
              <Typography 
                variant="h4" 
                sx={{ 
                  marginBottom: '1.5rem',
                  fontWeight: 700,
                  color: themeColors.primary,
                  textAlign: 'center'
                }}
              >
                Enter Your Budget
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                <TextField
                  fullWidth
                  type="number"
                  value={budget}
                  onChange={(e) => handleBudgetChange(e.target.value)}
                  placeholder="25,000"
                  inputProps={{ min: 0, max: 100000 }}
                  InputProps={{
                    startAdornment: <Typography sx={{ marginRight: 1, color: theme.colors.text.primary, fontWeight: 600 }}>₹</Typography>,
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      fontSize: '1.25rem',
                      fontWeight: 600
                    }
                  }}
                />
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: themeColors.primary,
                    padding: '14px 32px',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: themeColors.dark,
                    }
                  }}
                >
                  Search Packages
                </Button>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  marginTop: '1rem',
                  textAlign: 'center',
                  color: theme.colors.text.primary,
                  fontSize: '0.95rem',
                  fontWeight: 500
                }}
              >
                Based on your budget, we suggest these {destinationName} packages.
              </Typography>
            </Card>

            <Grid container spacing={2.5}>
              {filteredPackages.map((pkg, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card 
                    onClick={handlePackageClick}
                    sx={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      height: '100%',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: `0 16px 32px ${themeColors.primary}40`
                      }
                    }}
                  >
                    <Box
                      sx={{
                        height: 180,
                        backgroundImage: `url(${pkg.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <CardContent sx={{ padding: '1.25rem' }}>
                      <Typography 
                        variant="h6" 
                        sx={{
                          fontWeight: 700,
                          marginBottom: '0.4rem',
                          color: theme.colors.text.primary,
                          fontSize: '1.1rem'
                        }}
                      >
                        {pkg.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{
                          color: themeColors.primary,
                          marginBottom: '0.75rem',
                          fontWeight: 600
                        }}
                      >
                        {pkg.duration}
                      </Typography>
                      <Box sx={{ marginBottom: '1rem' }}>
                        {pkg.features.slice(0, 3).map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            sx={{
                              margin: '0.2rem',
                              backgroundColor: `${themeColors.primary}15`,
                              color: themeColors.primary,
                              fontWeight: 500,
                              fontSize: '0.7rem',
                              height: '22px'
                            }}
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography 
                          variant="h5" 
                          sx={{
                            fontWeight: 700,
                            color: themeColors.primary,
                            fontSize: '1.5rem'
                          }}
                        >
                          ₹{pkg.price.toLocaleString()}
                        </Typography>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            backgroundColor: themeColors.primary,
                            borderRadius: '10px',
                            padding: '6px 16px',
                            fontSize: '0.85rem',
                            '&:hover': {
                              backgroundColor: themeColors.dark,
                            }
                          }}
                        >
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>

            {filteredPackages.length === 0 && (
              <Box 
                sx={{ 
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  backgroundColor: theme.colors.background.secondary,
                  borderRadius: '20px'
                }}
              >
                <Typography variant="h5" sx={{ marginBottom: '1rem', color: theme.colors.text.primary, fontWeight: 600 }}>
                  No packages found within your budget
                </Typography>
                <Typography variant="body1" sx={{ color: theme.colors.text.muted, mb: 2 }}>
                  Try increasing your budget to ₹{Math.min(...packages.map(p => p.price)).toLocaleString()} or more
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => handleBudgetChange(8000)}
                  sx={{
                    backgroundColor: themeColors.primary,
                    '&:hover': { backgroundColor: themeColors.dark }
                  }}
                >
                  Reset Budget
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
