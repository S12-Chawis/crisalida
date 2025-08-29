import request from "supertest";  // para hacer requests HTTP en tests  
import app from "../src/app.js"; // app principal de Express
import { sequelize } from "../src/database/database.js";   // conexión a la DB 
import { User } from "../src/models/user.model.js";   // modelo User
let token;

beforeAll(async () => {
  // Aseguramos conexión a la DB
  await sequelize.sync({ force: true });

  // Creamos un usuario de prueba para login
  await User.create({
    name: "Test User",
    email: "test@example.com",
    password: "$2b$10$eImiTXuWVxfM37uY4JANj.QQWJtb7lsG.NG6Vi6pUjUo3c5/5p9bG", // "password" en bcrypt
    role: "learner",
    xp: 0,
    level: 1,
    streak: 0,
  });
});

afterAll(async () => {
  await sequelize.close();
});

describe(" Auth & Profile API", () => {
  test(" Registration works (unique email)", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "mypassword",
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("id");
    expect(res.body.email).toBe("newuser@example.com");

    // Intentar registrar con el mismo email
    const res2 = await request(app)
      .post("/auth/register")
      .send({
        name: "New User",
        email: "newuser@example.com",
        password: "mypassword",
      });

    expect(res2.statusCode).toBe(400);
  });

  test(" Login works (JWT issued)", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "test@example.com",
        password: "password",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  test(" Protected route requires valid token", async () => {
    // Sin token
    const resNoToken = await request(app).get("/profile/me");
    expect(resNoToken.statusCode).toBe(401);

    // Con token válido
    const res = await request(app)
      .get("/profile/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe("test@example.com");
  });

  test(" Profile update works", async () => {
    const res = await request(app)
      .put("/profile/update")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Updated User",
        email: "updated@example.com",
        password: "newpassword",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Profile updated successfully");

    // Verificar que los datos cambiaron
    const user = await User.findOne({ where: { email: "updated@example.com" } });
    expect(user).not.toBeNull();
    expect(user.name).toBe("Updated User");
  });
});
