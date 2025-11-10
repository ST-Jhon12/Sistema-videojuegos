import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null); // null = verificando, true = ok, false = inválido
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsValid(false);
        return;
      }

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000); // ⏳ Timeout de 5s

        const response = await fetch("http://localhost:3000/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        clearTimeout(timeout);

        if (response.ok) {
          setIsValid(true);
        } else {
          setIsValid(false);
          localStorage.removeItem("authToken"); // token inválido → eliminarlo
        }
      } catch (error) {
        console.error("Error verificando token:", error);
        setIsValid(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-800">
        <p>Verificando acceso...</p>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
