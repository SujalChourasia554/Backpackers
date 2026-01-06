import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Box, Container, Typography, Button, Card, CardContent, Divider, CircularProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Navbar from "@/Components/LandingPageComponents/Navbar";
import themeConfig from "@/src/theme";
import { generateReceipt, viewReceipt } from "@/utils/receiptGenerator";

export default function BookingSuccess() {
  const router = useRouter();
  const { payment_id, amount, booking_id, itinerary_id } = router.query;
  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // Fetch user data and booking details
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        try {
          setUser(JSON.parse(userStr));
        } catch (err) {
          console.error('Error parsing user data:', err);
        }
      }
    }
  }, []);

  useEffect(() => {
    // Create mock booking data for now
    // In production, fetch from API using booking_id or itinerary_id
    if (payment_id && amount) {
      const mockBooking = {
        bookingId: booking_id || `BKP${Date.now()}`,
        bookingDate: new Date().toISOString(),
        customerName: user?.name || 'Guest User',
        customerEmail: user?.email || 'guest@example.com',
        customerPhone: user?.phone || '+91 9999999999',
        packageName: 'Travel Package',
        destination: 'Kerala',
        travelStartDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        travelEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        duration: 3,
        paymentId: payment_id,
        paymentMethod: 'Razorpay',
        paymentStatus: 'Completed',
        packageCost: parseInt(amount) || 0,
        taxes: Math.round((parseInt(amount) || 0) * 0.05),
        totalAmount: parseInt(amount) || 0,
      };
      setBookingData(mockBooking);
      setLoading(false);
    }
  }, [payment_id, amount, booking_id, user]);

  const handleDownloadReceipt = () => {
    if (bookingData) {
      generateReceipt(bookingData);
    }
  };

  const handleViewReceipt = () => {
    if (bookingData) {
      viewReceipt(bookingData);
    }
  };

  if (loading) {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: themeConfig.colors.background.main,
        paddingTop: "100px",
      }}
    >
      <Navbar />
      <Container maxWidth="md" sx={{ paddingTop: "60px", paddingBottom: "60px" }}>
        <Card
          sx={{
            borderRadius: "24px",
            boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              padding: "40px",
              textAlign: "center",
              color: "white",
            }}
          >
            <CheckCircleIcon
              sx={{
                fontSize: "80px",
                marginBottom: "16px",
              }}
            />
            <Typography
              variant="h3"
              sx={{
                fontSize: "32px",
                fontWeight: 700,
                marginBottom: "8px",
              }}
            >
              Booking Confirmed! 🎉
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "16px",
                opacity: 0.9,
              }}
            >
              Your adventure awaits!
            </Typography>
          </Box>

          <CardContent sx={{ padding: "40px !important" }}>
            <Box sx={{ marginBottom: "32px" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: themeConfig.colors.text.primary,
                  marginBottom: "16px",
                }}
              >
                Booking Details
              </Typography>
              <Divider sx={{ marginBottom: "16px" }} />
              
              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted }}>
                  Booking ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.colors.text.primary }}>
                  {bookingData?.bookingId || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted }}>
                  Payment ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.colors.text.primary }}>
                  {bookingData?.paymentId || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted }}>
                  Amount Paid:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#10b981", fontSize: "18px" }}>
                  ₹{bookingData?.totalAmount ? bookingData.totalAmount.toLocaleString() : "0"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted }}>
                  Status:
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: "#10b981",
                    backgroundColor: "#d1fae5",
                    padding: "4px 12px",
                    borderRadius: "12px",
                  }}
                >
                  Confirmed
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: "#f0f9ff",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "32px",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontSize: "14px",
                  color: themeConfig.colors.text.primary,
                  marginBottom: "8px",
                }}
              >
                📧 <strong>Confirmation email sent!</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "13px",
                  color: themeConfig.colors.text.muted,
                }}
              >
                We've sent your booking confirmation and itinerary details to your email. Please check your inbox.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              <Button
                variant="outlined"
                startIcon={<VisibilityIcon />}
                onClick={handleViewReceipt}
                sx={{
                  borderColor: themeConfig.colors.primary.main,
                  color: themeConfig.colors.primary.main,
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                }}
              >
                View Receipt
              </Button>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownloadReceipt}
                sx={{
                  borderColor: themeConfig.colors.primary.main,
                  color: themeConfig.colors.primary.main,
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                }}
              >
                Download Receipt
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push("/")}
                sx={{
                  borderColor: themeConfig.colors.primary.main,
                  color: themeConfig.colors.primary.main,
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                }}
              >
                Back to Home
              </Button>
              <Button
                variant="contained"
                onClick={() => router.push("/explore")}
                sx={{
                  backgroundColor: themeConfig.colors.primary.main,
                  color: themeConfig.colors.text.secondary,
                  padding: "12px 24px",
                  fontSize: "14px",
                  fontWeight: 600,
                  borderRadius: "10px",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: themeConfig.colors.primary.light,
                  },
                }}
              >
                Explore More Trips
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

