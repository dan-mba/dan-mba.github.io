import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export default function TopLayout({ children, theme }) {
  return (
    <>
      <CssVarsProvider theme={theme} defaultMode='system'>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </>
  );
}