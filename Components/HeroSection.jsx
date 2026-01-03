import { Button, Typography, Box, Container, useTheme } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import themeConfig from '@/src/theme';

export default function HeroSection({ onUploadClick }) {
  const muiTheme = useTheme();
  
  return (
    <Box component="section">
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', padding: { xs: '2rem 0', md: '2rem 0' } }}>
          <Typography 
            variant="h2" 
            sx={{
              fontFamily: themeConfig.typography.fontFamily.primary,
              fontWeight: 800,
              marginBottom: '1rem',
              color: muiTheme.palette.text.primary,
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Travel <span style={{ color: themeConfig.colors.brand.primary }}>Moments</span>
          </Typography>
          <Typography variant="h6" sx={{ marginBottom: '2rem', color: muiTheme.palette.text.secondary, fontWeight: 400 }}>
            Share your adventures and inspire fellow travelers
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={onUploadClick}
            sx={{
              backgroundColor: themeConfig.colors.brand.primary,
              padding: '14px 32px',
              borderRadius: '50px',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0 8px 24px rgba(75, 140, 168, 0.3)',
              '&:hover': {
                backgroundColor: themeConfig.colors.brand.primary,
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
  );
}
