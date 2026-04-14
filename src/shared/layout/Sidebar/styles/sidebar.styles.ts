import { alpha, type Theme } from "@mui/material/styles";
import { transition } from "@/core/theme/motion";

const RADIUS = 12;
const INDICATOR_W = 5;
const INDICATOR_RADIUS = 6;

export const sidebarStyles = {
  container: (theme: Theme) => ({
    width: 264,
    flexShrink: 0,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column" as const,
    overflowY: "auto" as const,
    bgcolor: "background.paper",
    pt: 3,
    pb: 2,
    px: 1.5,
    boxShadow:
      theme.palette.mode === "dark"
        ? `1px 0 8px ${alpha(theme.palette.common.black, 0.4)}`
        : `1px 0 6px ${alpha(theme.palette.common.black, 0.04)}`,
  }),

  navList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: 1,
    p: 0,
    m: 0,
    listStyle: "none",
  },

  item: (theme: Theme) => {
    const isDark = theme.palette.mode === "dark";

    const activeBg = isDark
      ? alpha(theme.palette.primary.main, 0.12)
      : alpha(theme.palette.primary.main, 0.10);

    const activeBgHover = isDark
      ? alpha(theme.palette.primary.main, 0.18)
      : alpha(theme.palette.primary.main, 0.15);

    return {
      position: "relative" as const,
      display: "flex",
      alignItems: "center",
      borderRadius: `${RADIUS}px`,
      px: "14px",
      py: "10px",
      minHeight: 44,
      overflow: "hidden" as const,
      textDecoration: "none",
      color: theme.palette.text.secondary,
      bgcolor: "transparent",
      transition: transition(["background-color", "color"], "normal"),

      "&:hover": {
        bgcolor: theme.palette.action.hover,
        color: theme.palette.text.primary,
      },

      "&.active": {
        bgcolor: activeBg,
        color: theme.palette.primary.main,

        "&:hover": {
          bgcolor: activeBgHover,
        },

        "&::after": {
          content: '""',
          position: "absolute" as const,
          right: 0,
          top: "1%",
          bottom: "1%",
          width: INDICATOR_W,
          borderRadius: `${INDICATOR_RADIUS}px`,
          bgcolor: theme.palette.primary.main,
        },
      },

      "&.Mui-focusVisible": {
        outline: `2px solid ${alpha(theme.palette.primary.main, 0.4)}`,
        outlineOffset: -2,
      },
    };
  },

  itemInner: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    width: "100%",
    minWidth: 0,
  },

  itemIcon: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 22,
    height: 22,
    color: "inherit",
  },

  itemLabel: (theme: Theme) => ({
    fontSize: theme.typography.body1.fontSize,
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.01em",
    color: "inherit",
    overflow: "hidden" as const,
    textOverflow: "ellipsis" as const,
    whiteSpace: "nowrap" as const,

    ".active &": {
      fontWeight: 600,
    },
  }),
};
