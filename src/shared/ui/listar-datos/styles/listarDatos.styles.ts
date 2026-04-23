export const listarDatosStyles = {
  root: {
    display: "flex",
    flexDirection: "column" as const,
    minHeight: 0,
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
  },

  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    flexWrap: "wrap" as const,
    padding: "10px 12px",
    borderBottom: "1px solid #f1f1f1",
    backgroundColor: "#fafafa",
  },

  summaryText: {
    fontSize: "0.8rem",
    color: "#6b7280",
    flex: "1 1 auto",
    minWidth: 0,
  },

  listScroll: {
    overflow: "auto",
    minHeight: 0,
  },

  list: {
    paddingTop: 0,
    paddingBottom: 0,
  },

  listItem: {
    alignItems: "flex-start",
    borderBottom: "1px solid #f1f1f1",
    transition: "background-color 0.15s ease",
    "&:last-of-type": {
      borderBottom: "none",
    },
  },

  listItemSelected: {
    backgroundColor: "rgba(244, 114, 182, 0.12)",
    "&:hover": {
      backgroundColor: "rgba(244, 114, 182, 0.16)",
    },
  },

  primaryText: {
    fontWeight: 600,
    fontSize: "0.95rem",
    color: "#111827",
    lineHeight: 1.35,
    textTransform: "none",
  },

  secondaryStack: {
    marginTop: "4px",
    gap: "2px",
  },

  secondaryLine: {
    fontSize: "0.8rem",
    color: "#6b7280",
    lineHeight: 1.4,
  },

  actionsBox: {
    display: "flex",
    alignItems: "center",
    gap: 0.25,
    flexShrink: 0,
    marginLeft: 1,
  },

  emptyBox: {
    padding: 3,
    textAlign: "center" as const,
    color: "#6b7280",
    fontSize: "0.875rem",
  },

  skeletonItem: {
    borderBottom: "1px solid #f1f1f1",
    padding: "12px 16px",
  },
};
