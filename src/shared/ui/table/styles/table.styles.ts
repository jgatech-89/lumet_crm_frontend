export const tableStyles = {
  container: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },

  headerCell: {
    backgroundColor: "#f3f4f6",
    fontWeight: 600,
    fontSize: "0.85rem",
    color: "#6b7280",
    padding: "12px",
  },

  row: {
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#f9fafb",
    },
  },

  cell: {
    padding: "12px",
    fontSize: "0.9rem",
    color: "#374151",
    borderBottom: "1px solid #f1f1f1",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 16px",
    fontSize: "0.85rem",
    color: "#6b7280",
    borderTop: "1px solid #eee",
  },

  paginationContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  paginationButton: {
    border: "none",
    background: "transparent",
    color: "#374151",
    borderRadius: "8px",
    width: "32px",
    height: "32px",
    cursor: "pointer",
    fontSize: "0.85rem",
    padding: 0,
  },

  paginationButtonActive: {
    backgroundColor: "#3b82f6",
    color: "#fff",
    fontWeight: 600,
  },

  paginationIcon: {
    width: "28px",
    height: "28px",
    borderRadius: "6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: "#6b7280",
  },

  paginationIconDisabled: {
    opacity: 0.4,
    cursor: "not-allowed",
    pointerEvents: "none",
  },
};
