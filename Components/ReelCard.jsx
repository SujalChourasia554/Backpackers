import { useState } from 'react';
import { Card, Box, Avatar, Typography, Chip, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import theme from '@/src/theme';

const getCategoryColor = (category) => {
  switch(category) {
    case 'beaches': return theme.colors.beaches.primary;
    case 'mountains': return theme.colors.mountains.primary;
    case 'cultural': return theme.colors.cultural.primary;
    default: return theme.colors.brand.primary;
  }
};

export default function ReelCard({ reel, isHovered, isPlaying, onHover, onLike, isLiked }) {
  return (
    <Card 
      onMouseEnter={() => onHover(reel.id, true)}
      onMouseLeave={() => onHover(reel.id, false)}
      sx={{
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${getCategoryColor(reel.category)}40` : '0 4px 20px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        height: '500px'
      }}
    >
      <Box sx={{ position: 'relative', height: '100%', backgroundColor: '#000' }}>
        {isPlaying ? (
          <iframe
            src={`${reel.videoUrl}?autoplay=1&mute=1&controls=0&loop=1&playlist=${reel.videoUrl.split('/').pop()}`}
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        ) : (
          <Box sx={{
            width: '100%',
            height: '100%',
            backgroundImage: `url(${reel.thumbnail})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Box sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              '&:hover': { transform: 'scale(1.1)', backgroundColor: 'white' }
            }}>
              <PlayArrowIcon sx={{ fontSize: 48, color: getCategoryColor(reel.category) }} />
            </Box>
          </Box>
        )}

        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          padding: '2rem 1.5rem 1.5rem',
          color: 'white'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
            <Avatar src={reel.avatar} sx={{ width: 32, height: 32, marginRight: 1 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>{reel.user}</Typography>
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
            {reel.title}
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: '0.75rem', opacity: 0.9 }}>
            📍 {reel.location}
          </Typography>

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

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); onLike(reel.id); }}
            >
              <IconButton size="small" sx={{ color: 'white' }}>
                {isLiked ? <FavoriteIcon sx={{ color: '#ff4757' }} /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2">{reel.likes + (isLiked ? 1 : 0)}</Typography>
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
  );
}

