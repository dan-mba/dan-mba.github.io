import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";

import { darkTheme } from "../theme";

export default function TopLayout({ children, theme }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const ColorTheme = useMemo(
    () => prefersDarkMode ? darkTheme : theme,
    [prefersDarkMode],
  );
  
  return (
    <ThemeTopLayout theme={ColorTheme}>{children}</ThemeTopLayout>
  );
}