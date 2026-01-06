import { Card, Box, Avatar, Typography, Chip, useTheme } from '@mui/material';
import theme from '@/src/theme';

const getCategoryColor = (category) => {
  const colors = {
    beaches: theme.colors.beaches.primary,
    mountains: theme.colors.mountains.primary,
    cultural: theme.colors.cultural.primary,
  };
  return colors[category] || theme.colors.brand.primary;
};

// Helper function to convert video URL to embeddable format
const getEmbedUrl = (url) => {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    const videoId = url.includes('youtu.be') 
      ? url.split('youtu.be/')[1]?.split('?')[0]
      : url.split('v=')[1]?.split('&')[0];
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1` : url;
  }
  
  // Google Drive
  if (url.includes('drive.google.com')) {
    const fileId = url.match(/\/d\/([^/]+)/)?.[1] || url.match(/id=([^&]+)/)?.[1];
    return fileId ? `https://drive.google.com/file/d/${fileId}/preview?autoplay=1` : url;
  }
  
  // Instagram (note: Instagram embeds have limitations)
  if (url.includes('instagram.com')) {
    return url.replace('/reel/', '/p/') + 'embed';
  }
  
  return url;
};

const VideoContent = ({ reel, isPlaying, categoryColor }) => (
  isPlaying ? (
    <iframe
      src={getEmbedUrl(reel.video)}
      style={{ width: '100%', height: '100%', border: 'none' }}
      allow="autoplay; encrypted-media; fullscreen"
      allowFullScreen
    />
  ) : (
    <Box sx={{
      width: '100%',
      height: '100%',
      backgroundImage: `url(${reel.thumbnail || '/placeholder-video.jpg'})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(to bottom, transparent 0%, ${categoryColor}15 50%, rgba(0,0,0,0.4) 100%)`
      }
    }}>
      <Box sx={{
        position: 'relative',
        zIndex: 1,
        width: 60,
        height: 60,
        borderRadius: '50%',
        backgroundColor: 'rgba(255,255,255,0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px'
      }}>
        ▶
      </Box>
    </Box>
  )
);

export default function ReelCard({ reel, isHovered, isPlaying, onHover, onClick }) {
  const muiTheme = useTheme();
  const categoryColor = getCategoryColor(reel.category);
  
  const handleCardClick = () => {
    if (onClick) {
      onClick(reel);
    } else if (reel.video) {
      // Open video in new tab if no custom onClick handler
      window.open(reel.video, '_blank');
    }
  };

  return (
    <Card 
      onMouseEnter={() => onHover(reel.id, true)}
      onMouseLeave={() => onHover(reel.id, false)}
      onClick={handleCardClick}
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
        <VideoContent reel={reel} isPlaying={isPlaying} categoryColor={categoryColor} />

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
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Avatar sx={{
              width: 40,
              height: 40,
              mr: 1.5,
              border: `2px solid ${categoryColor}`,
              boxShadow: `0 2px 8px ${categoryColor}40`,
              bgcolor: categoryColor,
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem'
            }}>
              {reel.uploaderName ? reel.uploaderName.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 700, color: muiTheme.palette.text.primary, fontSize: '1rem', lineHeight: 1.2 }}>
                {reel.uploaderName || 'User'}
              </Typography>
              <Typography variant="caption" sx={{ color: muiTheme.palette.text.secondary, fontSize: '0.75rem' }}>
                {new Date(reel.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>

          {reel.caption && (
            <Typography variant="h6" sx={{
              fontWeight: 700,
              mb: 0.75,
              fontSize: '1rem',
              color: muiTheme.palette.text.primary,
              textShadow: muiTheme.palette.mode === 'dark' ? 'none' : '0 1px 2px rgba(0,0,0,0.05)'
            }}>
              {reel.caption}
            </Typography>
          )}

          {reel.location && (
            <Typography variant="body2" sx={{ fontSize: '0.85rem', color: categoryColor, fontWeight: 600, mb: 0.75 }}>
              📍 {reel.location}
            </Typography>
          )}

          {reel.tags && reel.tags.length > 0 && (
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
              {reel.tags.map((tag, idx) => (
                <Chip key={idx} label={tag} size="small" sx={{
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  fontSize: '0.7rem',
                  height: '22px',
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
