import { Box, Typography, Container, Button, Card, CardContent } from "@mui/material";
import Navbar from "@/Components/Navbar";
import themeConfig from "@/src/theme";
import packagesData from "@/src/data/packages";
import { hotelOptions, restaurantOptions } from "@/src/data/customization-options";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import React from "react";

export default function Itinerary() {
  const router = useRouter();
  const { package: packageId, hotel, restaurant } = router.query;
  const [customizedData, setCustomizedData] = useState(null);
  const [customizedItinerary, setCustomizedItinerary] = useState(null);

  // Helper function to safely render icons
  const renderIcon = (IconComponent, props) => {
    if (!IconComponent) return null;
    if (typeof IconComponent === 'function') {
      return <IconComponent {...props} />;
    }
    return null;
  };

  // Get package data or default to goa
  const packageData = packagesData[packageId] || packagesData.goa;

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
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "300px",
            borderRadius: "24px",
            overflow: "hidden",
            marginBottom: "40px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url('${heroImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(30, 58, 95, 0.5) 0%, rgba(75, 140, 168, 0.6) 100%)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "0 20px",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: "56px", md: "80px" },
                fontWeight: 900,
                color: themeConfig.colors.text.secondary,
                textShadow: "4px 4px 20px rgba(0,0,0,0.5)",
                fontFamily: themeConfig.fonts.heading,
                letterSpacing: "-2px",
                marginBottom: "12px",
              }}
            >
              {name}
            </Typography>
            {description && (
              <Typography
                sx={{
                  fontSize: { xs: "16px", md: "20px" },
                  color: themeConfig.colors.text.secondary,
                  textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
                  fontFamily: themeConfig.fonts.primary,
                  fontWeight: 400,
                  maxWidth: "800px",
                  lineHeight: 1.6,
                  marginBottom: "12px",
                }}
              >
                {description}
              </Typography>
            )}
            {budget && (
              <Box
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(10px)",
                  padding: "8px 20px",
                  borderRadius: "20px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  display: "inline-block",
                }}
              >
                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "16px" },
                    color: themeConfig.colors.text.secondary,
                    textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
                    fontFamily: themeConfig.fonts.primary,
                    fontWeight: 600,
                  }}
                >
                  {budget}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: "24px",
            marginBottom: "40px",
          alignItems: "stretch",
        }}
      >
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
                  <Card
                    key={index}
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      border: "1px solid rgba(0, 0, 0, 0.05)",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "180px",
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(180deg, transparent 0%, ${item.color}60 100%)`,
                        },
                      }}
                    />
                    <CardContent sx={{ padding: "16px !important" }}>
                      <Box sx={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
                        {renderIcon(item.icon, {
                          sx: {
                            fontSize: "24px",
                            marginRight: "8px",
                            color: item.color,
                          },
                        })}
                        <Typography
                          sx={{
                            fontSize: "18px",
                            fontWeight: 600,
                            color: themeConfig.colors.text.primary,
                            fontFamily: themeConfig.fonts.heading,
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Box>
                      {item.description.map((desc, idx) => (
                        <Typography
                          key={idx}
                          sx={{
                            fontSize: "13px",
                            color: themeConfig.colors.text.primary,
                            opacity: 0.8,
                            marginBottom: "4px",
                            fontFamily: themeConfig.fonts.primary,
                          }}
                        >
                          • {desc}
                        </Typography>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>

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
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: "14px",
                      padding: "16px",
                      borderRadius: "14px",
                      background: index % 2 === 0 
                        ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)"
                        : "linear-gradient(135deg, rgba(75, 140, 168, 0.08) 0%, rgba(75, 140, 168, 0.12) 100%)",
                      border: `1px solid ${index % 2 === 0 ? "rgba(75, 140, 168, 0.1)" : "rgba(75, 140, 168, 0.2)"}`,
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(75, 140, 168, 0.15)",
                        transform: "translateX(4px)",
                        boxShadow: "0 4px 12px rgba(75, 140, 168, 0.2)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "10px",
                        background: themeConfig.colors.primary.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        boxShadow: "0 4px 12px rgba(75, 140, 168, 0.3)",
                      }}
                    >
                      {renderIcon(day.icon, {
                        sx: {
                          fontSize: "22px",
                          color: themeConfig.colors.text.secondary,
                        },
                      })}
                    </Box>

                    <Box sx={{ flex: 1 }}>
                      <Typography
                        sx={{
                          fontSize: "17px",
                          fontWeight: 600,
                          color: themeConfig.colors.text.primary,
                          marginBottom: "6px",
                          fontFamily: themeConfig.fonts.heading,
                        }}
                      >
                        Day {day.day}: {day.title}
                      </Typography>
                      <Box>
                        {day.activities.map((activity, actIdx) => (
                          <Box
                            key={actIdx}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              marginBottom: "4px",
                            }}
                          >
                            <Box
                              sx={{
                                width: "5px",
                                height: "5px",
                                borderRadius: "50%",
                                backgroundColor: themeConfig.colors.primary.light,
                                marginTop: "6px",
                                marginRight: "10px",
                                flexShrink: 0,
                              }}
                            />
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: themeConfig.colors.text.primary,
                                opacity: 0.8,
                                fontFamily: themeConfig.fonts.primary,
                                lineHeight: 1.5,
                              }}
                            >
                              {activity}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>

              {customizedData ? (
                <Box
                  sx={{
                    marginTop: "24px",
                    padding: "20px",
                    borderRadius: "16px",
                    background: isWithinBudget
                      ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)"
                      : "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)",
                    border: `2px solid ${isWithinBudget ? "#10b981" : "#ef4444"}`,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 700,
                      color: themeConfig.colors.text.primary,
                      marginBottom: "16px",
                      fontFamily: themeConfig.fonts.heading,
                      textAlign: "center",
                    }}
                  >
                    Total Budget
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: themeConfig.colors.text.muted,
                        fontFamily: themeConfig.fonts.primary,
                      }}
                    >
                      Total Amount:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: themeConfig.colors.text.primary,
                        fontFamily: themeConfig.fonts.heading,
                      }}
                    >
                      ₹{totalBudget.toLocaleString()}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <Box
                      sx={{
                        padding: "6px 16px",
                        borderRadius: "12px",
                        backgroundColor: isWithinBudget ? "#d1fae5" : "#fee2e2",
                        color: isWithinBudget ? "#065f46" : "#991b1b",
                        fontSize: "14px",
                        fontWeight: 600,
                      }}
                    >
                      {isWithinBudget ? "✓ Within Budget" : "⚠ Over Budget"}
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box
                  sx={{
                    marginTop: "24px",
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
                      fontWeight: 700,
                      color: themeConfig.colors.text.primary,
                      marginBottom: "16px",
                      fontFamily: themeConfig.fonts.heading,
                      textAlign: "center",
                    }}
                  >
                    Total Budget
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: "16px",
                        color: themeConfig.colors.text.muted,
                        fontFamily: themeConfig.fonts.primary,
                      }}
                    >
                      Total Amount:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "24px",
                        fontWeight: 700,
                        color: themeConfig.colors.text.primary,
                        fontFamily: themeConfig.fonts.heading,
                      }}
                    >
                      ₹{totalBudget.toLocaleString()}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box
                sx={{
                  display: "flex",
                  gap: "12px",
                  marginTop: "24px",
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <Button
                  variant="outlined"
                  onClick={() => router.push(`/customize/${packageId}`)}
                  sx={{
                    borderColor: themeConfig.colors.primary.main,
                    borderWidth: "2px",
                    color: themeConfig.colors.primary.main,
                    padding: "10px 24px",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: themeConfig.colors.primary.main,
                      color: themeConfig.colors.text.secondary,
                      borderColor: themeConfig.colors.primary.main,
                      borderWidth: "2px",
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(30, 58, 95, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Customize
                </Button>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: themeConfig.colors.primary.main,
                    color: themeConfig.colors.text.secondary,
                    padding: "10px 24px",
                    fontSize: "14px",
                    fontWeight: 600,
                    borderRadius: "10px",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: themeConfig.colors.primary.light,
                      transform: "translateY(-2px)",
                      boxShadow: "0 4px 12px rgba(30, 58, 95, 0.3)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Book Now
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

