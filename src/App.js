import './App.css';
import { useMemo, useState, createContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useMediaQuery, useTheme } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import Header from "./components/Fragments/Header";
import Footer from "./components/Fragments/Footer";
import { changeTheme, getTheme } from "./services/dataService";

export const FTFTexContext = createContext();
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  // const theme = useTheme();
  // const matches = useMediaQuery(theme.breakpoints.down('md'));
  // const [ftftexValue, setFtftexValue] = useState({
  //   isMobile: matches,
  //   lang: "en",
  //   mode: "light",
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

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
