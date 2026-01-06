import { Box, Typography, Container, Card, CardContent, CircularProgress } from "@mui/material";
import Navbar from "@/Components/LandingPageComponents/Navbar";
import themeConfig from "@/src/theme";
import { hotelOptions, restaurantOptions } from "@/src/data/customization-options";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import HeroSection from "@/Components/itinerary/HeroSection";
import IncludedItemCard from "@/Components/itinerary/IncludedItemCard";
import DayItem from "@/Components/itinerary/DayItem";
import BudgetSummary from "@/Components/itinerary/BudgetSummary";
import ActionButtons from "@/Components/itinerary/ActionButtons";

export default function Itinerary() {
  const router = useRouter();
  const { itinerary: packageId, hotel, restaurant } = router.query;
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customizedData, setCustomizedData] = useState(null);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);

  // Fetch package data from MongoDB
  useEffect(() => {
    if (!router.isReady || !packageId) return;

    const fetchPackageData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`http://localhost:5001/api/v1/packages/${packageId}`);
        
        if (!response.ok) {
          throw new Error('Package not found');
        }

        const data = await response.json();
        
        if (data.message === "OK" && data.response) {
          // Fetch destination data separately
          let destination = null;
          if (data.response.destinationId) {
            try {
              const destResponse = await fetch(`http://localhost:5001/api/v1/destinations/${data.response.destinationId}`);
              if (destResponse.ok) {
                destination = (await destResponse.json()).response;
              }
            } catch (err) {
              console.warn('Could not fetch destination:', err);
            }
          }
          
          // Transform backend data to match frontend format
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
    // Backend returns: { ...packageData, defaultItems }
    // So backendData contains all package fields at root level + defaultItems
    const pkg = backendData; // All package fields are at root level
    const defaultItems = backendData.defaultItems || {};
    
    // Create included items from destination items
    const includedItems = [];
    
    // Add hotel/stay - backend returns stays array, take first one
    if (defaultItems.stays && defaultItems.stays.length > 0) {
      const stay = defaultItems.stays[0];
      includedItems.push({
        title: stay.name,
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

    // Add restaurants/foodspots - backend returns foodSpots (camelCase)
    if (defaultItems.foodSpots && defaultItems.foodSpots.length > 0) {
      const foodspot = defaultItems.foodSpots[0];
      includedItems.push({
        title: foodspot.name,
        description: [
          foodspot.description || "Local cuisine and dining",
          `Budget: ₹${foodspot.price?.toLocaleString() || '0'}/day`,
          `Rating: ${foodspot.rating || 0}/5 (${foodspot.totalReviews || 0} reviews)`
        ],
        image: foodspot.image?.[0] || "/images/food-placeholder.jpg",
        icon: "🍽️"
      });
    }

    // Add local gems - backend returns localGems (camelCase)
    if (defaultItems.localGems && defaultItems.localGems.length > 0) {
      includedItems.push({
        title: "Local Gems",
        description: defaultItems.localGems.map(gem => 
          `${gem.name}${gem.price > 0 ? ` - ₹${gem.price}` : ' - Free'}`
        ),
        image: defaultItems.localGems[0].image?.[0] || "/images/localgem-placeholder.jpg",
        icon: "💎"
      });
    }

    // Add activities
    if (defaultItems.activities && defaultItems.activities.length > 0) {
      includedItems.push({
        title: "Activities",
        description: defaultItems.activities.map(activity => 
          `${activity.name} - ₹${activity.price?.toLocaleString() || '0'} (${activity.duration || 'Flexible'})`
        ),
        image: defaultItems.activities[0].image?.[0] || "/images/activity-placeholder.jpg",
        icon: "🎯"
      });
    }

    // Create itinerary days dynamically from package data
    const totalDays = pkg.totalDays || 3;
    const itineraryDays = [];
    
    for (let i = 1; i <= totalDays; i++) {
      const dayActivities = [];
      
      if (i === 1) {
        dayActivities.push("Check-in to accommodation");
        if (defaultItems.activities?.[0]) {
          dayActivities.push(defaultItems.activities[0].name);
        }
        dayActivities.push("Welcome dinner at local restaurant");
      } else if (i === totalDays) {
        if (defaultItems.localGems?.[0]) {
          dayActivities.push(`Visit ${defaultItems.localGems[0].name}`);
        }
        dayActivities.push("Free time for shopping");
        dayActivities.push("Departure");
      } else {
        const activityIndex = Math.min(i - 1, (defaultItems.activities?.length || 1) - 1);
        if (defaultItems.activities?.[activityIndex]) {
          dayActivities.push(defaultItems.activities[activityIndex].name);
        }
        if (defaultItems.localGems?.[i - 2]) {
          dayActivities.push(`Visit ${defaultItems.localGems[i - 2].name}`);
        }
      }
      
      if (dayActivities.length === 0) {
        dayActivities.push("Explore local attractions");
      }
      
      itineraryDays.push({
        day: i,
        title: i === 1 ? "Arrival & Exploration" : 
               i === totalDays ? "Leisure & Departure" : 
               `Day ${i} - Main Attractions`,
        activities: dayActivities
      });
    }

    return {
      name: pkg.name,
      description: `Experience the best of ${destination?.name || 'this destination'} with our curated ${pkg.name}`,
      heroImage: pkg.images?.[0] || destination?.images?.[0] || "/images/destination-placeholder.jpg",
      budget: `₹${pkg.budgetPerDay?.toLocaleString() || '0'}/day`,
      budgetPerDay: pkg.budgetPerDay,
      includedItems,
      itineraryDays,
      packageId: pkg._id
    };
  };

  // Load customizations
  useEffect(() => {
    if (router.isReady && packageId && typeof window !== "undefined") {
      const savedHotel = hotel || localStorage.getItem(`${packageId}_hotel`);
      const savedRestaurant = restaurant || localStorage.getItem(`${packageId}_restaurant`);
      const savedItinerary = localStorage.getItem(`${packageId}_itinerary`);

      if (savedItinerary) {
        try {
          setCustomizedItinerary(JSON.parse(savedItinerary));
        } catch (e) {
          console.error("Error parsing saved itinerary:", e);
        }
      }

      if (savedHotel || savedRestaurant) {
        const hotelData = savedHotel ? hotelOptions[packageId]?.find((h) => h.id === savedHotel) : null;
        const restaurantData = savedRestaurant
          ? restaurantOptions[packageId]?.find((r) => r.id === savedRestaurant)
          : null;

        setCustomizedData({
          hotel: hotelData,
          restaurant: restaurantData,
        });
      }
    }
  }, [router.isReady, packageId, hotel, restaurant]);

  // Loading state
  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: themeConfig.colors.background.main }}>
        <Navbar />
        <Box sx={{ textAlign: "center", mt: 20 }}>
          <CircularProgress size={60} sx={{ color: themeConfig.colors.primary.main }} />
          <Typography sx={{ mt: 2, color: themeConfig.colors.text.primary }}>Loading package details...</Typography>
        </Box>
      </Box>
    );
  }

  // Error state
  if (error || !packageData) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: themeConfig.colors.background.main }}>
        <Navbar />
        <Box sx={{ textAlign: "center", mt: 20 }}>
          <Typography variant="h4" sx={{ color: themeConfig.colors.text.primary, mb: 2 }}>
            {error || "Package not found"}
          </Typography>
          <Typography sx={{ color: themeConfig.colors.text.secondary, mb: 3 }}>
            The package you're looking for doesn't exist or has been removed.
          </Typography>
          <Box
            component="button"
            onClick={() => router.push('/explore')}
            sx={{
              padding: "12px 32px",
              fontSize: "16px",
              fontWeight: 600,
              color: "white",
              background: themeConfig.colors.primary.gradient,
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 8px 20px rgba(75, 140, 168, 0.3)",
              },
            }}
          >
            Explore Packages
          </Box>
        </Box>
      </Box>
    );
  }

  // Use customized data if available, otherwise use default
  const displayItems = packageData.includedItems.map((item, index) => {
    if (index === 0 && customizedData?.hotel) {
      return {
        ...item,
        title: customizedData.hotel.name,
        description: [
          ...customizedData.hotel.description,
          `Budget: ₹${customizedData.hotel.price.toLocaleString()}/night`,
        ],
        image: customizedData.hotel.image,
      };
    }
    if (index === 1 && customizedData?.restaurant) {
      return {
        ...item,
        title: customizedData.restaurant.name,
        description: [
          ...customizedData.restaurant.description,
          `Budget: ₹${customizedData.restaurant.price.toLocaleString()}/day`,
        ],
        image: customizedData.restaurant.image,
      };
    }
    return item;
  });

  const displayItinerary = customizedItinerary || packageData.itineraryDays;
  const { name, description, heroImage, budget } = packageData;

  // Calculate total budget
  const calculateTotalBudget = () => {
    let total = 0;
    const numberOfDays = displayItinerary.length;

    // Hotel cost (per night * number of nights)
    if (customizedData?.hotel) {
      total += customizedData.hotel.price * numberOfDays;
    } else if (packageData.includedItems[0]?.description) {
      const hotelDesc = packageData.includedItems[0].description.find((d) => d.includes("Budget:"));
      if (hotelDesc) {
        const priceMatch = hotelDesc.match(/₹([\d,]+)/);
        if (priceMatch) {
          total += parseInt(priceMatch[1].replace(/,/g, "")) * numberOfDays;
        }
      }
    }

    // Restaurant cost (per day * number of days)
    if (customizedData?.restaurant) {
      total += customizedData.restaurant.price * numberOfDays;
    } else if (packageData.includedItems[1]?.description) {
      const restaurantDesc = packageData.includedItems[1].description.find((d) => d.includes("Budget:"));
      if (restaurantDesc) {
        const priceMatch = restaurantDesc.match(/₹([\d,]+)/);
        if (priceMatch) {
          total += parseInt(priceMatch[1].replace(/,/g, "")) * numberOfDays;
        }
      }
    }

    // Activities cost (one-time costs)
    const activitiesItem = packageData.includedItems.find((item) => item.title === "Activities");
    if (activitiesItem?.description) {
      activitiesItem.description.forEach((desc) => {
        const priceMatch = desc.match(/₹([\d,]+)/);
        if (priceMatch) {
          total += parseInt(priceMatch[1].replace(/,/g, ""));
        }
      });
    }

    return total;
  };

  const totalBudget = calculateTotalBudget();
  const budgetLimitMatch = budget?.match(/₹([\d,]+)/);
  const budgetLimit = budgetLimitMatch ? parseInt(budgetLimitMatch[1].replace(/,/g, "")) * displayItinerary.length : 0;
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

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <HeroSection name={name} description={description} heroImage={heroImage} budget={budget} />

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: "24px",
            marginBottom: "40px",
            alignItems: "stretch",
          }}
        >
          {/* What's Included Section */}
          <Card
            sx={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fcff 100%)",
              boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)",
              border: "1px solid rgba(75, 140, 168, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ padding: "28px !important", flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: themeConfig.colors.text.primary,
                  marginBottom: "24px",
                  fontFamily: themeConfig.fonts.heading,
                  textAlign: "center",
                  background: themeConfig.colors.primary.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                What's Included
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "16px",
                  flex: 1,
                }}
              >
                {displayItems.map((item, index) => (
                  <IncludedItemCard key={index} item={item} />
                ))}
              </Box>
            </CardContent>
          </Card>

          {/* Trip Itinerary Section */}
          <Card
            sx={{
              borderRadius: "24px",
              background: "linear-gradient(135deg, #ffffff 0%, #f8fcff 100%)",
              boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)",
              border: "1px solid rgba(75, 140, 168, 0.2)",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ padding: "28px !important", flex: 1, display: "flex", flexDirection: "column" }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: "24px",
                  fontWeight: 700,
                  color: themeConfig.colors.text.primary,
                  marginBottom: "24px",
                  fontFamily: themeConfig.fonts.heading,
                  textAlign: "center",
                  background: themeConfig.colors.primary.gradient,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Trip Itinerary
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: "14px", flex: 1 }}>
                {displayItinerary.map((day, index) => (
                  <DayItem key={index} day={day} index={index} />
                ))}
              </Box>

              <BudgetSummary
                totalBudget={totalBudget}
                isWithinBudget={isWithinBudget}
                hasCustomizations={!!customizedData}
              />

              <ActionButtons 
                itineraryId={packageId} 
                totalBudget={totalBudget}
                packageData={packageData}
                customizedData={customizedData}
              />
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

