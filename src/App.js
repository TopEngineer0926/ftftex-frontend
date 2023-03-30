import './App.css';
import { useMemo, useState, createContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import enTranslation from "assets/i18n/en.json";
import chTranslation from "assets/i18n/ch.json";
import router from "routes";
import Header from "components/Fragments/Header";
import Footer from "components/Fragments/Footer";
import { changeTheme, getLanguage, getTheme } from "services/dataService";

export const FTFTexContext = createContext();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    ch: { translation: chTranslation },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

function App() {
  // const deviceTheme = useTheme();
  // const matches = useMediaQuery(deviceTheme.breakpoints.down('md'));
  // const [ftftexValue, setFtftexValue] = useState({
  //   isMobile: matches,
  // });

  const [mode, setMode] = useState(getTheme());
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        changeTheme(mode === "light" ? "dark" : "light");
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  useEffect(() => {
    i18n.changeLanguage(getLanguage());
  }, []);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>
          <Header />
          <RouterProvider router={router} />
          <Footer />
        </ThemeProvider>
      </I18nextProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
