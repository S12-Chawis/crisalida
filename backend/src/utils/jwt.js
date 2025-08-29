import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET || "access_secret";
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "refresh_secret";

// Generar Access Token (dura poco tiempo)
export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email }, // payload
    ACCESS_SECRET,
    { expiresIn: "15m" } // expira en 15 minutos
  );
};

// Generar Refresh Token (dura más tiempo)
export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    REFRESH_SECRET,
    { expiresIn: "7d" } // expira en 7 días
  );
};

// Verificar Access Token
export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, ACCESS_SECRET);
  } catch (error) {
    return null;
  }
};

// Verificar Refresh Token
export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, REFRESH_SECRET);
  } catch (error) {
    return null;
  }
};

// Refrescar tokens usando el Refresh Token válido
export const refreshTokens = (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  if (!decoded) return null;

  const newAccessToken = generateAccessToken(decoded);
  const newRefreshToken = generateRefreshToken(decoded);

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};
