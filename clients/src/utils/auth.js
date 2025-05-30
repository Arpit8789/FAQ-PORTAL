// utils/auth.js

const TOKEN_KEY = "jwt_token";
const USER_ROLE_KEY = "user_role";

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const setUserRole = (role) => {
  localStorage.setItem(USER_ROLE_KEY, role);
};

export const getUserRole = () => {
  return localStorage.getItem(USER_ROLE_KEY);
};

export const removeUserRole = () => {
  localStorage.removeItem(USER_ROLE_KEY);
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  removeToken();
  removeUserRole();
};
