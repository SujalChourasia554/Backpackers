import { Box, Typography } from "@mui/material";
import themeConfig from "@/src/theme";

export default function BudgetSummary({ totalBudget, isWithinBudget, hasCustomizations }) {
  return (
    <Box
      sx={{
        marginTop: "24px",
        padding: "20px",
        borderRadius: "16px",
        background: hasCustomizations
          ? (isWithinBudget
              ? "linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)"
              : "linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(220, 38, 38, 0.05) 100%)")
          : "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)",
        border: hasCustomizations
          ? `2px solid ${isWithinBudget ? "#10b981" : "#ef4444"}`
          : "1px solid rgba(75, 140, 168, 0.2)",
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
          marginBottom: hasCustomizations ? "16px" : 0,
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
      {hasCustomizations && (
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
      )}
    </Box>
  );
}

