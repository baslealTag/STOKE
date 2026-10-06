import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./pages/LoginForm";
import Home from "./pages/Home";
import ProtectedRoutes from "./ProtectedRoutes";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("tiD"));

  const updateToken = (newToken) => {
    sessionStorage.setItem("tiD", newToken);
    setToken(newToken);
  };
  return (
    <div>
      <Routes>
        <Route path="/login" element={<LoginForm />} />

        <Route element={<ProtectedRoutes />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
