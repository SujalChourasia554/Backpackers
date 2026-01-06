import { useState, useEffect } from 'react';
import { Box, Container, Typography, Button, CircularProgress, Chip } from '@mui/material';
import { useRouter } from 'next/router';
import Navbar from "@/Components/Navbar";
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { fetchDestinationsByCategory } from '@/utils/api';

// Colors for each category
const colors = {
  all: { bg: 'rgba(75, 140, 168, 0.15)', text: '#4b8ca8' },
  beaches: { bg: 'rgba(75, 140, 168, 0.15)', text: '#4b8ca8' },
  mountains: { bg: 'rgba(45, 80, 22, 0.15)', text: '#2d5016' },
  cultural: { bg: 'rgba(139, 69, 19, 0.15)', text: '#8b4513' }
};

export default function Explore() {
  const router = useRouter();
  
  // States
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showing, setShowing] = useState(20);

  // Load destinations when category changes
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      let data = [];
      if (category === 'all') {
        const beaches = await fetchDestinationsByCategory('beaches', 100);
        const mountains = await fetchDestinationsByCategory('mountains', 100);
        const cultural = await fetchDestinationsByCategory('cultural', 100);
        data = [...beaches, ...mountains, ...cultural];
      } else {
        data = await fetchDestinationsByCategory(category, 100);
      }
      
      setDestinations(data.map(d => ({ ...d, image: d.images?.[0] })));
      setLoading(false);
    }
    loadData();
  }, [category]);

  // Filter destinations by search
  const filteredDestinations = search 
    ? destinations.filter(d => d.name.toLowerCase().includes(search.toLowerCase())) 
    : destinations;

  // Show only first 'showing' number of destinations
  const displayedDestinations = filteredDestinations.slice(0, showing);

  // Check if there are more to load
  const hasMore = showing < filteredDestinations.length;

  return (
    <Box sx={{ minHeight: '100vh', '& ::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: colors[category].bg, 
        transition: 'background 0.5s', 
        pt: 18, 
        pb: 6 
      }}>
        <Container maxWidth="md">
          
          {/* Title */}
          <Typography 
            variant="h1" 
            align="center" 
            fontWeight={900} 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              color: colors[category].text, 
              transition: 'color 0.5s', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 1, 
              mb: 4 
            }}
          >
            Search Your Spot <LocationOnIcon sx={{ fontSize: 'inherit' }} />
          </Typography>
          
          {/* Search Bar */}
          <Box sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            mb: 4, 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            bgcolor: 'white', 
            borderRadius: '50px', 
            border: '3px solid', 
            borderColor: colors[category].text, 
            transition: 'border-color 0.5s', 
            px: 2, 
            py: 1 
          }}>
            <SearchIcon sx={{ color: 'text.secondary' }} />
            <input 
              type="text"
              placeholder="Search..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              style={{ 
                border: 'none', 
                outline: 'none', 
                width: '100%', 
                fontSize: '1.1rem', 
                padding: '8px', 
                background: 'transparent' 
              }}
            />
          </Box>
          
          {/* Category Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            {['all', 'beaches', 'mountains', 'cultural'].map(cat => (
              <Chip 
                key={cat} 
                label={cat} 
                onClick={() => { 
                  setCategory(cat); 
                  setShowing(20); 
                }} 
                sx={{ 
                  fontSize: '1rem', 
                  py: 3, 
                  px: 2, 
                  textTransform: 'capitalize',
                  bgcolor: category === cat ? colors[cat].text : 'default',
                  color: category === cat ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: category === cat ? colors[cat].text : 'action.hover'
                  }
                }} 
              />
            ))}
          </Box>
          
        </Container>
      </Box>

      {/* Results Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        
        {/* Loading */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        
        /* Show Results */
        ) : displayedDestinations.length ? (
          <>
            {/* Destination Cards */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: { 
                xs: '1fr', 
                sm: '1fr 1fr', 
                md: '1fr 1fr 1fr', 
                lg: '1fr 1fr 1fr 1fr' 
              }, 
              gap: 3 
            }}>
              {displayedDestinations.map(dest => (
                <Box 
                  key={dest._id} 
                  onClick={() => router.push(`/itinerary/${dest._id}?category=${dest.category}`)} 
                  sx={{ 
                    cursor: 'pointer', 
                    borderRadius: 3, 
                    overflow: 'hidden', 
                    bgcolor: 'background.paper', 
                    boxShadow: 1, 
                    transition: 'all 0.3s', 
                    '&:hover': { 
                      transform: 'translateY(-8px)', 
                      boxShadow: 4 
                    } 
                  }}
                >
                  <Box 
                    component="img" 
                    src={dest.image} 
                    alt={dest.name} 
                    sx={{ width: '100%', height: 200, objectFit: 'cover' }} 
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" fontWeight="bold" noWrap>
                      {dest.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {dest.location || dest.state}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            
            {/* Load More Button */}
            {hasMore && (
              <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Button 
                  variant="contained" 
                  size="large" 
                  onClick={() => setShowing(showing + 20)}
                >
                  Load More
                </Button>
              </Box>
            )}
          </>
        
        /* No Results */
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" color="text.secondary" mb={2}>
              No results
            </Typography>
            <Button onClick={() => { setSearch(''); setCategory('all'); }}>
              Clear
            </Button>
          </Box>
        )}
        
      </Container>
    </Box>
  );
}
