import { StyleSheet } from "@react-pdf/renderer";

export const colors = {
  black: "#000000",
  white: "#FFFFFF",
  gray50: "#F9FAFB",
  gray100: "#F3F4F6",
  gray300: "#D1D5DB",
  gray400: "#9CA3AF",
  gray500: "#6B7280",
  gray600: "#4B5563",
  gray800: "#1F2937",
};

export const baseStyles = StyleSheet.create({
  page: {
    width: "210mm",
    height: "297mm",
    backgroundColor: colors.white,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: colors.black,
  },
  // Typography
  h1: {
    fontSize: 36,
    fontFamily: "Helvetica-Bold",
    color: colors.black,
  },
  h2: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: colors.black,
  },
  h3: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: colors.gray500,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.6,
    color: colors.gray800,
  },
  small: {
    fontSize: 8,
    color: colors.gray500,
  },
  label: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    color: colors.gray400,
    marginBottom: 4,
  },
  mono: {
    fontFamily: "Courier",
  },
  // Layout
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderBottomWidth: 3,
    borderBottomColor: colors.black,
    paddingBottom: 8,
    marginBottom: 32,
  },
  pageNumber: {
    fontSize: 14,
    fontFamily: "Helvetica",
    color: colors.gray500,
  },
  section: {
    flexDirection: "row",
    marginBottom: 28,
  },
  sectionLabel: {
    width: "25%",
  },
  sectionContent: {
    width: "75%",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 3,
    borderTopColor: colors.black,
    paddingTop: 8,
  },
  dividerThin: {
    borderTopWidth: 1.5,
    borderTopColor: colors.black,
    paddingTop: 8,
    marginBottom: 8,
  },
  dividerDashed: {
    borderTopWidth: 1,
    borderTopStyle: "dashed",
    borderTopColor: colors.gray300,
    paddingTop: 16,
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  bgGray: {
    backgroundColor: colors.gray50,
    padding: 12,
    borderRadius: 4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 6,
  },
  bullet: {
    width: 12,
    fontSize: 10,
    color: colors.gray800,
  },
  bulletText: {
    flex: 1,
    fontSize: 10,
    color: colors.gray800,
    lineHeight: 1.5,
  },
});
