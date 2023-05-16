import "./App.scss";
import { useMemo, useState, createContext, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18n from "i18next";
import enTranslation from "assets/i18n/en.json";
import chTranslation from "assets/i18n/ch.json";
import RoutesComponent from "routes";
import Header from "components/Fragments/Header";
import Footer from "components/Fragments/Footer";
import { changeTheme, getLanguage, getTheme } from "utils";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

export const FTFTexContext = createContext();
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

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
  const deviceTheme = useTheme();
  const matches = useMediaQuery(deviceTheme.breakpoints.down("md"));
  const [ftftexValue, setFtftexValue] = useState({
    isMobile: matches,
    Assets: {
      ordered: [],
      coins: {
        usdt: 0,
        eth: 0,
        bnb: 0,
        btc: 0,
        sol: 0,
        ada: 0,
        dot: 0,
        doge: 0,
        shib: 0,
        matic: 0,
        uni: 0,
        ltc: 0,
        trx: 0,
        xrp: 0,
      },
    },
    DialingCode: {
      name: "United Arab Emirates",
      dialCode: "+971",
      isoCode: "AE",
      flag: "https://cdn.kcak11.com/CountryFlags/countries/ae.svg",
    },
    Loggedin: {},
    avatar: "",
  });

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

    if (localStorage.getItem("asts")) {
      const parsed = JSON.parse(localStorage.getItem("asts"));
      setFtftexValue({
        ...ftftexValue,
        Assets: parsed,
      });
    }

    if (localStorage.getItem("usr")) {
      const loggedIn = JSON.parse(localStorage.getItem("usr"));
      setFtftexValue({
        ...ftftexValue,
        Loggedin: loggedIn,
      });
    }
  }, []);

  useEffect(() => {
    setFtftexValue({
      ...ftftexValue,
      isMobile: matches,
    });
  }, [matches]);

  return (
    <FTFTexContext.Provider value={[ftftexValue, setFtftexValue]}>
      <ColorModeContext.Provider value={colorMode}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Router>
              <Header />
              <div className="main">
                <SnackbarProvider
                  maxSnack={3}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  autoHideDuration={3000}
                >
                  <RoutesComponent />
                </SnackbarProvider>
              </div>
              <Footer />
            </Router>
          </ThemeProvider>
        </I18nextProvider>
      </ColorModeContext.Provider>
    </FTFTexContext.Provider>
  );
}

export default App;
