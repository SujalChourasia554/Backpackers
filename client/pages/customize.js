import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Container, Button, IconButton } from "@mui/material";
import Navbar from "@/Components/LandingPageComponents/Navbar";
import themeConfig from "@/src/theme";
import { hotelOptions, restaurantOptions } from "@/src/data/customization-options";
import packagesData from "@/src/data/packages";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BudgetCard from "@/Components/customize/BudgetCard";
import OptionsGrid from "@/Components/customize/OptionsGrid";
import ItineraryEditor from "@/Components/customize/ItineraryEditor";

export default function CustomizePage() {
  const router = useRouter();
  const { itinerary: itineraryId } = router.query;
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(0);


  const packageData = itineraryId ? packagesData[itineraryId] : null;
  const hotels = (itineraryId && hotelOptions[itineraryId]) || [];
  const restaurants = (itineraryId && restaurantOptions[itineraryId]) || [];
  const numberOfDays = customizedItinerary?.length || packageData?.itineraryDays?.length || 1;

  useEffect(() => {
    if (packageData?.budget) {
      const budgetMatch = packageData.budget.match(/₹([\d,]+)/);
      if (budgetMatch) {
        setBudgetLimit(parseInt(budgetMatch[1].replace(/,/g, "")));
      }
    }
  }, [packageData]);

  useEffect(() => {
    if (!router.isReady || !itineraryId || typeof window === "undefined") return;

    const hotelId = router.query.hotel || localStorage.getItem(`${itineraryId}_hotel`);
    const restaurantId = router.query.restaurant || localStorage.getItem(`${itineraryId}_restaurant`);

    if (hotelId) setSelectedHotel(hotelId);
    if (restaurantId) setSelectedRestaurant(restaurantId);

    const savedItinerary = localStorage.getItem(`${itineraryId}_itinerary`);
    if (savedItinerary) {
      try {
        setCustomizedItinerary(JSON.parse(savedItinerary));
      } catch (e) {
        console.error("Error parsing saved itinerary:", e);
      }
    } else if (packageData?.itineraryDays) {
      setCustomizedItinerary([...packageData.itineraryDays]);
    }
  }, [router.isReady, router.query, itineraryId, packageData]);

  useEffect(() => {
    let total = 0;
    const selectedHotelData = hotels.find((h) => h.id === selectedHotel);
    const selectedRestaurantData = restaurants.find((r) => r.id === selectedRestaurant);

    if (selectedHotelData) total += selectedHotelData.price * numberOfDays;
    if (selectedRestaurantData) total += selectedRestaurantData.price * numberOfDays;

    if (packageData?.includedItems) {
      const activitiesItem = packageData.includedItems.find((item) => item.title === "Activities");
      if (activitiesItem?.description) {
        activitiesItem.description.forEach((desc) => {
          const priceMatch = desc.match(/₹([\d,]+)/);
          if (priceMatch) {
            total += parseInt(priceMatch[1].replace(/,/g, ""));
          }
        });
      }
    }

    setTotalBudget(total);
  }, [selectedHotel, selectedRestaurant, hotels, restaurants, packageData, numberOfDays]);

  const handleSave = () => {
    // Save to localStorage
    if (typeof window !== "undefined") {
      if (selectedHotel) {
        localStorage.setItem(`${itineraryId}_hotel`, selectedHotel);
      }
      if (selectedRestaurant) {
        localStorage.setItem(`${itineraryId}_restaurant`, selectedRestaurant);
      }
      if (customizedItinerary) {
        localStorage.setItem(`${itineraryId}_itinerary`, JSON.stringify(customizedItinerary));
      }
    }

    // Build query params for redirect
    const queryParams = [];
    if (selectedHotel) queryParams.push(`hotel=${selectedHotel}`);
    if (selectedRestaurant) queryParams.push(`restaurant=${selectedRestaurant}`);
    
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    
    if (itineraryId) {
      router.push(`/itinerary/${itineraryId}${queryString}`);
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

  if (!router.isReady || !itineraryId) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!packageData) {
    const availableIds = Object.keys(packagesData).join(', ');
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 2, padding: 3 }}>
        <Typography variant="h5">Itinerary not found</Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          The itinerary "{itineraryId}" could not be found.
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Available itineraries: {availableIds}
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
            onClick={() => router.push(`/itinerary/${itineraryId}`)}
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
            onClick={() => router.push(`/itinerary/${itineraryId}`)}
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

