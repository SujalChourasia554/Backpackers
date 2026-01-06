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
<<<<<<< Updated upstream
=======
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
          title: moment.caption || 'Travel Moment',
          location: moment.location || 'Unknown',
          user: moment.userId?.name || 'Anonymous',
          avatar: `https://i.pravatar.cc/150?u=${moment.userId?._id}`,
          videoUrl: moment.video,
          thumbnail: `https://images.unsplash.com/photo-${Math.random().toString().slice(2, 15)}?w=800&h=1200&fit=crop&q=80`,
          likes: moment.likes?.length || 0,
          comments: moment.comments?.length || 0,
          tags: moment.tags || [],
          isLiked: moment.likes?.includes(localStorage.getItem('userId'))
        }));
        
        setMoments(transformedMoments);
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
>>>>>>> Stashed changes

  const handleVideoHover = (id, isHovering) => {
    setHoveredCard(isHovering ? id : null);
    setPlayingVideo(isHovering ? id : null);
  };

<<<<<<< Updated upstream
  const toggleLike = (id) => {
    setLikedVideos(prev => {
      const newLikes = new Set(prev);
      newLikes.has(id) ? newLikes.delete(id) : newLikes.add(id);
      return newLikes;
    });
=======
  const toggleLike = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to like moments');
        return;
      }

      const response = await fetch(`/api/v1/moments/${id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      
      if (data.success) {
        setLikedVideos(prev => {
          const newLikes = new Set(prev);
          data.liked ? newLikes.add(id) : newLikes.delete(id);
          return newLikes;
        });
        
        // Update the moment's like count
        setMoments(prev => prev.map(moment => 
          moment.id === id 
            ? { ...moment, likes: data.likesCount }
            : moment
        ));
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleUploadSuccess = (newMoment) => {
    // Refresh moments list
    fetchMoments();
>>>>>>> Stashed changes
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
