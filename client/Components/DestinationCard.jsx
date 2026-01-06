import { useRouter } from 'next/router';
import { Card, CardContent, CardMedia, Typography, Box, useTheme } from '@mui/material';
import theme from '@/src/theme';

export default function DestinationCard({ destination, category, isHovered, onHover, icon: Icon }) {
  const router = useRouter();
  const muiTheme = useTheme();
  const colors = theme.colors[category];

  return (
    <Card 
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={() => {
        // Use destination ID if available, otherwise use name
        if (destination._id) {
          router.push(`/itinerary/${destination._id}?category=${category}`);
        } else {
          router.push(`/itinerary/${destination.name.toLowerCase().replace(/\s+/g, '-')}?category=${category}`);
        }
      }}
      sx={{
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${colors.primary}4D` : '0 4px 20px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        background: muiTheme.palette.background.paper,
      }}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          component="div"
          sx={{
            height: 250,
            backgroundImage: `url(${destination.image || destination.images?.[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </Box>
      <CardContent sx={{ padding: '1.5rem' }}>
        <Typography variant="h5" component="h3" sx={{ fontWeight: 700, mb: 0.5, color: muiTheme.palette.text.primary, fontFamily: theme.typography.fontFamily.primary }}>
          {destination.name}
        </Typography>
        <Typography variant="body2" sx={{ color: colors.primary, mb: 1, fontWeight: 500 }}>
          📍 {(() => {
            const loc = destination.location;
            if (!loc) return `${destination.name}, ${destination.state || 'India'}`;
            if (typeof loc === 'string') return loc;
            if (typeof loc === 'object' && loc !== null && !Array.isArray(loc)) {
              return `${destination.name}, ${destination.state || 'India'}`;
            }
            return String(loc);
          })()}
        </Typography>
        <Typography variant="body2" sx={{ color: muiTheme.palette.text.secondary, lineHeight: 1.6 }}>
          {destination.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

