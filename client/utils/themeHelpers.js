// Helper function to get theme-aware colors
export const getThemeColor = (muiTheme, colorPath) => {
  // Map old theme paths to MUI theme palette
  const colorMap = {
    'text.primary': muiTheme.palette.text.primary,
    'text.secondary': muiTheme.palette.text.secondary,
    'text.muted': muiTheme.palette.text.secondary,
    'background.primary': muiTheme.palette.background.default,
    'background.secondary': muiTheme.palette.background.paper,
  };

  return colorMap[colorPath] || colorPath;
};

