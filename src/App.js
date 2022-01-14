import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RegisterPage, LoginPage, VerifyPage, ProtectedRoute } from "./pages";
import { Map, Buttons, Loading } from "./components";
import { useAppContext } from "./context/appContext";

function App() {
  const { loading } = useAppContext();
  if (loading) return <Loading />;
  return (
    <div className="App">
      <Router>
        <Buttons />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Map />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-email" element={<VerifyPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
