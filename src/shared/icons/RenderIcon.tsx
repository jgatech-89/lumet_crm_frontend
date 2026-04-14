import type { CSSProperties } from "react";
import { memo, useMemo } from "react";
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import type { SxProps, Theme } from "@mui/material/styles";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export interface RenderIconProps {
  icon?: string | null;
  className?: string;
  fontSize?: SvgIconProps["fontSize"];
  sx?: SxProps<Theme>;
}

const ICONIFY_ICON_STYLE: CSSProperties = {
  display: "block",
  color: "currentColor",
};

function fontSizeToPx(fontSize: SvgIconProps["fontSize"]): number | undefined {
  switch (fontSize) {
    case "small":
      return 20;
    case "large":
      return 35;
    case "inherit":
      return undefined;
    default:
      return 24;
  }
}

function parseIconifyId(raw: string | null | undefined): string | null {
  if (raw == null || typeof raw !== "string") {
    return null;
  }
  const t = raw.trim();
  if (!t) {
    return null;
  }
  const colon = t.indexOf(":");
  if (colon <= 0 || colon === t.length - 1) {
    return null;
  }
  return t;
}

/**
 * Icono dinámico vía Iconify (ids tipo `mdi:account`).
 * Fallback: `HelpOutlineIcon` (único import MUI estático).
 * https://iconify.design/icons/
 * Envuelto en `memo` para no repetir trabajo cuando el padre re-renderiza con las mismas props.
 */
export const RenderIcon = memo(function RenderIcon({
  icon,
  className,
  fontSize = "medium",
  sx,
}: RenderIconProps) {
  const id = parseIconifyId(icon);
  const px = fontSizeToPx(fontSize);

  const iconifyBoxSx = useMemo(
    () =>
      ({
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 0,
        color: "inherit",
        fontSize: px ?? "inherit",
        ...sx,
      }) satisfies SxProps<Theme>,
    [px, sx],
  );

  if (id === null) {
    return (
      <HelpOutlineIcon className={className} fontSize={fontSize} sx={sx} />
    );
  }

  return (
    <Box component="span" className={className} sx={iconifyBoxSx}>
      <Icon
        icon={id}
        width={px ?? "1em"}
        height={px ?? "1em"}
        style={ICONIFY_ICON_STYLE}
      />
    </Box>
  );
});
