// Theme configuration for Backpackers Travel Website
// Centralized color palette and typography settings

const theme = {
  // Color Palette
  colors: {
    // Beaches Theme - Ocean blues and aqua
    beaches: {
      primary: '#00a8cc',      // Turquoise blue
      secondary: '#0dcaf0',    // Light cyan
      dark: '#006d8f',         // Deep ocean blue
      light: '#e0f7fa',        // Light aqua
      accent: '#80deea',       // Soft cyan
    },
    
    // Mountains Theme - Earthy greens and browns
    mountains: {
      primary: '#2d5016',      // Forest green
      secondary: '#4a7c2c',    // Moss green
      dark: '#1b3209',         // Dark forest
      light: '#f1f8e9',        // Light mint
      accent: '#689f38',       // Fresh green
    },
    
    // Cultural & Heritage Theme - Rich browns and golds
    cultural: {
      primary: '#8b4513',      // Saddle brown
      secondary: '#d2691e',    // Chocolate
      dark: '#5c2e0a',         // Dark brown
      light: '#fff8dc',        // Cornsilk
      accent: '#daa520',       // Goldenrod
    },
    
    // Common Colors
    text: {
      primary: '#171717',      // Almost black
      secondary: '#ffffff',    // White (for dark backgrounds)
      light: '#999999',        // Light gray
      white: '#ffffff',        // Pure white
      muted: '#666666',        // Muted gray
    },
    
    background: {
      primary: '#ffffff',      // White
      secondary: '#f9f9f9',    // Off white
      dark: '#0f1a24',         // Dark blue-black
      main: '#ffffff',         // Main background
    },
    
    primary: {
      main: '#4b8ca8',         // Main primary color
      light: '#6ba3bd',        // Light primary
      dark: '#3a7a8f',         // Dark primary
      gradient: 'linear-gradient(135deg, #4b8ca8 0%, #3a7a8f 100%)',
    },
    
    status: {
      success: '#4caf50',      // Green
      warning: '#ffd700',      // Gold
      error: '#f44336',        // Red
      info: '#2196f3',         // Blue
    },
    
    // Main brand color
    brand: {
      primary: '#4b8ca8',      // Teal blue
      secondary: '#ffd700',    // Gold
    }
  },
  
  // Typography
  typography: {
    fontFamily: {
      primary: "'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
      secondary: "'Inter', 'Arial', sans-serif",
      heading: "'Montserrat', 'Poppins', sans-serif",
    },
  },
  
  // Fonts (alias for compatibility)
  fonts: {
    primary: "'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
    secondary: "'Inter', 'Arial', sans-serif",
    heading: "'Montserrat', 'Poppins', sans-serif",
  },
  
  // Original typography object
  typographyOld: {
    fontFamily: {
      primary: "'Poppins', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif",
      secondary: "'Inter', 'Arial', sans-serif",
      heading: "'Montserrat', 'Poppins', sans-serif",
    },
    
    fontSize: {
      xs: '0.75rem',      // 12px
      sm: '0.875rem',     // 14px
      base: '1rem',       // 16px
      lg: '1.125rem',     // 18px
      xl: '1.25rem',      // 20px
      '2xl': '1.5rem',    // 24px
      '3xl': '1.875rem',  // 30px
      '4xl': '2.25rem',   // 36px
      '5xl': '3rem',      // 48px
      '6xl': '3.75rem',   // 60px
      '7xl': '4.5rem',    // 72px
    },
    
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
    
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.6,
      loose: 1.8,
    }
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',      // 8px
    sm: '1rem',        // 16px
    md: '1.5rem',      // 24px
    lg: '2rem',        // 32px
    xl: '3rem',        // 48px
    '2xl': '4rem',     // 64px
    '3xl': '6rem',     // 96px
  },
  
  // Border Radius
  borderRadius: {
    sm: '0.5rem',      // 8px
    md: '0.75rem',     // 12px
    lg: '1rem',        // 16px
    xl: '1.5rem',      // 24px
    '2xl': '2rem',     // 32px
    full: '9999px',    // Fully rounded
  },
  
  // Shadows
  shadows: {
    sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
    md: '0 4px 20px rgba(0, 0, 0, 0.1)',
    lg: '0 8px 24px rgba(0, 0, 0, 0.15)',
    xl: '0 12px 40px rgba(0, 0, 0, 0.2)',
    '2xl': '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  
  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
  
  // Breakpoints
  breakpoints: {
    xs: '480px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  }
};

export default theme;

