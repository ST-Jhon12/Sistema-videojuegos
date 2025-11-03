import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [token, setToken] = useState(null); // ✅ define token y su setter

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
        🚀 Bienvenido a mi Sistema De Frontend
      </h1>

      {token ? (
        <>
          <p className="text-green-200 text-xl mb-4">
            Has iniciado sesión correctamente 🎉
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 px-6 py-3 bg-red-600 rounded-full text-white font-semibold hover:bg-red-700 transition"
          >
            Cerrar Sesión
          </button>
        </>
      ) : (
        <>
          <p className="text-red-200 text-xl mb-4">
            Parece que no has iniciado sesión 😅
          </p>
          <Link
            to="/login"
            className="text-white underline font-semibold hover:text-gray-200 transition"
          >
            Ir a la página de Login
          </Link>
        </>
      )}
    </div>
  );
}

export default Home;
