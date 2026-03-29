import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { getValidIdToken } from "./utils/refreshToken";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Profile from "./pages/profile";
import Login from "./pages/login";
import Register from "./pages/register";
import FAQ from "./pages/faq";
import CreateReport from "./pages/createReport";
import Reports from "./pages/reports";
import ReportDetails from "./pages/reportDetails";
import NotFound from "./pages/notFound";
import ProtectedRoute from "./utils/protectedRoute";
import PublicRoute from "./utils/publicRoute";
import "./App.css";
import User from "./pages/user";

function App() {
  useEffect(() => {
    getValidIdToken().catch(console.error);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="auth">
            <Route
              path="login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Route>
          <Route path="reports" element={<Reports />} />
          <Route path="report">
            <Route
              path="create"
              element={
                <ProtectedRoute>
                  <CreateReport />
                </ProtectedRoute>
              }
            />
            <Route path=":id" element={<ReportDetails />} />
          </Route>
          <Route path="users">
            <Route path=":id" element={<User/>}/>
          </Route>
          <Route path="contact-us" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
