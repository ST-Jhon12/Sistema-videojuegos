import { userService } from "../services/userServices.js";

export const userController = {
  // 🔹 Obtener todos los usuarios
  async getUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // 🔹 Crear un nuevo usuario
  async createUser(req, res) {
    try {
      const { email, name } = req.body;

      if (!email || !name) {
        return res.status(400).json({
          success: false,
          message: "Email y nombre son obligatorios",
        });
      }

      const newUser = await userService.createUser({ email, name });
      res.status(201).json({
        success: true,
        data: newUser,
        message: "Usuario creado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // 🔹 Actualizar usuario existente
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedUser = await userService.updateUser(id, updateData);

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        data: updatedUser,
        message: "Usuario actualizado exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  // 🔹 Eliminar usuario por ID
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      const deletedUser = await userService.deleteUser(id);

      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "Usuario no encontrado",
        });
      }

      res.status(200).json({
        success: true,
        message: `Usuario con ID ${id} eliminado correctamente`,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
};
