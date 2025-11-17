import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

export default function Perfil() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    id: null,
    name: "nombre de usuario",
    email: "usuario@gmail.com",
    avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    hasPassword: false,
  });

  const [loading, setLoading] = useState(false);
  const [savingName, setSavingName] = useState(false);
  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [message, setMessage] = useState(null);

  const [editingName, setEditingName] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        // 1) If we have a token, try /api/auth/me with Bearer
        const token = localStorage.getItem("token");
        if (token) {
          try {
            const res = await fetch("http://localhost:3000/api/auth/me", {
              headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
              const body = await res.json();
              if (body && body.data) {
                setUsuario((u) => ({ ...u, ...body.data }));
                localStorage.setItem("user", JSON.stringify(body.data));
                return;
              }
            }
          } catch (err) {
            // ignore and try next
          }
        }

        // 2) Try cookie/session (Passport) by calling /api/auth/me with credentials
        try {
          const resCookie = await fetch("http://localhost:3000/api/auth/me", { credentials: "include" });
          if (resCookie.ok) {
            const body = await resCookie.json();
            if (body && body.data) {
              setUsuario((u) => ({ ...u, ...body.data }));
              localStorage.setItem("user", JSON.stringify(body.data));
              return;
            }
          }
        } catch (err) {
          // ignore and try fallback
        }

        // 3) Fallback: read localStorage.user and refresh by id if possible
        const stored = localStorage.getItem("user");
        if (!stored) return;
        const parsed = JSON.parse(stored);
        if (!parsed) return;
        setUsuario((u) => ({ ...u, ...parsed }));
        if (!parsed.id) return;

        const res = await fetch(`http://localhost:3000/api/users/${parsed.id}`, { credentials: "include" });
        if (!res.ok) return;
        const body = await res.json();
        if (body && body.data) {
          setUsuario((prev) => ({ ...prev, ...body.data }));
          localStorage.setItem("user", JSON.stringify(body.data));
        }
      } catch (err) {
        console.error("Error cargando usuario:", err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const updateByIdOrName = async (payload) => {
    try {
      const token = localStorage.getItem("token");
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      if (usuario.id) {
        const res = await fetch(`http://localhost:3000/api/users/${usuario.id}`, {
          method: "PUT",
          headers,
          credentials: "include",
          body: JSON.stringify(payload),
        });
        if (res.ok) return await res.json();
      }

      // fallback: update by name
      const res2 = await fetch(`http://localhost:3000/api/users/name/${encodeURIComponent(usuario.name)}`, {
        method: "PUT",
        headers,
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (res2.ok) return await res2.json();

      return null;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const handleSaveName = async () => {
    setSavingName(true);
    setMessage(null);
    try {
      const body = await updateByIdOrName({ name: formName });
      if (body && body.data) {
        setUsuario((prev) => ({ ...prev, ...body.data }));
        localStorage.setItem("user", JSON.stringify(body.data));
        setMessage({ type: "success", text: "Nombre actualizado" });
        setEditingName(false);
      } else {
        setMessage({ type: "error", text: "No se pudo actualizar el nombre" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error al actualizar nombre" });
    } finally {
      setSavingName(false);
    }
  };

  const handleSaveEmail = async () => {
    setSavingEmail(true);
    setMessage(null);
    try {
      const body = await updateByIdOrName({ email: formEmail });
      if (body && body.data) {
        setUsuario((prev) => ({ ...prev, ...body.data }));
        localStorage.setItem("user", JSON.stringify(body.data));
        setMessage({ type: "success", text: "Email actualizado" });
        setEditingEmail(false);
      } else {
        setMessage({ type: "error", text: "No se pudo actualizar el email" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error al actualizar email" });
    } finally {
      setSavingEmail(false);
    }
  };

  const handleSavePassword = async () => {
    setSavingPassword(true);
    setMessage(null);
    try {
      const body = await updateByIdOrName({ password: formPassword });
      if (body && body.data) {
        setUsuario((prev) => ({ ...prev, ...body.data }));
        localStorage.setItem("user", JSON.stringify(body.data));
        setMessage({ type: "success", text: "Contraseña actualizada" });
        setEditingPassword(false);
      } else {
        setMessage({ type: "error", text: "No se pudo actualizar la contraseña" });
      }
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Error al actualizar contraseña" });
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-700 flex justify-center py-10">
      <div className="bg-[#87a8be] w-11/12 md:w-8/12 lg:w-5/12 rounded-xl shadow-xl p-8 mt-20">
        <h1 className="text-3xl font-bold text-white mb-6">Ajustes</h1>

        <div className="bg-[#f0f0f0] rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Información básica</h2>

          <div className="flex items-center gap-4">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-300 flex items-center justify-center">
              <img src={usuario.avatar} alt="avatar" className="w-full h-full object-cover" />
              <FaCamera className="absolute bottom-1 right-1 text-white bg-black p-1 rounded-full text-lg cursor-pointer" />
            </div>

            <div className="flex flex-col">
              {editingName ? (
                <div className="flex items-center gap-2">
                  <input
                    className="text-gray-800 text-lg font-semibold bg-white px-2 rounded"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                  />
                  <button onClick={handleSaveName} className="text-sm bg-blue-600 text-white px-3 py-1 rounded" disabled={savingName}>
                    {savingName ? "Guardando..." : "Guardar"}
                  </button>
                  <button onClick={() => setEditingName(false)} className="text-sm text-gray-700 hover:underline">Cancelar</button>
                </div>
              ) : (
                <p className="text-gray-800 text-lg font-semibold">{usuario.name}</p>
              )}

              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs w-fit mt-1">En línea</span>
            </div>

            <div className="ml-auto flex items-center gap-3">
              {!editingName && (
                <button
                  onClick={() => {
                    setFormName(usuario.name || "");
                    setEditingName(true);
                    setMessage(null);
                  }}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Editar nombre
                </button>
              )}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-700 text-sm font-semibold">Correo Electrónico:</p>
            <div className="flex justify-between items-center">
              {editingEmail ? (
                <div className="flex items-center gap-2 w-full">
                  <input className="px-2 py-1 border rounded w-2/3" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
                  <button onClick={handleSaveEmail} className="text-sm bg-blue-600 text-white px-3 py-1 rounded" disabled={savingEmail}>
                    {savingEmail ? "Guardando..." : "Guardar"}
                  </button>
                  <button onClick={() => setEditingEmail(false)} className="text-sm text-gray-700 hover:underline">Cancelar</button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800">{usuario.email}</span>
                  <button onClick={() => { setFormEmail(usuario.email || ""); setEditingEmail(true); setMessage(null); }} className="text-blue-600 text-sm hover:underline">Actualizar</button>
                </>
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-gray-700 text-sm font-semibold">Contraseña:</p>
            <div className="flex justify-between items-center">
              {editingPassword ? (
                <div className="flex items-center gap-2 w-full">
                  <input type="password" placeholder="Nueva contraseña" className="px-2 py-1 border rounded w-2/3" value={formPassword} onChange={(e) => setFormPassword(e.target.value)} />
                  <button onClick={handleSavePassword} className="text-sm bg-blue-600 text-white px-3 py-1 rounded" disabled={savingPassword}>{savingPassword ? "Guardando..." : "Guardar"}</button>
                  <button onClick={() => setEditingPassword(false)} className="text-sm text-gray-700 hover:underline">Cancelar</button>
                </div>
              ) : (
                <>
                  <span className="text-gray-800">{usuario.hasPassword ? "Tiene contraseña" : "No tiene contraseña"}</span>
                  <button onClick={() => { setFormPassword(""); setEditingPassword(true); setMessage(null); }} className="text-blue-600 text-sm hover:underline">Actualizar</button>
                </>
              )}
            </div>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded ${message.type === "error" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>{message.text}</div>
          )}

          <div className="mt-4">
            <p className="text-gray-700 text-sm font-semibold">Tema de fondo:</p>
            <select className="mt-1 px-3 py-2 bg-white border rounded-lg">
              <option value="claro">Claro</option>
              <option value="oscuro">Oscuro</option>
              <option value="color">Colorido</option>
            </select>
          </div>

          <div className="mt-6 text-right">
            <button className="text-pink-600 text-sm hover:underline">Logros</button>
            <p className="text-xs text-gray-700 -mt-1">17% desbloqueado</p>
          </div>

          <div className="bg-purple-200 rounded-xl p-5 mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Visibilidad de perfil</h3>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-800">Público</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-800">Mostrar estado en línea</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-800">Permitir solicitudes de amistad</span>
              <input type="checkbox" className="w-5 h-5" defaultChecked />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-800">Activar las notificaciones</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-800">¿Mantener la cuenta al cerrar?</span>
              <input type="checkbox" className="w-5 h-5" />
            </div>

            <div className="text-center mt-6">
              <button className="bg-purple-400 text-white px-5 py-2 rounded-full shadow-md hover:bg-purple-500 transition">Guardar cambios</button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <button onClick={() => navigate("/inicio")} className="text-white/80 hover:text-white underline">← Volver al inicio</button>
        </div>
      </div>
    </div>
  );
}
