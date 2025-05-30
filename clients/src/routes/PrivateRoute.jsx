import React from "react";
import { Navigate } from "react-router-dom";

// Helper to decode JWT and extract user info (role, etc.)
function parseJwt(token) {
  try {
    if (!token) return null;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const user = parseJwt(token);

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection (case-sensitive)
  if (role && user.role !== role) {
    // Optionally, redirect to a "not authorized" page or a default dashboard
    return <Navigate to="/login" replace />;
  }

  // Authorized
  return children;
};

export default PrivateRoute;
