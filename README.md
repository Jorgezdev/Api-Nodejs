API Node.js con SQL Server

Una API RESTful creada con Node.js y Express que permite gestionar tareas (CRUD completo) utilizando una base de datos SQL Server (MSSQL). Ideal para aprender o implementar un backend funcional y escalable.

---

# Funcionalidades

- Obtener todas las tareas (`GET /`)
- Crear una nueva tarea (`POST /`)
- Actualizar una tarea por ID (`PUT /:id`)
- Eliminar una tarea por ID (`DELETE /:id`)
- Conexión real a base de datos SQL Server
- Estructura modular y mantenible
- Asincronía con `async/await`
- Manejo básico de errores

---

## Estructura del Proyecto

.
├── config.js # Configuración de conexión a la base de datos
├── database.js # Clase con lógica para operaciones CRUD en SQL Server
├── routes.js # Definición de rutas (endpoints)
├── index.js # Punto de entrada principal del servidor
├── package.json # Dependencias y scripts
└── README.md # Documentación del proyecto

yaml
Copiar
Editar

---

# Tecnologías Usadas

- **Node.js** + **Express.js**
- **MSSQL** (SQL Server)
- **mssql** (paquete npm para conexión SQL)
- JavaScript (ES6+)
- Arquitectura modular y mantenible

---

##  Endpoints

| Método | Ruta      | Descripción                      |
|--------|-----------|----------------------------------|
| GET    | `/`       | Obtiene todas las tareas         |
| POST   | `/`       | Crea una nueva tarea             |
| PUT    | `/:id`    | Actualiza una tarea por ID       |
| DELETE | `/:id`    | Elimina una tarea por ID         |

# Ejemplo de Objeto `Task`:
```json
{
  "description": "Comprar pan",
  "dateCreated": "2024-06-29T14:00:00Z",
  "isCompleted": false,
  "dateCompleted": null
}
 Instalación y Uso
Clona el repositorio:

bash
Copiar
Editar
git clone https://github.com/Jorgezdev/Api-Nodejs.git
cd Api-Nodejs
Instala las dependencias:

bash
Copiar
Editar
npm install
Crea o edita el archivo config.js con los datos de conexión a tu base de datos SQL Server:

js
Copiar
Editar
export const config = {
  user: 'tu_usuario',
  password: 'tu_contraseña',
  server: 'localhost',
  database: 'nombre_de_tu_db',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};
Ejecuta el servidor:

bash
Copiar
Editar
node index.js
La API estará corriendo en: http://localhost:3000/

 Futuras mejoras
Middleware de validación de datos

Manejo global de errores

Documentación Swagger (/docs)

Autenticación (JWT)

Dockerización

Tests con Jest o Supertest

 Autor
Desarrollado con ❤️ por Jorge Zavala
