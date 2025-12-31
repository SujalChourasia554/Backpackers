import { useState, useRef } from 'react';
import Navbar from "@/Components/Navbar";
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Container, 
  Grid,
  IconButton,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import AddIcon from '@mui/icons-material/Add';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import styles from '@/styles/Moments.module.css';
import theme from '@/src/theme';

export default function Moments() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const videoRefs = useRef({});

  // Sample travel reels data with YouTube embed links
  const travelReels = [
    {
      id: 1,
      title: "Goa Beach Sunset",
      location: "Goa, India",
      user: "Travel Explorer",
      avatar: "https://i.pravatar.cc/150?img=1",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&h=600&fit=crop",
      likes: 1234,
      comments: 89,
      category: "beaches",
      tags: ["Sunset", "Beach", "Goa"]
    },
    {
      id: 2,
      title: "Himalayan Trek",
      location: "Manali, India",
      user: "Mountain Wanderer",
      avatar: "https://i.pravatar.cc/150?img=2",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      likes: 2156,
      comments: 145,
      category: "mountains",
      tags: ["Trekking", "Adventure", "Mountains"]
    },
    {
      id: 3,
      title: "Taj Mahal at Dawn",
      location: "Agra, India",
      user: "Heritage Hunter",
      avatar: "https://i.pravatar.cc/150?img=3",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=400&h=600&fit=crop",
      likes: 3421,
      comments: 234,
      category: "cultural",
      tags: ["Heritage", "Monument", "History"]
    },
    {
      id: 4,
      title: "Backwaters Cruise",
      location: "Kerala, India",
      user: "Coastal Traveler",
      avatar: "https://i.pravatar.cc/150?img=4",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=400&h=600&fit=crop",
      likes: 987,
      comments: 67,
      category: "beaches",
      tags: ["Backwaters", "Boat", "Nature"]
    },
    {
      id: 5,
      title: "Ladakh Road Trip",
      location: "Leh-Ladakh, India",
      user: "Road Tripper",
      avatar: "https://i.pravatar.cc/150?img=5",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      likes: 4532,
      comments: 312,
      category: "mountains",
      tags: ["Road Trip", "Biking", "Adventure"]
    },
    {
      id: 6,
      title: "Jaipur Palace Tour",
      location: "Jaipur, India",
      user: "Royal Explorer",
      avatar: "https://i.pravatar.cc/150?img=6",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=400&h=600&fit=crop",
      likes: 2876,
      comments: 198,
      category: "cultural",
      tags: ["Palace", "Architecture", "Royal"]
    },
    {
      id: 7,
      title: "Bali Beach Vibes",
      location: "Bali, Indonesia",
      user: "Island Hopper",
      avatar: "https://i.pravatar.cc/150?img=7",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=600&fit=crop",
      likes: 5643,
      comments: 421,
      category: "beaches",
      tags: ["Surfing", "Beach", "Tropical"]
    },
    {
      id: 8,
      title: "Kasol Camping",
      location: "Kasol, India",
      user: "Camp Master",
      avatar: "https://i.pravatar.cc/150?img=8",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=600&fit=crop",
      likes: 1789,
      comments: 134,
      category: "mountains",
      tags: ["Camping", "Nature", "Peace"]
    },
    {
      id: 9,
      title: "Varanasi Ganga Aarti",
      location: "Varanasi, India",
      user: "Spiritual Seeker",
      avatar: "https://i.pravatar.cc/150?img=9",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      thumbnail: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=400&h=600&fit=crop",
      likes: 3987,
      comments: 267,
      category: "cultural",
      tags: ["Spiritual", "Ritual", "Ganges"]
    }
  ];

  const getCategoryColor = (category) => {
    switch(category) {
      case 'beaches': return theme.colors.beaches.primary;
      case 'mountains': return theme.colors.mountains.primary;
      case 'cultural': return theme.colors.cultural.primary;
      default: return theme.colors.brand.primary;
    }
  };

  const handleVideoHover = (id, isHovering) => {
    setHoveredCard(isHovering ? id : null);
    if (isHovering) {
      setPlayingVideo(id);
    } else {
      setPlayingVideo(null);
    }
  };

  const toggleLike = (id) => {
    setLikedVideos(prev => {
      const newLikes = new Set(prev);
      if (newLikes.has(id)) {
        newLikes.delete(id);
      } else {
        newLikes.add(id);
      }
      return newLikes;
    });
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar />

      {/* Hero Section */}
      <section className={styles.heroSection}>
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
              sx={{
                marginBottom: '2rem',
                color: theme.colors.text.secondary,
                fontWeight: 400
              }}
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
      </section>

      {/* Reels Grid */}
      <section className={styles.reelsSection}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '2rem', gap: 2 }}>
            <VideoLibraryIcon sx={{ fontSize: 32, color: theme.colors.brand.primary }} />
            <Typography 
              variant="h4" 
              sx={{
                fontWeight: 700,
                color: theme.colors.text.primary
              }}
            >
              Travel Reels
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {travelReels.map((reel) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={reel.id}>
                <Card 
                  className={styles.reelCard}
                  onMouseEnter={() => handleVideoHover(reel.id, true)}
                  onMouseLeave={() => handleVideoHover(reel.id, false)}
                  sx={{
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === reel.id ? 'translateY(-8px)' : 'translateY(0)',
                    boxShadow: hoveredCard === reel.id 
                      ? `0 20px 40px ${getCategoryColor(reel.category)}40` 
                      : '0 4px 20px rgba(0, 0, 0, 0.1)',
                    cursor: 'pointer',
                    position: 'relative',
                    height: '500px'
                  }}
                >
                  {/* Video Container */}
                  <Box 
                    sx={{ 
                      position: 'relative',
                      height: '100%',
                      backgroundColor: '#000'
                    }}
                  >
                    {playingVideo === reel.id ? (
                      <iframe
                        src={`${reel.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.videoUrl.split('/').pop()}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          border: 'none',
                          objectFit: 'cover'
                        }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          backgroundImage: `url(${reel.thumbnail})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.1)',
                              backgroundColor: 'white'
                            }
                          }}
                        >
                          <PlayArrowIcon sx={{ fontSize: 48, color: getCategoryColor(reel.category) }} />
                        </Box>
                      </Box>
                    )}

                    {/* Overlay Info */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
                        padding: '2rem 1.5rem 1.5rem',
                        color: 'white'
                      }}
                    >
                      {/* User Info */}
                      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                        <Avatar src={reel.avatar} sx={{ width: 32, height: 32, marginRight: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {reel.user}
                        </Typography>
                      </Box>

                      {/* Title */}
                      <Typography 
                        variant="h6" 
                        sx={{
                          fontWeight: 700,
                          marginBottom: '0.5rem',
                          fontSize: '1rem'
                        }}
                      >
                        {reel.title}
                      </Typography>

                      {/* Location */}
                      <Typography 
                        variant="body2" 
                        sx={{
                          marginBottom: '0.75rem',
                          opacity: 0.9
                        }}
                      >
                        📍 {reel.location}
                      </Typography>

                      {/* Tags */}
                      <Box sx={{ display: 'flex', gap: 0.5, marginBottom: '1rem', flexWrap: 'wrap' }}>
                        {reel.tags.map((tag, idx) => (
                          <Chip
                            key={idx}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                              color: 'white',
                              fontSize: '0.7rem',
                              height: '24px'
                            }}
                          />
                        ))}
                      </Box>

                      {/* Actions */}
                      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box 
                          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLike(reel.id);
                          }}
                        >
                          <IconButton size="small" sx={{ color: 'white' }}>
                            {likedVideos.has(reel.id) ? (
                              <FavoriteIcon sx={{ color: '#ff4757' }} />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                          <Typography variant="body2">
                            {reel.likes + (likedVideos.has(reel.id) ? 1 : 0)}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <IconButton size="small" sx={{ color: 'white' }}>
                            <ChatBubbleOutlineIcon />
                          </IconButton>
                          <Typography variant="body2">{reel.comments}</Typography>
                        </Box>
                        <IconButton size="small" sx={{ color: 'white' }}>
                          <ShareIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </section>

      {/* Upload Dialog */}
      <Dialog 
        open={openUploadDialog} 
        onClose={() => setOpenUploadDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
          Share Your Travel Moment
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
            <TextField
              fullWidth
              label="Video Title"
              placeholder="Enter a catchy title..."
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Location"
              placeholder="Where was this taken?"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="YouTube Video URL"
              placeholder="https://youtube.com/watch?v=..."
              variant="outlined"
              helperText="Paste your YouTube video link here"
            />
            <TextField
              fullWidth
              label="Description"
              placeholder="Tell us about your experience..."
              multiline
              rows={4}
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Tags"
              placeholder="beach, sunset, adventure (comma separated)"
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: '1.5rem' }}>
          <Button 
            onClick={() => setOpenUploadDialog(false)}
            sx={{ color: theme.colors.text.secondary }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={() => setOpenUploadDialog(false)}
            sx={{
              backgroundColor: theme.colors.brand.primary,
              padding: '10px 24px',
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: theme.colors.brand.primary,
              }
            }}
          >
            Share Moment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Footer Spacing */}
      <Box sx={{ height: '4rem' }} />
    </div>
  );
}

