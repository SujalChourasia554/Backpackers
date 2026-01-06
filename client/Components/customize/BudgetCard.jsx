import { Box, Card, CardContent, Typography } from "@mui/material";
import themeConfig from "@/src/theme";

export default function BudgetCard({ totalBudget, budgetLimit, isWithinBudget }) {
  return (
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
  );
}

