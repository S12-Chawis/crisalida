// backend/src/services/task.service.js
const { withTransaction } = require('../config/database');

async function completeTask({ userId, taskId }) {
  return withTransaction(async (conn) => {
    // marcar tarea del usuario como completada
    await conn.execute(
      `UPDATE user_tasks SET status='completed', date_completed=NOW()
       WHERE user_id = ? AND task_id = ?`,
      [userId, taskId]
    );

    // sumar XP del task al usuario (ejemplo: podrías tener una tabla de XP)
    const [[task]] = await conn.execute(
      'SELECT xp_reward FROM tasks WHERE task_id = ?',
      [taskId]
    );

    // ejemplo hipotético de sumar XP a una tabla user_stats (ajústalo a tu modelo)
    await conn.execute(
      `UPDATE users SET current_level = current_level + ?
       WHERE user_id = ?`,
      [task.xp_reward ? 0 : 0, userId] // ajusta la lógica real de niveles/XP
    );

    return { ok: true, xpGained: task?.xp_reward || 0 };
  });
}

module.exports = { completeTask };
