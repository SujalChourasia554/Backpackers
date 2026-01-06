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
          backgroundRepeat: "no-repeat",
          transition: "transform 0.5s ease",
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
            fontSize: { xs: "28px", md: "36px" },
            fontWeight: 800,
            color: themeConfig.colors.text.secondary,
            textShadow: "2px 2px 12px rgba(0,0,0,0.6)",
            fontFamily: themeConfig.fonts.heading,
            letterSpacing: "-0.5px",
            marginBottom: "8px",
            lineHeight: 1.2,
          }}
        >
          {name}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontSize: { xs: "12px", md: "14px" },
              color: "rgba(255, 255, 255, 0.95)",
              textShadow: "1px 1px 6px rgba(0,0,0,0.5)",
              fontFamily: themeConfig.fonts.primary,
              fontWeight: 400,
              maxWidth: "700px",
              lineHeight: 1.4,
              marginBottom: "10px",
            }}
          >
            {description}
          </Typography>
        )}
        {budget && (
          <Box
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(12px)",
              padding: "6px 18px",
              borderRadius: "16px",
              border: "1.5px solid rgba(255, 255, 255, 0.4)",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "14px" },
                color: themeConfig.colors.text.secondary,
                textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
                fontFamily: themeConfig.fonts.primary,
                fontWeight: 700,
                letterSpacing: "0.5px",
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

