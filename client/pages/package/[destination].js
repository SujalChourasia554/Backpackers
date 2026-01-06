import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Typography, Button, Card, CardContent, TextField, Slider, FormControl, Select, MenuItem, Chip, CircularProgress, Alert, useTheme } from '@mui/material';
import Navbar from "@/Components/LandingPageComponents/Navbar";
import theme from '@/src/theme';
import { getThemeColors, getHeroImage } from '@/utils/packageHelpers';
import { fetchDestinationById, findDestinationByName, fetchPackagesByDestination } from '@/utils/api';

export default function PackagePage() {
  const router = useRouter();
  const muiTheme = useTheme();
  const { destination, category } = router.query;
  const [budget, setBudget] = useState(25000);
  const [sortBy, setSortBy] = useState('popularity');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinationData, setDestinationData] = useState(null);
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (!router.isReady || !destination) return;

    const loadDestinationAndPackages = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let dest = null;
        let destinationId = null;

        // Check if destination is a MongoDB ObjectId (24 hex characters)
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(destination);
        
        if (isObjectId) {
          // Fetch by ID
          dest = await fetchDestinationById(destination);
          destinationId = destination;
        } else {
          // Try to find by name
          const categoryMap = {
            'beaches': 'Beach',
            'beach': 'Beach',
            'mountains': 'Mountains & Outdoors',
            'mountain': 'Mountains & Outdoors',
            'cultural': 'Culture & Heritage',
            'culture': 'Culture & Heritage'
          };
          const normalizedCat = category?.toLowerCase();
          const backendCategory = normalizedCat ? (categoryMap[normalizedCat] || category) : null;
          dest = await findDestinationByName(destination.replace(/-/g, ' '), backendCategory);
          
          if (dest) {
            destinationId = dest._id;
          }
        }

        if (!dest || !destinationId) {
          setError('Destination not found');
          setIsLoading(false);
          return;
        }

        setDestinationData(dest);

        // Fetch packages for this destination
        const sortByMap = {
          'popularity': 'popularity',
          'price-low': 'price-asc',
          'price-high': 'price-desc',
          'rating': 'rating'
        };

        // Fetch packages without budget filter initially, we'll filter on frontend
        const packagesData = await fetchPackagesByDestination(destinationId, {
          sortBy: sortByMap[sortBy] || 'popularity'
        });

        setPackages(packagesData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading destination:', err);
        setError('Failed to load destination. Please try again.');
        setIsLoading(false);
      }
    };

    loadDestinationAndPackages();
  }, [router.isReady, destination, sortBy, category]);

  const handleBudgetChange = (value) => {
    const numValue = Number(value);
    setBudget(Math.max(0, Math.min(100000, numValue)));
  };

  const destinationName = destinationData?.name || destination?.replace(/-/g, ' ') || 'Destination';
  // Normalize category to lowercase for theme colors
  const normalizedCategory = category?.toLowerCase() || category;
  const themeColors = getThemeColors(normalizedCategory);
  const heroImage = destinationData?.images?.[0] || getHeroImage(normalizedCategory);
  
  // Filter packages by budget
  const filteredPackages = packages.filter(pkg => {
    // Ensure budgetPerDay exists, use default 3 days if totalDays is missing
    if (!pkg.budgetPerDay) return false;
    const days = pkg.totalDays || 3; // Default to 3 days if not specified
    const totalBudget = pkg.budgetPerDay * days;
    return !isNaN(totalBudget) && totalBudget <= budget;
  });

  const handlePackageClick = (packageId) => {
    router.push(`/itinerary/${packageId}`);
  };

  if (isLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: muiTheme.palette.background.default }}>
        <Navbar />
        <Box sx={{ textAlign: 'center', mt: 20 }}>
          <CircularProgress size={60} sx={{ color: theme.colors.brand.primary }} />
          <Typography sx={{ mt: 2, color: muiTheme.palette.text.primary }}>Loading packages...</Typography>
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', background: muiTheme.palette.background.default }}>
        <Navbar />
        <Container maxWidth="md" sx={{ mt: 20 }}>
          <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          <Button variant="contained" onClick={() => router.push('/')} sx={{ backgroundColor: theme.colors.brand.primary }}>Go to Home</Button>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', background: muiTheme.palette.background.default }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ position: 'relative', height: '60vh', minHeight: '400px', marginTop: '-60px', paddingTop: '140px', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundImage: `url(${heroImage})`, '&::before': { content: '""', position: 'absolute', inset: 0, background: `linear-gradient(to bottom, ${themeColors.primary}80, ${themeColors.dark}CC)` } }}>
        <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <Typography variant="h1" sx={{ fontFamily: theme.typography.fontFamily.primary, fontWeight: 800, color: 'white', fontSize: { xs: '2.5rem', md: '4rem', lg: '5rem' }, textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', mb: 1, letterSpacing: '0.1em' }}>{destinationName}</Typography>
          <Typography variant="h5" sx={{ color: 'rgba(255, 255, 255, 0.95)', mb: 2, textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>Discover Amazing Packages</Typography>
        </Box>
      </Box>

      <Container maxWidth="xl" sx={{ mt: '-80px', position: 'relative', zIndex: 10, pb: 4 }}>
        <Grid container spacing={4} sx={{ alignItems: 'flex-start' }}>
          {/* Sidebar */}
          <Grid item xs={12} md={3}>
            <Card sx={{ padding: '2rem', borderRadius: '20px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', position: 'sticky', top: '100px', mb: { xs: 3, md: 0 } }}>
              <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 700, color: themeColors.primary }}>Free Cancellation</Typography>
              <Typography variant="body2" sx={{ mb: 2, color: muiTheme.palette.text.secondary }}>Book your trip worry-free!</Typography>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: muiTheme.palette.text.primary }}>Budget</Typography>
              <Box sx={{ padding: '0 0.5rem', mb: 2 }}>
                <Slider 
                  key={`slider-${destination}`}
                  value={budget} 
                  onChange={(e, newValue) => handleBudgetChange(newValue)} 
                  min={8000} 
                  max={40000} 
                  step={1000} 
                  valueLabelDisplay="auto" 
                  valueLabelFormat={(value) => `₹${value.toLocaleString()}`} 
                  sx={{ color: themeColors.primary, '& .MuiSlider-thumb': { backgroundColor: themeColors.primary } }} 
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                  <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>₹8,000</Typography>
                  <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary }}>₹40,000</Typography>
                </Box>
              </Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700, color: muiTheme.palette.text.primary }}>Sort By</Typography>
              <FormControl fullWidth>
                <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)} sx={{ borderRadius: '12px', '& .MuiOutlinedInput-notchedOutline': { borderColor: themeColors.primary } }}>
                  <MenuItem value="popularity">Popularity</MenuItem>
                  <MenuItem value="price-low">Price (Low to High)</MenuItem>
                  <MenuItem value="price-high">Price (High to Low)</MenuItem>
                  <MenuItem value="rating">Rating</MenuItem>
                </Select>
              </FormControl>
            </Card>
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9}>
            <Card sx={{ padding: '2rem', mb: 3, borderRadius: '20px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', background: `linear-gradient(135deg, ${themeColors.light} 0%, white 100%)` }}>
              <Typography variant="h4" sx={{ mb: 1.5, fontWeight: 700, color: themeColors.primary, textAlign: 'center' }}>Enter Your Budget</Typography>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
                <TextField 
                  fullWidth 
                  type="number" 
                  value={budget} 
                  onChange={(e) => handleBudgetChange(e.target.value)} 
                  placeholder="25,000" 
                  inputProps={{ min: 0, max: 100000 }} 
                  InputProps={{ 
                    startAdornment: <Typography sx={{ mr: 1, color: muiTheme.palette.text.primary, fontWeight: 600 }}>₹</Typography> 
                  }} 
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: '12px', fontSize: '1.25rem', fontWeight: 600 } }} 
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
                    '&:hover': { backgroundColor: themeColors.dark } 
                  }}
                >
                  Search Packages
                </Button>
              </Box>
              <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: muiTheme.palette.text.primary, fontSize: '0.95rem', fontWeight: 500 }}>
                Based on your budget, we suggest these {destinationName} packages.
              </Typography>
            </Card>

            {filteredPackages.length > 0 ? (
              <Grid container spacing={2.5}>
              {filteredPackages.map((pkg) => {
                const days = pkg.totalDays || 3; // Default to 3 days if not specified
                const totalPrice = pkg.budgetPerDay * days;
                const packageImage = pkg.images && pkg.images.length > 0 ? pkg.images[0] : heroImage;
                
                return (
                  <Grid item xs={12} sm={6} md={4} key={pkg._id}>
                    <Card onClick={() => handlePackageClick(pkg._id)} sx={{ borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', height: '100%', '&:hover': { transform: 'translateY(-8px)', boxShadow: `0 16px 32px ${themeColors.primary}40` } }}>
                      <Box sx={{ height: 180, backgroundImage: `url(${packageImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                      <CardContent sx={{ padding: '1.25rem' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.4, color: muiTheme.palette.text.primary, fontSize: '1.1rem' }}>{pkg.name}</Typography>
                        <Typography variant="body2" sx={{ color: themeColors.primary, mb: 0.75, fontWeight: 600 }}>{days} Days</Typography>
                        <Box sx={{ mb: 1 }}>
                          {pkg.highlights && pkg.highlights.slice(0, 3).map((highlight, idx) => (
                            <Chip key={idx} label={highlight} size="small" sx={{ margin: '0.2rem', backgroundColor: `${themeColors.primary}15`, color: themeColors.primary, fontWeight: 500, fontSize: '0.7rem', height: '22px' }} />
                          ))}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: themeColors.primary, fontSize: '1.3rem' }}>₹{totalPrice.toLocaleString()}</Typography>
                            <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary }}>₹{pkg.budgetPerDay}/day</Typography>
                          </Box>
                          <Button variant="contained" size="small" sx={{ backgroundColor: themeColors.primary, borderRadius: '10px', padding: '6px 16px', fontSize: '0.85rem', '&:hover': { backgroundColor: themeColors.dark } }}>View</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
              </Grid>
            ) : null}

            {!isLoading && filteredPackages.length === 0 && packages.length > 0 && (
              <Box sx={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: muiTheme.palette.background.paper, borderRadius: '20px' }}>
                <Typography variant="h5" sx={{ mb: 1, color: muiTheme.palette.text.primary, fontWeight: 600 }}>No packages found within your budget</Typography>
                <Typography variant="body1" sx={{ color: muiTheme.palette.text.secondary, mb: 2 }}>
                  Try increasing your budget to ₹{(() => {
                    const validBudgets = packages
                      .map(p => {
                        if (!p.budgetPerDay) return null;
                        const days = p.totalDays || 3; // Default to 3 days
                        return p.budgetPerDay * days;
                      })
                      .filter(b => b !== null && !isNaN(b) && b > 0);
                    const minBudget = validBudgets.length > 0 ? Math.min(...validBudgets) : null;
                    return minBudget ? minBudget.toLocaleString() : '10,000';
                  })()} or more
                </Typography>
                <Button variant="contained" onClick={() => handleBudgetChange(8000)} sx={{ backgroundColor: themeColors.primary, '&:hover': { backgroundColor: themeColors.dark } }}>Reset Budget</Button>
              </Box>
            )}

            {!isLoading && packages.length === 0 && (
              <Box sx={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: muiTheme.palette.background.paper, borderRadius: '20px' }}>
                <Typography variant="h5" sx={{ mb: 1, color: muiTheme.palette.text.primary, fontWeight: 600 }}>No packages available</Typography>
                <Typography variant="body1" sx={{ color: muiTheme.palette.text.secondary, mb: 2 }}>
                  There are no packages available for this destination at the moment.
                </Typography>
                <Button variant="contained" onClick={() => router.push('/')} sx={{ backgroundColor: themeColors.primary, '&:hover': { backgroundColor: themeColors.dark } }}>Back to Home</Button>
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
