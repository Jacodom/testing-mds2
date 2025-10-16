# 🧮 Ejercicio 1: Calculadora TDD

## 🎯 Objetivo

Implementar una calculadora básica usando **Test-Driven Development**, aplicando el ciclo **RED-GREEN-REFACTOR**.

## 📚 Conceptos a Aprender

- Ciclo básico de TDD
- Escribir tests que fallan primero (RED)
- Implementación mínima (GREEN)
- Refactorización segura (REFACTOR)
- Manejo de casos edge
- Validación de errores

## 📋 Funcionalidades a Implementar

### ✅ Operaciones Básicas

- `add(a, b)` - Suma dos números
- `subtract(a, b)` - Resta dos números
- `multiply(a, b)` - Multiplica dos números
- `divide(a, b)` - Divide dos números

### ✅ Casos Especiales

- División por cero (debe lanzar error)
- Números negativos
- Números decimales
- Cero como operando

## 🚀 Instrucciones

### Paso 1: Configurar el Entorno

```bash
# Ejecutar tests en modo watch
npm run test:watch

# En otra terminal, navegar al ejercicio
cd tdd-exercises/01-calculator
```

### Paso 2: Ciclo TDD Básico

#### 🔴 RED: Escribe el primer test (que fallará)

1. Abre `calculator.test.ts`
2. Encuentra el primer test comentado
3. Descoméntalo
4. **Ejecuta el test y verifica que falla**

#### 🟢 GREEN: Implementación mínima

1. Abre `calculator.ts`
2. Implementa **solo lo mínimo** para que el test pase
3. **Ejecuta el test y verifica que pasa**

#### 🔵 REFACTOR: Mejora el código

1. ¿Se puede mejorar algo?
2. Refactoriza manteniendo los tests verdes
3. **Ejecuta los tests para confirmar que siguen pasando**

### Paso 3: Repetir el Ciclo

- Descomenta el siguiente test
- Repite RED-GREEN-REFACTOR
- **Un test a la vez**

## 📝 Ejemplo del Primer Ciclo

### 🔴 RED

```typescript
// calculator.test.ts
describe("Calculator", () => {
  describe("add", () => {
    it("should add two positive numbers", () => {
      const result = add(2, 3);
      expect(result).toBe(5);
    });
  });
});
```

**Resultado**: ❌ Test falla porque `add` no existe

### 🟢 GREEN

```typescript
// calculator.ts
export function add(a: number, b: number): number {
  return 5; // Implementación mínima para pasar el test
}
```

**Resultado**: ✅ Test pasa

### 🔵 REFACTOR

```typescript
// calculator.ts
export function add(a: number, b: number): number {
  return a + b; // Implementación correcta
}
```

**Resultado**: ✅ Test sigue pasando

## 🎯 Tips para TDD

### ✅ DO (Hacer)

- **Siempre ver el test fallar primero**
- **Implementar solo lo mínimo para pasar**
- **Refactorizar después de cada GREEN**
- **Un test a la vez**
- **Nombres descriptivos en los tests**

### ❌ DON'T (No Hacer)

- No implementar más de lo que el test requiere
- No saltar la fase RED
- No acumular muchos tests sin implementar
- No hacer tests demasiado complejos

### 📏 Regla de Baby Steps

- Cada ciclo debe tomar **2-5 minutos**
- Si toma más, el paso es demasiado grande
- Divide en pasos más pequeños

## 🔍 Tests Sugeridos (Orden)

1. **Suma básica**: `add(2, 3) = 5`
2. **Suma con cero**: `add(5, 0) = 5`
3. **Suma con negativos**: `add(-2, 3) = 1`
4. **Resta básica**: `subtract(5, 3) = 2`
5. **Multiplicación**: `multiply(4, 3) = 12`
6. **División básica**: `divide(8, 2) = 4`
7. **División por cero**: `divide(5, 0)` debe lanzar error
8. **Números decimales**: `add(0.1, 0.2) = 0.3`

## 🚨 Errores Comunes

### Error 1: Implementar sin ver fallar

```typescript
// ❌ MAL: Test que nunca falla
it("should return 5", () => {
  expect(5).toBe(5); // Siempre pasa
});

// ✅ BIEN: Test que requiere implementación
it("should add two numbers", () => {
  expect(add(2, 3)).toBe(5); // Fallará hasta implementar add()
});
```

### Error 2: Implementar demasiado

```typescript
// ❌ MAL: Implementar toda la calculadora de una vez
export function add(a: number, b: number): number {
  // Validaciones complejas, manejo de errores, etc.
  // cuando solo necesitas: return a + b;
}

// ✅ BIEN: Solo lo mínimo
export function add(a: number, b: number): number {
  return a + b;
}
```

### Error 3: No refactorizar

```typescript
// ❌ MAL: Dejar código duplicado
export function add(a: number, b: number): number {
  if (typeof a !== "number") throw new Error("Invalid type");
  if (typeof b !== "number") throw new Error("Invalid type");
  return a + b;
}

export function subtract(a: number, b: number): number {
  if (typeof a !== "number") throw new Error("Invalid type"); // Duplicado
  if (typeof b !== "number") throw new Error("Invalid type"); // Duplicado
  return a - b;
}

// ✅ BIEN: Refactorizar para eliminar duplicación
function validateNumber(value: any, name: string): void {
  if (typeof value !== "number") {
    throw new Error(`${name} must be a number`);
  }
}

export function add(a: number, b: number): number {
  validateNumber(a, "a");
  validateNumber(b, "b");
  return a + b;
}
```

## 🏆 Criterios de Éxito

Al completar este ejercicio, deberías tener:

- ✅ **Todas las operaciones básicas funcionando**
- ✅ **Manejo correcto de división por cero**
- ✅ **Tests para casos edge (cero, negativos, decimales)**
- ✅ **Código refactorizado sin duplicación**
- ✅ **100% de cobertura de código**
- ✅ **Experiencia práctica con el ciclo RED-GREEN-REFACTOR**

## 🎓 Aprendizajes Esperados

Después de este ejercicio entenderás:

1. **El ritmo de TDD**: RED-GREEN-REFACTOR como hábito
2. **Diseño emergente**: La API surge de los tests
3. **Confianza para refactorizar**: Los tests son tu red de seguridad
4. **Baby steps**: Avances pequeños y constantes
5. **Validación de comportamiento**: Tests que describen qué debe hacer el código

---

## 🚀 ¡Empezar!

1. Abre `calculator.test.ts`
2. Descomenta el primer test
3. Ejecuta `npm run test:watch`
4. ¡Comienza el ciclo TDD!

**Recuerda**: No mires la solución hasta completar tu propia implementación. El aprendizaje está en el proceso, no en el resultado final.

¡Que disfrutes tu primera experiencia completa con TDD! 🎉
