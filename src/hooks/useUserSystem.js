export default function useUserSystem() {
  const getDeviceType = () => {
    const userAgent = window.navigator.userAgent;
    if (/Android/i.test(userAgent)) {
      return "Android";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return "iOS";
    } else if (/Windows Phone/i.test(userAgent)) {
      return "Windows Phone";
    } else if (/Macintosh|MacIntel|MacPPC|Mac68K/i.test(userAgent)) {
      return "Mac";
    } else if (/Windows/i.test(userAgent)) {
      return "Windows";
    } else if (/Linux/i.test(userAgent)) {
      return "Linux";
    } else {
      return "Unknown";
    }
  };

  const getResolution = () => {
    return `${window.screen.width}x${window.screen.height}`;
  };

  const getUserIP = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  };
  return { getDeviceType, getUserIP, getResolution };
}
