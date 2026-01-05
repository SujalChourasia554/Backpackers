import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  TextField,
  IconButton,
} from "@mui/material";
import Navbar from "@/Components/Navbar";
import themeConfig from "@/src/theme";
import { hotelOptions, restaurantOptions } from "@/src/data/customization-options";
import packagesData from "@/src/data/packages";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function CustomizePage() {
  const router = useRouter();
  const { package: packageId } = router.query;
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);
  const [totalBudget, setTotalBudget] = useState(0);
  const [budgetLimit, setBudgetLimit] = useState(0);

  const packageData = packagesData[packageId];
  const hotels = hotelOptions[packageId] || [];
  const restaurants = restaurantOptions[packageId] || [];

  // Extract budget limit from package budget string
  useEffect(() => {
    if (packageData?.budget) {
      const budgetMatch = packageData.budget.match(/₹([\d,]+)/);
      if (budgetMatch) {
        setBudgetLimit(parseInt(budgetMatch[1].replace(/,/g, "")));
      }
    }
  }, [packageData]);

  // Load saved selections from URL or localStorage
  useEffect(() => {
    if (router.isReady && packageId && typeof window !== "undefined") {
      const hotelId = router.query.hotel || localStorage.getItem(`${packageId}_hotel`);
      const restaurantId = router.query.restaurant || localStorage.getItem(`${packageId}_restaurant`);

      if (hotelId) setSelectedHotel(hotelId);
      if (restaurantId) setSelectedRestaurant(restaurantId);

      // Load customized itinerary if exists
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
    } else if (packageData?.itineraryDays && !customizedItinerary) {
      setCustomizedItinerary([...packageData.itineraryDays]);
    }
  }, [router.isReady, router.query, packageId, packageData]);

  // Calculate total budget
  useEffect(() => {
    let total = 0;
    const selectedHotelData = hotels.find((h) => h.id === selectedHotel);
    const selectedRestaurantData = restaurants.find((r) => r.id === selectedRestaurant);

    if (selectedHotelData) total += selectedHotelData.price;
    if (selectedRestaurantData) total += selectedRestaurantData.price;

    // Add activity costs
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
  }, [selectedHotel, selectedRestaurant, hotels, restaurants, packageData]);

  const handleSave = () => {
    if (!selectedHotel || !selectedRestaurant) {
      alert("Please select both a hotel and restaurant before saving.");
      return;
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(`${packageId}_hotel`, selectedHotel);
      localStorage.setItem(`${packageId}_restaurant`, selectedRestaurant);
      if (customizedItinerary) {
        localStorage.setItem(`${packageId}_itinerary`, JSON.stringify(customizedItinerary));
      }
    }

    // Redirect back to itinerary
    if (packageId) {
      router.push(`/${packageId}?hotel=${selectedHotel}&restaurant=${selectedRestaurant}`);
    }
  };

  const handleItineraryChange = (dayIndex, activityIndex, newValue) => {
    const updated = [...customizedItinerary];
    updated[dayIndex].activities[activityIndex] = newValue;
    setCustomizedItinerary(updated);
  };

  const handleAddActivity = (dayIndex) => {
    const updated = [...customizedItinerary];
    updated[dayIndex].activities.push("");
    setCustomizedItinerary(updated);
  };

  const handleRemoveActivity = (dayIndex, activityIndex) => {
    const updated = [...customizedItinerary];
    updated[dayIndex].activities.splice(activityIndex, 1);
    setCustomizedItinerary(updated);
  };

  if (!router.isReady) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  if (!packageData) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Package not found</Typography>
      </Box>
    );
  }

  const isWithinBudget = totalBudget <= budgetLimit;

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
            onClick={() => router.push(`/${packageId}`)}
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

        <Card
          sx={{
            marginBottom: "32px",
            background: isWithinBudget
              ? "linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)"
              : "linear-gradient(135deg, #ffffff 0%, #fef2f2 100%)",
            border: `2px solid ${isWithinBudget ? "#10b981" : "#ef4444"}`,
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h6" sx={{ marginBottom: "8px" }}>
                  Budget Summary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Daily Budget Limit: ₹{budgetLimit.toLocaleString()}
                </Typography>
              </Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography
                  variant="h5"
                  sx={{
                    color: isWithinBudget ? "#10b981" : "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  ₹{totalBudget.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isWithinBudget ? "Within Budget" : "Over Budget"}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "32px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)" }}>
          <CardContent sx={{ padding: "28px !important" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: themeConfig.colors.text.primary,
                marginBottom: "24px",
                fontFamily: themeConfig.fonts.heading,
              }}
            >
              Choose Your Hotel
            </Typography>
            <Grid container spacing={3}>
              {hotels.map((hotel) => {
                const isSelected = selectedHotel === hotel.id;
                return (
                  <Grid item xs={12} sm={6} md={3} key={hotel.id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        border: isSelected ? "3px solid" : "1px solid",
                        borderColor: isSelected ? themeConfig.colors.primary.main : "rgba(0,0,0,0.1)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                        },
                        position: "relative",
                      }}
                      onClick={() => setSelectedHotel(hotel.id)}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            zIndex: 2,
                            backgroundColor: themeConfig.colors.primary.main,
                            borderRadius: "50%",
                            padding: "4px",
                          }}
                        >
                          <CheckCircleIcon sx={{ color: "white", fontSize: "24px" }} />
                        </Box>
                      )}
                      <Box
                        sx={{
                          height: "180px",
                          backgroundImage: `url(${hotel.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <CardContent sx={{ padding: "16px !important" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "8px",
                            fontFamily: themeConfig.fonts.heading,
                          }}
                        >
                          {hotel.name}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.colors.primary.main }}>
                            ₹{hotel.price.toLocaleString()}/night
                          </Typography>
                          <Chip
                            label={`⭐ ${hotel.rating}`}
                            size="small"
                            sx={{
                              backgroundColor: "#fef3c7",
                              color: "#92400e",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        {hotel.description.map((desc, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: themeConfig.colors.text.muted,
                              marginBottom: "4px",
                            }}
                          >
                            • {desc}
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        <Card sx={{ marginBottom: "32px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)" }}>
          <CardContent sx={{ padding: "28px !important" }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "24px",
                fontWeight: 700,
                color: themeConfig.colors.text.primary,
                marginBottom: "24px",
                fontFamily: themeConfig.fonts.heading,
              }}
            >
              Choose Your Restaurant
            </Typography>
            <Grid container spacing={3}>
              {restaurants.map((restaurant) => {
                const isSelected = selectedRestaurant === restaurant.id;
                return (
                  <Grid item xs={12} sm={6} md={3} key={restaurant.id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        border: isSelected ? "3px solid" : "1px solid",
                        borderColor: isSelected ? themeConfig.colors.primary.main : "rgba(0,0,0,0.1)",
                        borderRadius: "16px",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
                        },
                        position: "relative",
                      }}
                      onClick={() => setSelectedRestaurant(restaurant.id)}
                    >
                      {isSelected && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            zIndex: 2,
                            backgroundColor: themeConfig.colors.primary.main,
                            borderRadius: "50%",
                            padding: "4px",
                          }}
                        >
                          <CheckCircleIcon sx={{ color: "white", fontSize: "24px" }} />
                        </Box>
                      )}
                      <Box
                        sx={{
                          height: "180px",
                          backgroundImage: `url(${restaurant.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                      <CardContent sx={{ padding: "16px !important" }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "8px",
                            fontFamily: themeConfig.fonts.heading,
                          }}
                        >
                          {restaurant.name}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.colors.primary.main }}>
                            ₹{restaurant.price.toLocaleString()}/day
                          </Typography>
                          <Chip
                            label={`⭐ ${restaurant.rating}`}
                            size="small"
                            sx={{
                              backgroundColor: "#fef3c7",
                              color: "#92400e",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                        {restaurant.description.map((desc, idx) => (
                          <Typography
                            key={idx}
                            variant="body2"
                            sx={{
                              fontSize: "12px",
                              color: themeConfig.colors.text.muted,
                              marginBottom: "4px",
                            }}
                          >
                            • {desc}
                          </Typography>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>

        {customizedItinerary && (
          <Card sx={{ marginBottom: "32px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)" }}>
            <CardContent sx={{ padding: "28px !important" }}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: themeConfig.colors.text.primary,
                  marginBottom: "24px",
                  fontFamily: themeConfig.fonts.heading,
                }}
              >
                Customize Trip Itinerary
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {customizedItinerary.map((day, dayIndex) => (
                  <Box
                    key={dayIndex}
                    sx={{
                      padding: "20px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)",
                      border: "1px solid rgba(75, 140, 168, 0.2)",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "18px",
                        fontWeight: 600,
                        marginBottom: "16px",
                        color: themeConfig.colors.text.primary,
                        fontFamily: themeConfig.fonts.heading,
                      }}
                    >
                      Day {day.day}: {day.title}
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {day.activities.map((activity, activityIndex) => (
                        <Box key={activityIndex} sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                          <TextField
                            fullWidth
                            size="small"
                            value={activity}
                            onChange={(e) => handleItineraryChange(dayIndex, activityIndex, e.target.value)}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: "8px",
                              },
                            }}
                          />
                          <IconButton
                            onClick={() => handleRemoveActivity(dayIndex, activityIndex)}
                            sx={{
                              color: "#ef4444",
                              "&:hover": { backgroundColor: "#fee2e2" },
                            }}
                          >
                            ✕
                          </IconButton>
                        </Box>
                      ))}
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleAddActivity(dayIndex)}
                        sx={{
                          marginTop: "8px",
                          alignSelf: "flex-start",
                          textTransform: "none",
                        }}
                      >
                        + Add Activity
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        <Box sx={{ display: "flex", gap: "16px", justifyContent: "center", marginTop: "32px" }}>
          <Button
            variant="outlined"
            onClick={() => router.push(`/${packageId}`)}
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
            disabled={!selectedHotel || !selectedRestaurant}
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

