import { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import { 
  TextField, 
  InputAdornment, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Container, 
  Grid,
  Chip,
  Button,
  Tabs,
  Tab
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TerrainIcon from '@mui/icons-material/Terrain';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import theme from '@/src/theme';

export default function Explore() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const allDestinations = [
    // Beaches
    { name: "Goa Beaches", category: "beaches", location: "Goa, India", image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop", tags: ["Beach", "Party", "Water Sports"] },
    { name: "Maldives", category: "beaches", location: "Indian Ocean", image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop", tags: ["Beach", "Luxury", "Diving"] },
    { name: "Andaman Islands", category: "beaches", location: "Bay of Bengal", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop", tags: ["Beach", "Adventure", "Snorkeling"] },
    { name: "Kerala Beaches", category: "beaches", location: "Kerala, India", image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop", tags: ["Beach", "Backwaters", "Ayurveda"] },
    { name: "Phuket", category: "beaches", location: "Thailand", image: "https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=800&h=600&fit=crop", tags: ["Beach", "Nightlife", "Island"] },
    { name: "Bali Beaches", category: "beaches", location: "Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop", tags: ["Beach", "Surfing", "Culture"] },
    
    // Mountains
    { name: "Manali", category: "mountains", location: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&h=600&fit=crop", tags: ["Mountains", "Snow", "Adventure"] },
    { name: "Leh-Ladakh", category: "mountains", location: "Jammu & Kashmir", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop", tags: ["Mountains", "Desert", "Biking"] },
    { name: "Kasol", category: "mountains", location: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&h=600&fit=crop", tags: ["Mountains", "Trekking", "Peaceful"] },
    { name: "Shimla", category: "mountains", location: "Himachal Pradesh", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&h=600&fit=crop", tags: ["Mountains", "Colonial", "Hills"] },
    { name: "Darjeeling", category: "mountains", location: "West Bengal", image: "https://images.unsplash.com/photo-1563979303-5c5eeea0e5e5?w=800&h=600&fit=crop", tags: ["Mountains", "Tea", "Sunrise"] },
    { name: "Mussoorie", category: "mountains", location: "Uttarakhand", image: "https://images.unsplash.com/photo-1571211905393-4c8e0f3a7e8f?w=800&h=600&fit=crop", tags: ["Mountains", "Hills", "Nature"] },
    
    // Cultural
    { name: "Jaipur", category: "cultural", location: "Rajasthan, India", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&h=600&fit=crop", tags: ["Heritage", "Palace", "History"] },
    { name: "Varanasi", category: "cultural", location: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop", tags: ["Spiritual", "Ganges", "Ancient"] },
    { name: "Hampi", category: "cultural", location: "Karnataka, India", image: "https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800&h=600&fit=crop", tags: ["Ruins", "UNESCO", "History"] },
    { name: "Agra", category: "cultural", location: "Uttar Pradesh", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop", tags: ["Taj Mahal", "Mughal", "Heritage"] },
    { name: "Mysore", category: "cultural", location: "Karnataka, India", image: "https://images.unsplash.com/photo-1598977123118-4e30ba3c4f5b?w=800&h=600&fit=crop", tags: ["Palace", "Culture", "Yoga"] },
    { name: "Udaipur", category: "cultural", location: "Rajasthan, India", image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&h=600&fit=crop", tags: ["Lakes", "Palace", "Romantic"] },
  ];

  const filteredDestinations = allDestinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category) => {
    switch(category) {
      case 'beaches': return theme.colors.beaches.primary;
      case 'mountains': return theme.colors.mountains.primary;
      case 'cultural': return theme.colors.cultural.primary;
      default: return theme.colors.brand.primary;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'beaches': return <BeachAccessIcon />;
      case 'mountains': return <TerrainIcon />;
      case 'cultural': return <AccountBalanceIcon />;
      default: return <LocationOnIcon />;
    }
  };

  const getHeroGradient = (category) => {
    switch(category) {
      case 'beaches':
        return 'linear-gradient(135deg, rgba(0, 168, 204, 0.8) 0%, rgba(13, 202, 240, 0.6) 100%)';
      case 'mountains':
        return 'linear-gradient(135deg, rgba(45, 80, 22, 0.8) 0%, rgba(74, 124, 44, 0.6) 100%)';
      case 'cultural':
        return 'linear-gradient(135deg, rgba(139, 69, 19, 0.8) 0%, rgba(210, 105, 30, 0.6) 100%)';
      default:
        return 'linear-gradient(135deg, rgba(75, 140, 168, 0.8) 0%, rgba(58, 122, 143, 0.6) 100%)';
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Navbar />

      <Box
        sx={{
          position: 'relative',
          minHeight: '60vh',
          backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80)',
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
            background: getHeroGradient(selectedCategory),
            transition: 'background 0.5s ease',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', padding: '4rem 0', color: 'white' }}>
            <Typography 
              variant="h2" 
              sx={{
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: 800,
                marginBottom: '1rem',
                color: 'white',
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Search <span style={{ 
                color: selectedCategory === 'beaches' ? '#80deea' :
                       selectedCategory === 'mountains' ? '#a5d6a7' :
                       selectedCategory === 'cultural' ? '#ffcc80' :
                       '#ffd700',
                transition: 'color 0.5s ease',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>Destinations</span>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{
                marginBottom: '3rem',
                color: 'rgba(255, 255, 255, 0.9)',
                fontWeight: 400
              }}
            >
              Discover your next adventure from our curated collection
            </Typography>

            <Box sx={{ maxWidth: '700px', margin: '0 auto', marginBottom: '2rem' }}>
              <TextField
                fullWidth
                placeholder="Search destinations, locations, or activities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ fontSize: 28, color: theme.colors.brand.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    backgroundColor: 'white',
                    fontSize: '1.1rem',
                    padding: '8px 20px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
                    }
                  }
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Chip
                label="All"
                icon={<LocationOnIcon />}
                onClick={() => setSelectedCategory('all')}
                sx={{
                  padding: '24px 16px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: selectedCategory === 'all' ? theme.colors.brand.primary : 'white',
                  color: selectedCategory === 'all' ? 'white' : theme.colors.text.primary,
                  '&:hover': {
                    backgroundColor: selectedCategory === 'all' ? theme.colors.brand.primary : theme.colors.background.secondary,
                  },
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
              <Chip
                label="Beaches"
                icon={<BeachAccessIcon />}
                onClick={() => setSelectedCategory('beaches')}
                sx={{
                  padding: '24px 16px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: selectedCategory === 'beaches' ? theme.colors.beaches.primary : 'white',
                  color: selectedCategory === 'beaches' ? 'white' : theme.colors.text.primary,
                  '&:hover': {
                    backgroundColor: selectedCategory === 'beaches' ? theme.colors.beaches.primary : theme.colors.background.secondary,
                  },
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
              <Chip
                label="Mountains"
                icon={<TerrainIcon />}
                onClick={() => setSelectedCategory('mountains')}
                sx={{
                  padding: '24px 16px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: selectedCategory === 'mountains' ? theme.colors.mountains.primary : 'white',
                  color: selectedCategory === 'mountains' ? 'white' : theme.colors.text.primary,
                  '&:hover': {
                    backgroundColor: selectedCategory === 'mountains' ? theme.colors.mountains.primary : theme.colors.background.secondary,
                  },
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
              <Chip
                label="Cultural"
                icon={<AccountBalanceIcon />}
                onClick={() => setSelectedCategory('cultural')}
                sx={{
                  padding: '24px 16px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  backgroundColor: selectedCategory === 'cultural' ? theme.colors.cultural.primary : 'white',
                  color: selectedCategory === 'cultural' ? 'white' : theme.colors.text.primary,
                  '&:hover': {
                    backgroundColor: selectedCategory === 'cultural' ? theme.colors.cultural.primary : theme.colors.background.secondary,
                  },
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ py: 6, background: 'var(--background)' }}>
        <Container maxWidth="xl">
          <Typography 
            variant="h5" 
            sx={{
              marginBottom: '2rem',
              color: theme.colors.text.secondary,
              fontWeight: 500
            }}
          >
            {filteredDestinations.length} destinations found
          </Typography>

          <Grid container spacing={4}>
            {filteredDestinations.map((destination, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card 
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => router.push(`/package/${destination.name.toLowerCase().replace(/\s+/g, '-')}?category=${destination.category}`)}
                  sx={{
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === index ? 'translateY(-10px)' : 'translateY(0)',
                    boxShadow: hoveredCard === index 
                      ? `0 20px 40px ${getCategoryColor(destination.category)}40` 
                      : '0 4px 20px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                  }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <CardMedia
                      component="img"
                      height="220"
                      image={destination.image}
                      alt={destination.name}
                      sx={{
                        transition: 'transform 0.3s ease',
                        transform: hoveredCard === index ? 'scale(1.1)' : 'scale(1)',
                      }}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        backgroundColor: getCategoryColor(destination.category),
                        borderRadius: '50%',
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
                      }}
                    >
                      {getCategoryIcon(destination.category)}
                    </Box>
                  </Box>
                  <CardContent sx={{ padding: '1.5rem' }}>
                    <Typography 
                      variant="h6" 
                      sx={{
                        fontWeight: 700,
                        marginBottom: '0.5rem',
                        color: theme.colors.text.primary
                      }}
                    >
                      {destination.name}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{
                        color: getCategoryColor(destination.category),
                        marginBottom: '1rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5
                      }}
                    >
                      <LocationOnIcon sx={{ fontSize: 18 }} />
                      {destination.location}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {destination.tags.map((tag, idx) => (
                        <Chip
                          key={idx}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: `${getCategoryColor(destination.category)}15`,
                            color: getCategoryColor(destination.category),
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredDestinations.length === 0 && (
            <Box 
              sx={{ 
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: theme.colors.background.secondary,
                borderRadius: '20px'
              }}
            >
              <SearchIcon sx={{ fontSize: 80, color: theme.colors.text.secondary, marginBottom: '1rem' }} />
              <Typography variant="h5" sx={{ marginBottom: '1rem', color: theme.colors.text.secondary }}>
                No destinations found
              </Typography>
              <Typography variant="body1" sx={{ color: theme.colors.text.secondary, marginBottom: '2rem' }}>
                Try adjusting your search or filters
              </Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                sx={{
                  backgroundColor: theme.colors.brand.primary,
                  padding: '12px 32px',
                  borderRadius: '12px',
                  '&:hover': {
                    backgroundColor: theme.colors.brand.primary,
                  }
                }}
              >
                Clear Filters
              </Button>
            </Box>
          )}
        </Container>
      </Box>

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}

