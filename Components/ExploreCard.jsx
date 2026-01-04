import { useRouter } from 'next/router';
import { Card, CardContent, CardMedia, Typography, Box, Chip, useTheme } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import TerrainIcon from '@mui/icons-material/Terrain';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import themeConfig from '@/src/theme';

const getCategoryColor = (category) => {
  const colors = {
    beaches: themeConfig.colors.beaches.primary,
    mountains: themeConfig.colors.mountains.primary,
    cultural: themeConfig.colors.cultural.primary
  };
  return colors[category] || themeConfig.colors.brand.primary;
};

const getCategoryIcon = (category) => {
  const icons = {
    beaches: <BeachAccessIcon />,
    mountains: <TerrainIcon />,
    cultural: <AccountBalanceIcon />
  };
  return icons[category] || <LocationOnIcon />;
};

export default function ExploreCard({ destination, isHovered, onHover }) {
  const router = useRouter();
  const muiTheme = useTheme();
  const color = getCategoryColor(destination.category);

  return (
    <Card 
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      onClick={() => {
        // Use destination ID if available, otherwise use name
        if (destination._id) {
          router.push(`/package/${destination._id}?category=${destination.category}`);
        } else {
          router.push(`/package/${destination.name.toLowerCase().replace(/\s+/g, '-')}?category=${destination.category}`);
        }
      }}
      sx={{
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: isHovered ? `0 20px 40px ${color}40` : '0 4px 20px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        backgroundColor: muiTheme.palette.background.paper,
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={destination.image}
          alt={destination.name}
          sx={{
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: color,
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
        >
          {getCategoryIcon(destination.category)}
        </Box>
      </Box>
      <CardContent sx={{ padding: '1.5rem' }}>
        <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: '0.5rem', color: muiTheme.palette.text.primary }}>
          {destination.name}
        </Typography>
        <Typography variant="body2" sx={{ color, marginBottom: '1rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <LocationOnIcon sx={{ fontSize: 18 }} />
          {destination.location}
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {destination.tags.map((tag, idx) => (
            <Chip
              key={idx}
              label={tag}
              size="small"
              sx={{
                backgroundColor: `${color}15`,
                color: color,
                fontWeight: 500,
                fontSize: '0.75rem'
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
