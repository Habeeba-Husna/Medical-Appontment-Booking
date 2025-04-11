import Cookies from "js-cookie";

export const getUserInfoFromCookies = () => {
  const token = Cookies.get("token");
  const userRole = Cookies.get("userRole"); // assuming you're storing this

  return { token, userRole };
};
