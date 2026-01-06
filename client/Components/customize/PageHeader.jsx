import { Box, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import themeConfig from "@/src/theme";

export default function PageHeader({ title, backUrl }) {
  const router = useRouter();

  return (
    <Box sx={{ display: "flex", alignItems: "center", marginBottom: "32px" }}>
      <IconButton
        onClick={() => router.push(backUrl)}
        sx={{
          marginRight: "16px",
          color: themeConfig.colors.primary.main,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography
        variant="h2"
        sx={{
          fontSize: { xs: "32px", md: "40px" },
          fontWeight: 700,
          color: themeConfig.colors.text.primary,
          fontFamily: themeConfig.fonts.heading,
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}

