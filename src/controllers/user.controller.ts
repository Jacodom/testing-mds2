import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { CreateUserRequest, UpdateUserRequest } from "../models/user.model";

/**
 * UserController - Maneja las peticiones HTTP relacionadas con usuarios
 * Este controller será testeado en integration tests
 */
export class UserController {
  constructor(private userService: UserService) {}

  /**
   * POST /users - Crear nuevo usuario
   */
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserRequest = req.body;
      const user = await this.userService.createUser(userData);

      res.status(201).json({
        success: true,
        data: user,
        message: "Usuario creado exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        message: "Error al crear usuario",
      });
    }
  }

  /**
   * GET /users/:id - Obtener usuario por ID
   */
  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);

      if (!user) {
        res.status(404).json({
          success: false,
          error: "Usuario no encontrado",
          message: "No se encontró el usuario solicitado",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
        message: "Usuario obtenido exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        message: "Error al obtener usuario",
      });
    }
  }

  /**
   * PUT /users/:id - Actualizar usuario
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserRequest = req.body;
      const user = await this.userService.updateUser(id, userData);

      if (!user) {
        res.status(404).json({
          success: false,
          error: "Usuario no encontrado",
          message: "No se encontró el usuario para actualizar",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
        message: "Usuario actualizado exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        message: "Error al actualizar usuario",
      });
    }
  }

  /**
   * DELETE /users/:id - Eliminar usuario
   */
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.userService.deleteUser(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          error: "Usuario no encontrado",
          message: "No se encontró el usuario para eliminar",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: { id },
        message: "Usuario eliminado exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        message: "Error al eliminar usuario",
      });
    }
  }

  /**
   * GET /users - Obtener usuarios activos
   */
  async getActiveUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getActiveUsers();

      res.status(200).json({
        success: true,
        data: users,
        message: "Usuarios activos obtenidos exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        message: "Error al obtener usuarios activos",
      });
    }
  }

  /**
   * GET /users/stats - Obtener estadísticas de usuarios
   */
  async getUserStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await this.userService.getUserStats();

      res.status(200).json({
        success: true,
        data: stats,
        message: "Estadísticas obtenidas exitosamente",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        message: "Error al obtener estadísticas",
      });
    }
  }
}
