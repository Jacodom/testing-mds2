// 🏆 SOLUCIÓN COMPLETA: CALCULADORA TDD
//
// Esta es una implementación de referencia que muestra:
// - Progresión paso a paso siguiendo TDD
// - Refactoring para eliminar duplicación
// - Manejo de casos edge y errores
// - Validaciones emergentes del proceso TDD

// 🔧 VALIDACIÓN COMÚN (emergió del refactoring)
function validateNumbers(a: any, b: any): void {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new Error("Arguments must be numbers");
  }
}

// ➕ SUMA
export function add(a: number, b: number): number {
  validateNumbers(a, b);
  return a + b;
}

// ➖ RESTA
export function subtract(a: number, b: number): number {
  validateNumbers(a, b);
  return a - b;
}

// ✖️ MULTIPLICACIÓN
export function multiply(a: number, b: number): number {
  validateNumbers(a, b);
  return a * b;
}

// ➗ DIVISIÓN
export function divide(a: number, b: number): number {
  validateNumbers(a, b);

  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }

  return a / b;
}

// 📝 EVOLUCIÓN DEL CÓDIGO:
//
// 1️⃣ PRIMERA ITERACIÓN (RED-GREEN):
//    export function add(a: number, b: number): number {
//      return 5; // Solo para pasar add(2,3) = 5
//    }
//
// 2️⃣ SEGUNDA ITERACIÓN (REFACTOR):
//    export function add(a: number, b: number): number {
//      return a + b; // Generalización
//    }
//
// 3️⃣ TERCERA ITERACIÓN (NUEVOS TESTS):
//    - Agregamos subtract, multiply, divide
//    - Cada una empezó con implementación mínima
//
// 4️⃣ CUARTA ITERACIÓN (CASOS EDGE):
//    - División por cero: if (b === 0) throw error
//    - Tests revelaron este caso
//
// 5️⃣ QUINTA ITERACIÓN (REFACTOR FINAL):
//    - Validación común: validateNumbers()
//    - Eliminamos duplicación
//    - Mejoramos legibilidad
//
// 🎯 CARACTERÍSTICAS DE ESTA SOLUCIÓN:
//
// ✅ Emergió naturalmente del proceso TDD
// ✅ Cada línea está justificada por un test
// ✅ Manejo robusto de errores
// ✅ Código limpio y sin duplicación
// ✅ API simple y predecible
// ✅ 100% de cobertura de tests
//
// 🚨 LO QUE NO TIENE (intencionalmente):
//
// ❌ Features "por si acaso"
// ❌ Optimizaciones prematuras
// ❌ Complejidad innecesaria
// ❌ Código que no esté respaldado por tests
//
// 💡 REFLEXIONES:
//
// 1. TDD nos llevó a una API simple y efectiva
// 2. Los tests revelaron casos que no habíamos considerado
// 3. El refactoring fue seguro gracias a los tests
// 4. El código final es más robusto que si lo hubiéramos escrito directo
// 5. Cada función tiene una responsabilidad clara
