import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, IconButton, Tabs, Tab } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import YouTubeIcon from '@mui/icons-material/YouTube';
import theme from '@/src/theme';

export default function UploadDialog({ open, onClose }) {
  const [uploadType, setUploadType] = useState(0); // 0 = Local File, 1 = YouTube URL
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadType(0);
    onClose();
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
            <Tab 
              icon={<CloudUploadIcon />} 
              label="Upload Video" 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
            <Tab 
              icon={<YouTubeIcon />} 
              label="YouTube URL" 
              iconPosition="start"
              sx={{ fontWeight: 600 }}
            />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField fullWidth label="Video Title" placeholder="Enter a catchy title..." variant="outlined" />
          <TextField fullWidth label="Location" placeholder="Where was this taken?" variant="outlined" />
          
          {uploadType === 0 ? (
            <Box>
              <Button
                component="label"
                variant="outlined"
                fullWidth
                startIcon={<CloudUploadIcon />}
                sx={{
                  padding: '3rem 2rem',
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: theme.colors.brand.primary,
                  color: theme.colors.brand.primary,
                  '&:hover': {
                    borderWidth: 2,
                    borderStyle: 'dashed',
                    backgroundColor: 'rgba(75, 140, 168, 0.05)',
                  }
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                    {selectedFile ? selectedFile.name : 'Click to Upload Video'}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    MP4, MOV, AVI (Max 100MB)
                  </Typography>
                </Box>
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={handleFileChange}
                />
              </Button>
              
              {previewUrl && (
                <Box sx={{ mt: 2, borderRadius: '12px', overflow: 'hidden' }}>
                  <video
                    src={previewUrl}
                    controls
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                  />
                </Box>
              )}
            </Box>
          ) : (
            <TextField 
              fullWidth 
              label="YouTube Video URL" 
              placeholder="https://youtube.com/watch?v=..." 
              variant="outlined" 
              helperText="Paste your YouTube video link here" 
            />
          )}
          
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
        <Button onClick={handleClose} sx={{ color: theme.colors.text.secondary }}>Cancel</Button>
        <Button 
          variant="contained"
          onClick={handleClose}
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
