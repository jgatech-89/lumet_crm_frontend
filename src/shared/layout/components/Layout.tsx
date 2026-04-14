import { Box, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { ChevronRight, ChevronLeft } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState, type ReactNode } from "react";

import { Navbar } from "../Navbar/components/Navbar";
import { Sidebar } from "../Sidebar/components/Sidebar";
import { Footer } from "../Footer/components/Footer";
import { DURATION, EASING } from "@/core/theme/motion";

const SIDEBAR_WIDTH = 250;

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
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleOpenSidebar = () => {
    setMobileSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setMobileSidebarOpen(false);
  };

  const renderDesktopSidebar = showSidebar && !isMobile;
  const renderMobileSidebar = showSidebar && isMobile;

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
              width: SIDEBAR_WIDTH,
              boxSizing: "border-box",
              bgcolor: "background.default",
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
          <Sidebar />
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
        {renderDesktopSidebar ? <Sidebar /> : null}

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
