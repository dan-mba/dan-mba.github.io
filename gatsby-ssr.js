import { getInitColorSchemeScript } from '@mui/material/styles';

export function onRenderBody({ setPreBodyComponents, setHtmlAttributes }) {
  setPreBodyComponents([getInitColorSchemeScript({defaultMode: 'system'})]);
  setHtmlAttributes({ lang: "en" })
}
