const express = require("express");
const { body } = require("express-validator");
const { register, login, refresh, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register",
  body("email").isEmail().withMessage("Correo inválido"),
  body("password").isLength({ min: 6 }).withMessage("La contraseña debe tener al menos 6 caracteres"),
  register
);

router.post("/login",
  body("email").isEmail(),
  body("password").notEmpty(),
  login
);

router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router;
