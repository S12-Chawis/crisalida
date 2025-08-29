const bcrypt = require("bcryptjs");  // Para encriptar contraseñas
const jwt = require("jsonwebtoken");  // Para manejar tokens JWT
const User = require("../models/User"); // Modelo de usuario de Sequelize 
 
const JWT_SECRET = "supersecretkey";   // Clave secreta para firmar los tokens
const JWT_REFRESH_SECRET = "refreshsecretkey";  // Clave secreta para firmar los tokens de refresh

const generateTokens = (user) => {       // Genera access y refresh tokens
  const accessToken = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(    // Genera refresh token 
    { id: user.id, email: user.email },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

exports.register = async (req, res) => {   // Controlador para registrar usuarios
  try {
    const { email, password } = req.body;

    // Validar si existe usuario
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Usuario registrado correctamente",
      data: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error en el registro", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ success: false, message: "Credenciales inválidas" });

    // Comparar password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Credenciales inválidas" });

    // Generar tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Guardar refreshToken en BD
    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      success: true,
      message: "Login exitoso",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error en el login", error: error.message });
  }
};

exports.refresh = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) return res.status(401).json({ success: false, message: "No se envió el refresh token" });

    // Verificar token
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);

    // Buscar usuario en BD
    const user = await User.findByPk(payload.id);
    if (!user || user.refreshToken !== token) {
      return res.status(403).json({ success: false, message: "Refresh token inválido" });
    }

    // Generar nuevos tokens
    const { accessToken, refreshToken } = generateTokens(user);
    user.refreshToken = refreshToken;
    await user.save();

    return res.json({
      success: true,
      message: "Tokens renovados",
      data: { accessToken, refreshToken },
    });
  } catch (error) {
    return res.status(403).json({ success: false, message: "Refresh token inválido", error: error.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ success: false, message: "Usuario no encontrado" });

    user.refreshToken = null;
    await user.save();

    return res.json({ success: true, message: "Sesión cerrada exitosamente" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error en logout", error: error.message });
  }
};
