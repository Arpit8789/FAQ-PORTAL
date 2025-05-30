import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import AdminDashboard from "../pages/AdminDashboard";
import UserDashboard from "../pages/UserDashboard";
import AddFaq from "../pages/AddFaq";
import EditFaq from "../pages/EditFaq";
import ViewFaqs from "../pages/ViewFaqs";
import HomePage from "../pages/Homepage";
import PrivateRoute from "./PrivateRoute";
import AnalyticsPage from "../pages/AnalyticsPage";
import UserProfilePage from "../pages/UserProfilePage";
import AdminAccountPage from "../pages/AdminAccountPage";
import AboutPage from "../pages/AboutPage";
import BrowseFaqs from "../pages/BrowseFaqs";
import BookmarkedFaqs from "../pages/BookmarkedFaqs";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/faqs" element={<ViewFaqs />} />
      <Route path="/about" element={<AboutPage />} />

      {/* Protected Routes */}
      <Route
        path="/admin-dashboard"
        element={
          <PrivateRoute role="Admin">
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/user-dashboard"
        element={
          <PrivateRoute role="User">
            <UserDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-faq"
        element={
          <PrivateRoute role="Admin">
            <AddFaq />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit-faq/:id"
        element={
          <PrivateRoute role="Admin">
            <EditFaq />
          </PrivateRoute>
        }
      />

      <Route
        path="/admin/analytics"
        element={
          <PrivateRoute role="Admin">
            <AnalyticsPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/user/account"
        element={
          <PrivateRoute role="User">
            <UserProfilePage />
          </PrivateRoute>
        }
      />

      <Route
        path="/user/faqs"
        element={
          <PrivateRoute role="User">
            <BrowseFaqs />
          </PrivateRoute>
        }
      />
      <Route
        path="/auth/bookmarks"
        element={
          <PrivateRoute role="User">
            <BookmarkedFaqs />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/account"
        element={
          <PrivateRoute role="Admin">
            <AdminAccountPage />
          </PrivateRoute>
        }
      />

      {/* Redirect any unknown routes to FAQs page */}
      <Route path="*" element={<Navigate to="/faqs" replace />} />
    </Routes>
  );
};

export default AppRoutes;
