const TOKEN_KEY = "jwt_token";
const USER_ROLE_KEY = "user_role";

const BASE_API_URL = import.meta.env.VITE_API_BASE;

const authService = {
  login: async (email, password) => {
    const response = await fetch(`${BASE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(USER_ROLE_KEY, data.user?.role || data.role);
    return data;
  },

  register: async (userData) => {
    const response = await fetch(`${BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await response.json();
  },

  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
  },

  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  getUserRole: () => {
    return localStorage.getItem(USER_ROLE_KEY);
  },
};

export default authService;
