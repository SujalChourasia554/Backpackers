import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Container, Button, IconButton, CircularProgress, Card, CardContent, Grid } from "@mui/material";
import Navbar from "@/Components/LandingPageComponents/Navbar";
import themeConfig from "@/src/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BudgetCard from "@/Components/customize/BudgetCard";
import OptionsGrid from "@/Components/customize/OptionsGrid";
import OptionCard from "@/Components/customize/OptionCard";
import ItineraryEditor from "@/Components/customize/ItineraryEditor";

export default function CustomizePage() {
  const router = useRouter();
  const { itinerary: packageId } = router.query;
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [selectedLocalGems, setSelectedLocalGems] = useState([]);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(0);
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [destinationItems, setDestinationItems] = useState({
    stays: [],
    foodSpots: [],
    localGems: [],
    activities: []
  });

  // Fetch package data and destination items from API
  useEffect(() => {
    if (!router.isReady || !packageId) return;

    const fetchPackageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/v1/packages/${packageId}`);
        
        if (!response.ok) {
          throw new Error('Package not found');
        }

        const data = await response.json();
        
        if (data.message === "OK" && data.response) {
          // Fetch destination data with all items
          let destination = null;
          if (data.response.destinationId) {
            try {
              const destResponse = await fetch(`/api/v1/destination/${data.response.destinationId}`);
              if (destResponse.ok) {
                const destData = await destResponse.json();
                destination = destData.response;
                
                // Store all destination items for customization options
                const items = {
                  stays: destData.response.stays || [],
                  foodSpots: destData.response.foodSpots || [],
                  localGems: destData.response.localGems || [],
                  activities: destData.response.activities || []
                };
                console.log('📦 Fetched destination items:', {
                  stays: items.stays.length,
                  foodSpots: items.foodSpots.length,
                  localGems: items.localGems.length,
                  activities: items.activities.length
                });
                setDestinationItems(items);
              }
            } catch (err) {
              console.warn('Could not fetch destination:', err);
            }
          }
          
          // Transform backend data to match expected format
          const transformedData = transformPackageData(data.response, destination);
          setPackageData(transformedData);
        } else {
          throw new Error('Invalid package data');
        }
      } catch (err) {
        console.error('Error fetching package:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [router.isReady, packageId]);

  // Transform backend package data to frontend format
  const transformPackageData = (backendData, destination = null) => {
    const pkg = backendData;
    const defaultItems = backendData.defaultItems || {};
    
    // Create included items from destination items
    const includedItems = [];
    
    // Add hotel/stay
    if (defaultItems.stays && defaultItems.stays.length > 0) {
      const stay = defaultItems.stays[0];
      includedItems.push({
        title: "Accommodation",
        description: [
          stay.description || "Comfortable accommodation",
          `Category: ${stay.category || 'Standard'}`,
          `Budget: ₹${stay.price?.toLocaleString() || '0'}/night`,
          `Rating: ${stay.rating || 0}/5 (${stay.totalReviews || 0} reviews)`
        ],
        image: stay.image?.[0] || "/images/hotel-placeholder.jpg",
        icon: "🏨"
      });
    }

    // Add restaurants/foodspots
    if (defaultItems.foodSpots && defaultItems.foodSpots.length > 0) {
      const foodspot = defaultItems.foodSpots[0];
      includedItems.push({
        title: "Dining",
        description: [
          foodspot.description || "Local cuisine and dining",
          `Budget: ₹${foodspot.price?.toLocaleString() || '0'}/day`,
          `Rating: ${foodspot.rating || 0}/5 (${foodspot.totalReviews || 0} reviews)`
        ],
        image: foodspot.image?.[0] || "/images/food-placeholder.jpg",
        icon: "🍽️"
      });
    }

    // Add activities
    if (defaultItems.activities && defaultItems.activities.length > 0) {
      includedItems.push({
        title: "Activities",
        description: defaultItems.activities.map(activity => 
          `${activity.name}${activity.price > 0 ? ` - ₹${activity.price}` : ' - Free'}`
        ),
        image: defaultItems.activities[0].image?.[0] || "/images/activity-placeholder.jpg",
        icon: "🎯"
      });
    }

    // Transform itinerary days
    const itineraryDays = (pkg.itinerary || []).map(day => ({
      day: day.dayNumber,
      title: day.title || `Day ${day.dayNumber}`,
      activities: day.activities || []
    }));

    return {
      name: pkg.name,
      description: pkg.description,
      heroImage: pkg.images?.[0] || destination?.images?.[0] || "/images/default-hero.jpg",
      budget: `₹${pkg.budgetPerDay?.toLocaleString() || '0'}/day per person`,
      includedItems,
      itineraryDays,
      totalDays: pkg.totalDays || 3,
      budgetPerDay: pkg.budgetPerDay || 0
    };
  };

  // Transform destination items to match the format expected by OptionsGrid
  // Filter by budget - items should be affordable per day
  const budgetPerDay = packageData?.budgetPerDay || 2000;
  
  const hotels = destinationItems.stays
    .filter(stay => stay.price <= budgetPerDay * 0.6) // Hotels should be max 60% of daily budget
    .map(stay => ({
      id: stay._id,
      name: stay.name,
      description: [
        stay.description || "Comfortable accommodation",
        `Category: ${stay.category || 'Standard'}`,
        `${stay.totalReviews || 0} reviews`
      ],
      image: stay.image?.[0] || "/images/hotel-placeholder.jpg",
      price: stay.price,
      rating: stay.rating || 0,
      category: stay.category || "Standard",
      reviews: stay.totalReviews || 0
    }))
    .sort((a, b) => b.rating - a.rating); // Sort by rating

  const restaurants = destinationItems.foodSpots
    .filter(food => food.price <= budgetPerDay * 0.3) // Food should be max 30% of daily budget
    .map(food => ({
      id: food._id,
      name: food.name,
      description: [
        food.description || "Local cuisine",
        `${food.totalReviews || 0} reviews`
      ],
      image: food.image?.[0] || "/images/food-placeholder.jpg",
      price: food.price,
      rating: food.rating || 0,
      reviews: food.totalReviews || 0
    }))
    .sort((a, b) => b.rating - a.rating);

  const activities = destinationItems.activities
    .filter(activity => activity.price <= budgetPerDay * 0.4) // Activities max 40% of budget
    .map(activity => ({
      id: activity._id,
      name: activity.name,
      description: [
        activity.description || "Exciting activity",
        `${activity.totalReviews || 0} reviews`
      ],
      image: activity.image?.[0] || "/images/activity-placeholder.jpg",
      price: activity.price,
      rating: activity.rating || 0,
      reviews: activity.totalReviews || 0
    }))
    .sort((a, b) => b.rating - a.rating);

  const localGems = destinationItems.localGems
    .filter(gem => gem.price <= budgetPerDay * 0.2) // Local gems should be affordable
    .map(gem => ({
      id: gem._id,
      name: gem.name,
      description: [
        gem.description || "Hidden gem",
        `${gem.totalReviews || 0} reviews`
      ],
      image: gem.image?.[0] || "/images/gem-placeholder.jpg",
      price: gem.price,
      rating: gem.rating || 0,
      reviews: gem.totalReviews || 0
    }))
    .sort((a, b) => b.rating - a.rating);

  const numberOfDays = customizedItinerary?.length || packageData?.itineraryDays?.length || 1;

  // Debug logging
  if (packageData && destinationItems.stays.length > 0) {
    console.log('💰 Budget filtering:', {
      budgetPerDay,
      maxHotelPrice: budgetPerDay * 0.6,
      maxFoodPrice: budgetPerDay * 0.3,
      maxActivityPrice: budgetPerDay * 0.4,
      maxGemPrice: budgetPerDay * 0.2,
      filteredCounts: {
        hotels: hotels.length,
        restaurants: restaurants.length,
        activities: activities.length,
        localGems: localGems.length
      }
    });
  }

  useEffect(() => {
    if (packageData?.budget) {
      const budgetMatch = packageData.budget.match(/₹([\d,]+)/);
      if (budgetMatch) {
        setBudgetLimit(parseInt(budgetMatch[1].replace(/,/g, "")));
      }
    }
  }, [packageData]);

  useEffect(() => {
    if (!router.isReady || !packageId || typeof window === "undefined" || !packageData) return;

    const hotelId = router.query.hotel || localStorage.getItem(`${packageId}_hotel`);
    const restaurantId = router.query.restaurant || localStorage.getItem(`${packageId}_restaurant`);

    if (hotelId) setSelectedHotel(hotelId);
    if (restaurantId) setSelectedRestaurant(restaurantId);

    const savedItinerary = localStorage.getItem(`${packageId}_itinerary`);
    if (savedItinerary) {
      try {
        setCustomizedItinerary(JSON.parse(savedItinerary));
      } catch (e) {
        console.error("Error parsing saved itinerary:", e);
      }
    } else if (packageData?.itineraryDays) {
      setCustomizedItinerary([...packageData.itineraryDays]);
    }
  }, [router.isReady, router.query, packageId, packageData]);

  useEffect(() => {
    let total = 0;
    const selectedHotelData = hotels.find((h) => h.id === selectedHotel);
    const selectedRestaurantData = restaurants.find((r) => r.id === selectedRestaurant);

    if (selectedHotelData) total += selectedHotelData.price * numberOfDays;
    if (selectedRestaurantData) total += selectedRestaurantData.price * numberOfDays;

    // Add selected activities cost
    selectedActivities.forEach(activityId => {
      const activity = activities.find(a => a.id === activityId);
      if (activity) total += activity.price;
    });

    // Add selected local gems cost
    selectedLocalGems.forEach(gemId => {
      const gem = localGems.find(g => g.id === gemId);
      if (gem) total += gem.price;
    });

    setTotalBudget(total);
  }, [selectedHotel, selectedRestaurant, selectedActivities, selectedLocalGems, hotels, restaurants, activities, localGems, numberOfDays]);

  const handleSave = () => {
    // Save to localStorage
    if (typeof window !== "undefined") {
      if (selectedHotel) {
        localStorage.setItem(`${packageId}_hotel`, selectedHotel);
      }
      if (selectedRestaurant) {
        localStorage.setItem(`${packageId}_restaurant`, selectedRestaurant);
      }
      if (selectedActivities.length > 0) {
        localStorage.setItem(`${packageId}_activities`, JSON.stringify(selectedActivities));
      }
      if (selectedLocalGems.length > 0) {
        localStorage.setItem(`${packageId}_localGems`, JSON.stringify(selectedLocalGems));
      }
      if (customizedItinerary) {
        localStorage.setItem(`${packageId}_itinerary`, JSON.stringify(customizedItinerary));
      }
    }

    // Build query params for redirect
    const queryParams = [];
    if (selectedHotel) queryParams.push(`hotel=${selectedHotel}`);
    if (selectedRestaurant) queryParams.push(`restaurant=${selectedRestaurant}`);
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    
    if (packageId) {
      router.push(`/itinerary/${packageId}${queryString}`);
    }
  };

  const handleItineraryChange = (dayIndex, activityIndex, newValue) => {
    // Create a deep copy of the itinerary
    const updated = customizedItinerary.map(day => ({
      ...day,
      activities: [...day.activities]
    }));
    updated[dayIndex].activities[activityIndex] = newValue;
    setCustomizedItinerary(updated);
  };

  const handleAddActivity = (dayIndex) => {
    // Create a deep copy of the itinerary
    const updated = customizedItinerary.map(day => ({
      ...day,
      activities: [...day.activities]
    }));
    updated[dayIndex].activities.push("");
    setCustomizedItinerary(updated);
  };

  const handleRemoveActivity = (dayIndex, activityIndex) => {
    // Create a deep copy of the itinerary
    const updated = customizedItinerary.map(day => ({
      ...day,
      activities: [...day.activities]
    }));
    
    // Remove the activity
    updated[dayIndex].activities.splice(activityIndex, 1);
    
    // Check if this day has no activities left
    if (updated[dayIndex].activities.length === 0) {
      // Remove the entire day
      updated.splice(dayIndex, 1);
      
      // Update day numbers for all remaining days
      for (let i = 0; i < updated.length; i++) {
        updated[i].day = i + 1;
      }
    }
    
    setCustomizedItinerary(updated);
  };

  const handleRemoveDay = (dayIndex) => {
    // Create a deep copy of the itinerary
    const updated = customizedItinerary.map(day => ({
      ...day,
      activities: [...day.activities]
    }));
    
    // Remove the day
    updated.splice(dayIndex, 1);
    
    // Update day numbers for all remaining days
    for (let i = 0; i < updated.length; i++) {
      updated[i].day = i + 1;
    }
    
    setCustomizedItinerary(updated);
  };

  const handleAddDay = () => {
    // Create a deep copy of the itinerary
    const updated = customizedItinerary.map(day => ({
      ...day,
      activities: [...day.activities]
    }));
    
    // Add a new day at the end
    const newDay = {
      day: updated.length + 1,
      title: "New Day",
      activities: ["Add your activities here"]
    };
    
    updated.push(newDay);
    setCustomizedItinerary(updated);
  };

  const handleDayTitleChange = (dayIndex, newTitle) => {
    // Create a deep copy of the itinerary
    const updated = customizedItinerary.map(day => ({
      ...day,
      activities: [...day.activities]
    }));
    updated[dayIndex].title = newTitle;
    setCustomizedItinerary(updated);
  };

  if (!router.isReady || !packageId || loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress size={60} sx={{ color: themeConfig.colors.brand.primary }} />
        <Typography sx={{ mt: 2, ml: 2 }}>Loading package...</Typography>
      </Box>
    );
  }

  if (error || !packageData) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, padding: 3 }}>
        <Typography variant="h5">Package not found</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {error || `The package "${packageId}" could not be found.`}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
          <Button variant="outlined" onClick={() => router.back()}>
            Go Back
          </Button>
          <Button variant="contained" onClick={() => router.push('/')}>
            Go to Home
          </Button>
        </Box>
      </Box>
    );
  }

  const isWithinBudget = totalBudget <= budgetLimit * numberOfDays;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: themeConfig.colors.background.main,
        position: "relative",
        fontFamily: themeConfig.fonts.primary,
        overflowX: "hidden",
        paddingTop: "100px",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `linear-gradient(135deg, ${themeConfig.colors.background.main} 0%, #e0f2fe 100%)`,
          zIndex: 0,
          opacity: 0.5,
        }}
      />

      <Navbar />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, paddingBottom: "60px" }}>
        <Box sx={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
          <IconButton
            onClick={() => router.push(`/itinerary/${packageId}`)}
            sx={{
              marginRight: "16px",
              color: themeConfig.colors.primary.main,
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "32px", md: "40px" },
              fontWeight: 700,
              color: themeConfig.colors.text.primary,
              fontFamily: themeConfig.fonts.heading,
            }}
          >
            Customize Your {packageData.name} Trip
          </Typography>
        </Box>

        <BudgetCard
          totalBudget={totalBudget}
          budgetLimit={budgetLimit * numberOfDays}
          isWithinBudget={isWithinBudget}
        />

        <OptionsGrid
          title="Choose Your Hotel"
          options={hotels}
          selectedId={selectedHotel}
          onSelect={setSelectedHotel}
          priceLabel="/night"
          budgetLimit={budgetLimit * numberOfDays}
          numberOfDays={numberOfDays}
        />

        <OptionsGrid
          title="Choose Your Restaurant"
          options={restaurants}
          selectedId={selectedRestaurant}
          onSelect={setSelectedRestaurant}
          priceLabel="/day"
          budgetLimit={budgetLimit * numberOfDays}
          numberOfDays={numberOfDays}
        />

        {activities.length > 0 && (
          <Card sx={{ marginBottom: "32px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)" }}>
            <CardContent sx={{ padding: "28px !important" }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: themeConfig.colors.text.primary,
                  marginBottom: "16px",
                  fontFamily: themeConfig.fonts.heading,
                }}
              >
                Available Activities
              </Typography>
              <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted, marginBottom: "24px" }}>
                Select activities to add to your itinerary (within budget: ₹{(budgetPerDay * 0.4).toLocaleString()}/day)
              </Typography>
              <Grid container spacing={3}>
                {activities.map((activity) => (
                  <Grid item xs={12} sm={6} md={3} key={activity.id}>
                    <OptionCard
                      option={activity}
                      isSelected={selectedActivities.includes(activity.id)}
                      onSelect={() => {
                        setSelectedActivities(prev => 
                          prev.includes(activity.id) 
                            ? prev.filter(id => id !== activity.id)
                            : [...prev, activity.id]
                        );
                      }}
                      priceLabel={`₹${activity.price.toLocaleString()}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        {localGems.length > 0 && (
          <Card sx={{ marginBottom: "32px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)" }}>
            <CardContent sx={{ padding: "28px !important" }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: themeConfig.colors.text.primary,
                  marginBottom: "16px",
                  fontFamily: themeConfig.fonts.heading,
                }}
              >
                Local Gems & Hidden Spots
              </Typography>
              <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted, marginBottom: "24px" }}>
                Discover hidden gems (within budget: ₹{(budgetPerDay * 0.2).toLocaleString()}/day)
              </Typography>
              <Grid container spacing={3}>
                {localGems.map((gem) => (
                  <Grid item xs={12} sm={6} md={3} key={gem.id}>
                    <OptionCard
                      option={gem}
                      isSelected={selectedLocalGems.includes(gem.id)}
                      onSelect={() => {
                        setSelectedLocalGems(prev => 
                          prev.includes(gem.id) 
                            ? prev.filter(id => id !== gem.id)
                            : [...prev, gem.id]
                        );
                      }}
                      priceLabel={`₹${gem.price.toLocaleString()}`}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        )}

        <ItineraryEditor
          itinerary={customizedItinerary}
          onItineraryChange={handleItineraryChange}
          onAddActivity={handleAddActivity}
          onRemoveActivity={handleRemoveActivity}
          onRemoveDay={handleRemoveDay}
          onAddDay={handleAddDay}
          onDayTitleChange={handleDayTitleChange}
        />

        <Box sx={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "32px" }}>
          <Button
            variant="outlined"
            onClick={() => router.push(`/itinerary/${packageId}`)}
            sx={{
              borderColor: themeConfig.colors.primary.main,
              color: themeConfig.colors.primary.main,
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "10px",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              backgroundColor: themeConfig.colors.primary.main,
              color: themeConfig.colors.text.secondary,
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: 600,
              borderRadius: "10px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: themeConfig.colors.primary.light,
              },
            }}
          >
            Save Customizations
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

