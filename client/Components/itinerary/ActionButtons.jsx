import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import themeConfig from "@/src/theme";
import { initiatePayment } from "@/utils/payment";

export default function ActionButtons({ itineraryId, totalBudget, packageData, customizedData }) {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBookNow = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      await initiatePayment({
        totalBudget,
        itineraryId,
        packageData,
        customizedData,
        themeColor: themeConfig.colors.primary.main,
        
        // Success callback
        onSuccess: (response) => {
          router.push(`/booking-success?payment_id=${response.razorpay_payment_id}&amount=${totalBudget}`);
        },
        
        // Failure callback
        onFailure: (error) => {
          console.error("Payment error:", error);
          
          if (error.message === "Failed to load Razorpay SDK" || error.message.includes("fetch")) {
            alert("Cannot connect to payment server. Please try again later.");
          } else {
            alert(`Payment error: ${error.message}`);
          }
          
          setIsProcessing(false);
        },
        
        // Dismiss callback
        onDismiss: () => {
          alert("Payment was cancelled. You can try again anytime!");
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Unexpected error:", error);
      alert("Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
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
        onClick={() => router.push(`/customize?itinerary=${itineraryId}`)}
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
        onClick={handleBookNow}
        disabled={isProcessing}
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
          "&:disabled": {
            backgroundColor: "#ccc",
          },
          transition: "all 0.3s ease",
        }}
      >
        {isProcessing ? "Processing..." : "Book Now"}
      </Button>
    </Box>
  );
}
