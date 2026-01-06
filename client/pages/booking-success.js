import { useRouter } from "next/router";
import { useState } from "react";
import { Box, Container, Typography, Button, Card, CardContent, Divider } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DownloadIcon from "@mui/icons-material/Download";
import Navbar from "@/Components/LandingPageComponents/Navbar";
import themeConfig from "@/src/theme";

export default function BookingSuccess() {
  const router = useRouter();
  const { payment_id, amount } = router.query;
  const [bookingId] = useState(`BKP${Date.now()}`);

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
                  {bookingId}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted }}>
                  Payment ID:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.colors.text.primary }}>
                  {payment_id || "N/A"}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <Typography variant="body2" sx={{ color: themeConfig.colors.text.muted }}>
                  Amount Paid:
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#10b981", fontSize: "18px" }}>
                  ₹{amount ? parseInt(amount).toLocaleString() : "0"}
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
                startIcon={<DownloadIcon />}
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

