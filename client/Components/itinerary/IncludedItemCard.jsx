import { Box, Card, CardContent, Typography } from "@mui/material";
import themeConfig from "@/src/theme";

// Helper function to safely render icons
const renderIcon = (IconComponent, props) => {
  if (!IconComponent) return null;
  if (typeof IconComponent === 'function') {
    return <IconComponent {...props} />;
  }
  return null;
};

export default function IncludedItemCard({ item }) {
  return (
    <Card
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
  );
}

