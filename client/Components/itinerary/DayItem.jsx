import { Box, Typography } from "@mui/material";
import themeConfig from "@/src/theme";

// Helper function to safely render icons
const renderIcon = (IconComponent, props) => {
  if (!IconComponent) return null;
  if (typeof IconComponent === 'function') {
    return <IconComponent {...props} />;
  }
  return null;
};

export default function DayItem({ day, index }) {
  return (
    <Box
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
  );
}

