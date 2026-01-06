import { Box, Card, CardContent, Typography, TextField, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import themeConfig from "@/src/theme";

export default function ItineraryEditor({ itinerary, onItineraryChange, onAddActivity, onRemoveActivity, onRemoveDay, onAddDay, onDayTitleChange }) {
  if (!itinerary) return null;

  return (
    <Card sx={{ marginBottom: "32px", borderRadius: "24px", boxShadow: "0 12px 40px rgba(30, 58, 95, 0.15)" }}>
      <CardContent sx={{ padding: "28px !important" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: "24px",
              fontWeight: 700,
              color: themeConfig.colors.text.primary,
              fontFamily: themeConfig.fonts.heading,
            }}
          >
            Customize Trip Itinerary
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddDay}
            sx={{
              backgroundColor: themeConfig.colors.primary.main,
              color: themeConfig.colors.text.secondary,
              textTransform: "none",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: themeConfig.colors.primary.light,
              },
            }}
          >
            Add New Day
          </Button>
        </Box>

        {itinerary.length === 0 ? (
          <Box
            sx={{
              padding: "60px 20px",
              textAlign: "center",
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)",
              border: "2px dashed rgba(75, 140, 168, 0.3)",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: themeConfig.colors.text.muted,
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              No days in itinerary
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: themeConfig.colors.text.muted,
                marginBottom: "24px",
              }}
            >
              Click "Add New Day" to start building your custom itinerary
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddDay}
              sx={{
                backgroundColor: themeConfig.colors.primary.main,
                color: themeConfig.colors.text.secondary,
                textTransform: "none",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: themeConfig.colors.primary.light,
                },
              }}
            >
              Add Your First Day
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {itinerary.map((day, dayIndex) => (
            <Box
              key={dayIndex}
              sx={{
                padding: "20px",
                borderRadius: "16px",
                background: "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)",
                border: "1px solid rgba(75, 140, 168, 0.2)",
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", gap: "12px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "8px", flex: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: "18px",
                      fontWeight: 600,
                      color: themeConfig.colors.text.primary,
                      fontFamily: themeConfig.fonts.heading,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Day {day.day}:
                  </Typography>
                  <TextField
                    size="small"
                    value={day.title}
                    onChange={(e) => onDayTitleChange(dayIndex, e.target.value)}
                    sx={{
                      flex: 1,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        fontWeight: 600,
                        fontSize: "16px",
                      },
                    }}
                  />
                </Box>
                <IconButton
                  onClick={() => onRemoveDay(dayIndex)}
                  sx={{
                    color: "#ef4444",
                    "&:hover": { backgroundColor: "#fee2e2" },
                  }}
                  title="Delete entire day"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {day.activities.map((activity, activityIndex) => (
                  <Box key={activityIndex} sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={activity}
                      onChange={(e) => onItineraryChange(dayIndex, activityIndex, e.target.value)}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                        },
                      }}
                    />
                    <IconButton
                      onClick={() => onRemoveActivity(dayIndex, activityIndex)}
                      sx={{
                        color: "#ef4444",
                        "&:hover": { backgroundColor: "#fee2e2" },
                      }}
                    >
                      ✕
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => onAddActivity(dayIndex)}
                  sx={{
                    marginTop: "8px",
                    alignSelf: "flex-start",
                    textTransform: "none",
                  }}
                >
                  + Add Activity
                </Button>
              </Box>
            </Box>
            ))}
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

