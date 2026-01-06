import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, Typography, Container, Button, IconButton, CircularProgress } from "@mui/material";
import Navbar from "@/Components/LandingPageComponents/Navbar";
import themeConfig from "@/src/theme";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BudgetCard from "@/Components/customize/BudgetCard";
import OptionsGrid from "@/Components/customize/OptionsGrid";
import ItineraryEditor from "@/Components/customize/ItineraryEditor";

export default function CustomizePage() {
  const router = useRouter();
  const { itinerary: packageId } = router.query;
  
  // State for package data
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for alternatives
  const [stays, setStays] = useState([]);
  const [foodSpots, setFoodSpots] = useState([]);
  const [localGems, setLocalGems] = useState([]);
  const [activities, setActivities] = useState([]);
  
  // State for selections
  const [selectedStay, setSelectedStay] = useState(null);
  const [selectedFoodSpot, setSelectedFoodSpot] = useState(null);
  const [selectedLocalGems, setSelectedLocalGems] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState([]);
  
  const [customizedItinerary, setCustomizedItinerary] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(0);

  const numberOfDays = packageData?.totalDays || 3;

  // Fetch package data and alternatives from MongoDB
  useEffect(() => {
    if (!router.isReady || !packageId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch package details
        const packageResponse = await fetch(`/api/v1/packages/${packageId}`);
        if (!packageResponse.ok) {
          throw new Error('Package not found');
        }
        const packageJson = await packageResponse.json();
        
        if (packageJson.message === "OK" && packageJson.response) {
          const pkg = packageJson.response;
          setPackageData(pkg);
          setBudgetLimit(pkg.budgetPerDay);

          // Fetch alternative items within budget
          const alternativesResponse = await fetch(
            `/api/v1/packages/${packageId}/alternatives?budgetPerDay=${pkg.budgetPerDay}`
          );
          
          if (alternativesResponse.ok) {
            const alternativesJson = await alternativesResponse.json();
            if (alternativesJson.message === "OK" && alternativesJson.alternatives) {
              const alt = alternativesJson.alternatives;
              
              // Transform items to match OptionsGrid format
              setStays(alt.stays.map(item => ({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image?.[0] || '/placeholder-hotel.jpg',
                rating: item.rating,
                description: item.description,
                category: item.category
              })));

              setFoodSpots(alt.foodSpots.map(item => ({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image?.[0] || '/placeholder-food.jpg',
                rating: item.rating,
                description: item.description
              })));

              setLocalGems(alt.localGems.map(item => ({
                id: item._id,
                name: item.name,
                price: item.price || 0,
                image: item.image?.[0] || '/placeholder-gem.jpg',
                rating: item.rating,
                description: item.description
              })));

              setActivities(alt.activities.map(item => ({
                id: item._id,
                name: item.name,
                price: item.price,
                image: item.image?.[0] || '/placeholder-activity.jpg',
                rating: item.rating,
                description: item.description,
                duration: item.duration
              })));
            }
          }

          // Set default selections from package
          if (pkg.defaultItems) {
            if (pkg.defaultItems.stays?.[0]) {
              setSelectedStay(pkg.defaultItems.stays[0]._id);
            }
            if (pkg.defaultItems.foodSpots?.[0]) {
              setSelectedFoodSpot(pkg.defaultItems.foodSpots[0]._id);
            }
          }
        } else {
          throw new Error('Invalid package data');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router.isReady, packageId]);

  // Load saved customizations from localStorage
  useEffect(() => {
    if (!router.isReady || !packageId || typeof window === "undefined") return;

    const savedStay = localStorage.getItem(`${packageId}_stay`);
    const savedFoodSpot = localStorage.getItem(`${packageId}_foodspot`);
    const savedItinerary = localStorage.getItem(`${packageId}_itinerary`);

    if (savedStay) setSelectedStay(savedStay);
    if (savedFoodSpot) setSelectedFoodSpot(savedFoodSpot);
    
    if (savedItinerary) {
      try {
        setCustomizedItinerary(JSON.parse(savedItinerary));
      } catch (e) {
        console.error("Error parsing saved itinerary:", e);
      }
    }
  }, [router.isReady, packageId]);

  // Calculate total budget based on selections
  useEffect(() => {
    let total = 0;
    
    const selectedStayData = stays.find((s) => s.id === selectedStay);
    const selectedFoodSpotData = foodSpots.find((f) => f.id === selectedFoodSpot);

    if (selectedStayData) {
      total += selectedStayData.price * numberOfDays;
    }
    
    if (selectedFoodSpotData) {
      total += selectedFoodSpotData.price * numberOfDays;
    }

    // Add selected activities
    selectedActivities.forEach(activityId => {
      const activity = activities.find(a => a.id === activityId);
      if (activity) {
        total += activity.price;
      }
    });

    setTotalBudget(total);
  }, [selectedStay, selectedFoodSpot, selectedActivities, stays, foodSpots, activities, numberOfDays]);

  const handleSave = () => {
    // Save to localStorage
    if (typeof window !== "undefined") {
      if (selectedStay) {
        localStorage.setItem(`${packageId}_stay`, selectedStay);
      }
      if (selectedFoodSpot) {
        localStorage.setItem(`${packageId}_foodspot`, selectedFoodSpot);
      }
      if (customizedItinerary) {
        localStorage.setItem(`${packageId}_itinerary`, JSON.stringify(customizedItinerary));
      }
      if (selectedActivities.length > 0) {
        localStorage.setItem(`${packageId}_activities`, JSON.stringify(selectedActivities));
      }
      if (selectedLocalGems.length > 0) {
        localStorage.setItem(`${packageId}_localgems`, JSON.stringify(selectedLocalGems));
      }
    }

    // Build query params for redirect
    const queryParams = [];
    if (selectedStay) queryParams.push(`stay=${selectedStay}`);
    if (selectedFoodSpot) queryParams.push(`foodspot=${selectedFoodSpot}`);
    
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
        <CircularProgress />
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

        {stays.length > 0 && (
          <OptionsGrid
            title="Choose Your Accommodation"
            options={stays}
            selectedId={selectedStay}
            onSelect={setSelectedStay}
            priceLabel="/night"
            budgetLimit={budgetLimit * numberOfDays}
            numberOfDays={numberOfDays}
          />
        )}

        {foodSpots.length > 0 && (
          <OptionsGrid
            title="Choose Your Food Spot"
            options={foodSpots}
            selectedId={selectedFoodSpot}
            onSelect={setSelectedFoodSpot}
            priceLabel="/day"
            budgetLimit={budgetLimit * numberOfDays}
            numberOfDays={numberOfDays}
          />
        )}

        {localGems.length > 0 && (
          <OptionsGrid
            title="Add Local Gems to Visit (Optional)"
            options={localGems}
            selectedIds={selectedLocalGems}
            onSelect={setSelectedLocalGems}
            priceLabel=""
            budgetLimit={budgetLimit * numberOfDays}
            numberOfDays={1}
            multiSelect={true}
          />
        )}

        {activities.length > 0 && (
          <OptionsGrid
            title="Add Activities (Optional)"
            options={activities}
            selectedIds={selectedActivities}
            onSelect={setSelectedActivities}
            priceLabel=""
            budgetLimit={budgetLimit * numberOfDays}
            numberOfDays={1}
            multiSelect={true}
          />
        )}

        {customizedItinerary && (
          <ItineraryEditor
            itinerary={customizedItinerary}
            onItineraryChange={handleItineraryChange}
            onAddActivity={handleAddActivity}
            onRemoveActivity={handleRemoveActivity}
            onRemoveDay={handleRemoveDay}
            onAddDay={handleAddDay}
            onDayTitleChange={handleDayTitleChange}
          />
        )}

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
            disabled={!isWithinBudget}
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
              "&:disabled": {
                backgroundColor: "#ccc",
                color: "#666",
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

