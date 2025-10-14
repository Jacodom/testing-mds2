import express from "express";
import { UserController } from "./controllers/user.controller";
import { UserService } from "./services/user.service";
import { InMemoryUserRepository } from "./repositories/in-memory-user.repository";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de dependencias (Dependency Injection simple)
const userRepository = new InMemoryUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API funcionando correctamente",
    timestamp: new Date().toISOString(),
  });
});

// Rutas de usuarios
app.post("/users", (req, res) => userController.createUser(req, res));
app.get("/users/stats", (req, res) => userController.getUserStats(req, res));
app.get("/users/:id", (req, res) => userController.getUserById(req, res));
app.get("/users", (req, res) => userController.getActiveUsers(req, res));
app.put("/users/:id", (req, res) => userController.updateUser(req, res));
app.delete("/users/:id", (req, res) => userController.deleteUser(req, res));

// Middleware de manejo de errores
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Error interno del servidor",
      message: "Algo salió mal!",
    });
  }
);

// Middleware para rutas no encontradas
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Ruta no encontrada",
    message: `No se encontró la ruta ${req.originalUrl}`,
  });
});

// Iniciar servidor solo si no estamos en testing
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`📚 Endpoints disponibles:`);
    console.log(`   GET  /health`);
    console.log(`   POST /users`);
    console.log(`   GET  /users`);
    console.log(`   GET  /users/stats`);
    console.log(`   GET  /users/:id`);
    console.log(`   PUT  /users/:id`);
    console.log(`   DELETE /users/:id`);
  });
}

export default app;
