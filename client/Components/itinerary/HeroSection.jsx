import { Box, Typography } from "@mui/material";
import themeConfig from "@/src/theme";

export default function HeroSection({ name, description, heroImage, budget }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "300px",
        borderRadius: "24px",
        overflow: "hidden",
        marginBottom: "40px",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url('${heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(30, 58, 95, 0.5) 0%, rgba(75, 140, 168, 0.6) 100%)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "56px", md: "80px" },
            fontWeight: 900,
            color: themeConfig.colors.text.secondary,
            textShadow: "4px 4px 20px rgba(0,0,0,0.5)",
            fontFamily: themeConfig.fonts.heading,
            letterSpacing: "-2px",
            marginBottom: "12px",
          }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontSize: { xs: "16px", md: "20px" },
              color: themeConfig.colors.text.secondary,
              textShadow: "2px 2px 8px rgba(0,0,0,0.4)",
              fontFamily: themeConfig.fonts.primary,
              fontWeight: 400,
              maxWidth: "800px",
              lineHeight: 1.6,
              marginBottom: "12px",
            }}
          >
            {description}
          </Typography>
        )}
        {budget && (
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              padding: "8px 20px",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              display: "inline-block",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "14px", md: "16px" },
                color: themeConfig.colors.text.secondary,
                textShadow: "1px 1px 4px rgba(0,0,0,0.3)",
                fontFamily: themeConfig.fonts.primary,
                fontWeight: 600,
              }}
            >
              {budget}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

