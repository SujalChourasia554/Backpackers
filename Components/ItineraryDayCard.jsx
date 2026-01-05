import { Paper, Typography, Stack, Box, Avatar, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import themeConfig from "@/src/theme";

const StyledDayCard = styled(Paper)(({ theme, index }) => ({
  display: "flex",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  background: index % 2 === 0
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(248, 252, 255, 0.8) 100%)"
    : "linear-gradient(135deg, rgba(75, 140, 168, 0.08) 0%, rgba(75, 140, 168, 0.12) 100%)",
  border: `1px solid ${index % 2 === 0 ? "rgba(75, 140, 168, 0.1)" : "rgba(75, 140, 168, 0.2)"}`,
  transition: theme.transitions.create(["background-color", "transform"]),
  "&:hover": {
    backgroundColor: "rgba(75, 140, 168, 0.15)",
    transform: "translateX(4px)",
  },
}));

export default function ItineraryDayCard({ day, index }) {
  const theme = useTheme();
  const IconComponent = day.icon;

  return (
    <StyledDayCard index={index}>
      <Avatar sx={{ bgcolor: themeConfig.colors.primary.main, width: 40, height: 40, boxShadow: theme.shadows[4] }}>
        {IconComponent && <IconComponent sx={{ color: "white" }} />}
      </Avatar>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ fontSize: "1.0625rem", fontWeight: 600, mb: 0.75 }}>
          Day {day.day}: {day.title}
        </Typography>
        <Stack spacing={0.5}>
          {day.activities?.map((activity, actIdx) => (
            <Stack key={actIdx} direction="row" spacing={1.25} alignItems="flex-start">
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  bgcolor: themeConfig.colors.primary.light,
                  mt: 0.75,
                  flexShrink: 0,
                }}
              />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {activity}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </StyledDayCard>
  );
}

