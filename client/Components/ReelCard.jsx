import { Card, Box, Avatar, Typography, Chip, useTheme } from '@mui/material';
import { useState } from 'react';
import theme from '@/src/theme';

const getCategoryColor = (category) => {
  const colors = {
    beaches: theme.colors.beaches.primary,
    mountains: theme.colors.mountains.primary,
    cultural: theme.colors.cultural.primary,
  };
  return colors[category] || theme.colors.brand.primary;
};

// Helper function to convert video URLs to embeddable format
const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('watch?v=')) {
      videoId = url.split('watch?v=')[1].split('&')[0];
    } else if (url.includes('embed/')) {
      return url; // Already in embed format
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  }

  // Instagram
  if (url.includes('instagram.com')) {
    if (url.includes('/reel/')) {
      const reelId = url.split('/reel/')[1].split('/')[0].split('?')[0];
      return `https://www.instagram.com/reel/${reelId}/embed`;
    }
    if (url.includes('/p/')) {
      const postId = url.split('/p/')[1].split('/')[0].split('?')[0];
      return `https://www.instagram.com/p/${postId}/embed`;
    }
  }

  // Google Drive
  if (url.includes('drive.google.com')) {
    if (url.includes('/file/d/')) {
      const fileId = url.split('/file/d/')[1].split('/')[0];
      return `https://drive.google.com/file/d/${fileId}/preview`;
    }
  }

  // If no specific format matched, return the original URL
  return url;
};

// Helper function to get the original video URL for opening
const getOriginalUrl = (url) => {
  if (!url) return null;
  
  // If it's already an embed URL, convert it back
  if (url.includes('youtube.com/embed/')) {
    const videoId = url.split('embed/')[1].split('?')[0];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }
  
  if (url.includes('instagram.com') && url.includes('/embed')) {
    return url.replace('/embed', '');
  }
  
  if (url.includes('drive.google.com') && url.includes('/preview')) {
    return url.replace('/preview', '/view');
  }
  
  return url;
};

const VideoContent = ({ reel, categoryColor, onVideoClick }) => {
  const embedUrl = getEmbedUrl(reel.videoUrl);
  
  return (
    <Box 
      onClick={onVideoClick}
      sx={{ 
        width: '100%', 
        height: '100%', 
        position: 'relative',
        cursor: 'pointer'
      }}
    >
      {embedUrl ? (
        <iframe
          src={`${embedUrl}?autoplay=1&mute=1&loop=1`}
          style={{ 
            width: '100%', 
            height: '100%', 
            border: 'none',
            pointerEvents: 'auto'
          }}
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
            inset: 0,
            background: `linear-gradient(to bottom, transparent 0%, ${categoryColor}15 50%, rgba(0,0,0,0.4) 100%)`
          }
        }} />
      )}
    </Box>
  );
};

export default function ReelCard({ reel, isHovered, onHover }) {
  const muiTheme = useTheme();
  const categoryColor = getCategoryColor(reel.category);
  
  const handleVideoClick = (e) => {
    e.stopPropagation();
    const originalUrl = getOriginalUrl(reel.videoUrl);
    if (originalUrl) {
      window.open(originalUrl, '_blank');
    }
  };
  
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
          : '0 8px 24px rgba(0, 0, 0, 0.15)',
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
        <VideoContent 
          reel={reel} 
          categoryColor={categoryColor}
          onVideoClick={handleVideoClick}
        />

        <Box sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '1.5rem',
          background: `linear-gradient(to top, ${muiTheme.palette.mode === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.95)'} 0%, transparent 100%)`,
          backdropFilter: 'blur(10px)',
          zIndex: 5
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Avatar 
              src={reel.avatar} 
              alt={reel.user}
              sx={{ 
                width: 40, 
                height: 40,
                border: `2px solid ${categoryColor}`,
                boxShadow: `0 2px 8px ${categoryColor}40`
              }}
            />
            <Box>
              <Typography 
                variant="subtitle2" 
                sx={{ 
                  fontWeight: 700, 
                  color: muiTheme.palette.text.primary,
                  fontSize: '0.95rem'
                }}
              >
                {reel.user}
              </Typography>
            </Box>
          </Box>

          <Typography variant="body1" sx={{
            fontWeight: 600,
            mb: 0.75,
            color: muiTheme.palette.text.primary,
            fontSize: '0.95rem',
            lineHeight: 1.4,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {reel.title}
          </Typography>

          <Typography variant="body2" sx={{ fontSize: '0.85rem', color: categoryColor, fontWeight: 600, mb: 0.75 }}>
            📍 {(() => {
              const loc = reel.location;
              if (!loc) return 'Location';
              if (typeof loc === 'string') return loc;
              if (typeof loc === 'object' && loc !== null && !Array.isArray(loc)) {
                return loc.timezone || 'Location';
              }
              return String(loc);
            })()}
          </Typography>

          {reel.tags && reel.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {reel.tags.map((tag, idx) => (
                <Chip key={idx} label={tag} size="small" sx={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  fontSize: '0.7rem',
                  height: '24px',
                  fontWeight: 600,
                  border: `1px solid ${categoryColor}40`,
                  '&:hover': { backgroundColor: `${categoryColor}30` }
                }} />
              ))}
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
}
