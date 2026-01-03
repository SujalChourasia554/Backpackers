import { useState } from 'react';
import Navbar from "@/Components/Navbar";
import ReelCard from "@/Components/ReelCard";
import UploadDialog from "@/Components/UploadDialog";
import HeroSection from "@/Components/HeroSection";
import { Typography, Box, Container, Grid, useTheme } from '@mui/material';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import themeConfig from '@/src/theme';
import { travelReels } from '@/data/travelReels';

export default function Moments() {
  const muiTheme = useTheme();
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
    <Box sx={{ background: muiTheme.palette.background.default }}>
      <Navbar />
      <Box sx={{ paddingTop: '120px' }}>
        <HeroSection onUploadClick={() => setOpenUploadDialog(true)} />
          </Box>


      <Box component="section">
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: 2 }}>
            <VideoLibraryIcon sx={{ fontSize: 32, color: themeConfig.colors.brand.primary }} />
            <Typography variant="h4" sx={{ fontWeight: 700, color: muiTheme.palette.text.primary }}>
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
