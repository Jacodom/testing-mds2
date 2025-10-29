import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserRepository,
} from "../models/user.model";

/**
 * UserService - Contiene la lógica de negocio para el manejo de usuarios
 * Esta clase será testeada unitariamente
 */
export class UserService {
  constructor(private userRepository: UserRepository) {}

  /**
   * Crea un nuevo usuario con validaciones de negocio
   */
  async createUser(userData: CreateUserRequest): Promise<User> {
    // Validaciones de negocio
    if (!this.isValidEmail(userData.email)) {
      throw new Error("Email inválido");
    }

    if (userData.age < 0 || userData.age > 120) {
      throw new Error("Edad debe estar entre 0 y 120 años");
    }

    if (userData.name.trim().length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres.");
    }

    // Verificar que el email no esté en uso
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("El email ya está en uso");
    }

    return await this.userRepository.create(userData);
  }

  /**
   * Obtiene un usuario por ID
   */
  async getUserById(id: string): Promise<User | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("ID de usuario requerido");
    }

    return await this.userRepository.findById(id);
  }

  /**
   * Actualiza un usuario existente
   */
  async updateUser(
    id: string,
    userData: UpdateUserRequest
  ): Promise<User | null> {
    if (!id || id.trim().length === 0) {
      throw new Error("ID de usuario requerido");
    }

    // Validar email si se proporciona
    if (userData.email && !this.isValidEmail(userData.email)) {
      throw new Error("Email inválido");
    }

    // Validar edad si se proporciona
    if (
      userData.age !== undefined &&
      (userData.age < 0 || userData.age > 120)
    ) {
      throw new Error("Edad debe estar entre 0 y 120 años");
    }

    // Validar nombre si se proporciona
    if (userData.name && userData.name.trim().length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }

    // Verificar que el nuevo email no esté en uso (si se está cambiando)
    if (userData.email) {
      const existingUser = await this.userRepository.findByEmail(
        userData.email
      );
      if (existingUser && existingUser.id !== id) {
        throw new Error("El email ya está en uso");
      }
    }

    return await this.userRepository.update(id, userData);
  }

  /**
   * Elimina un usuario
   */
  async deleteUser(id: string): Promise<boolean> {
    if (!id || id.trim().length === 0) {
      throw new Error("ID de usuario requerido");
    }

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    return await this.userRepository.delete(id);
  }

  /**
   * Obtiene todos los usuarios activos
   */
  async getActiveUsers(): Promise<User[]> {
    const allUsers = await this.userRepository.findAll();
    return allUsers.filter((user) => user.isActive);
  }

  /**
   * Calcula estadísticas de usuarios
   */
  async getUserStats(): Promise<{
    total: number;
    active: number;
    averageAge: number;
  }> {
    const allUsers = await this.userRepository.findAll();
    const activeUsers = allUsers.filter((user) => user.isActive);

    const averageAge =
      allUsers.length > 0
        ? allUsers.reduce((sum, user) => sum + user.age, 0) / allUsers.length
        : 0;

    return {
      total: allUsers.length,
      active: activeUsers.length,
      averageAge: Math.round(averageAge * 100) / 100, // Redondear a 2 decimales
    };
  }

  /**
   * Valida formato de email
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
