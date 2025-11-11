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

  // 🔹 Obtener un usuario por ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "Usuario no encontrado" });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al obtener el usuario: " + error.message,
      });
    }
  },

  // 🔹 Crear un nuevo usuario
  async createUser(req, res) {
    try {
      const { email, name, password, googleId, avatar } = req.body;

      if (!email || !name) {
        return res.status(400).json({
          success: false,
          message: "Email y nombre son obligatorios",
        });
      }

      const newUser = await userService.createUser({
        email,
        name,
        password,
        googleId,
        avatar,
      });

      res.status(201).json({
        success: true,
        data: newUser,
        message: "Usuario creado correctamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error al crear usuario: " + error.message,
      });
    }
  },

  // 🔹 Actualizar usuario existente (nombre, contraseña, avatar)
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, password, avatar } = req.body;

      // Validación mínima
      if (!name && !password && !avatar) {
        return res.status(400).json({
          success: false,
          message:
            "Debe proporcionar al menos un campo para actualizar (nombre, contraseña o avatar)",
        });
      }

      const updateData = {};
      if (name) updateData.name = name;
      if (password) updateData.password = password;
      if (avatar) updateData.avatar = avatar;

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
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({
        success: false,
        message: "Error al actualizar usuario: " + error.message,
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
        message: "Error al eliminar usuario: " + error.message,
      });
    }
  },
};
