export const tableStyles = {
  container: {
    backgroundColor: "background.paper",
    borderRadius: "12px",
    border: "1px solid",
    borderColor: "divider",
    overflow: "hidden",
    boxShadow: (theme: { palette: { mode: string } }) =>
      theme.palette.mode === "dark"
        ? "0 6px 18px rgba(0, 0, 0, 0.28)"
        : "0 4px 14px rgba(15, 23, 42, 0.05)",
  },

  headerCell: {
    backgroundColor: "background.default",
    fontWeight: 700,
    fontSize: "0.7rem",
    letterSpacing: "0.08em",
    color: "text.secondary",
    textTransform: "uppercase",
    padding: "10px 14px",
    borderBottom: "1px solid",
    borderColor: "divider",
    textAlign: "left",
    whiteSpace: "nowrap",
  },

  row: {
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "action.hover",
    },
  },

  cell: {
    padding: "14px",
    fontSize: "0.88rem",
    color: "text.primary",
    borderBottom: "1px solid",
    borderColor: "divider",
    verticalAlign: "middle",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    padding: "10px 14px",
    fontSize: "0.78rem",
    color: "text.secondary",
    borderTop: "1px solid",
    borderColor: "divider",
  },

  footerSummary: {
    fontWeight: 400,
    color: "text.secondary",
  },

  paginationContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  paginationButton: {
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    appearance: "none",
    color: "text.secondary",
    borderRadius: "10px",
    width: "34px",
    height: "34px",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    padding: 0,
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "primary.light",
      backgroundColor: "action.hover",
      color: "primary.main",
    },
  },

  paginationButtonActive: {
    borderColor: "primary.main",
    backgroundColor: "primary.main",
    color: "#111827",
    fontWeight: 600,
    boxShadow: (theme: { palette: { mode: string } }) =>
      theme.palette.mode === "dark"
        ? "0 6px 14px rgba(37, 99, 235, 0.45)"
        : "0 6px 14px rgba(37, 99, 235, 0.25)",
  },

  paginationIcon: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "1px solid",
    borderColor: "divider",
    backgroundColor: "background.paper",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "text.secondary",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "primary.light",
      backgroundColor: "action.hover",
      color: "primary.main",
    },
  },

  paginationIconDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
};
