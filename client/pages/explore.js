import { useState } from 'react';
import { Box, Container, Grid, Typography, TextField, InputAdornment, Button, useTheme } from '@mui/material';
import Navbar from "@/Components/Navbar";
import ExploreCard from "@/Components/ExploreCard";
import CategoryChip from "@/Components/CategoryChip";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TerrainIcon from '@mui/icons-material/Terrain';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import themeConfig from '@/src/theme';
import { exploreDestinations, categoryGradients, categoryTextColors } from '@/data/exploreDestinations';

const categories = [
  { value: 'all', label: 'All', icon: <LocationOnIcon />, color: themeConfig.colors.brand.primary },
  { value: 'beaches', label: 'Beaches', icon: <BeachAccessIcon />, color: themeConfig.colors.beaches.primary },
  { value: 'mountains', label: 'Mountains', icon: <TerrainIcon />, color: themeConfig.colors.mountains.primary },
  { value: 'cultural', label: 'Cultural', icon: <AccountBalanceIcon />, color: themeConfig.colors.cultural.primary }
];

export default function Explore() {
  const muiTheme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);

  const filteredDestinations = exploreDestinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || dest.location.toLowerCase().includes(searchQuery.toLowerCase()) || dest.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dest.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ minHeight: '100vh', background: muiTheme.palette.background.default }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ position: 'relative', minHeight: '60vh', marginTop: '-60px', paddingTop: '140px', backgroundImage: 'url(https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed', '&::before': { content: '""', position: 'absolute', inset: 0, background: categoryGradients[selectedCategory], transition: 'background 0.5s ease' } }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', padding: { xs: '4rem 0', md: '4rem 0' }, color: 'white' }}>
            <Typography variant="h2" sx={{ fontFamily: themeConfig.typography.fontFamily.primary, fontWeight: 800, mb: 1, fontSize: { xs: '2rem', md: '3rem' } }}>
              Search <span style={{ color: categoryTextColors[selectedCategory], transition: 'color 0.5s ease', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Destinations</span>
            </Typography>
            <Typography variant="h6" sx={{ mb: 3, color: 'rgba(255, 255, 255, 0.9)', fontWeight: 400 }}>Discover your next adventure from our curated collection</Typography>

            <Box sx={{ maxWidth: '700px', margin: '0 auto 2rem' }}>
              <TextField fullWidth placeholder="Search destinations, locations, or activities..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon sx={{ fontSize: 28, color: themeConfig.colors.brand.primary }} /></InputAdornment> }} sx={{ '& .MuiOutlinedInput-root': { borderRadius: '50px', backgroundColor: 'white', fontSize: '1.1rem', padding: '8px 20px', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', '&:hover': { boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)' } } }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <CategoryChip key={cat.value} label={cat.label} icon={cat.icon} isSelected={selectedCategory === cat.value} onClick={() => setSelectedCategory(cat.value)} color={cat.color} />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Results Section */}
      <Box sx={{ py: 6, background: muiTheme.palette.background.default }}>
        <Container maxWidth="xl">
          <Typography variant="h5" sx={{ mb: 2, color: muiTheme.palette.text.primary, fontWeight: 500 }}>{filteredDestinations.length} destinations found</Typography>

          {filteredDestinations.length > 0 ? (
            <Grid container spacing={4}>
              {filteredDestinations.map((destination, index) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <ExploreCard destination={destination} isHovered={hoveredCard === index} onHover={(isHovered) => setHoveredCard(isHovered ? index : null)} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ textAlign: 'center', padding: '4rem 2rem', backgroundColor: muiTheme.palette.background.paper, borderRadius: '20px' }}>
              <SearchIcon sx={{ fontSize: 80, color: muiTheme.palette.text.secondary, mb: 1 }} />
              <Typography variant="h5" sx={{ mb: 1, color: muiTheme.palette.text.primary }}>No destinations found</Typography>
              <Typography variant="body1" sx={{ color: muiTheme.palette.text.secondary, mb: 2 }}>Try adjusting your search or filters</Typography>
              <Button variant="contained" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} sx={{ backgroundColor: themeConfig.colors.brand.primary, padding: '12px 32px', borderRadius: '12px', '&:hover': { backgroundColor: themeConfig.colors.brand.primary } }}>Clear Filters</Button>
            </Box>
          )}
        </Container>
      </Box>

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
