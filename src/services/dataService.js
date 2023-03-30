export const changeTheme = (value) => {
  localStorage.setItem("mode", value);
  window.location.reload();
};

export const getTheme = () => {
  if (localStorage.getItem("mode")) {
    let mode = localStorage.getItem("mode");
    return mode;
  } else {
    localStorage.setItem("mode", "dark");
    return "dark";
  }
};

export const changeLanguage = (value) => {
  localStorage.setItem("lang", value);
};

export const getLanguage = () => {
  if (localStorage.getItem("lang")) {
    let lang = localStorage.getItem("lang");
    return lang;
  } else {
    localStorage.setItem("lang", "en");
    return "en";
  }
};