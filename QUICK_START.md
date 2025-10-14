# Testing Examples - Quick Start Guide

## ⚡ Quick Commands

```bash
# Setup inicial
npm install
brew install allure  # o npm install -g allure-commandline

# Desarrollo
npm run dev          # Iniciar servidor en http://localhost:3000

# Testing
npm run test:unit    # Unit tests con coverage
npm run test:integration  # Integration tests
npm run test         # Ambos tipos de tests

# Reportes
npm run report       # Generar y abrir Allure report
npm run coverage     # Abrir coverage report
```

## 🎯 Objetivos de Aprendizaje

### Unit Testing (Jest)

- **Archivo**: `tests/unit/user.service.test.ts`
- **Objetivo**: Testear `UserService` de forma aislada
- **Conceptos**: Mocking, validaciones, lógica de negocio

### Integration Testing (Playwright)

- **Archivo**: `tests/integration/user-api.test.ts`
- **Objetivo**: Testear API completa end-to-end
- **Conceptos**: HTTP testing, flujos completos, validación de responses

## 📊 Coverage Target

- **Minimum**: 80% (lines, functions, branches, statements)
- **Current**: Ver con `npm run coverage`

## 🏁 Getting Started

1. **Clone y setup**:

   ```bash
   git clone <repository>
   cd testing-examples
   npm install
   ```

2. **Ejecutar servidor**:

   ```bash
   npm run dev
   ```

3. **Ejecutar tests**:

   ```bash
   npm run test
   ```

4. **Ver reportes**:
   ```bash
   npm run report
   ```

## 📚 Para Estudiantes

1. **Estudia** el código en `src/`
2. **Analiza** los tests en `tests/`
3. **Ejecuta** los comandos de testing
4. **Revisa** los reportes generados
5. **Experimenta** creando nuevos tests
