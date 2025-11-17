import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Perfil() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const res = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        setUser(res.data.user);
      } catch (error) {
        console.error("Error al cargar usuario:", error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#1a1a2e]">
        <p className="text-white text-xl animate-pulse">Cargando perfil...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-6">
      <div className="bg-[#16213e] shadow-xl rounded-2xl p-10 w-full max-w-md border border-[#0f3460]">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Mi Perfil
        </h2>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <img
            src={
              user.avatar ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Avatar"
            className="w-32 h-32 rounded-full border-4 border-[#e94560] shadow-lg"
          />
        </div>

        {/* Info del usuario */}
        <div className="space-y-4 text-white">
          <p className="bg-[#0f3460] p-3 rounded-lg">
            <strong className="text-[#e94560]">Nombre:</strong> {user.name}
          </p>

          <p className="bg-[#0f3460] p-3 rounded-lg">
            <strong className="text-[#e94560]">Email:</strong> {user.email}
          </p>

          {user.googleId && (
            <p className="bg-[#0f3460] p-3 rounded-lg">
              <strong className="text-[#e94560]">Cuenta Google:</strong>{" "}
              Vinculada
            </p>
          )}
        </div>

        {/* Botón volver */}
        <button
          onClick={() => navigate("/")}
          className="mt-8 w-full bg-[#e94560] hover:bg-[#d4324e] text-white py-3 rounded-lg shadow-md transition"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
