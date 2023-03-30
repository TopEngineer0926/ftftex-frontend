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
