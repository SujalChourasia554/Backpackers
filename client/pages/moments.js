import { useState, useEffect } from 'react';
import Navbar from "@/Components/LandingPageComponents/Navbar";
import ReelCard from "@/Components/ReelCard";
import UploadDialog from "@/Components/UploadDialog";
import { Typography, Box, Container, Grid, Button, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import themeConfig from '@/src/theme';

export default function Moments() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [playingVideos, setPlayingVideos] = useState(new Set());
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [moments, setMoments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const primaryColor = themeConfig.colors.brand.primary;

  // Fetch moments from backend
  useEffect(() => {
    fetchMoments();
  }, []);

  const fetchMoments = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/v1/moments');
      const data = await response.json();
      
      if (data.success) {
        // Transform backend data to match ReelCard expected format
        const transformedMoments = data.moments.map(moment => ({
          id: moment._id,
          uploaderName: moment.uploaderName,
          caption: moment.caption,
          location: moment.location,
          video: moment.video,
          thumbnail: null, // Will show play button overlay
          tags: moment.tags || [],
          category: 'beaches', // Default category for color theme
          createdAt: moment.createdAt
        }));
        
        setMoments(transformedMoments);
        
        // Auto-play all videos after a short delay
        setTimeout(() => {
          const allIds = new Set(transformedMoments.map(m => m.id));
          setPlayingVideos(allIds);
        }, 500);
      } else {
        setError(data.message || 'Failed to fetch moments');
      }
    } catch (err) {
      console.error('Error fetching moments:', err);
      setError('Failed to load moments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoHover = (id, isHovering) => {
    setHoveredCard(isHovering ? id : null);
  };

  const handleVideoClick = (reel) => {
    // Open the video in a new tab
    if (reel.video) {
      window.open(reel.video, '_blank', 'noopener,noreferrer');
    }
  };

  const handleUploadSuccess = (newMoment) => {
    // Refresh moments list
    fetchMoments();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: `${primaryColor}15`,
        pt: 18, 
        pb: 6,
        transition: 'background 0.5s'
      }}>
        <Container maxWidth="md">
          
          {/* Title */}
          <Typography 
            variant="h1" 
            align="center" 
            fontWeight={900} 
            sx={{ 
              fontSize: { xs: '2.5rem', md: '3.5rem' }, 
              color: primaryColor,
              mb: 4 
            }}
          >
            Travel Moments
          </Typography>
          
          {/* Upload Button */}
          <Box sx={{ 
            maxWidth: 600, 
            mx: 'auto', 
            display: 'flex', 
            justifyContent: 'center'
          }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<CloudUploadIcon />}
              onClick={() => setOpenUploadDialog(true)}
              sx={{
                bgcolor: primaryColor,
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 600,
                px: 4,
                py: 1.5,
                borderRadius: '50px',
                textTransform: 'none',
                boxShadow: `0 4px 20px ${primaryColor}40`,
                '&:hover': {
                  bgcolor: primaryColor,
                  filter: 'brightness(0.9)',
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 25px ${primaryColor}60`,
                },
                transition: 'all 0.3s'
              }}
            >
              Share Your Moment
            </Button>
          </Box>
          
        </Container>
      </Box>

      {/* Reels Section */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        
        {/* Section Title */}
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary',
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Latest Reels
            <Box 
              component="span" 
              sx={{ 
                bgcolor: primaryColor, 
                color: 'white', 
                px: 2, 
                py: 0.5, 
                borderRadius: '20px',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              {moments.length}
            </Box>
          </Typography>
        </Box>

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        ) : moments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary">
              No moments yet. Be the first to share!
            </Typography>
          </Box>
        ) : (
          /* Reels Grid */
          <Grid container spacing={3}>
            {moments.map((reel) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={reel.id}>
                <ReelCard
                  reel={reel}
                  isHovered={hoveredCard === reel.id}
                  isPlaying={playingVideos.has(reel.id)}
                  onHover={handleVideoHover}
                  onClick={handleVideoClick}
                />
              </Grid>
            ))}
          </Grid>
        )}
        
      </Container>

      <UploadDialog 
        open={openUploadDialog} 
        onClose={() => setOpenUploadDialog(false)}
        onSuccess={handleUploadSuccess}
      />
      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
