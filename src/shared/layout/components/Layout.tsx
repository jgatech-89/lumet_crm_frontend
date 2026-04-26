import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState, type ReactNode } from "react";

import { Navbar } from "../Navbar/components/Navbar";
import { Sidebar } from "../Sidebar/components/Sidebar";
import { Footer } from "../Footer/components/Footer";
import { DURATION, EASING } from "@/core/theme/motion";

const SIDEBAR_WIDTH = 250;
const SIDEBAR_PHONE_WIDTH = 112;
const DESKTOP_SIDEBAR_COLLAPSED_KEY = "layout.desktopSidebarCollapsed";

interface LayoutProps {
  children: ReactNode;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  showSidebar?: boolean;
  showFooter?: boolean;
}

export const Layout = ({
  children,
  searchPlaceholder,
  onSearch,
  showSidebar = true,
  showFooter = true,
}: LayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [phoneSidebarVisible, setPhoneSidebarVisible] = useState(true);
  const [desktopSidebarCollapsed, setDesktopSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem(DESKTOP_SIDEBAR_COLLAPSED_KEY) === "1";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(DESKTOP_SIDEBAR_COLLAPSED_KEY, desktopSidebarCollapsed ? "1" : "0");
    } catch {
    }
  }, [desktopSidebarCollapsed]);

  const handleOpenSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const renderDesktopSidebar = showSidebar && !isMobile;
  const renderMobileSidebar = showSidebar && isMobile && !isPhone;
  const renderPhoneSidebar = showSidebar && isPhone;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box sx={{ flexShrink: 0 }}>
        <Navbar searchPlaceholder={searchPlaceholder} onSearch={onSearch} />
      </Box>

      {renderMobileSidebar && !mobileSidebarOpen ? (
        <IconButton
          size="small"
          onClick={handleOpenSidebar}
          aria-label="Abrir menú lateral"
          sx={{
            position: "fixed",
            left: 8,
            top: 74,
            zIndex: 1200,
            width: 30,
            height: 30,
            border: 0,
            bgcolor: "background.default",
            boxShadow: "none",
            "&:hover": {
              bgcolor: "action.hover",
            },
          }}
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      ) : null}

      {renderMobileSidebar ? (
        <Drawer
          anchor="left"
          open={mobileSidebarOpen}
          onClose={handleCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: isPhone ? SIDEBAR_PHONE_WIDTH : SIDEBAR_WIDTH,
              boxSizing: "border-box",
              bgcolor: "background.paper",
              border: "none",
              boxShadow: "none",
            },
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <IconButton
              size="small"
              onClick={handleCloseSidebar}
              aria-label="Cerrar menú lateral"
            >
              <ChevronLeft fontSize="small" />
            </IconButton>
          </Box>
          <Sidebar compact={isPhone} />
        </Drawer>
      ) : null}

      <Box
        sx={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          bgcolor: "background.default",
        }}
      >
        {renderDesktopSidebar ? (
          <Box sx={{ position: "relative", flexShrink: 0, bgcolor: "background.paper" }}>
            <Sidebar compact={desktopSidebarCollapsed} />
            <IconButton
              size="small"
              onClick={() => setDesktopSidebarCollapsed((prev) => !prev)}
              aria-label={desktopSidebarCollapsed ? "Expandir menú lateral" : "Colapsar menú lateral"}
              sx={{
                position: "absolute",
                top: 8,
                right: 6,
                zIndex: 2,
                width: 24,
                height: 24,
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              {desktopSidebarCollapsed ? <ChevronRight fontSize="small" /> : <ChevronLeft fontSize="small" />}
            </IconButton>
          </Box>
        ) : null}

        {renderPhoneSidebar ? (
          phoneSidebarVisible ? (
            <Box sx={{ position: "relative", flexShrink: 0, bgcolor: "background.paper" }}>
              <Sidebar compact />
              <IconButton
                size="small"
                onClick={() => setPhoneSidebarVisible(false)}
                aria-label="Ocultar menú lateral"
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 6,
                  zIndex: 2,
                  width: 24,
                  height: 24,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ChevronLeft fontSize="small" />
              </IconButton>
            </Box>
          ) : (
            <Box
              sx={{
                width: 32,
                flexShrink: 0,
                display: "flex",
                justifyContent: "center",
                pt: 1.5,
                bgcolor: "transparent",
              }}
            >
              <IconButton
                size="small"
                onClick={() => setPhoneSidebarVisible(true)}
                aria-label="Mostrar menú lateral"
                sx={{
                  width: 24,
                  height: 24,
                  bgcolor: "background.paper",
                  border: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <ChevronRight fontSize="small" />
              </IconButton>
            </Box>
          )
        ) : null}

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: 0,
            bgcolor: "background.default",
          }}
        >
          <Box
            component="main"
            sx={{
              flex: 1,
              minHeight: 0,
              bgcolor: "background.default",
              p: { xs: 2, sm: 3 },
              animation: `fadeIn ${DURATION.slow} ${EASING.enter} both`,
            }}
          >
            {children}
          </Box>
          {showFooter ? <Footer /> : null}
        </Box>
      </Box>
    </Box>
  );
};
