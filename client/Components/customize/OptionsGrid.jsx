import { Card, CardContent, Typography, Grid } from "@mui/material";
import themeConfig from "@/src/theme";
import OptionCard from "./OptionCard";

export default function OptionsGrid({ 
  title, 
  options, 
  selectedId, 
  selectedIds = [], 
  onSelect, 
  priceLabel, 
  budgetLimit, 
  numberOfDays,
  multiSelect = false 
}) {
  // Filter options within budget limit (budgetLimit is total for all days)
  const filteredOptions = options.filter((option) => {
    const totalPrice = option.price * numberOfDays;
    return totalPrice <= budgetLimit;
  });

  // Show filtered options if available, otherwise show all (so user can see options even if over budget)
  const displayOptions = filteredOptions.length > 0 ? filteredOptions : options;

  // Handle toggle: if already selected, unselect it; otherwise select it
  const handleToggle = (optionId) => {
    if (multiSelect) {
      // Multi-select mode
      if (selectedIds.includes(optionId)) {
        onSelect(selectedIds.filter(id => id !== optionId));
      } else {
        onSelect([...selectedIds, optionId]);
      }
    } else {
      // Single select mode
      if (selectedId === optionId) {
        onSelect(null); // Unselect
      } else {
        onSelect(optionId); // Select
      }
    }
  };

  const isSelected = (optionId) => {
    return multiSelect ? selectedIds.includes(optionId) : selectedId === optionId;
  };

  return (
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
          {title}
        </Typography>
        {filteredOptions.length < options.length && (
          <Typography
            variant="body2"
            sx={{
              color: themeConfig.colors.text.muted,
              marginBottom: "16px",
              fontStyle: "italic",
            }}
          >
            Showing {filteredOptions.length} of {options.length} options within your budget
          </Typography>
        )}
        <Grid container spacing={3}>
          {displayOptions.map((option) => (
            <Grid item xs={12} sm={6} md={3} key={option.id}>
              <OptionCard
                option={option}
                isSelected={isSelected(option.id)}
                onSelect={() => handleToggle(option.id)}
                priceLabel={option.price > 0 ? `₹${option.price.toLocaleString()}${priceLabel}` : 'Free'}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
