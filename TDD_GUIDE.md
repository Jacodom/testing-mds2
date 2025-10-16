# 🚀 Guía Completa de Test-Driven Development (TDD)

## 📚 Índice

1. [¿Qué es TDD?](#qué-es-tdd)
2. [El Ciclo Red-Green-Refactor](#el-ciclo-red-green-refactor)
3. [Beneficios del TDD](#beneficios-del-tdd)
4. [Configuración del Proyecto](#configuración-del-proyecto)
5. [Ejercicios Prácticos](#ejercicios-prácticos)
6. [Ejemplos Avanzados](#ejemplos-avanzados)
7. [Mejores Prácticas](#mejores-prácticas)
8. [Errores Comunes](#errores-comunes)

---

## ¿Qué es TDD?

**Test-Driven Development (TDD)** es una metodología de desarrollo de software donde **escribes las pruebas ANTES que el código de producción**.

### 🎯 Principio Fundamental

> "No escribas código de producción hasta que tengas un test fallando que lo requiera"

### 📖 Filosofía

TDD no es solo sobre testing, es sobre **diseño**. Los tests actúan como:

- 📋 **Especificación**: Definen qué debe hacer el código
- 🏗️ **Diseño**: Te fuerzan a pensar en la API antes de implementar
- 📖 **Documentación**: Los tests son documentación ejecutable
- 🛡️ **Red de seguridad**: Te permiten refactorizar con confianza

---

## El Ciclo Red-Green-Refactor

TDD sigue un ciclo de 3 pasos que se repite constantemente:

### 🔴 1. RED (Falla)

```typescript
// ❌ Escribes un test que falla (porque no existe el código)
it("should calculate area of rectangle", () => {
  const result = calculateRectangleArea(5, 3);
  expect(result).toBe(15);
});
```

### 🟢 2. GREEN (Pasa)

```typescript
// ✅ Escribes el MÍNIMO código para que pase
function calculateRectangleArea(width: number, height: number): number {
  return width * height; // Implementación mínima
}
```

### 🔵 3. REFACTOR (Mejora)

```typescript
// 🔄 Mejoras el código manteniendo los tests verdes
function calculateRectangleArea(width: number, height: number): number {
  if (width <= 0 || height <= 0) {
    throw new Error("Width and height must be positive");
  }
  return width * height;
}
```

### ⏱️ Ciclo Completo

1. **RED** (30 segundos - 2 minutos): Escribe un test que falle
2. **GREEN** (30 segundos - 2 minutos): Hazlo pasar con el mínimo código
3. **REFACTOR** (2-5 minutos): Mejora el diseño sin romper tests
4. **Repetir** hasta completar la funcionalidad

---

## Beneficios del TDD

### 🎯 Para el Código

- **Mejor diseño**: APIs más limpias y desacopladas
- **Menos bugs**: Los defectos se detectan inmediatamente
- **Cobertura alta**: Naturalmente obtienes ~100% de cobertura
- **Documentación viva**: Los tests explican cómo usar el código

### 👨‍💻 Para el Desarrollador

- **Confianza**: Puedes refactorizar sin miedo
- **Enfoque**: Una cosa a la vez, paso a paso
- **Feedback rápido**: Sabes inmediatamente si algo se rompe
- **Menos debugging**: Encuentras problemas antes

### 🏢 Para el Proyecto

- **Mantenibilidad**: Cambios seguros en el futuro
- **Velocidad**: Menos tiempo debuggeando, más desarrollando
- **Calidad**: Código más robusto y confiable

---

## Configuración del Proyecto

Este proyecto ya está configurado con:

### 🛠️ Stack Tecnológico

- **TypeScript**: Lenguaje principal
- **Jest**: Framework de testing unitario
- **Playwright**: Testing de integración/E2E
- **Express**: Servidor web para APIs
- **Allure**: Reportes de testing avanzados

### 📦 Comandos Disponibles

```bash
# Unit tests con TDD
npm run test:watch    # Ejecuta tests en modo watch (ideal para TDD)
npm run test:unit     # Ejecuta unit tests una vez
npm run coverage      # Genera reporte de cobertura

# Integration tests
npm run test:integration  # Tests de integración
npm run test:all         # Todos los tests

# Reportes
npm run report          # Genera y abre reporte Allure
```

### 🔧 Configuración para TDD

Para una experiencia óptima de TDD, ejecuta:

```bash
npm run test:watch
```

Esto mantendrá los tests ejecutándose automáticamente cada vez que cambies código.

---

## Ejercicios Prácticos

### 🎓 Nivel 1: Funciones Simples

#### Ejercicio 1.1: Calculadora

**Objetivo**: Crear una calculadora básica usando TDD

**Pasos**:

1. Crea `src/utils/calculator.ts` (vacío)
2. Crea `tests/unit/calculator.test.ts`
3. Sigue el ciclo RED-GREEN-REFACTOR para cada operación

```typescript
// tests/unit/calculator.test.ts
describe("Calculator", () => {
  describe("add", () => {
    it("should add two positive numbers", () => {
      const result = add(2, 3);
      expect(result).toBe(5);
    });

    // ❌ Este test fallará inicialmente
  });
});
```

**Funcionalidades a implementar**:

- ✅ Suma de números positivos
- ✅ Suma con números negativos
- ✅ Suma con cero
- ✅ Resta, multiplicación, división
- ✅ División por cero (debe lanzar error)

#### Ejercicio 1.2: Validador de Email

**Objetivo**: Validar emails usando TDD

```typescript
// Casos a considerar:
// ✅ Emails válidos: "user@domain.com"
// ❌ Sin @: "userdomain.com"
// ❌ Sin dominio: "user@"
// ❌ Vacío: ""
// ❌ Solo espacios: "   "
```

### 🎓 Nivel 2: Clases y Objetos

#### Ejercicio 2.1: Clase BankAccount

**Objetivo**: Crear una cuenta bancaria con TDD

```typescript
// Funcionalidades:
// - Constructor con balance inicial
// - deposit(amount): agregar dinero
// - withdraw(amount): retirar dinero
// - getBalance(): obtener balance
// - Validaciones: no permitir montos negativos, no sobregiro
```

#### Ejercicio 2.2: Sistema de Inventario

**Objetivo**: Gestionar productos en inventario

```typescript
// Funcionalidades:
// - addProduct(product): agregar producto
// - removeProduct(id): remover producto
// - updateStock(id, quantity): actualizar stock
// - findProduct(id): buscar producto
// - getProductsWithLowStock(threshold): productos con poco stock
```

### 🎓 Nivel 3: Servicios con Dependencias

#### Ejercicio 3.1: UserService con TDD

**Objetivo**: Implementar un nuevo servicio usando TDD puro

**Escenario**: Vas a crear un `NotificationService` desde cero:

```typescript
// tests/unit/notification.service.test.ts
describe("NotificationService", () => {
  let notificationService: NotificationService;
  let mockEmailProvider: jest.Mocked<EmailProvider>;
  let mockSMSProvider: jest.Mocked<SMSProvider>;

  beforeEach(() => {
    // Setup mocks
    mockEmailProvider = {
      sendEmail: jest.fn(),
    };
    mockSMSProvider = {
      sendSMS: jest.fn(),
    };

    notificationService = new NotificationService(
      mockEmailProvider,
      mockSMSProvider
    );
  });

  describe("sendWelcomeNotification", () => {
    it("should send welcome email for email preference", async () => {
      // ❌ RED: Este test fallará porque no existe el código
      const user = { id: "1", email: "user@test.com", preference: "email" };

      await notificationService.sendWelcomeNotification(user);

      expect(mockEmailProvider.sendEmail).toHaveBeenCalledWith({
        to: "user@test.com",
        subject: "Bienvenido",
        body: expect.stringContaining("Bienvenido"),
      });
    });
  });
});
```

**Tu tarea**: Implementar paso a paso siguiendo TDD.

---

## Ejemplos Avanzados

### 🏗️ TDD con Arquitectura Hexagonal

En este proyecto, puedes ver cómo TDD funciona con arquitecturas más complejas:

#### Ejemplo: UserService Existente

El `UserService` ya implementado muestra:

```typescript
// src/services/user.service.ts
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(userData: CreateUserRequest): Promise<User> {
    // Lógica de negocio testeada unitariamente
    if (!this.isValidEmail(userData.email)) {
      throw new Error("Email inválido");
    }

    // ... más validaciones

    return await this.userRepository.create(userData);
  }
}
```

#### Tests Unitarios del UserService

```typescript
// tests/unit/user.service.test.ts
describe("UserService", () => {
  let userService: UserService;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      // ... otros métodos
    };

    userService = new UserService(mockUserRepository);
  });

  it("debería crear un usuario con datos válidos", async () => {
    // Arrange
    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue(expectedUser);

    // Act
    const result = await userService.createUser(validUserData);

    // Assert
    expect(result).toEqual(expectedUser);
    expect(mockUserRepository.create).toHaveBeenCalledWith(validUserData);
  });
});
```

### 🎯 TDD en el Mundo Real

#### Patrón: Outside-In TDD

1. **Empezar por el test de integración** (lo que el usuario ve)
2. **Dejar que el test de integración guíe** los tests unitarios
3. **Implementar de afuera hacia adentro**

```typescript
// 1. Test de integración (Playwright)
test("should create user via API", async ({ request }) => {
  const response = await request.post("/api/users", {
    data: { name: "Juan", email: "juan@test.com", age: 25 },
  });

  expect(response.status()).toBe(201);
  // ❌ Falla porque no existe el endpoint
});

// 2. Esto nos lleva a crear el controller test
describe("UserController", () => {
  it("should create user successfully", async () => {
    // Test del controller
    // ❌ Falla porque no existe UserController.createUser
  });
});

// 3. Que nos lleva al service test
describe("UserService", () => {
  it("should create user with validation", async () => {
    // Test del service
    // ❌ Falla porque no existe UserService.createUser
  });
});
```

---

## Mejores Prácticas

### ✅ DO (Hacer)

#### 1. **Tests Pequeños y Enfocados**

```typescript
// ✅ BIEN: Un test, una responsabilidad
it("should reject negative age", async () => {
  await expect(userService.createUser({ age: -1 })).rejects.toThrow(
    "Edad debe estar entre 0 y 120 años"
  );
});

// ❌ MAL: Un test que hace muchas cosas
it("should validate user data", async () => {
  // Testea email, age, name, etc. todo junto
});
```

#### 2. **Arrange-Act-Assert (AAA)**

```typescript
it("should calculate total with tax", () => {
  // Arrange
  const price = 100;
  const taxRate = 0.1;

  // Act
  const result = calculateTotalWithTax(price, taxRate);

  // Assert
  expect(result).toBe(110);
});
```

#### 3. **Nombres Descriptivos**

```typescript
// ✅ BIEN: Describe el comportamiento
it("should throw error when email is already in use", () => {});

// ❌ MAL: No dice qué esperar
it("should test email validation", () => {});
```

#### 4. **Tests Independientes**

```typescript
// ✅ BIEN: Cada test se configura a sí mismo
beforeEach(() => {
  userService = new UserService(mockRepository);
});

// ❌ MAL: Tests dependen de orden de ejecución
let globalUser; // ❌ Estado compartido
```

### ❌ DON'T (No Hacer)

#### 1. **No Testear Implementación**

```typescript
// ❌ MAL: Testea cómo se hace
it("should call repository.create with correct params", () => {
  userService.createUser(userData);
  expect(mockRepository.create).toHaveBeenCalledWith(userData);
});

// ✅ BIEN: Testea qué se logra
it("should return created user with generated id", async () => {
  const result = await userService.createUser(userData);
  expect(result).toHaveProperty("id");
  expect(result.name).toBe(userData.name);
});
```

#### 2. **No Saltarse el RED**

```typescript
// ❌ MAL: Escribir test y código al mismo tiempo
// ✅ BIEN: Siempre ver el test fallar primero
```

#### 3. **No Tests Demasiado Complejos**

```typescript
// ❌ MAL: Test con lógica complicada
it("should handle complex scenario", () => {
  for (let i = 0; i < 10; i++) {
    if (i % 2 === 0) {
      // lógica compleja en el test
    }
  }
});
```

### 🎯 Consejos para TDD

#### 1. **Empieza Simple**

```typescript
// Primer test: caso más simple posible
it("should return empty array when no users exist", () => {
  const result = userService.getAllUsers();
  expect(result).toEqual([]);
});
```

#### 2. **Baby Steps**

- Un test a la vez
- Incrementos pequeños
- No implementes más de lo que el test requiere

#### 3. **Refactoriza Constantemente**

- Después de cada GREEN, pregúntate: "¿Puedo mejorarlo?"
- Elimina duplicación
- Mejora nombres
- Simplifica lógica

#### 4. **Mantén los Tests Rápidos**

```typescript
// ✅ Unit tests deben ser < 100ms
// ✅ Suite completa < 10 segundos para TDD efectivo
```

---

## Errores Comunes

### 🚨 Error 1: Saltarse la Fase RED

**Problema**: Escribir test y código que pasa inmediatamente

**Síntoma**:

```typescript
// ❌ Test que nunca falla
it("should return true", () => {
  expect(true).toBe(true); // Siempre pasa
});
```

**Solución**: Siempre ver el test fallar primero

### 🚨 Error 2: Tests Demasiado Grandes

**Problema**: Un test que verifica muchas cosas

**Síntoma**:

```typescript
// ❌ Test gigante
it("should handle user lifecycle", async () => {
  // 50 líneas de código testando creación, actualización, eliminación
});
```

**Solución**: Un test por comportamiento

### 🚨 Error 3: No Refactorizar

**Problema**: Quedarse en GREEN sin mejorar el código

**Síntoma**:

```typescript
// ✅ Funciona pero está duplicado
function validateEmail(email: string): boolean {
  if (email.includes("@") && email.includes(".")) return true;
  return false;
}

function validateStrongEmail(email: string): boolean {
  if (email.includes("@") && email.includes(".")) return true; // Duplicado
  return false;
}
```

**Solución**: Siempre refactorizar después de GREEN

### 🚨 Error 4: Mocks Demasiado Específicos

**Problema**: Tests frágiles que se rompen con cambios menores

**Síntoma**:

```typescript
// ❌ Muy específico
expect(mockService.method).toHaveBeenCalledWith(
  exactly, these, parameters, in, this, order
);
```

**Solución**: Mockear solo lo necesario

### 🚨 Error 5: Testing de Implementación vs Comportamiento

**Problema**: Testear cómo funciona en lugar de qué hace

**Síntoma**:

```typescript
// ❌ Testa implementación
it("should call validateEmail and then save", () => {
  userService.createUser(userData);
  expect(userService.validateEmail).toHaveBeenCalled();
  expect(repository.save).toHaveBeenCalled();
});

// ✅ Testa comportamiento
it("should create user with valid email", async () => {
  const result = await userService.createUser(validUserData);
  expect(result).toHaveProperty("id");
});
```

---

## 🎓 Ejercicios de Práctica

### Ejercicio Final: Biblioteca TDD

**Objetivo**: Implementar un sistema de biblioteca completo usando TDD

#### Requisitos:

1. **Book Management**

   - Agregar/quitar libros
   - Buscar por título/autor
   - Categorizar libros

2. **User Management**

   - Registrar usuarios
   - Validar información
   - Tipos de usuario (estudiante, profesor)

3. **Lending System**
   - Prestar libros
   - Devolver libros
   - Calcular multas por retraso
   - Límites por tipo de usuario

#### Estructura Sugerida:

```
src/
├── models/
│   ├── book.model.ts
│   ├── user.model.ts
│   └── lending.model.ts
├── services/
│   ├── book.service.ts
│   ├── user.service.ts
│   └── lending.service.ts
└── repositories/
    ├── book.repository.ts
    ├── user.repository.ts
    └── lending.repository.ts

tests/unit/
├── book.service.test.ts
├── user.service.test.ts
└── lending.service.test.ts
```

#### Pasos a Seguir:

1. **Empezar con BookService**

   - Test para agregar libro
   - Test para buscar libro
   - Test para validaciones

2. **Continuar con UserService**

   - Test para registro
   - Test para validaciones
   - Test para tipos de usuario

3. **Finalizar con LendingService**
   - Test para préstamo
   - Test para devolución
   - Test para cálculo de multas

---

## 📚 Recursos Adicionales

### 📖 Libros Recomendados

- **"Test Driven Development: By Example"** - Kent Beck
- **"Growing Object-Oriented Software, Guided by Tests"** - Steve Freeman & Nat Pryce
- **"The Art of Unit Testing"** - Roy Osherove

### 🔗 Enlaces Útiles

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Testing](https://playwright.dev/docs/test-intro)
- [TDD Wikipedia](https://en.wikipedia.org/wiki/Test-driven_development)

### 🎥 Videos y Tutoriales

- Buscar: "TDD TypeScript tutorial"
- Buscar: "Jest TDD examples"
- Buscar: "Kent Beck TDD demonstration"

---

## 🎯 Conclusión

TDD es más que una técnica de testing, es una **metodología de diseño** que te ayuda a:

- 🎯 **Escribir código más limpio**
- 🛡️ **Tener confianza para refactorizar**
- 📈 **Mejorar la calidad del software**
- ⚡ **Desarrollar más rápido a largo plazo**

### 🚀 Próximos Pasos

1. **Practica con ejercicios simples**
2. **Mantén el ciclo RED-GREEN-REFACTOR**
3. **Incrementa gradualmente la complejidad**
4. **Aplica TDD en proyectos reales**

### 💡 Recuerda

> "TDD no es sobre escribir tests. Es sobre diseñar mejor software a través de tests."

¡Empieza con el ejercicio de la calculadora y ve construyendo tu confianza en TDD paso a paso! 🚀

---

_Esta guía está diseñada para ser práctica y progresiva. Cada concepto se construye sobre el anterior, permitiendo un aprendizaje sólido de TDD._

¿Tienes preguntas? ¡Experimenta con los ejercicios y descubre TDD por ti mismo! 💪
