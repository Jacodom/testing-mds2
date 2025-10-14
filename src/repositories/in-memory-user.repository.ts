import {
  User,
  CreateUserRequest,
  UpdateUserRequest,
  UserRepository,
} from "../models/user.model";

/**
 * InMemoryUserRepository - Implementación en memoria del repositorio de usuarios
 * Útil para testing y desarrollo
 */
export class InMemoryUserRepository implements UserRepository {
  private users: Map<string, User> = new Map();
  private nextId = 1;

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async create(userData: CreateUserRequest): Promise<User> {
    const id = this.nextId.toString();
    this.nextId++;

    const user: User = {
      id,
      name: userData.name,
      email: userData.email,
      age: userData.age,
      createdAt: new Date(),
      isActive: true,
    };

    this.users.set(id, user);
    return user;
  }

  async update(id: string, userData: UpdateUserRequest): Promise<User | null> {
    const existingUser = this.users.get(id);
    if (!existingUser) {
      return null;
    }

    const updatedUser: User = {
      ...existingUser,
      ...userData,
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Métodos adicionales para testing
  clear(): void {
    this.users.clear();
    this.nextId = 1;
  }

  size(): number {
    return this.users.size;
  }
}
