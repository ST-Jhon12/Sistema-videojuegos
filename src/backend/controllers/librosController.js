import { librosService } from "../services/librosServices.js";

export const librosController = {
  async getAllLibros(req, res) {
    try {
      const libros = await librosService.getAllLibros();
      // Return plain array to match frontend expectation
      return res.status(200).json(libros);
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getLibroById(req, res) {
    try {
      const { id } = req.params;
      const libro = await librosService.getLibroById(id);
      if (!libro) return res.status(404).json({ success: false, message: "Libro no encontrado" });
      return res.status(200).json({ success: true, data: libro });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async createLibro(req, res) {
    try {
      const data = req.body;
      const nuevo = await librosService.createLibro(data);
      return res.status(201).json({ success: true, data: nuevo });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async updateLibro(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;
      const actualizado = await librosService.updateLibro(id, data);
      return res.status(200).json({ success: true, data: actualizado });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async deleteLibro(req, res) {
    try {
      const { id } = req.params;
      await librosService.deleteLibro(id);
      return res.status(200).json({ success: true, message: "Libro eliminado" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};
