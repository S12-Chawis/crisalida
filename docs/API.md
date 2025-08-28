# 🦋 Crisálida API Documentation

## 📋 Formato de Respuesta Estándar

Todas las APIs de Crisálida usan el siguiente formato de respuesta:

```json
{
  "success": boolean,     // true si exitoso, false si error
  "message": string,      // Mensaje descriptivo
  "data": object|null,    // Datos de respuesta (null en errores)
  "error": string|null,   // Tipo de error (null en éxitos)
  "timestamp": string,    // ISO timestamp
  "meta": object|null     // Metadatos (paginación, conteos, etc.)
}
```

## 🔐 Sistema de Autenticación

### Headers Requeridos
```http
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

### Endpoints de Autenticación

#### POST /api/auth/register
Registrar nuevo usuario
```json
// Request
{
  "user_name": "María González",
  "email": "maria@example.com",
  "password": "password123",
  "preferred_language": "es"
}

// Response (201)
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "user_id": "uuid-123",
      "user_name": "María González",
      "email": "maria@example.com",
      "rol": "user",
      "creation_date": "2025-08-27T21:00:00Z"
    }
  }
}
```

#### POST /api/auth/login
Iniciar sesión
```json
// Request
{
  "email": "maria@example.com", 
  "password": "password123"
}

// Response (200)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "user_id": "uuid-123",
      "user_name": "María González",
      "email": "maria@example.com",
      "rol": "user",
      "current_level": 5,
      "preferred_language": "es"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "tokenType": "Bearer"
  }
}
```

#### POST /api/auth/logout
Cerrar sesión
```json
// Response (200)
{
  "success": true,
  "message": "Logout successful"
}
```

## 🏠 Dashboard API

#### GET /api/user/stats
Obtener estadísticas para dashboard
```json
// Response (200)
{
  "success": true,
  "message": "Dashboard data retrieved",
  "data": {
    "user": {
      "user_name": "María González",
      "current_level": 8,
      "email": "maria@example.com"
    },
    "stats": {
      "totalRoadmaps": 4,
      "completedRoadmaps": 2,
      "completionRate": 75.5,
      "totalXP": 1250,
      "weeklyProgress": 6
    },
    "recentActivity": [
      {
        "type": "task_completed",
        "title": "React Hooks Basics",
        "date": "2025-08-27T10:30:00Z"
      }
    ],
    "nextSteps": [
      {
        "type": "task",
        "title": "Complete useEffect Exercise",
        "difficulty": "intermediate",
        "estimatedTime": 45
      }
    ],
    "streakInfo": {
      "current": 12,
      "longest": 28,
      "weeklyActivity": [true, true, false, true, true, true, true]
    }
  },
  "meta": {
    "lastUpdated": "2025-08-27T21:00:00Z",
    "totalRoadmaps": 4,
    "completionRate": 75.5
  }
}
```

## 🗺️ Roadmaps API

#### GET /api/roadmaps
Listar roadmaps del usuario
```json
// Response (200)
{
  "success": true,
  "message": "Roadmaps retrieved successfully",
  "data": [
    {
      "roadmap_id": 1,
      "title": "Full Stack JavaScript Developer",
      "description": "Complete path from beginner to advanced",
      "difficulty": "intermediate",
      "estimated_time": 120,
      "progress": 65,
      "status": "in_progress"
    }
  ]
}
```

#### GET /api/roadmaps/:id
Obtener roadmap específico con niveles
```json
// Response (200)
{
  "success": true,
  "message": "Roadmap data retrieved",
  "data": {
    "roadmap": {
      "roadmap_id": 1,
      "title": "Full Stack JavaScript Developer",
      "description": "Complete path from beginner to advanced",
      "difficulty": "intermediate",
      "estimated_time": 120
    },
    "levels": [
      {
        "level_id": 1,
        "title": "JavaScript Fundamentals",
        "status": "completed",
        "progress": 100,
        "tasks": [
          {
            "task_id": 1,
            "title": "Variables and Data Types",
            "type": "reading",
            "status": "completed",
            "xp_reward": 10
          }
        ]
      }
    ],
    "progress": {
      "percentage": 65,
      "completedLevels": 2,
      "totalLevels": 4
    },
    "nextLevel": {
      "level_id": 3,
      "title": "React Basics",
      "description": "Learn React components and state"
    }
  },
  "meta": {
    "totalLevels": 4,
    "completedLevels": 2,
    "progressPercentage": 65
  }
}
```

#### POST /api/tasks/:id/complete
Marcar tarea como completada
```json
// Response (200)
{
  "success": true,
  "message": "Task completed successfully",
  "data": {
    "task": {
      "task_id": 15,
      "title": "React Components Quiz",
      "type": "quiz",
      "xp_reward": 50
    },
    "xpGained": 50,
    "newUserLevel": 9,
    "unlockedContent": [
      {
        "type": "level",
        "title": "React Hooks"
      }
    ],
    "triumphsEarned": [
      {
        "triumph_id": 3,
        "title": "Quiz Master",
        "description": "Complete 10 quizzes"
      }
    ]
  },
  "meta": {
    "taskType": "quiz",
    "levelProgress": {
      "current": 3,
      "completed_tasks": 8,
      "total_tasks": 12
    }
  }
}
```

## 📝 Notes API

#### GET /api/notes
Listar notas (paginado)
```json
// Query params: ?page=1&limit=10&search=react

// Response (200)
{
  "success": true,
  "message": "Notes retrieved successfully", 
  "data": {
    "items": [
      {
        "note_id": 1,
        "title": "React State Management",
        "content": "useState vs useReducer...",
        "created_at": "2025-08-27T10:00:00