import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";

const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
    
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

     
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        }
      />

     
      <Route path="/404" element={<NotFound />} />

      
      <Route
        path="*"
        element={<Navigate to="/404" replace />}
      />
    </Routes>
  );
}

export default App;
