# StudiosWebSites

Un sitio web profesional Full Stack para un estudio creativo, con panel de administración, blog integrado, portfolio y chatbot inteligente.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Scripts Disponibles](#scripts-disponibles)
- [Variables de Entorno](#variables-de-entorno)
- [API Endpoints](#api-endpoints)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Autenticación](#autenticación)
- [Deployment](#deployment)
- [Testing](#testing)
- [Estructura de Carpetas](#estructura-de-carpetas)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

---

## ✨ Características

### Frontend
- ✅ Sitio web responsive y moderno con React + Vite
- ✅ Animaciones fluidas con Framer Motion
- ✅ Navegación dinámica con React Router v7
- ✅ Sistema de autenticación integrado
- ✅ Gestión de contexto global con AuthContext
- ✅ SEO optimizado con React Helmet
- ✅ Efectos visuales con partículas (react-tsparticles)
- ✅ Tywriter effect en textos destacados
- ✅ Cookie banner de consentimiento
- ✅ Páginas de políticas de privacidad y cookies

### Backend
- ✅ API REST con Express.js
- ✅ Autenticación JWT
- ✅ Validación de datos con express-validator
- ✅ Base de datos MySQL (compatible con TiDB)
- ✅ Hashing de contraseñas con bcryptjs
- ✅ CORS configurado
- ✅ Soporte para variables de entorno
- ✅ Sistema de newsletters
- ✅ Chatbot inteligente con Groq SDK
- ✅ Sistema de contacto
- ✅ Gestión de artículos y proyectos
- ✅ Tests con Jest

### Funcionalidades Principales
- 🏠 **Página de Inicio**: Hero section, estadísticas, servicios destacados
- 🛠️ **Servicios**: Catálogo de servicios ofrecidos
- 🎯 **Sectores**: Industrias o verticales atendidos
- 🎨 **Portfolio**: Galería de proyectos completados (protegida)
- 📝 **Blog**: Artículos de contenido (protegida)
- 💬 **Chatbot**: Asistente inteligente powered by Groq
- 📧 **Newsletter**: Sistema de suscripción
- 📋 **Contacto**: Formulario de contacto
- 🔐 **Panel Administrativo**: Gestión de proyectos y artículos
- 👤 **Autenticación**: Login/Registro de usuarios

---

## 🛠️ Tecnologías

### Frontend
```
- React 19.2.0
- Vite 7.2.4
- React Router DOM 7.12.0
- Framer Motion 12.34.3
- React Helmet Async 3.0.0
- Lucide React (iconos)
- Carbon Icons React
- TsParticles (efectos visuales)
- Typewriter Effect
- ESLint 9.39.1
- Testing Library (Jest, Vitest)
```

### Backend
```
- Node.js
- Express 5.2.1
- MySQL2 3.16.2
- JWT (jsonwebtoken 9.0.3)
- bcryptjs 3.0.3
- Groq SDK 0.37.0
- Nodemailer 8.0.1
- Express Validator 7.3.1
- CORS 2.8.6
- dotenv 17.2.3
- Jest 30.3.0 (testing)
- Nodemon 3.1.11 (desarrollo)
- Supertest 7.2.2 (testing)
```

---

## 📁 Estructura del Proyecto

```
StudiosWebSites/
├── Frontend/                          # Aplicación React
│   ├── src/
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── AnimatedSection/
│   │   │   ├── Blog/
│   │   │   ├── Chatbot/
│   │   │   ├── CookieBanner/
│   │   │   ├── Home/
│   │   │   ├── Layout/
│   │   │   ├── PageTransition/
│   │   │   ├── Portfolio/
│   │   │   ├── ProtectedRoute/
│   │   │   ├── ScrollToTop/
│   │   │   ├── Sectors/
│   │   │   ├── SEO/
│   │   │   └── Services/
│   │   ├── contexts/                 # Context API
│   │   │   └── AuthContext.jsx
│   │   ├── pages/                    # Páginas principales
│   │   │   ├── HomePage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── AdminPage.jsx
│   │   │   ├── BlogPage.jsx
│   │   │   ├── BlogArticlePage.jsx
│   │   │   ├── PortfolioPage.jsx
│   │   │   ├── ProjectPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   └── ...
│   │   ├── services/                 # Servicios de API
│   │   │   └── api.js
│   │   ├── tests/                    # Tests unitarios
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── vercel.json                   # Configuración de Vercel
│   ├── index.html
│   └── README.md
│
├── Backend/                           # API Express
│   ├── config/
│   │   └── database.js               # Configuración MySQL
│   ├── controllers/                  # Lógica de negocio
│   │   ├── articleController.js
│   │   └── projectController.js
│   ├── models/                       # Esquemas de datos
│   │   ├── user.js
│   │   ├── article.js
│   │   └── project.js
│   ├── routes/                       # Endpoints
│   │   ├── auth.js
│   │   ├── articles.js
│   │   ├── project.js
│   │   ├── contact.js
│   │   ├── newsletter.js
│   │   └── chatbot.js
│   ├── tests/                        # Tests con Jest
│   │   └── auth.test.js
│   ├── server.js                     # Entrada principal
│   ├── package.json
│   ├── vercel.json                   # Configuración de Vercel
│   ├── .env                          # Variables de entorno (no commitear)
│   └── .env.example                  # Template de variables de entorno
│
├── package-lock.json
└── README.md                         # Este archivo
```

---

## 📦 Requisitos Previos

- **Node.js** >= 18.0.0
- **npm** >= 10.0.0 o **yarn** >= 4.0.0
- **MySQL** o **TiDB** para la base de datos
- **Git** para control de versiones

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd StudiosWebSites
```

### 2. Instalar dependencias del Backend

```bash
cd Backend
npm install
```

### 3. Instalar dependencias del Frontend

```bash
cd ../Frontend
npm install
```

---

## ⚙️ Configuración

### Variables de Entorno - Backend

Crea un archivo `.env` en la carpeta `Backend/`:

```env
# Servidor
PORT=5000
NODE_ENV=development

# Base de datos (MySQL/TiDB)
DB_HOST=your_database_host
DB_PORT=4000
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=studioswebsites

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# Cliente (CORS)
CLIENT_URL=http://localhost:5173

# Email (Nodemailer)
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# Groq AI (Chatbot)
GROQ_API_KEY=your_groq_api_key
```

### Variables de Entorno - Frontend

Crea un archivo `.env` en la carpeta `Frontend/`:

```env
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=StudiosWebSites
```

---

## 📝 Scripts Disponibles

### Backend

```bash
# Desarrollo
npm run dev          # Inicia servidor con nodemon (watch mode)

# Producción
npm start           # Inicia servidor en modo producción

# Testing
npm test            # Ejecuta tests con Jest
```

### Frontend

```bash
# Desarrollo
npm run dev         # Inicia servidor de desarrollo en http://localhost:5173

# Build
npm run build       # Crea bundle optimizado para producción

# Preview
npm run preview     # Previsualiza el build localmente

# Linting
npm run lint        # Ejecuta ESLint
```

---

## 🔌 API Endpoints

### Autenticación (`/auth`)
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Login
- `GET /auth/verify` - Verificar token JWT

### Artículos (`/articles`)
- `GET /articles` - Obtener todos los artículos
- `GET /articles/:id` - Obtener artículo por ID
- `POST /articles` - Crear artículo (admin)
- `PUT /articles/:id` - Actualizar artículo (admin)
- `DELETE /articles/:id` - Eliminar artículo (admin)

### Proyectos (`/projects`)
- `GET /projects` - Obtener todos los proyectos
- `GET /projects/:id` - Obtener proyecto por ID
- `POST /projects` - Crear proyecto (admin)
- `PUT /projects/:id` - Actualizar proyecto (admin)
- `DELETE /projects/:id` - Eliminar proyecto (admin)

### Contacto (`/contact`)
- `POST /contact` - Enviar mensaje de contacto

### Newsletter (`/newsletter`)
- `POST /newsletter/subscribe` - Suscribirse a newsletter
- `GET /newsletter/confirm/:token` - Confirmar suscripción

### Chatbot (`/chatbot`)
- `POST /chatbot` - Enviar mensaje al chatbot

---

## 🗂️ Rutas de la Aplicación

### Rutas Públicas
- `/` - Página de inicio
- `/servicios` - Servicios
- `/sectores` - Sectores/industrias
- `/contacto` - Formulario de contacto
- `/login` - Login
- `/registro` - Registro
- `/privacidad` - Política de privacidad
- `/politica-cookies` - Política de cookies

### Rutas Protegidas (requieren autenticación)
- `/portfolio` - Galería de proyectos
- `/portfolio/:id` - Detalle del proyecto
- `/blog` - Blog de artículos
- `/blog/:id` - Artículo individual

### Rutas de Administración
- `/admin` - Panel principal de admin
- `/admin/projects` - Gestión de proyectos
- `/admin/articles` - Gestión de artículos

---

## 🔐 Autenticación

El proyecto utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. El usuario se registra o hace login
2. El servidor retorna un token JWT
3. El frontend almacena el token (localStorage)
4. En cada request, se envía el token en el header `Authorization: Bearer <token>`
5. El servidor valida el token
6. Las rutas protegidas requieren un token válido

### AuthContext
El contexto global maneja:
- Estado de autenticación
- Token del usuario
- Rol del usuario (admin/user)
- Métodos login/logout/registro

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
# El archivo vercel.json ya está configurado
# Solo necesitas hacer push a tu repositorio
git push origin main
```

El proyecto se desplegará automáticamente en Vercel.

### Backend (Vercel)

```bash
# El Backend también está configurado para Vercel
git push origin main
```

O despliega en tu servidor preferido:

```bash
cd Backend
npm install
npm start
```

---

## 🧪 Testing

### Backend

```bash
cd Backend
npm test
```

Los tests utilizan **Jest** y **Supertest** para testing de endpoints.

### Frontend

```bash
cd Frontend
npm run test  # Si está configurado
```

Los tests utilizan **Vitest** y **React Testing Library**.

---

## 📊 Estructura de Datos

### Tabla: Users
```sql
- id (INT, PRIMARY KEY)
- email (VARCHAR, UNIQUE)
- password (VARCHAR, hashed)
- name (VARCHAR)
- role (ENUM: 'admin', 'user')
- created_at (TIMESTAMP)
```

### Tabla: Projects
```sql
- id (INT, PRIMARY KEY)
- title (VARCHAR)
- description (TEXT)
- image (VARCHAR)
- technologies (JSON)
- link (VARCHAR)
- created_at (TIMESTAMP)
```

### Tabla: Articles
```sql
- id (INT, PRIMARY KEY)
- title (VARCHAR)
- content (TEXT)
- author (VARCHAR)
- image (VARCHAR)
- category (VARCHAR)
- published_at (TIMESTAMP)
- created_at (TIMESTAMP)
```

---

## 🔍 Características Especiales

### Chatbot con Groq
- Integración con Groq SDK
- Respuestas IA en tiempo real
- Conversaciones contextuales

### Newsletter
- Sistema de suscripción con confirmación por email
- Validación con tokens
- Uso de Nodemailer

### Animaciones
- Page transitions con Framer Motion
- Scroll animations
- Hover effects
- Partículas interactivas

### SEO
- Meta tags dinámicos con React Helmet
- URLs amigables
- Sitemap support

---

## 🐛 Troubleshooting

### Error de conexión a la base de datos
- Verifica las variables de entorno
- Confirma que la base de datos está corriendo
- Revisa las credenciales de acceso

### CORS Error
- Verifica que `CLIENT_URL` en `.env` del backend es correcto
- Asegúrate que el puerto del frontend coincide

### JWT Token inválido
- Genera un nuevo `JWT_SECRET` en `.env`
- Limpia los tokens antiguos del localStorage

### npm modules error
- Elimina `node_modules` y `package-lock.json`
- Ejecuta `npm install` nuevamente

---

## 📚 Recursos Adicionales

- [React Docs](https://react.dev)
- [Express Docs](https://expressjs.com)
- [Vite Docs](https://vitejs.dev)
- [JWT Docs](https://jwt.io)
- [MySQL Docs](https://dev.mysql.com/doc)
- [Groq API Docs](https://console.groq.com/docs)

---

## 👤 Autor

**Alejandro Amor Rico**

---

## 📄 Licencia

ISC License

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📞 Soporte

Para reportar issues o solicitar features, abre un issue en el repositorio.

---

**Última actualización**: Mayo 2026

**Estado**: 🟢 Activo y en desarrollo
