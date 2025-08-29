import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

// GET /profile/me
export const getMyProfile = async (req, res) => {
  try {
    // `req.user` lo trae el middleware auth.middleware.js
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] }, // no enviar contraseña
    });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// PUT /profile/update
export const updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};
