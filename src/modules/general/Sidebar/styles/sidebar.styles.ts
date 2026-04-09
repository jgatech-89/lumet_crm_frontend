export const sidebarStyles = {
  container: {
    width: 250,
    height: "auto",
    minHeight: 0,
    flexShrink: 0,
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    bgcolor: "#ffffff", 
    p: 2,
    borderRight: "1px solid #eee",
  },

  item: {
    borderRadius: 2,
    mb: 1,
    px: 1.5,
    position: "relative",

    "&:hover": {
      bgcolor: "#f5f5f5",
    },
  },

  itemActive: {
    bgcolor: "#e3f2fd",
    color: "#1976d2",

    "& .MuiListItemIcon-root": {
      color: "#1976d2",
    },

    "&::before": {
      content: '""',
      position: "absolute",
      left: 0,
      top: 6,
      bottom: 6,
      width: 4,
      borderRadius: 4,
      backgroundColor: "#1976d2",
    },
  },
};