import { test, expect, Page } from "@playwright/test";

/**
 * EJEMPLO DE INTEGRATION TEST
 *
 * Este test demuestra cómo testear la aplicación completa end-to-end,
 * incluyendo:
 * - Pruebas de API HTTP
 * - Validación de respuestas
 * - Flujos completos de usuarios
 * - Manejo de errores
 * - Testing de integración entre componentes
 *
 * Conceptos demostrados:
 * - Testing de endpoints HTTP
 * - Validación de JSON responses
 * - Testing de casos happy path y error cases
 * - Setup y teardown de tests
 * - Testing de estados de aplicación
 */

test.describe("User API - Integration Tests", () => {
  let page: Page;
  const API_BASE = "http://localhost:3000";

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test.describe("Health Check", () => {
    test("should return healthy status", async ({ request }) => {
      const response = await request.get(`${API_BASE}/health`);

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body).toHaveProperty("success", true);
      expect(body).toHaveProperty("message", "API funcionando correctamente");
      expect(body).toHaveProperty("timestamp");
    });
  });

  test.describe("User CRUD Operations", () => {
    let createdUserId: string;

    test("should create a new user successfully", async ({ request }) => {
      const userData = {
        name: "Juan Pérez",
        email: "juan.perez@example.com",
        age: 25,
      };

      const response = await request.post(`${API_BASE}/users`, {
        data: userData,
      });

      expect(response.status()).toBe(201);

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.message).toBe("Usuario creado exitosamente");
      expect(body.data).toHaveProperty("id");
      expect(body.data.name).toBe(userData.name);
      expect(body.data.email).toBe(userData.email);
      expect(body.data.age).toBe(userData.age);
      expect(body.data.isActive).toBe(true);

      // Guardar ID para tests posteriores
      createdUserId = body.data.id;
    });

    test("should fail to create user with invalid email", async ({
      request,
    }) => {
      const userData = {
        name: "Test User",
        email: "invalid-email",
        age: 30,
      };

      const response = await request.post(`${API_BASE}/users`, {
        data: userData,
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe("Email inválido");
    });

    test("should fail to create user with negative age", async ({
      request,
    }) => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
        age: -5,
      };

      const response = await request.post(`${API_BASE}/users`, {
        data: userData,
      });

      expect(response.status()).toBe(400);

      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe("Edad debe estar entre 0 y 120 años");
    });

    test("should retrieve user by ID", async ({ request }) => {
      // Primero crear un usuario
      const createResponse = await request.post(`${API_BASE}/users`, {
        data: {
          name: "Test Retrieve",
          email: "retrieve@example.com",
          age: 28,
        },
      });
      const createBody = await createResponse.json();
      const userId = createBody.data.id;

      // Luego recuperarlo
      const response = await request.get(`${API_BASE}/users/${userId}`);

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.id).toBe(userId);
      expect(body.data.name).toBe("Test Retrieve");
      expect(body.data.email).toBe("retrieve@example.com");
    });

    test("should return 404 for non-existent user", async ({ request }) => {
      const response = await request.get(`${API_BASE}/users/999`);

      expect(response.status()).toBe(404);

      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe("Usuario no encontrado");
    });

    test("should update user successfully", async ({ request }) => {
      // Crear usuario para actualizar
      const createResponse = await request.post(`${API_BASE}/users`, {
        data: {
          name: "Original Name",
          email: "original@example.com",
          age: 30,
        },
      });
      const createBody = await createResponse.json();
      const userId = createBody.data.id;

      // Actualizar usuario
      const updateData = {
        name: "Updated Name",
        age: 31,
      };

      const response = await request.put(`${API_BASE}/users/${userId}`, {
        data: updateData,
      });

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data.name).toBe("Updated Name");
      expect(body.data.age).toBe(31);
      expect(body.data.email).toBe("original@example.com"); // No cambió
    });

    test("should delete user successfully", async ({ request }) => {
      // Crear usuario para eliminar
      const createResponse = await request.post(`${API_BASE}/users`, {
        data: {
          name: "To Delete",
          email: "delete@example.com",
          age: 25,
        },
      });
      const createBody = await createResponse.json();
      const userId = createBody.data.id;

      // Eliminar usuario
      const deleteResponse = await request.delete(
        `${API_BASE}/users/${userId}`
      );

      expect(deleteResponse.status()).toBe(200);

      const deleteBody = await deleteResponse.json();
      expect(deleteBody.success).toBe(true);
      expect(deleteBody.message).toBe("Usuario eliminado exitosamente");

      // Verificar que ya no existe
      const getResponse = await request.get(`${API_BASE}/users/${userId}`);
      expect(getResponse.status()).toBe(404);
    });

    test("should get all active users", async ({ request }) => {
      // Crear algunos usuarios para la prueba
      await request.post(`${API_BASE}/users`, {
        data: { name: "Active User 1", email: "active1@example.com", age: 25 },
      });
      await request.post(`${API_BASE}/users`, {
        data: { name: "Active User 2", email: "active2@example.com", age: 30 },
      });

      const response = await request.get(`${API_BASE}/users`);

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(Array.isArray(body.data)).toBe(true);
      expect(body.data.length).toBeGreaterThan(0);

      // Verificar que todos los usuarios son activos
      body.data.forEach((user: any) => {
        expect(user.isActive).toBe(true);
      });
    });

    test("should get user statistics", async ({ request }) => {
      const response = await request.get(`${API_BASE}/users/stats`);

      expect(response.status()).toBe(200);

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.data).toHaveProperty("total");
      expect(body.data).toHaveProperty("active");
      expect(body.data).toHaveProperty("averageAge");

      expect(typeof body.data.total).toBe("number");
      expect(typeof body.data.active).toBe("number");
      expect(typeof body.data.averageAge).toBe("number");

      expect(body.data.active).toBeLessThanOrEqual(body.data.total);
    });
  });

  test.describe("Error Handling", () => {
    test("should handle malformed JSON", async ({ request }) => {
      const response = await request.post(`${API_BASE}/users`, {
        data: "invalid json string",
      });

      expect(response.status()).toBe(400);
    });

    test("should handle missing required fields", async ({ request }) => {
      const response = await request.post(`${API_BASE}/users`, {
        data: {
          name: "Incomplete User",
          // Missing email and age
        },
      });

      expect(response.status()).toBe(400);
    });

    test("should return 404 for non-existent routes", async ({ request }) => {
      const response = await request.get(`${API_BASE}/non-existent-route`);

      expect(response.status()).toBe(404);

      const body = await response.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe("Ruta no encontrada");
    });
  });

  test.describe("Business Logic Integration", () => {
    test("should prevent duplicate emails", async ({ request }) => {
      const userData = {
        name: "First User",
        email: "duplicate@example.com",
        age: 25,
      };

      // Crear primer usuario
      const firstResponse = await request.post(`${API_BASE}/users`, {
        data: userData,
      });
      expect(firstResponse.status()).toBe(201);

      // Intentar crear segundo usuario con mismo email
      const secondUserData = {
        name: "Second User",
        email: "duplicate@example.com",
        age: 30,
      };

      const secondResponse = await request.post(`${API_BASE}/users`, {
        data: secondUserData,
      });

      expect(secondResponse.status()).toBe(400);

      const body = await secondResponse.json();
      expect(body.success).toBe(false);
      expect(body.error).toBe("El email ya está en uso");
    });

    test("should validate age boundaries", async ({ request }) => {
      // Test edad = 0 (válida)
      const validResponse = await request.post(`${API_BASE}/users`, {
        data: {
          name: "Baby User",
          email: "baby@example.com",
          age: 0,
        },
      });
      expect(validResponse.status()).toBe(201);

      // Test edad = 120 (válida)
      const oldResponse = await request.post(`${API_BASE}/users`, {
        data: {
          name: "Old User",
          email: "old@example.com",
          age: 120,
        },
      });
      expect(oldResponse.status()).toBe(201);

      // Test edad = 121 (inválida)
      const invalidResponse = await request.post(`${API_BASE}/users`, {
        data: {
          name: "Too Old User",
          email: "tooold@example.com",
          age: 121,
        },
      });
      expect(invalidResponse.status()).toBe(400);
    });
  });
});
