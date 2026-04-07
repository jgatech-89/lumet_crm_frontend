import { Box, Typography, useTheme } from "@mui/material";

export function LoginLeftPanel() {
  const theme = useTheme();
  const loginIllustrationSrc =
    theme.palette.mode === "dark" ? "/login-dark.png" : "/login-light.png";

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: 1,
        display: { xs: "none", md: "flex" },
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flex: "1 1 50%",
        minHeight: 0,
        width: { md: "50%" },
        maxWidth: { md: "50%" },
        flexShrink: 0,
        px: 5,
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          maxWidth: 480,
          position: "relative",
          zIndex: 1,
          mt: { md: "8vh" },
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={(theme) => ({
            fontWeight: 700,
            color:
              theme.palette.mode === "dark" ? theme.palette.text.primary : "#374151",
            mb: 0.3,
            letterSpacing: "-0.02em",
            lineHeight: 0.9,
            fontSize: { xs: "2.4rem", sm: "3.65rem" },
            animation: "loginWelcomeIn 0.7s ease-out both",
            "@keyframes loginWelcomeIn": {
              from: { opacity: 0, transform: "translateY(10px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          })}
        >
          Bienvenido a
        </Typography>
        <Typography
          component="span"
          sx={{
            display: "block",
            mb: 2,
            fontSize: { xs: 28, sm: 50 },
            fontWeight: 800,
            color: "primary.main",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            animation: "loginLumetIn 0.7s ease-out 0.15s both",
            "@keyframes loginLumetIn": {
              from: { opacity: 0, transform: "translateY(12px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          Lumet
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "text.primary",
            mb: 2.3,
            mt: 2.1,
            maxWidth: 360,
            animation: "loginDescIn 0.6s ease-out 0.3s both",
            "@keyframes loginDescIn": {
              from: { opacity: 0, transform: "translateY(8px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          El sistema CRM diseñado para organizar y optimizar tu negocio.
        </Typography>

        <Box
          sx={{
            width: "100%",
            maxWidth: 460,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "float 12s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translate(0, 0) scale(1)" },
              "33%": { transform: "translate(2px, -3px) scale(1.005)" },
              "66%": { transform: "translate(-2px, -4px) scale(1.008)" },
            },
          }}
        >
          <Box
            component="img"
            src={loginIllustrationSrc}
            alt="Ideas, datos y colaboración"
            sx={(theme) => ({
              width: "140%",
              height: "auto",
              maxHeight: 380,
              objectFit: "contain",
              display: "block",
              // PNG sin fondo (dark): sin oscurecer el arte; solo profundidad suave sobre el panel
              ...(theme.palette.mode === "dark"
                ? {
                    opacity: 1,
                    filter:
                      "drop-shadow(0 12px 36px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 20px rgba(33, 150, 243, 0.12))",
                  }
                : {}),
            })}
          />
        </Box>
      </Box>
    </Box>
  );
}
