import { useState } from 'react';
import { Card, Box, Avatar, Typography, Chip, IconButton, useTheme } from '@mui/material';
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
  const muiTheme = useTheme();
  const categoryColor = getCategoryColor(reel.category);
  
  return (
    <Card 
      onMouseEnter={() => onHover(reel.id, true)}
      onMouseLeave={() => onHover(reel.id, false)}
      sx={{
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? `0 20px 40px ${categoryColor}60, 0 0 0 3px ${categoryColor}30` 
          : `0 8px 24px rgba(0, 0, 0, 0.15)`,
        cursor: 'pointer',
        height: '500px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${categoryColor}, ${theme.colors.brand.secondary})`,
          zIndex: 10
        }
      }}
    >
      <Box sx={{ position: 'relative', height: '100%', backgroundColor: muiTheme.palette.mode === 'dark' ? '#1a1f26' : '#f5f5f5' }}>
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
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `linear-gradient(to bottom, transparent 0%, ${categoryColor}15 50%, rgba(0,0,0,0.4) 100%)`
            }
          }} />
        )}

        {/* Brighter overlay with gradient */}
        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: muiTheme.palette.mode === 'dark' 
            ? 'linear-gradient(to top, rgba(26, 31, 38, 0.95) 0%, rgba(26, 31, 38, 0.8) 60%, transparent 100%)'
            : 'linear-gradient(to top, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.85) 60%, transparent 100%)',
          padding: '2rem 1.5rem 1.5rem',
          backdropFilter: 'blur(10px)',
          borderTop: `1px solid ${muiTheme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
            <Avatar 
              src={reel.avatar} 
              sx={{ 
                width: 36, 
                height: 36, 
                marginRight: 1,
                border: `2px solid ${categoryColor}`,
                boxShadow: `0 2px 8px ${categoryColor}40`
              }} 
            />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 700,
                color: muiTheme.palette.text.primary,
                fontSize: '0.9rem'
              }}
            >
              {reel.user}
            </Typography>
          </Box>

          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 800, 
              marginBottom: '0.5rem', 
              fontSize: '1.1rem',
              color: muiTheme.palette.text.primary,
              textShadow: muiTheme.palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
            }}
          >
            {reel.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem', gap: 0.5 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: '0.85rem',
                color: categoryColor,
                fontWeight: 600
              }}
            >
              📍 {reel.location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5, marginBottom: '1rem', flexWrap: 'wrap' }}>
            {reel.tags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                size="small"
                sx={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  fontSize: '0.7rem',
                  height: '24px',
                  fontWeight: 600,
                  border: `1px solid ${categoryColor}40`,
                  '&:hover': {
                    backgroundColor: `${categoryColor}30`
                  }
                }}
              />
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Box 
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); onLike(reel.id); }}
            >
              <IconButton 
                size="small" 
                sx={{ 
                  color: isLiked ? '#ff4757' : muiTheme.palette.text.primary,
                  backgroundColor: isLiked ? 'rgba(255, 71, 87, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 71, 87, 0.15)'
                  }
                }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 600,
                  color: muiTheme.palette.text.primary
                }}
              >
                {reel.likes + (isLiked ? 1 : 0)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <IconButton 
                size="small" 
                sx={{ 
                  color: muiTheme.palette.text.primary,
                  '&:hover': {
                    backgroundColor: `${categoryColor}15`
                  }
                }}
              >
                <ChatBubbleOutlineIcon />
              </IconButton>
              <Typography 
                variant="body2"
                sx={{ 
                  fontWeight: 600,
                  color: muiTheme.palette.text.primary
                }}
              >
                {reel.comments}
              </Typography>
            </Box>
            <IconButton 
              size="small" 
              sx={{ 
                color: muiTheme.palette.text.primary,
                '&:hover': {
                  backgroundColor: `${categoryColor}15`
                }
              }}
            >
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
