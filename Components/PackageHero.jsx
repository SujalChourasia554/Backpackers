import { Paper, Typography, Stack, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const HeroSection = styled(Paper)(({ theme }) => ({
  position: "relative",
  height: 300,
  borderRadius: theme.spacing(3),
  overflow: "hidden",
  marginBottom: theme.spacing(5),
  boxShadow: theme.shadows[8],
  "&::before": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(30, 58, 95, 0.5) 0%, rgba(75, 140, 168, 0.6) 100%)",
    zIndex: 1,
  },
}));

const HeroContent = styled(Stack)({
  position: "relative",
  zIndex: 2,
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  padding: "0 20px",
});

const BudgetChip = styled(Chip)({
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  color: "white",
  fontWeight: 600,
});

export default function PackageHero({ name, description, heroImage, budget }) {
  return (
    <HeroSection
      sx={{
        backgroundImage: `url('${heroImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <HeroContent>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3.5rem", md: "5rem" },
            fontWeight: 900,
            color: "white",
            textShadow: "4px 4px 20px rgba(0,0,0,0.5)",
            mb: 1.5,
          }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              color: "white",
              textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
              maxWidth: 800,
              mb: 1.5,
            }}
          >
            {description}
          </Typography>
        )}
        {budget && <BudgetChip label={budget} />}
      </HeroContent>
    </HeroSection>
  );
}

