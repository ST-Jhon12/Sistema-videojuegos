import {useEffect} from "react";
import {replace, useSearchParams, useNavigate} from "react-router-dom";

function LoginSuccess(){
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get("token");

    if(token){
        console.log("Token recibido y guardado:", token);
        //Guardar el token en el almacenamiento local o en el estado global
        localStorage.setItem("authToken", token);
        //Redirigir al usuario a la pagina principal o dashboard
        navigate("/",{replace: true});
    }else{
        console.log("No se recibio token");
        navigate("/login-error",{replace: true});
    }[navigate, searchParams]});
    return (
        <div className="flex items-center justify-center min-h-screen">
            <h2>Login Exitoso</h2>
            <p>Redirigiendo...</p>
        </div>
    );
}

export default LoginSuccess;