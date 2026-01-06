import { Box, Typography, Container, Card, CardContent } from "@mui/material";
import Navbar from "@/Components/Navbar";
import themeConfig from "@/src/theme";
import packagesData from "@/src/data/packages";
import { hotelOptions, restaurantOptions } from "@/src/data/customization-options";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchPackageById, fetchDestinationById } from "@/utils/api";
import HeroSection from "@/Components/itinerary/HeroSection";
import IncludedItemCard from "@/Components/itinerary/IncludedItemCard";
import DayItem from "@/Components/itinerary/DayItem";
import BudgetSummary from "@/Components/itinerary/BudgetSummary";
import ActionButtons from "@/Components/itinerary/ActionButtons";
import { fetchPackageById, fetchDestinationById } from "@/utils/api";

export default function Itinerary() {
  const router = useRouter();
  const { itinerary: itineraryId, hotel, restaurant } = router.query;
  const [customizedData, setCustomizedData] = useState(null);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);

  // Redirect if invalid itinerary ID
  useEffect(() => {
<<<<<<< Updated upstream
    if (router.isReady && itineraryId && !packagesData[itineraryId]) {
      router.replace('/itinerary/goa');
=======
    if (!router.isReady || !packageId) return;

    const fetchPackageData = async () => {
      try {
        setLoading(true);
        setError(null);

<<<<<<< Updated upstream
        // Use utility function instead of hardcoded URL
=======
>>>>>>> Stashed changes
        const packageData = await fetchPackageById(packageId);
        
        if (!packageData) {
          throw new Error('Package not found');
        }

<<<<<<< Updated upstream
        // Fetch destination data using utility function
=======
        // Fetch destination data separately
>>>>>>> Stashed changes
        let destination = null;
        if (packageData.destinationId) {
          destination = await fetchDestinationById(packageData.destinationId);
        }
        
        // Transform backend data to match frontend format
        const transformedData = transformPackageData(packageData, destination);
        setPackageData(transformedData);
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
>>>>>>> Stashed changes
    }
  }, [router.isReady, itineraryId, router]);

  // Get package data or default to goa
  const packageData = packagesData[itineraryId] || packagesData.goa;

  // Load customizations
  useEffect(() => {
    if (router.isReady && itineraryId && typeof window !== "undefined") {
      const savedHotel = hotel || localStorage.getItem(`${itineraryId}_hotel`);
      const savedRestaurant = restaurant || localStorage.getItem(`${itineraryId}_restaurant`);
      const savedItinerary = localStorage.getItem(`${itineraryId}_itinerary`);

      if (savedItinerary) {
        try {
          setCustomizedItinerary(JSON.parse(savedItinerary));
        } catch (e) {
          console.error("Error parsing saved itinerary:", e);
        }
      }

      if (savedHotel || savedRestaurant) {
        const hotelData = savedHotel ? hotelOptions[itineraryId]?.find((h) => h.id === savedHotel) : null;
        const restaurantData = savedRestaurant
          ? restaurantOptions[itineraryId]?.find((r) => r.id === savedRestaurant)
          : null;

        setCustomizedData({
          hotel: hotelData,
          restaurant: restaurantData,
        });
      }
    }
  }, [router.isReady, itineraryId, hotel, restaurant]);

  if (!packageData) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Package not found</Typography>
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
                itineraryId={itineraryId} 
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

