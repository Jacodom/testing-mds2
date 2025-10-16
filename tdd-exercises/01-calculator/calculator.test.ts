// 🧮 EJERCICIO TDD: CALCULADORA
//
// INSTRUCCIONES:
// 1. Ejecuta: npm run test:watch
// 2. Descomenta UN test a la vez
// 3. Sigue el ciclo RED-GREEN-REFACTOR
// 4. NO implementes más de lo que el test requiere
// 5. NO mires la solución hasta terminar
//
// CICLO TDD:
// 🔴 RED: Descomenta test → debe fallar
// 🟢 GREEN: Implementa mínimo para pasar
// 🔵 REFACTOR: Mejora sin romper tests

import { add, subtract, multiply, divide } from "./calculator";

describe("Calculator TDD Exercise", () => {
  describe("add function", () => {
    // 🔴 PASO 1: Descomenta este test
    // it('should add two positive numbers', () => {
    //   const result = add(2, 3);
    //   expect(result).toBe(5);
    // });
    // 🔴 PASO 2: Después de implementar add básico, descomenta este
    // it('should add zero correctly', () => {
    //   expect(add(5, 0)).toBe(5);
    //   expect(add(0, 3)).toBe(3);
    //   expect(add(0, 0)).toBe(0);
    // });
    // 🔴 PASO 3: Descomenta para manejar números negativos
    // it('should add negative numbers', () => {
    //   expect(add(-2, 3)).toBe(1);
    //   expect(add(2, -3)).toBe(-1);
    //   expect(add(-2, -3)).toBe(-5);
    // });
    // 🔴 PASO 4: Descomenta para números decimales
    // it('should add decimal numbers', () => {
    //   expect(add(0.1, 0.2)).toBeCloseTo(0.3);
    //   expect(add(1.5, 2.7)).toBeCloseTo(4.2);
    // });
  });

  describe("subtract function", () => {
    // 🔴 PASO 5: Implementa resta básica
    // it('should subtract two positive numbers', () => {
    //   expect(subtract(5, 3)).toBe(2);
    //   expect(subtract(10, 4)).toBe(6);
    // });
    // 🔴 PASO 6: Resta con negativos
    // it('should subtract negative numbers', () => {
    //   expect(subtract(5, -3)).toBe(8);
    //   expect(subtract(-5, 3)).toBe(-8);
    //   expect(subtract(-5, -3)).toBe(-2);
    // });
  });

  describe("multiply function", () => {
    // 🔴 PASO 7: Multiplicación básica
    // it('should multiply two positive numbers', () => {
    //   expect(multiply(3, 4)).toBe(12);
    //   expect(multiply(2, 5)).toBe(10);
    // });
    // 🔴 PASO 8: Multiplicación por cero
    // it('should multiply by zero', () => {
    //   expect(multiply(5, 0)).toBe(0);
    //   expect(multiply(0, 7)).toBe(0);
    // });
    // 🔴 PASO 9: Multiplicación con negativos
    // it('should multiply negative numbers', () => {
    //   expect(multiply(-3, 4)).toBe(-12);
    //   expect(multiply(-3, -4)).toBe(12);
    // });
  });

  describe("divide function", () => {
    // 🔴 PASO 10: División básica
    // it('should divide two positive numbers', () => {
    //   expect(divide(8, 2)).toBe(4);
    //   expect(divide(15, 3)).toBe(5);
    // });
    // 🔴 PASO 11: División con decimales
    // it('should divide with decimal results', () => {
    //   expect(divide(7, 2)).toBe(3.5);
    //   expect(divide(1, 3)).toBeCloseTo(0.333333);
    // });
    // 🔴 PASO 12: ¡IMPORTANTE! División por cero debe lanzar error
    // it('should throw error when dividing by zero', () => {
    //   expect(() => divide(5, 0)).toThrow('Cannot divide by zero');
    //   expect(() => divide(-3, 0)).toThrow('Cannot divide by zero');
    // });
  });

  // 🔴 PASO 13: BONUS - Validación de tipos (si quieres ir más allá)
  // describe('input validation', () => {

  //   it('should handle string inputs', () => {
  //     expect(() => add('2' as any, 3)).toThrow('Arguments must be numbers');
  //     expect(() => add(2, '3' as any)).toThrow('Arguments must be numbers');
  //   });

  //   it('should handle null/undefined inputs', () => {
  //     expect(() => add(null as any, 3)).toThrow('Arguments must be numbers');
  //     expect(() => add(2, undefined as any)).toThrow('Arguments must be numbers');
  //   });

  // });
});

// 📋 CHECKLIST DE PROGRESO:
//
// □ Test 1: add(2, 3) = 5
// □ Test 2: add con cero
// □ Test 3: add con negativos
// □ Test 4: add con decimales
// □ Test 5: subtract básico
// □ Test 6: subtract con negativos
// □ Test 7: multiply básico
// □ Test 8: multiply por cero
// □ Test 9: multiply con negativos
// □ Test 10: divide básico
// □ Test 11: divide con decimales
// □ Test 12: divide por cero (error)
// □ BONUS: Validación de tipos
//
// 🎯 RECORDATORIOS:
// - Un test a la vez
// - Siempre ver fallar primero (RED)
// - Implementación mínima (GREEN)
// - Refactorizar al final (REFACTOR)
// - Los tests son tu especificación
