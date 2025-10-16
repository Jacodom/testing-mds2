# 🛠️ TDD con TypeScript, Jest y Playwright - Mejores Prácticas

## 🎯 Stack-Specific Best Practices

Esta guía cubre las mejores prácticas específicas para el stack tecnológico de este proyecto.

---

## 🧪 Jest + TypeScript para Unit Testing

### ✅ Configuración Óptima para TDD

#### Jest Configuration (jest.config.js)

```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts", // Exclude entry point
  ],
  coverageReporters: ["text", "lcov", "html"],
  testMatch: ["**/tests/unit/**/*.test.ts"],
  watchMode: true, // Ideal para TDD
};
```

#### Scripts de Package.json Optimizados

```json
{
  "scripts": {
    "test:tdd": "jest --watch --verbose",
    "test:unit": "jest --testPathPattern=unit --coverage",
    "test:debug": "node --inspect-brk node_modules/.bin/jest --runInBand"
  }
}
```

### 🎯 Patrones de Testing Específicos

#### 1. **Mocking de Dependencias TypeScript**

```typescript
// ✅ BIEN: Mocking tipado
import { UserRepository } from "../../src/models/user.model";

const mockUserRepository: jest.Mocked<UserRepository> = {
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
};

// ❌ MAL: Mocking sin tipos
const mockUserRepository = {
  findById: jest.fn(),
  // TypeScript no puede verificar que implements UserRepository
};
```

#### 2. **Testing de Métodos Async/Await**

```typescript
// ✅ BIEN: Async/await en tests
it("should create user asynchronously", async () => {
  // Arrange
  mockUserRepository.create.mockResolvedValue(expectedUser);

  // Act
  const result = await userService.createUser(userData);

  // Assert
  expect(result).toEqual(expectedUser);
});

// ❌ MAL: Promises sin await
it("should create user", () => {
  return userService.createUser(userData).then((result) => {
    expect(result).toEqual(expectedUser); // Más verboso
  });
});
```

#### 3. **Testing de Errores con TypeScript**

```typescript
// ✅ BIEN: Testing de errores tipados
it("should throw ValidationError for invalid email", async () => {
  const invalidData = { email: "invalid-email" } as CreateUserRequest;

  await expect(userService.createUser(invalidData)).rejects.toThrow(
    "Email inválido"
  );
});

// ✅ MEJOR: Testing de tipos específicos de error
it("should throw specific error type", async () => {
  await expect(userService.createUser(invalidData)).rejects.toBeInstanceOf(
    ValidationError
  );
});
```

#### 4. **Helpers para Reducir Boilerplate**

```typescript
// tests/helpers/user-test-helpers.ts
export const createMockUserRepository = (): jest.Mocked<UserRepository> => ({
  findById: jest.fn(),
  findByEmail: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  findAll: jest.fn(),
});

export const createValidUserData = (
  overrides?: Partial<CreateUserRequest>
): CreateUserRequest => ({
  name: "Test User",
  email: "test@example.com",
  age: 25,
  ...overrides,
});

// En tus tests:
describe("UserService", () => {
  let userService: UserService;
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepository = createMockUserRepository();
    userService = new UserService(mockRepository);
  });

  it("should create user with valid data", async () => {
    const userData = createValidUserData();
    // Test implementation...
  });
});
```

---

## 🎭 Playwright para Integration Testing

### ✅ TDD con Playwright

#### 1. **Estructura de Tests de Integración**

```typescript
// tests/integration/user-api.test.ts
import { test, expect, APIRequestContext } from "@playwright/test";

// ✅ BIEN: Setup compartido para integration tests
test.describe.configure({ mode: "serial" }); // Para tests que dependen de estado

test.describe("User API Integration", () => {
  let request: APIRequestContext;
  const API_BASE = "http://localhost:3000";

  test.beforeAll(async ({ playwright }) => {
    request = await playwright.request.newContext({
      baseURL: API_BASE,
    });
  });

  test.afterAll(async () => {
    await request.dispose();
  });

  // TDD: Empezar con test que falla
  test("should create user via API", async () => {
    const response = await request.post("/api/users", {
      data: {
        name: "Integration Test User",
        email: "integration@test.com",
        age: 25,
      },
    });

    expect(response.status()).toBe(201);

    const user = await response.json();
    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Integration Test User");
  });
});
```

#### 2. **Outside-In TDD con Playwright**

```typescript
// 1. Empezar con el test de integración (Outside)
test("should complete user registration flow", async ({ page }) => {
  await page.goto("/register");

  await page.fill('[data-testid="name"]', "New User");
  await page.fill('[data-testid="email"]', "newuser@test.com");
  await page.fill('[data-testid="age"]', "25");

  await page.click('[data-testid="submit"]');

  await expect(page.locator('[data-testid="success"]')).toHaveText(
    "User registered successfully"
  );
});

// 2. Este test fallará y te guiará a implementar:
//    - Route handler
//    - UserController
//    - UserService (con unit tests)
//    - UserRepository
```

#### 3. **Testing de APIs con Validación**

```typescript
// ✅ BIEN: Tests de API completos
test.describe("API Validation", () => {
  test("should validate required fields", async ({ request }) => {
    const response = await request.post("/api/users", {
      data: {}, // Datos vacíos
    });

    expect(response.status()).toBe(400);

    const error = await response.json();
    expect(error.message).toContain("required");
  });

  test("should validate email format", async ({ request }) => {
    const response = await request.post("/api/users", {
      data: {
        name: "Test User",
        email: "invalid-email", // Email inválido
        age: 25,
      },
    });

    expect(response.status()).toBe(400);
    expect(error.message).toContain("email");
  });
});
```

---

## 🏗️ Arquitectura y Patrones TDD

### ✅ Dependency Injection para Testing

#### 1. **Constructor Injection Pattern**

```typescript
// src/services/user.service.ts
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailValidator?: EmailValidator // Optional para tests
  ) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    const validator = this.emailValidator || new DefaultEmailValidator();
    // ... resto de la implementación
  }
}

// En tests:
const userService = new UserService(
  mockUserRepository,
  mockEmailValidator // Control total sobre dependencias
);
```

#### 2. **Factory Pattern para Tests**

```typescript
// tests/helpers/service-factory.ts
export class TestServiceFactory {
  static createUserService(overrides?: {
    userRepository?: UserRepository;
    emailValidator?: EmailValidator;
  }): UserService {
    return new UserService(
      overrides?.userRepository || createMockUserRepository(),
      overrides?.emailValidator || createMockEmailValidator()
    );
  }
}

// En tests:
const userService = TestServiceFactory.createUserService({
  userRepository: mockRepositoryWithSpecificBehavior,
});
```

### ✅ Testing de Interfaces TypeScript

```typescript
// src/models/user.model.ts
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  create(userData: CreateUserRequest): Promise<User>;
  // ... otros métodos
}

// tests/unit/user.service.test.ts
// ✅ BIEN: Mock que implementa la interfaz completa
const mockUserRepository: jest.Mocked<UserRepository> = {
  findById: jest.fn(),
  create: jest.fn(),
  // TypeScript obliga a implementar TODOS los métodos
};

// ❌ MAL: Mock parcial que puede fallar en runtime
const mockUserRepository = {
  findById: jest.fn(),
  // Falta create() - error en runtime
};
```

---

## ⚡ Performance y Optimización

### ✅ Tests Rápidos para TDD Efectivo

#### 1. **Parallel Testing Configuration**

```javascript
// jest.config.js
module.exports = {
  maxWorkers: "50%", // Usar 50% de CPUs disponibles
  testTimeout: 5000, // 5s timeout para unit tests

  // Correr tests más rápidos primero
  testSequencer: "./custom-test-sequencer.js",
};
```

#### 2. **Mocking de Módulos Pesados**

```typescript
// ✅ BIEN: Mock de módulos externos pesados
jest.mock("heavy-external-library", () => ({
  heavyFunction: jest.fn().mockReturnValue("mocked-result"),
}));

// ✅ BIEN: Mock de file system para tests rápidos
jest.mock("fs", () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));
```

#### 3. **Test Data Builders**

```typescript
// tests/builders/user-builder.ts
export class UserBuilder {
  private userData: Partial<CreateUserRequest> = {};

  withName(name: string): UserBuilder {
    this.userData.name = name;
    return this;
  }

  withEmail(email: string): UserBuilder {
    this.userData.email = email;
    return this;
  }

  withAge(age: number): UserBuilder {
    this.userData.age = age;
    return this;
  }

  build(): CreateUserRequest {
    return {
      name: this.userData.name || "Default Name",
      email: this.userData.email || "default@test.com",
      age: this.userData.age || 25,
    };
  }
}

// En tests:
const userData = new UserBuilder().withName("Custom Name").withAge(30).build();
```

---

## 🐛 Debugging TDD

### ✅ Tools y Técnicas

#### 1. **VS Code Configuration**

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Jest Debug",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand", "--no-cache"],
      "console": "integratedTerminal"
    }
  ]
}
```

#### 2. **Test Debugging Helpers**

```typescript
// ✅ BIEN: Debug específico durante desarrollo
it.only("should debug this specific test", async () => {
  console.log("Debug data:", JSON.stringify(userData, null, 2));

  const result = await userService.createUser(userData);

  console.log("Result:", result);
  expect(result).toBeDefined();
});

// ✅ BIEN: Conditional debugging
const DEBUG = process.env.NODE_ENV === "test-debug";

if (DEBUG) {
  console.log("Mock calls:", mockRepository.create.mock.calls);
}
```

---

## 📊 Coverage y Reporting

### ✅ Coverage Configuration

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    "src/**/*.ts",
    "!src/**/*.d.ts",
    "!src/index.ts",
    "!src/**/*.interface.ts", // Excluir interfaces puras
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
    // Umbrales específicos para archivos críticos
    "./src/services/": {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
```

### ✅ Allure Reporting Integration

```typescript
// tests/unit/user.service.test.ts
import { allure } from "allure-jest";

describe("UserService", () => {
  it("should create user successfully", async () => {
    allure.epic("User Management");
    allure.feature("User Creation");
    allure.story("Create Valid User");

    allure.step("Arrange test data", () => {
      // Setup code
    });

    allure.step("Execute user creation", async () => {
      const result = await userService.createUser(userData);
      allure.attachment(
        "Created User",
        JSON.stringify(result, null, 2),
        "application/json"
      );
    });

    allure.step("Verify result", () => {
      expect(result).toBeDefined();
    });
  });
});
```

---

## 🚨 Errores Comunes del Stack

### ❌ Error 1: Import Issues en Tests

```typescript
// ❌ MAL: Imports relativos complicados
import { UserService } from '../../../src/services/user.service';

// ✅ BIEN: Path mapping en tsconfig
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/src/*": ["src/*"],
      "@/tests/*": ["tests/*"]
    }
  }
}

// En tests:
import { UserService } from '@/src/services/user.service';
```

### ❌ Error 2: Async/Await Issues

```typescript
// ❌ MAL: Olvidar await en tests
it("should create user", async () => {
  const result = userService.createUser(userData); // Missing await
  expect(result).toBeDefined(); // Esto testea la Promise, no el resultado
});

// ✅ BIEN: Properly awaited
it("should create user", async () => {
  const result = await userService.createUser(userData);
  expect(result).toBeDefined();
});
```

### ❌ Error 3: Mock Reset Issues

```typescript
// ❌ MAL: Mocks que se acumulan entre tests
describe("UserService", () => {
  const mockRepository = createMockUserRepository();

  it("test 1", () => {
    mockRepository.create.mockResolvedValue(user1);
    // Test implementation
  });

  it("test 2", () => {
    // mockRepository todavía tiene el mock de test 1
    // Puede causar falsos positivos
  });
});

// ✅ BIEN: Reset en beforeEach
describe("UserService", () => {
  let mockRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockRepository = createMockUserRepository();
    // O alternativamente: jest.clearAllMocks();
  });
});
```

---

## 🎯 Conclusiones Específicas del Stack

### Para Jest + TypeScript:

- ✅ Usa tipos para mocks más seguros
- ✅ Aprovecha async/await para tests más legibles
- ✅ Implementa helpers para reducir boilerplate
- ✅ Configura watch mode para TDD efectivo

### Para Playwright:

- ✅ Usa para Outside-in TDD
- ✅ Combina con unit tests para cobertura completa
- ✅ Aprovecha el API testing para validación de endpoints
- ✅ Configura serial mode para tests que dependen de estado

### Para el Stack Completo:

- ✅ TDD funciona mejor con dependency injection
- ✅ Interfaces TypeScript facilitan mocking
- ✅ Coverage thresholds mantienen calidad
- ✅ Debugging tools aceleran el ciclo de desarrollo

---

¡Con estas prácticas específicas del stack, tendrás una experiencia de TDD fluida y productiva! 🚀
