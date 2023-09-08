import typography from "./Typography";
import { shadows } from "./Shadows";

export const generatePalette = (mode) => {
   const isDarkMode = mode === "dark";

   return {
      palette: {
         mode: isDarkMode ? "dark" : "light",
         primary: {
            main: isDarkMode ? "#4570EA" : "#5D87FF",
            light: isDarkMode ? "#ECF2FF" : "#ECF2FF",
            dark: isDarkMode ? "#1A2E67" : "#4570EA",
            contrastText: "#fff",
         },
         secondary: {
            main: isDarkMode ? "#23afdb" : "#49BEFF",
            light: isDarkMode ? "#E8F7FF" : "#E8F7FF",
            dark: isDarkMode ? "#0077A8" : "#23afdb",
            contrastText: "#fff",
         },
         success: {
            main: isDarkMode ? "#02b3a9" : "#13DEB9",
            light: isDarkMode ? "#E6FFFA" : "#E6FFFA",
            dark: isDarkMode ? "#009d8a" : "#02b3a9",
            contrastText: "#fff",
         },
         info: {
            main: isDarkMode ? "#1682d4" : "#539BFF",
            light: isDarkMode ? "#EBF3FE" : "#EBF3FE",
            dark: isDarkMode ? "#0e5b9e" : "#1682d4",
            contrastText: "#fff",
         },
         error: {
            main: isDarkMode ? "#f3704d" : "#FA896B",
            light: isDarkMode ? "#FDEDE8" : "#FDEDE8",
            dark: isDarkMode ? "#b7472a" : "#f3704d",
            contrastText: "#fff",
         },
         warning: {
            main: isDarkMode ? "#ae8e59" : "#FFAE1F",
            light: isDarkMode ? "#FEF5E5" : "#FEF5E5",
            dark: isDarkMode ? "#75613b" : "#ae8e59",
            contrastText: "#fff",
         },
         purple: {
            A50: isDarkMode ? "#EBF3FE" : "#EBF3FE",
            A100: isDarkMode ? "#6610f2" : "#6610f2",
            A200: isDarkMode ? "#557fb9" : "#557fb9",
         },
         grey: {
            100: isDarkMode ? "#F2F6FA" : "#F2F6FA",
            200: isDarkMode ? "#EAEFF4" : "#EAEFF4",
            300: isDarkMode ? "#DFE5EF" : "#DFE5EF",
            400: isDarkMode ? "#7C8FAC" : "#7C8FAC",
            500: isDarkMode ? "#5A6A85" : "#5A6A85",
            600: isDarkMode ? "#2A3547" : "#2A3547",
         },
         text: {
            primary: isDarkMode ? "#FFFFFF" : "#2A3547",
            secondary: isDarkMode ? "#B0BEC5" : "#5A6A85",
         },
         action: {
            disabledBackground: isDarkMode ? "rgba(73,82,88,0.12)" : "rgba(73,82,88,0.12)",
            hoverOpacity: 0.02,
            hover: isDarkMode ? "#324B66" : "#f6f9fc",
         },
         divider: isDarkMode ? "#39444D" : "#e5eaef",
      },
      typography,
      shadows,
   };
};
