# 💡 Ejemplo Práctico: Implementando un Feature con TDD

## 🎯 Escenario: Agregar Validación de Edad al UserService

Vamos a demostrar cómo usar TDD para agregar una nueva funcionalidad al `UserService` existente.

**Requisito**: Los usuarios menores de 13 años no pueden registrarse (COPPA compliance).

## 🔄 Ciclo TDD Completo

### 🔴 FASE RED: Escribir Test que Falla

```typescript
// tests/unit/user.service.test.ts
// Agregar al describe("createUser")

it("should reject users under 13 years old", async () => {
  // Arrange
  const minorUserData: CreateUserRequest = {
    name: "Niño Pequeño",
    email: "nino@example.com",
    age: 12, // Menor de 13
  };

  // Act & Assert
  await expect(userService.createUser(minorUserData)).rejects.toThrow(
    "Users must be at least 13 years old"
  );
});
```

**Ejecuta el test**: ❌ Fallará porque no existe esta validación

### 🟢 FASE GREEN: Implementación Mínima

```typescript
// src/services/user.service.ts
// Agregar en el método createUser, después de las validaciones existentes

async createUser(userData: CreateUserRequest): Promise<User> {
  // Validaciones existentes...
  if (!this.isValidEmail(userData.email)) {
    throw new Error("Email inválido");
  }

  if (userData.age < 0 || userData.age > 120) {
    throw new Error("Edad debe estar entre 0 y 120 años");
  }

  // 🟢 NUEVA VALIDACIÓN - Implementación mínima
  if (userData.age < 13) {
    throw new Error('Users must be at least 13 years old');
  }

  // Resto del método...
}
```

**Ejecuta el test**: ✅ Ahora pasa

### 🔵 FASE REFACTOR: Mejorar el Diseño

```typescript
// src/services/user.service.ts
// Refactorizar para mejor organización

private validateAge(age: number): void {
  if (age < 0 || age > 120) {
    throw new Error("Edad debe estar entre 0 y 120 años");
  }

  if (age < 13) {
    throw new Error('Users must be at least 13 years old');
  }
}

async createUser(userData: CreateUserRequest): Promise<User> {
  // Validaciones refactorizadas
  if (!this.isValidEmail(userData.email)) {
    throw new Error("Email inválido");
  }

  this.validateAge(userData.age); // 🔵 Refactorizado

  if (userData.name.trim().length < 2) {
    throw new Error("El nombre debe tener al menos 2 caracteres");
  }

  // Resto del método...
}
```

**Ejecuta todos los tests**: ✅ Todos siguen pasando

## 🔄 Segundo Ciclo: Casos Edge

### 🔴 RED: Test para Caso Límite

```typescript
it("should accept users exactly 13 years old", async () => {
  const teenUserData: CreateUserRequest = {
    name: "Teen User",
    email: "teen@example.com",
    age: 13, // Exactamente 13
  };

  mockUserRepository.findByEmail.mockResolvedValue(null);
  mockUserRepository.create.mockResolvedValue({
    ...teenUserData,
    id: "teen-id",
    createdAt: new Date(),
    isActive: true,
  });

  const result = await userService.createUser(teenUserData);

  expect(result).toBeDefined();
  expect(result.age).toBe(13);
});
```

**Ejecuta el test**: ✅ Ya pasa con la implementación actual

## 🔄 Tercer Ciclo: Casos Adicionales

### 🔴 RED: Test para Validación de Entrada

```typescript
it("should handle decimal ages appropriately", async () => {
  const decimalAgeData: CreateUserRequest = {
    name: "User Point Five",
    email: "decimal@example.com",
    age: 12.9, // Menor de 13 pero con decimal
  };

  await expect(userService.createUser(decimalAgeData)).rejects.toThrow(
    "Users must be at least 13 years old"
  );
});
```

**Ejecuta el test**: ✅ Ya pasa con la implementación actual

## 📊 Resultado Final

### Código Actualizado

```typescript
// src/services/user.service.ts
export class UserService {
  constructor(private userRepository: UserRepository) {}

  private validateAge(age: number): void {
    if (age < 0 || age > 120) {
      throw new Error("Edad debe estar entre 0 y 120 años");
    }

    if (age < 13) {
      throw new Error("Users must be at least 13 years old");
    }
  }

  private isValidEmail(email: string): boolean {
    // Implementación existente...
  }

  async createUser(userData: CreateUserRequest): Promise<User> {
    // Validaciones de negocio
    if (!this.isValidEmail(userData.email)) {
      throw new Error("Email inválido");
    }

    this.validateAge(userData.age);

    if (userData.name.trim().length < 2) {
      throw new Error("El nombre debe tener al menos 2 caracteres");
    }

    // Verificar que el email no esté en uso
    const existingUser = await this.userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("El email ya está en uso");
    }

    return await this.userRepository.create(userData);
  }

  // ... otros métodos
}
```

### Tests Actualizados

```typescript
// tests/unit/user.service.test.ts
describe("createUser", () => {
  // Tests existentes...

  it("should reject users under 13 years old", async () => {
    const minorUserData: CreateUserRequest = {
      name: "Niño Pequeño",
      email: "nino@example.com",
      age: 12,
    };

    await expect(userService.createUser(minorUserData)).rejects.toThrow(
      "Users must be at least 13 years old"
    );
  });

  it("should accept users exactly 13 years old", async () => {
    const teenUserData: CreateUserRequest = {
      name: "Teen User",
      email: "teen@example.com",
      age: 13,
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockResolvedValue({
      ...teenUserData,
      id: "teen-id",
      createdAt: new Date(),
      isActive: true,
    });

    const result = await userService.createUser(teenUserData);
    expect(result).toBeDefined();
    expect(result.age).toBe(13);
  });

  it("should handle decimal ages appropriately", async () => {
    const decimalAgeData: CreateUserRequest = {
      name: "User Point Five",
      email: "decimal@example.com",
      age: 12.9,
    };

    await expect(userService.createUser(decimalAgeData)).rejects.toThrow(
      "Users must be at least 13 years old"
    );
  });
});
```

## 🎯 Beneficios Observados

### 1. **Diseño Emergente**

- La función `validateAge()` surgió naturalmente del refactoring
- La API se mantiene simple y coherente

### 2. **Cobertura Completa**

- Test para el caso principal (menores de 13)
- Test para el caso límite (exactamente 13)
- Test para casos edge (decimales)

### 3. **Confianza para Cambiar**

- Todos los tests existentes siguen pasando
- La refactorización fue segura
- El comportamiento anterior se preserva

### 4. **Documentación Viva**

- Los tests explican exactamente qué hace el código
- Sirven como especificación ejecutable

## 🚀 Ejercicio para Estudiantes

**Tarea**: Usar TDD para agregar una nueva validación:

> "Los usuarios no pueden tener emails de dominios temporales como '10minutemail.com', 'tempmail.org'"

### Pasos:

1. **RED**: Escribe un test que verifique el rechazo de emails temporales
2. **GREEN**: Implementa la validación mínima
3. **REFACTOR**: Mejora el diseño si es necesario
4. **Repite**: Agrega más dominios temporales y casos edge

### Estructura Sugerida:

```typescript
it("should reject temporary email domains", async () => {
  const tempEmailData: CreateUserRequest = {
    name: "Temp User",
    email: "user@10minutemail.com", // Dominio temporal
    age: 25,
  };

  await expect(userService.createUser(tempEmailData)).rejects.toThrow(
    "Temporary email addresses are not allowed"
  );
});
```

---

## 💡 Conclusiones

Este ejemplo muestra cómo TDD:

1. **Guía el diseño** de nuevas funcionalidades
2. **Preserva el comportamiento existente** através de regression tests
3. **Genera código más robusto** al considerar casos edge
4. **Facilita el refactoring** con confianza
5. **Documenta el comportamiento** a través de tests ejecutables

¡Ahora es tu turno de aplicar TDD en el UserService existente! 🎯
