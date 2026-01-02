import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import ReelCard from "@/Components/ReelCard";
import UploadDialog from "@/Components/UploadDialog";
import { Button, Typography, Box, Container, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import theme from '@/src/theme';
import { travelReels } from '@/data/travelReels';

export default function Moments() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const handleVideoHover = (id, isHovering) => {
    setHoveredCard(isHovering ? id : null);
    setPlayingVideo(isHovering ? id : null);
  };

  const toggleLike = (id) => {
    setLikedVideos(prev => {
      const newLikes = new Set(prev);
      newLikes.has(id) ? newLikes.delete(id) : newLikes.add(id);
      return newLikes;
    });
  };

  return (
    <Box>
      <Navbar />

      <Box component="section">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', padding: '4rem 0 2rem' }}>
            <Typography 
              variant="h2" 
              sx={{
                fontFamily: theme.typography.fontFamily.primary,
                fontWeight: 800,
                marginBottom: '1rem',
                color: theme.colors.text.primary,
                fontSize: { xs: '2rem', md: '3rem' }
              }}
            >
              Travel <span style={{ color: theme.colors.brand.primary }}>Moments</span>
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ marginBottom: '2rem', color: theme.colors.text.secondary, fontWeight: 400 }}
            >
              Share your adventures and inspire fellow travelers
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<AddIcon />}
              onClick={() => setOpenUploadDialog(true)}
              sx={{
                backgroundColor: theme.colors.brand.primary,
                padding: '14px 32px',
                borderRadius: '50px',
                fontSize: '1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 24px rgba(75, 140, 168, 0.3)',
                '&:hover': {
                  backgroundColor: theme.colors.brand.primary,
                  transform: 'scale(1.05)',
                  boxShadow: '0 12px 32px rgba(75, 140, 168, 0.4)',
                }
              }}
            >
              Share Your Moment
            </Button>
          </Box>
        </Container>
      </Box>

      <Box component="section">
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: 2 }}>
            <VideoLibraryIcon sx={{ fontSize: 32, color: theme.colors.brand.primary }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: theme.colors.text.primary }}>
              Travel Reels
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {travelReels.map((reel) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={reel.id}>
                <ReelCard
                  reel={reel}
                  isHovered={hoveredCard === reel.id}
                  isPlaying={playingVideo === reel.id}
                  onHover={handleVideoHover}
                  onLike={toggleLike}
                  isLiked={likedVideos.has(reel.id)}
                />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <UploadDialog open={openUploadDialog} onClose={() => setOpenUploadDialog(false)} />

      <Box sx={{ height: '4rem' }} />
    </Box>
  );
}
