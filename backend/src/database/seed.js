import bcrypt from "bcrypt";  // para hashear passwords
import { User } from "../../models/user.model.js";  

export async function seedUsers() {
  try {
    // Verificamos si ya existen usuarios para no duplicar
    const existingUsers = await User.findAll();
    if (existingUsers.length > 0) {
      console.log(" Ya existen usuarios, no se insertaron datos de prueba.");
      return;
    }

    const hashedAdminPassword = await bcrypt.hash("admin123", 10);
    const hashedLearnerPassword = await bcrypt.hash("learner123", 10);

    await User.bulkCreate([
      {
        name: "Admin User",
        email: "admin@example.com",
        password: hashedAdminPassword,
        role: "admin",
        xp: 0,
        level: 1,
        streak: 0,
      },
      {
        name: "Learner One",
        email: "learner1@example.com",
        password: hashedLearnerPassword,
        role: "learner",
        xp: 150,
        level: 2,
        streak: 3,
      },
      {
        name: "Learner Two",
        email: "learner2@example.com",
        password: hashedLearnerPassword,
        role: "learner",
        xp: 300,
        level: 4,
        streak: 7,
      },
    ]);

    console.log(" Seed ejecutado con éxito: usuarios creados.");
  } catch (error) {
    console.error(" Error al ejecutar seed:", error);
  }
}
