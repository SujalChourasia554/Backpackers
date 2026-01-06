import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, IconButton, Tabs, Tab } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import theme from '@/src/theme';

export default function UploadDialog({ open, onClose, onSuccess }) {
  const [uploadType, setUploadType] = useState(0);
  const [formData, setFormData] = useState({
    userName: '',
    videoUrl: '',
    caption: '',
    location: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleClose = () => {
    setFormData({ userName: '', videoUrl: '', caption: '', location: '', tags: '' });
    setUploadType(0);
    setError('');
    onClose();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate name
      if (!formData.userName.trim()) {
        setError('Please enter your name');
        setLoading(false);
        return;
      }

      // Validate URL
      if (!formData.videoUrl.trim()) {
        setError('Please provide a video URL');
        setLoading(false);
        return;
      }

      // Get token from localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to share moments');
        setLoading(false);
        return;
      }

      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
      const response = await fetch(`${API_BASE_URL}/api/v1/moments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userName: formData.userName.trim(),
          videoUrl: formData.videoUrl.trim(),
          caption: formData.caption.trim(),
          location: formData.location.trim(),
          tags: formData.tags.trim()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create moment');
      }

      // Success
      if (onSuccess) {
        onSuccess(data.moment);
      }
      
      handleClose();
    } catch (err) {
      console.error('Error creating moment:', err);
      setError(err.message || 'Failed to create moment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPlaceholder = () => {
    switch (uploadType) {
      case 0:
        return 'https://youtube.com/watch?v=...';
      case 1:
        return 'https://drive.google.com/file/d/...';
      case 2:
        return 'https://instagram.com/reel/...';
      default:
        return '';
    }
  };

  const getHelperText = () => {
    switch (uploadType) {
      case 0:
        return 'Paste your YouTube video link here';
      case 1:
        return 'Paste your Google Drive video link here (make sure it\'s publicly accessible)';
      case 2:
        return 'Paste your Instagram Reel link here';
      default:
        return '';
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Share Your Travel Moment
        <IconButton onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={uploadType} onChange={(e, newValue) => setUploadType(newValue)} centered>
            <Tab icon={<YouTubeIcon />} label="YouTube URL" iconPosition="start" sx={{ fontWeight: 600 }} />
          </Tabs>
        </Box>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField 
            fullWidth 
            label="Your Name" 
            placeholder="Enter your name"
            variant="outlined" 
            helperText="This will be displayed on your reel"
            value={formData.userName}
            onChange={handleChange('userName')}
            required
          />

          <TextField 
            fullWidth 
            label="Video URL" 
            placeholder={getPlaceholder()}
            variant="outlined" 
            helperText={getHelperText()}
            value={formData.videoUrl}
            onChange={handleChange('videoUrl')}
            required
          />
          
          <TextField 
            fullWidth 
            label="Caption" 
            placeholder="Tell us about your experience..."
            value={formData.caption}
            onChange={handleChange('caption')}
            multiline 
            rows={4} 
            variant="outlined" 
          />

          <TextField 
            fullWidth 
            label="Location" 
            placeholder="Where was this taken?"
            value={formData.location}
            onChange={handleChange('location')}
            variant="outlined" 
          />

          <TextField 
            fullWidth 
            label="Tags" 
            placeholder="beach, sunset, adventure (comma separated)"
            value={formData.tags}
            onChange={handleChange('tags')}
            variant="outlined" 
          />
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ padding: '1.5rem' }}>
        <Button onClick={handleClose} sx={{ color: theme.colors.text.secondary }} disabled={loading}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSubmit} 
          disabled={loading}
          sx={{
            backgroundColor: theme.colors.brand.primary,
            padding: '10px 24px',
            borderRadius: '12px',
            '&:hover': { backgroundColor: theme.colors.brand.primary }
          }}
        >
          {loading ? 'Sharing...' : 'Share Moment'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
