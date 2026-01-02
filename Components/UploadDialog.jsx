import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box } from '@mui/material';
import theme from '@/src/theme';

export default function UploadDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
        Share Your Travel Moment
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
          <TextField fullWidth label="Video Title" placeholder="Enter a catchy title..." variant="outlined" />
          <TextField fullWidth label="Location" placeholder="Where was this taken?" variant="outlined" />
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
        <Button onClick={onClose} sx={{ color: theme.colors.text.secondary }}>Cancel</Button>
        <Button 
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: theme.colors.brand.primary,
            padding: '10px 24px',
            borderRadius: '12px',
            '&:hover': { backgroundColor: theme.colors.brand.primary }
          }}
        >
          Share Moment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

