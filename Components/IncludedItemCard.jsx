import { Card, CardContent, CardMedia, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  cursor: "pointer",
  transition: theme.transitions.create(["transform", "boxShadow"]),
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[6],
  },
}));

export default function IncludedItemCard({ item }) {
  const IconComponent = item.icon;

  return (
    <StyledCard>
      <CardMedia
        sx={{
          height: 180,
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: `linear-gradient(180deg, transparent 0%, ${item.color}60 100%)`,
          },
        }}
        image={item.image}
      />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          {IconComponent && <IconComponent sx={{ fontSize: 24, color: item.color }} />}
          <Typography variant="h6" sx={{ fontSize: "1.125rem", fontWeight: 600 }}>
            {item.title}
          </Typography>
        </Stack>
        {item.description?.map((desc, idx) => (
          <Typography key={idx} variant="body2" sx={{ opacity: 0.8, mb: 0.5 }}>
            • {desc}
          </Typography>
        ))}
      </CardContent>
    </StyledCard>
  );
}

