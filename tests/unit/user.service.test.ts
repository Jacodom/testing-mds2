import { UserService } from "../../src/services/user.service";
import {
  UserRepository,
  User,
  CreateUserRequest,
  UpdateUserRequest,
} from "../../src/models/user.model";

/**
 * EJEMPLO DE UNIT TEST
 *
 * Este test demuestra cómo testear una clase de servicio de forma aislada
 * usando mocks para sus dependencias (UserRepository).
 *
 * Conceptos demostrados:
 * - Mocking de dependencias
 * - Testing de lógica de negocio
 * - Validación de errores
 * - Cobertura de código
 * - Casos edge
 */

describe("UserService - Unit Tests", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  // Setup que se ejecuta antes de cada test
  beforeEach(() => {
    // Crear mock del repositorio
    mockUserRepository = {
      findById: jest.fn(),
      findByEmail: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };

    // Crear instancia del servicio con el mock
    userService = new UserService(mockUserRepository);
  });

  describe("createUser", () => {
    const validUserData: CreateUserRequest = {
      name: "Juan Pérez",
      email: "juan@example.com",
      age: 25,
    };

    it("debería crear un usuario con datos válidos", async () => {
      // Arrange
      const expectedUser: User = {
        id: "1",
        name: validUserData.name,
        email: validUserData.email,
        age: validUserData.age,
        createdAt: new Date(),
        isActive: true,
      };

      mockUserRepository.findByEmail.mockResolvedValue(null); // Email no existe
      mockUserRepository.create.mockResolvedValue(expectedUser);

      // Act
      const result = await userService.createUser(validUserData);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(expectedUser);
      expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
        validUserData.email
      );
      expect(mockUserRepository.create).toHaveBeenCalledWith(validUserData);
    });

    it("debería rechazar email inválido", async () => {
      // Arrange
      const invalidUserData = { ...validUserData, email: "email-invalido" };

      // Act & Assert
      await expect(userService.createUser(invalidUserData)).rejects.toThrow(
        "Email inválido"
      );

      expect(mockUserRepository.findByEmail).not.toHaveBeenCalled();
      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });

    it("debería rechazar edad negativa", async () => {
      // Arrange
      const invalidUserData = { ...validUserData, age: -1 };

      // Act & Assert
      await expect(userService.createUser(invalidUserData)).rejects.toThrow(
        "Edad debe estar entre 0 y 120 años"
      );
    });

    it("debería rechazar edad mayor a 120", async () => {
      // Arrange
      const invalidUserData = { ...validUserData, age: 121 };

      // Act & Assert
      await expect(userService.createUser(invalidUserData)).rejects.toThrow(
        "Edad debe estar entre 0 y 120 años"
      );
    });

    it("debería rechazar nombre muy corto", async () => {
      // Arrange
      const invalidUserData = { ...validUserData, name: "A" };

      // Act & Assert
      await expect(userService.createUser(invalidUserData)).rejects.toThrow(
        "El nombre debe tener al menos 2 caracteres"
      );
    });

    it("debería rechazar email duplicado", async () => {
      // Arrange
      const existingUser: User = {
        id: "1",
        name: "Usuario Existente",
        email: validUserData.email,
        age: 30,
        createdAt: new Date(),
        isActive: true,
      };

      mockUserRepository.findByEmail.mockResolvedValue(existingUser);

      // Act & Assert
      await expect(userService.createUser(validUserData)).rejects.toThrow(
        "El email ya está en uso"
      );

      expect(mockUserRepository.create).not.toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    it("debería retornar usuario existente", async () => {
      // Arrange
      const userId = "1";
      const expectedUser: User = {
        id: userId,
        name: "Juan Pérez",
        email: "juan@example.com",
        age: 25,
        createdAt: new Date(),
        isActive: true,
      };

      mockUserRepository.findById.mockResolvedValue(expectedUser);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toEqual(expectedUser);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });

    it("debería retornar null para usuario inexistente", async () => {
      // Arrange
      const userId = "999";
      mockUserRepository.findById.mockResolvedValue(null);

      // Act
      const result = await userService.getUserById(userId);

      // Assert
      expect(result).toBeNull();
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
    });

    it("debería rechazar ID vacío", async () => {
      // Act & Assert
      await expect(userService.getUserById("")).rejects.toThrow(
        "ID de usuario requerido"
      );

      await expect(userService.getUserById("   ")).rejects.toThrow(
        "ID de usuario requerido"
      );

      expect(mockUserRepository.findById).not.toHaveBeenCalled();
    });
  });

  describe("getUserStats", () => {
    it("debería calcular estadísticas correctamente", async () => {
      // Arrange
      const mockUsers: User[] = [
        {
          id: "1",
          name: "Usuario 1",
          email: "user1@example.com",
          age: 20,
          createdAt: new Date(),
          isActive: true,
        },
        {
          id: "2",
          name: "Usuario 2",
          email: "user2@example.com",
          age: 30,
          createdAt: new Date(),
          isActive: true,
        },
        {
          id: "3",
          name: "Usuario 3",
          email: "user3@example.com",
          age: 40,
          createdAt: new Date(),
          isActive: false,
        },
      ];

      mockUserRepository.findAll.mockResolvedValue(mockUsers);

      // Act
      const stats = await userService.getUserStats();

      // Assert
      expect(stats).toEqual({
        total: 3,
        active: 2,
        averageAge: 30, // (20 + 30 + 40) / 3 = 30
      });
    });

    it("debería manejar lista vacía", async () => {
      // Arrange
      mockUserRepository.findAll.mockResolvedValue([]);

      // Act
      const stats = await userService.getUserStats();

      // Assert
      expect(stats).toEqual({
        total: 0,
        active: 0,
        averageAge: 0,
      });
    });
  });

  describe("getActiveUsers", () => {
    it("debería filtrar solo usuarios activos", async () => {
      // Arrange
      const mockUsers: User[] = [
        {
          id: "1",
          name: "Usuario Activo",
          email: "activo@example.com",
          age: 25,
          createdAt: new Date(),
          isActive: true,
        },
        {
          id: "2",
          name: "Usuario Inactivo",
          email: "inactivo@example.com",
          age: 30,
          createdAt: new Date(),
          isActive: false,
        },
      ];

      mockUserRepository.findAll.mockResolvedValue(mockUsers);

      // Act
      const result = await userService.getActiveUsers();

      // Assert
      expect(result).toHaveLength(1);
      expect(result[0].isActive).toBe(true);
      expect(result[0].name).toBe("Usuario Activo");
    });
  });

  describe("updateUser", () => {
    const userId = "1";
    const updateData: UpdateUserRequest = {
      name: "Nombre Actualizado",
      age: 26,
    };

    it("debería actualizar usuario existente", async () => {
      // Arrange
      const updatedUser: User = {
        id: userId,
        name: updateData.name!,
        email: "juan@example.com",
        age: updateData.age!,
        createdAt: new Date(),
        isActive: true,
      };

      mockUserRepository.update.mockResolvedValue(updatedUser);

      // Act
      const result = await userService.updateUser(userId, updateData);

      // Assert
      expect(result).toEqual(updatedUser);
      expect(mockUserRepository.update).toHaveBeenCalledWith(
        userId,
        updateData
      );
    });

    it("debería validar email en actualización", async () => {
      // Arrange
      const invalidUpdateData = { ...updateData, email: "email-invalido" };

      // Act & Assert
      await expect(
        userService.updateUser(userId, invalidUpdateData)
      ).rejects.toThrow("Email inválido");

      expect(mockUserRepository.update).not.toHaveBeenCalled();
    });
  });

  describe("deleteUser", () => {
    it("debería eliminar usuario existente", async () => {
      // Arrange
      const userId = "1";
      const existingUser: User = {
        id: userId,
        name: "Juan Pérez",
        email: "juan@example.com",
        age: 25,
        createdAt: new Date(),
        isActive: true,
      };

      mockUserRepository.findById.mockResolvedValue(existingUser);
      mockUserRepository.delete.mockResolvedValue(true);

      // Act
      const result = await userService.deleteUser(userId);

      // Assert
      expect(result).toBe(true);
      expect(mockUserRepository.findById).toHaveBeenCalledWith(userId);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(userId);
    });

    it("debería fallar al eliminar usuario inexistente", async () => {
      // Arrange
      const userId = "999";
      mockUserRepository.findById.mockResolvedValue(null);

      // Act & Assert
      await expect(userService.deleteUser(userId)).rejects.toThrow(
        "Usuario no encontrado"
      );

      expect(mockUserRepository.delete).not.toHaveBeenCalled();
    });
  });
});
