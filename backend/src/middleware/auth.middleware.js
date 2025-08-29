import { verifyAccessToken } from "../utils/jwt.js";

// Middleware para proteger rutas
// Se asegura de que el usuario tenga un Access Token válido
export const authMiddleware = (req, res, next) => {
  // Extraer token del header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // formato: Bearer token

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Acceso denegado. No se proporcionó token",
    });
  }

  const decoded = verifyAccessToken(token); // Verificar token
  if (!decoded) {
    return res.status(403).json({
      success: false,
      message: "Token inválido o expirado",
    });
  }

  // Guardamos el usuario en la request
  req.user = decoded;
  next();
};
