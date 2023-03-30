import { useContext } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ColorModeContext } from "App";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "services/dataService";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const { t, i18n } = useTranslation();

  function handleChange(event) {
    i18n.changeLanguage(event.target.value);
    changeLanguage(event.target.value);
  }
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 1,
        p: 3,
      }}
    >
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      <select onChange={handleChange}>
        <option value="en">English</option>
        <option value="ch">Chinese</option>
      </select>
    </Box>
  );
};

export default Header;
