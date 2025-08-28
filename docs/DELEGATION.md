🎯 Delegación de Tareas - Crisálida Team
📋 BACKEND DEVELOPER 1 (Santiago) - Líder Backend
Branch: backend/auth-system Prioridad: CRÍTICA (otros dependen de esto)

🔐 Sistema de Autenticación y Configuración Base
Archivos a crear/completar:
src/config/
├── database.js          # Conexión MySQL con pool
├── jwt.config.js        # Configuración JWT
└── cors.config.js       # Configuración CORS

src/middleware/
├── auth.middleware.js   # Verificación JWT
├── errorHandler.middleware.js # Manejo global errores
└── validation.middleware.js   # Middleware validación

src/models/
└── User.model.js        # Modelo usuario con métodos

src/controllers/
└── auth.controller.js   # Login/Register/Logout/RefreshToken

src/routes/
├── index.js            # Rutas principales
└── auth.routes.js      # Rutas autenticación

src/validators/
└── auth.validator.js   # Schemas validación auth

tests/
└── auth.test.js        # Tests autenticación
Tareas específicas:

Database Config - Crear conexión MySQL con pool y manejo de errores
JWT System - Implementar generación y verificación de tokens
Auth Middleware - Middleware para proteger rutas
User Model - CRUD usuarios con bcrypt para passwords
Auth Controller - Login, register, logout, refresh token
Auth Routes - Endpoints: POST /auth/login, /auth/register, etc.
Validation - Schemas para login/register con Joi
Tests - Coverage 80%+ para sistema auth
Entregables para el equipo:
✅ API Auth funcionando para que frontend pueda conectar
✅ Middleware auth para proteger rutas de otros devs
✅ Documentación de endpoints auth
✅ Variables de entorno configuradas
🗺️ BACKEND DEVELOPER 2 - API Roadmaps
Branch: backend/roadmaps-api Depende de: Backend Dev 1 (auth middleware)

🎮 Sistema de Roadmaps y Gamificación
Archivos a crear:
src/models/
├── Roadmap.model.js     # CRUD roadmaps
├── Level.model.js       # CRUD niveles
├── Task.model.js        # CRUD tareas
└── UserProgress.model.js # Progreso usuario

src/controllers/
├── roadmap.controller.js # CRUD roadmaps
└── task.controller.js    # Gestión tareas y progreso

src/routes/
├── roadmaps.routes.js   # Rutas roadmaps
└── tasks.routes.js      # Rutas tareas

src/services/
├── roadmap.service.js   # Lógica roadmaps
└── gamification.service.js # XP, niveles, logros

src/validators/
└── roadmap.validator.js # Validaciones roadmaps

tests/
├── roadmap.test.js     # Tests roadmaps
└── gamification.test.js # Tests XP/levels
Endpoints requeridos para Frontend:
GET    /api/roadmaps              # Listar roadmaps usuario
POST   /api/roadmaps              # Crear roadmap
GET    /api/roadmaps/:id          # Obtener roadmap con progreso
PUT    /api/roadmaps/:id          # Actualizar roadmap
DELETE /api/roadmaps/:id          # Eliminar roadmap

GET    /api/roadmaps/:id/levels   # Niveles de un roadmap
POST   /api/tasks/:id/complete    # Marcar tarea completada
GET    /api/user/progress         # Progreso global usuario
GET    /api/user/stats            # Estadísticas para dashboard
Integración con Frontend:
Dashboard: Estadísticas de progreso, roadmaps activos
Roadmap View: Lista de niveles, progreso, siguiente tarea
Gamificación: XP ganado, nivel actual, logros desbloqueados
📝 BACKEND DEVELOPER 3 - API Notes & Resources
Branch: backend/notes-resources-api Depende de: Backend Dev 1 (auth middleware)

📚 Sistema de Notas, Recursos y Perfil
Archivos a crear:
src/models/
├── Note.model.js        # CRUD notas
├── Resource.model.js    # CRUD recursos
└── UserProfile.model.js # Perfil extendido

src/controllers/
├── note.controller.js      # CRUD notas
├── resource.controller.js  # CRUD recursos  
├── user.controller.js      # Perfil usuario
└── upload.controller.js    # Subida archivos

src/routes/
├── notes.routes.js      # Rutas notas
├── resources.routes.js  # Rutas recursos
├── users.routes.js      # Rutas usuario
└── upload.routes.js     # Rutas upload

src/services/
├── user.service.js      # Lógica usuario
├── file.service.js      # Manejo archivos
└── email.service.js     # Envío emails (opcional)

src/validators/
├── user.validator.js    # Validaciones usuario
└── file.validator.js    # Validaciones archivos

tests/
├── notes.test.js        # Tests notas
├── resources.test.js    # Tests recursos
└── user.test.js         # Tests usuario
Endpoints requeridos para Frontend:
# Notas
GET    /api/notes                # Listar notas usuario (paginado)
POST   /api/notes                # Crear nota
GET    /api/notes/:id            # Obtener nota
PUT    /api/notes/:id            # Actualizar nota
DELETE /api/notes/:id            # Eliminar nota
GET    /api/notes/search?q=      # Buscar notas

# Recursos
GET    /api/resources            # Listar recursos (paginado)
POST   /api/resources            # Guardar recurso
DELETE /api/resources/:id        # Eliminar recurso

# Usuario
GET    /api/user/profile         # Perfil completo
PUT    /api/user/profile         # Actualizar perfil
POST   /api/upload/avatar        # Subir avatar
🎨 FRONTEND DEVELOPER 1 - Líder Frontend
Branch: frontend/auth-layout Integra con: Backend Dev 1 (APIs auth)

🔐 Autenticación y Layout Base
Estructura a crear:
frontend/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Navbar principal
│   │   │   ├── Sidebar.jsx     # Sidebar navegación
│   │   │   └── Layout.jsx      # Layout wrapper
│   │   └── common/
│   │       ├── Button.jsx      # Botón reutilizable
│   │       ├── Input.jsx       # Input reutilizable
│   │       └── Modal.jsx       # Modal reutilizable
│   ├── pages/
│   │   └── auth/
│   │       ├── Login.jsx       # Página login
│   │       └── Register.jsx    # Página registro
│   ├── context/
│   │   └── AuthContext.jsx     # Context autenticación
│   ├── services/
│   │   ├── api.js              # Configuración Axios
│   │   └── auth.service.js     # Servicios auth
│   ├── hooks/
│   │   ├── useAuth.js          # Hook autenticación
│   │   └── useApi.js           # Hook API calls
│   └── utils/
│       └── constants.js        # Constantes frontend
Integración con Backend:
Login: POST /api/auth/login → guardar token → redirect dashboard
Register: POST /api/auth/register → auto-login → redirect dashboard
Auth Context: Verificar token, logout, refresh token
Protected Routes: Verificar auth antes de mostrar páginas
Entregables para equipo Frontend:
✅ Layout responsivo listo para otras páginas
✅ Sistema auth funcionando con backend
✅ Componentes comunes para reutilizar
✅ Routing configurado para todas las páginas
📊 FRONTEND DEVELOPER 2 - Dashboard & Roadmaps
Branch: frontend/dashboard-roadmaps Integra con: Backend Dev 1 (auth) + Backend Dev 2 (roadmaps)

🏠 Dashboard y Vista Roadmaps
Páginas/Componentes:
src/pages/
├── dashboard/
│   ├── Dashboard.jsx           # Página principal
│   ├── StatsCard.jsx          # Tarjetas estadísticas
│   ├── ProgressChart.jsx      # Gráfico progreso
│   └── ActivityFeed.jsx       # Feed actividad reciente
└── roadmap/
    ├── RoadmapList.jsx        # Lista roadmaps
    ├── RoadmapView.jsx        # Vista roadmap individual
    ├── LevelCard.jsx          # Tarjeta nivel
    ├── TaskItem.jsx           # Item tarea
    └── ProgressBar.jsx        # Barra progreso

src/services/
├── roadmap.service.js         # APIs roadmaps
└── dashboard.service.js       # APIs dashboard

src/hooks/
├── useRoadmaps.js            # Hook roadmaps
└── useDashboard.js           # Hook dashboard
Integración con Backend:
Dashboard: GET /api/user/stats → mostrar estadísticas
Roadmaps: GET /api/roadmaps → listar roadmaps usuario
Progreso: GET /api/roadmaps/:id → mostrar niveles y tareas
Completar tarea: POST /api/tasks/:id/complete → actualizar UI
UI/UX Requirements:
Dashboard: Cards estadísticas, gráfico progreso, próximas tareas
Roadmap: Vista interactiva con niveles, progreso visual, gamificación
Responsive: Funcional en desktop y móvil
Animaciones: Smooth transitions, loading states
📋 FRONTEND DEVELOPER 3 - Notes, Resources & Profile
Branch: frontend/notes-resources-profile Integra con: Backend Dev 1 (auth) + Backend Dev 3 (notes/resources)

📚 Gestión de Contenido y Perfil
Páginas/Componentes:
src/pages/
├── notes/
│   ├── NotesPage.jsx          # Lista notas con búsqueda
│   ├── NoteEditor.jsx         # Editor notas (markdown?)
│   ├── NoteCard.jsx           # Tarjeta nota
│   └── NoteModal.jsx          # Modal crear/editar
├── resources/
│   ├── ResourcesPage.jsx      # Lista recursos guardados
│   ├── ResourceCard.jsx       # Tarjeta recurso
│   └── AddResourceModal.jsx   # Modal agregar recurso
└── profile/
    ├── ProfilePage.jsx        # Página perfil
    ├── ProfileForm.jsx        # Formulario edición
    └── AvatarUpload.jsx       # Subida avatar

src/services/
├── notes.service.js           # APIs notas  
├── resources.service.js       # APIs recursos
└── user.service.js            # APIs usuario

src/hooks/
├── useNotes.js               # Hook notas
├── useResources.js           # Hook recursos
└── useProfile.js             # Hook perfil
Integración con Backend:
Notes: CRUD completo /api/notes con paginación y búsqueda
Resources: CRUD /api/resources con filtros
Profile: GET/PUT /api/user/profile con upload avatar
Search: GET /api/notes/search?q=query
Funcionalidades clave:
Editor notas: Rich text o Markdown con preview
Búsqueda: Filtros por fecha, tags, contenido
Resources: Categorías, links externos, archivos
Profile: Edición datos, cambio contraseña, configuraciones
🔄 FLUJO DE INTEGRACIÓN
Semana 1: Desarrollo Individual
Cada dev trabaja en su branch
Daily standups para coordinación
Code reviews cruzados
Semana 2: Integración Backend
Merge branches backend → develop
Testing APIs integradas
Documentación Postman/Swagger
Semana 3: Integración Frontend-Backend
Merge branches frontend → develop
Conexión real con APIs
Testing E2E completo
Semana 4: Production Ready
Merge develop → main
Deployment y documentación
Bug fixes finales
📞 Canales de Comunicación
Daily Standups: 9:00 AM (15 min)
Code Reviews: Obligatorios antes de merge
Slack/Discord: Chat diario
GitHub Issues: Para bugs y features
Documentation: Cada endpoint/componente documentado


