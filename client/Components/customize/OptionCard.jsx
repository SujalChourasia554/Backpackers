import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import themeConfig from "@/src/theme";

export default function OptionCard({ option, isSelected, onSelect, priceLabel }) {
  return (
    <Card
      sx={{
        cursor: "pointer",
        border: isSelected ? "3px solid" : "1px solid",
        borderColor: isSelected ? themeConfig.colors.primary.main : "rgba(0,0,0,0.1)",
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
        },
        position: "relative",
      }}
      onClick={onSelect}
    >
      {isSelected && (
        <>
          <Box
            sx={{
              position: "absolute",
              top: "8px",
              right: "8px",
              zIndex: 2,
              backgroundColor: themeConfig.colors.primary.main,
              borderRadius: "50%",
              padding: "4px",
            }}
          >
            <CheckCircleIcon sx={{ color: "white", fontSize: "24px" }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "8px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 2,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              padding: "4px 12px",
              borderRadius: "12px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            Click to unselect
          </Box>
        </>
      )}
      <Box
        sx={{
          height: "180px",
          backgroundImage: `url(${option.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <CardContent sx={{ padding: "16px !important" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "16px",
            fontWeight: 600,
            marginBottom: "8px",
            fontFamily: themeConfig.fonts.heading,
          }}
        >
          {option.name}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
          <Typography variant="body2" sx={{ fontWeight: 600, color: themeConfig.colors.primary.main }}>
            {priceLabel}
          </Typography>
          {option.rating > 0 && (
            <Chip
              label={`⭐ ${option.rating.toFixed(1)}`}
              size="small"
              sx={{
                backgroundColor: "#fef3c7",
                color: "#92400e",
                fontWeight: 600,
              }}
            />
          )}
        </Box>
        {option.description && (
          <Typography
            variant="body2"
            sx={{
              fontSize: "12px",
              color: themeConfig.colors.text.muted,
              marginBottom: "4px",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {option.description}
          </Typography>
        )}
        {option.category && (
          <Chip
            label={option.category}
            size="small"
            sx={{
              marginTop: "8px",
              backgroundColor: themeConfig.colors.primary.light,
              color: themeConfig.colors.primary.main,
              fontWeight: 600,
              fontSize: "11px",
            }}
          />
        )}
        {option.duration && (
          <Typography
            variant="caption"
            sx={{
              fontSize: "11px",
              color: themeConfig.colors.text.muted,
              marginTop: "4px",
              display: "block",
            }}
          >
            Duration: {option.duration}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

