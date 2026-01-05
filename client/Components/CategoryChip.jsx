import { Chip, useTheme } from '@mui/material';

export default function CategoryChip({ label, icon, isSelected, onClick, color }) {
  const muiTheme = useTheme();
  
  return (
    <Chip
      label={label}
      icon={icon}
      onClick={onClick}
      sx={{
        padding: '24px 16px',
        fontSize: '1rem',
        fontWeight: 600,
        backgroundColor: isSelected ? color : muiTheme.palette.background.paper,
        color: isSelected ? 'white' : muiTheme.palette.text.primary,
        '&:hover': {
          backgroundColor: isSelected ? color : muiTheme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
        },
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
    />
  );
}
