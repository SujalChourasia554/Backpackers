import theme from '@/src/theme';

export const getDestinationName = (destination) => {
  if (!destination) return 'Destination';
  try {
    return destination.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } catch (e) {
    console.error('Error formatting destination name:', e);
    return 'Destination';
  }
};

export const getThemeColors = (category) => {
  const categoryColors = {
    beaches: theme.colors.beaches,
    mountains: theme.colors.mountains,
    cultural: theme.colors.cultural
  };

  return categoryColors[category] || {
    primary: theme.colors.brand.primary,
    dark: theme.colors.brand.primary,
    light: '#e0f7fa',
    accent: '#80deea',
  };
};

export const getHeroImage = (category) => {
  const heroImages = {
    beaches: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1920&h=1080&fit=crop&q=80',
    mountains: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop&q=80',
    cultural: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920&h=1080&fit=crop&q=80'
  };
  return heroImages[category] || heroImages.beaches;
};

export const getPackageImages = (category) => {
  const imageMap = {
    beaches: {
      budget: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop&q=80',
      premium: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&h=600&fit=crop&q=80',
      luxury: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop&q=80'
    },
    mountains: {
      budget: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
      premium: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&q=80',
      luxury: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop&q=80'
    },
    cultural: {
      budget: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&h=600&fit=crop&q=80',
      premium: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=600&fit=crop&q=80',
      luxury: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop&q=80'
    }
  };
  return imageMap[category] || imageMap.beaches;
};

export const getPackageData = (destinationName, packageImages) => [
  {
    title: `${destinationName} Budget Trip`,
    duration: '3 Days',
    price: 8000,
    image: packageImages.budget,
    features: ['Budget Hotels', 'Local Transport', 'Basic Meals', 'Sightseeing']
  },
  {
    title: `${destinationName} Standard Package`,
    duration: '4 Days',
    price: 12000,
    image: packageImages.premium,
    features: ['3-Star Hotels', 'AC Transport', 'Breakfast & Dinner', 'City Tours']
  },
  {
    title: `${destinationName} Premium Trip`,
    duration: '5 Days',
    price: 15000,
    image: packageImages.premium,
    features: ['Premium Hotels', 'Private Cab', 'All Meals', 'Guided Tours', 'Adventure Activities']
  },
  {
    title: `${destinationName} Deluxe Package`,
    duration: '6 Days',
    price: 20000,
    image: packageImages.luxury,
    features: ['4-Star Hotels', 'Luxury Car', 'Fine Dining', 'Exclusive Tours', 'Spa Access']
  },
  {
    title: `${destinationName} Luxury Experience`,
    duration: '7 Days',
    price: 25000,
    image: packageImages.luxury,
    features: ['5-Star Hotels', 'Luxury Transport', 'Fine Dining', 'Spa & Wellness', 'Exclusive Experiences']
  },
  {
    title: `${destinationName} Ultimate Escape`,
    duration: '10 Days',
    price: 35000,
    image: packageImages.luxury,
    features: ['Ultra-Luxury Resorts', 'Private Chauffeur', 'Gourmet Meals', 'VIP Experiences', 'Helicopter Tours']
  }
];

export const getPackageRoute = (destinationName) => {
  const packageMap = {
    'goa': 'goa',
    'goa beaches': 'goa',
    'manali': 'manali',
    'hampi': 'hampi',
    'maldives': 'goa',
    'andaman islands': 'goa',
    'kerala beaches': 'goa',
    'phuket': 'goa',
    'bali beaches': 'goa',
    'leh-ladakh': 'manali',
    'kasol': 'manali',
    'shimla': 'manali',
    'darjeeling': 'manali',
    'mussoorie': 'manali',
    'varanasi': 'hampi',
    'jaipur': 'hampi',
    'khajuraho': 'hampi',
    'ajanta & ellora': 'hampi',
    'mysore': 'hampi'
  };
  
  return packageMap[destinationName.toLowerCase()] || 'goa';
};

