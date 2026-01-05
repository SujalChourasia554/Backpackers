import { Box, Typography, Container, Button, Grid, Stack, Paper, Chip, Card, CardContent } from "@mui/material";
import Navbar from "@/Components/Navbar";
import PackageHero from "@/Components/PackageHero";
import IncludedItemCard from "@/Components/IncludedItemCard";
import ItineraryDayCard from "@/Components/ItineraryDayCard";
import themeConfig from "@/src/theme";
import packagesData from "@/src/data/packages";
import { hotelOptions, restaurantOptions } from "@/src/data/customization-options";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";

// Helper functions
const extractPrice = (text) => {
  const match = text?.match(/₹([\d,]+)/);
  return match ? parseInt(match[1].replace(/,/g, "")) : 0;
};

const calculateTotalBudget = (packageData, customizedData, displayItinerary) => {
  let total = 0;
  const numberOfDays = displayItinerary.length;

  if (customizedData?.hotel) {
    total += customizedData.hotel.price * numberOfDays;
  } else {
    const hotelDesc = packageData.includedItems[0]?.description?.find(d => d.includes("Budget:"));
    if (hotelDesc) total += extractPrice(hotelDesc) * numberOfDays;
  }

  if (customizedData?.restaurant) {
    total += customizedData.restaurant.price * numberOfDays;
  } else {
    const restaurantDesc = packageData.includedItems[1]?.description?.find(d => d.includes("Budget:"));
    if (restaurantDesc) total += extractPrice(restaurantDesc) * numberOfDays;
  }

  const activitiesItem = packageData.includedItems.find(item => item.title === "Activities");
  activitiesItem?.description?.forEach(desc => {
    total += extractPrice(desc);
  });

  return total;
};

// Styled components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: themeConfig.colors.background.main,
  position: "relative",
  paddingTop: "100px",
  "&::before": {
    content: '""',
    position: "fixed",
    inset: 0,
    background: `linear-gradient(135deg, ${themeConfig.colors.background.main} 0%, #e0f2fe 100%)`,
    zIndex: 0,
    opacity: 0.5,
  },
}));

const SectionCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(135deg, #ffffff 0%, #f8fcff 100%)",
  boxShadow: theme.shadows[8],
  border: "1px solid rgba(75, 140, 168, 0.2)",
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const BudgetCard = styled(Paper)(({ theme, isWithinBudget, customizedData }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2.5),
  background: customizedData
    ? (isWithinBudget
        ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)"
        : "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)")
    : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)",
  border: customizedData
    ? `2px solid ${isWithinBudget ? "#10b981" : "#ef4444"}`
    : "1px solid rgba(75, 140, 168, 0.2)",
}));

export default function Itinerary() {
  
  const router = useRouter();
  const { package: packageId, hotel, restaurant } = router.query;
  const [customizedData, setCustomizedData] = useState(null);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);

  const packageData = packagesData[packageId] || packagesData.goa;

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
        const restaurantData = savedRestaurant ? restaurantOptions[packageId]?.find((r) => r.id === savedRestaurant) : null;
        setCustomizedData({ hotel: hotelData, restaurant: restaurantData });
      }
    }
  }, [router.isReady, packageId, hotel, restaurant]);

  if (!packageData) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Package not found</Typography>
      </Box>
    );
  }

  const displayItems = packageData.includedItems.map((item, index) => {
    if (index === 0 && customizedData?.hotel) {
      return {
        ...item,
        title: customizedData.hotel.name,
        description: [...customizedData.hotel.description, `Budget: ₹${customizedData.hotel.price.toLocaleString()}/night`],
        image: customizedData.hotel.image,
      };
    }
    if (index === 1 && customizedData?.restaurant) {
      return {
        ...item,
        title: customizedData.restaurant.name,
        description: [...customizedData.restaurant.description, `Budget: ₹${customizedData.restaurant.price.toLocaleString()}/day`],
        image: customizedData.restaurant.image,
      };
    }
    return item;
  });

  const displayItinerary = customizedItinerary || packageData.itineraryDays;
  const { name, description, heroImage, budget } = packageData;
  const totalBudget = calculateTotalBudget(packageData, customizedData, displayItinerary);
  const budgetLimitMatch = budget?.match(/₹([\d,]+)/);
  const budgetLimit = budgetLimitMatch ? parseInt(budgetLimitMatch[1].replace(/,/g, "")) * displayItinerary.length : 0;
  const isWithinBudget = totalBudget <= budgetLimit;

  return (
    <PageContainer>
      <Navbar />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <PackageHero name={name} description={description} heroImage={heroImage} budget={budget} />

        <Grid container spacing={3} sx={{ mb: 5 }}>
          {/* What's Included Section */}
          <Grid item xs={12} lg={6}>
            <SectionCard>
              <CardContent sx={{ p: 3.5, flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    textAlign: "center",
                    background: themeConfig.colors.primary.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  What's Included
                </Typography>
                <Grid container spacing={2} sx={{ flex: 1 }}>
                  {displayItems.map((item, index) => (
                    <Grid item xs={6} key={index}>
                      <IncludedItemCard item={item} />
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </SectionCard>
          </Grid>

          {/* Trip Itinerary Section */}
          <Grid item xs={12} lg={6}>
            <SectionCard>
              <CardContent sx={{ p: 3.5, flex: 1, display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 3,
                    textAlign: "center",
                    background: themeConfig.colors.primary.gradient,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Trip Itinerary
                </Typography>
                <Stack spacing={1.75} sx={{ flex: 1 }}>
                  {displayItinerary.map((day, index) => (
                    <ItineraryDayCard key={index} day={day} index={index} />
                  ))}
                </Stack>

                {/* Budget Summary Card */}
                <BudgetCard isWithinBudget={isWithinBudget} customizedData={customizedData}>
                  <Typography variant="h6" sx={{ fontSize: "1.125rem", fontWeight: 700, mb: 2, textAlign: "center" }}>
                    Total Budget
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: customizedData ? 2 : 0 }}>
                    <Typography variant="body1" color="text.secondary">
                      Total Amount:
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                      ₹{totalBudget.toLocaleString()}
                    </Typography>
                  </Stack>
                  {customizedData && (
                    <Stack direction="row" justifyContent="center" sx={{ pt: 1.5, borderTop: "1px solid rgba(0, 0, 0, 0.1)" }}>
                      <Chip
                        label={isWithinBudget ? "✓ Within Budget" : "⚠ Over Budget"}
                        sx={{
                          bgcolor: isWithinBudget ? "#d1fae5" : "#fee2e2",
                          color: isWithinBudget ? "#065f46" : "#991b1b",
                          fontWeight: 600,
                        }}
                      />
                    </Stack>
                  )}
                </BudgetCard>

                <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 3, flexWrap: "wrap" }}>
                  <Button variant="outlined" onClick={() => router.push(`/customize/${packageId}`)} sx={{ borderWidth: 2 }}>
                    Customize
                  </Button>
                  <Button variant="contained">Book Now</Button>
                </Stack>
              </CardContent>
            </SectionCard>
          </Grid>
        </Grid>
      </Container>
    </PageContainer>
  );
}
