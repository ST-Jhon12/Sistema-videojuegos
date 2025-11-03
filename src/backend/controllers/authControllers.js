import { authServices } from "../services/authServices.js";

export const authControllers = {
    //Registro
    async register(req, res){
    },


        async googleCallback(req, res){
        try{
            const user = req.user;
            
            const token = authServices.generateToken(user.id, user.email);
            
            res.redirect(`https://localhost:5173/`); //url de frontend
        } catch (error){
            res.redirect(`https://localhost:5173/`);
        }
    }
};