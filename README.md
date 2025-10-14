# 🧪 Testing Examples Repository

Este repositorio contiene ejemplos completos de **Unit Testing** e **Integration Testing** para enseñar testing a estudiantes.

## 📋 Contenido

### Estructura del Proyecto

```
testing-examples/
├── src/                          # Código fuente de la API
│   ├── controllers/              # Controllers HTTP
│   ├── services/                 # Lógica de negocio
│   ├── models/                   # Interfaces y tipos
│   ├── repositories/             # Acceso a datos
│   └── index.ts                  # Servidor Express
├── tests/
│   ├── unit/                     # Unit tests (Jest)
│   ├── integration/              # Integration tests (Playwright)
│   └── setup.ts                  # Configuración global
├── coverage/                     # Reportes de cobertura
├── allure-results/              # Datos de Allure
└── allure-report/               # Reportes HTML
```

## 🚀 Comandos de Testing

### Prerequisitos

```bash
# Instalar dependencias
npm install

# Instalar Allure CLI (para reportes visuales)
brew install allure              # macOS
npm install -g allure-commandline # Alternativa con npm
```

### Comandos Principales

#### Unit Tests (Jest)

```bash
# Ejecutar unit tests con coverage
npm run test:unit

# Unit tests en modo watch (desarrollo)
npm run test:watch

# Solo generar reporte de coverage
npm run coverage
```

#### Integration Tests (Playwright)

```bash
# Ejecutar integration tests
npm run test:integration

# Integration tests (requiere servidor corriendo)
# Terminal 1: npm run dev
# Terminal 2: npm run test:integration

# Integration tests con UI mode (debugging)
npx playwright test --ui
```

#### Todos los Tests

```bash
# Ejecutar unit tests + integration tests
npm run test

# Alternativo
npm run test:all
```

#### Reportes Visuales

```bash
# Generar y abrir reporte de Allure
npm run report

# Solo abrir reporte de coverage
npm run coverage
```

### Desarrollo

```bash
# Compilar TypeScript
npm run build

# Ejecutar en desarrollo
npm run dev

# Ejecutar en producción
npm start
```

## 📚 Ejemplos Incluidos

### 1. Unit Test Example (`tests/unit/user.service.test.ts`)

**Conceptos demostrados:**

- ✅ Mocking de dependencias con Jest
- ✅ Testing de lógica de negocio
- ✅ Validación de parámetros
- ✅ Casos edge y manejo de errores
- ✅ Cobertura de código
- ✅ Arrange-Act-Assert pattern

**Features testeadas:**

- Crear usuarios con validaciones
- Buscar usuarios por ID
- Actualizar información de usuarios
- Eliminar usuarios
- Calcular estadísticas
- Filtrar usuarios activos

### 2. Integration Test Example (`tests/integration/user-api.test.ts`)

**Conceptos demostrados:**

- ✅ Testing de endpoints HTTP
- ✅ Validación de responses JSON
- ✅ Testing de flujos completos
- ✅ Manejo de errores HTTP
- ✅ Testing de reglas de negocio integradas
- ✅ Setup y teardown de tests

**Features testeadas:**

- CRUD completo de usuarios vía API
- Validaciones de negocio end-to-end
- Manejo de errores HTTP
- Health checks
- Estadísticas de usuarios

## 🎯 API Endpoints

```
GET    /health           # Health check
POST   /users            # Crear usuario
GET    /users            # Listar usuarios activos
GET    /users/stats      # Estadísticas de usuarios
GET    /users/:id        # Obtener usuario por ID
PUT    /users/:id        # Actualizar usuario
DELETE /users/:id        # Eliminar usuario
```

## 📊 Reportes y Coverage

### Coverage Reports (Jest)

- **HTML Report**: `coverage/lcov-report/index.html`
- **Threshold**: 80% mínimo (branches, functions, lines, statements)
- **Formats**: HTML, LCOV, Text, Clover

### Allure Reports

- **Unit Tests**: Reportes detallados con Jest + Allure
- **Integration Tests**: Reportes con screenshots y traces
- **History**: Tracking de resultados entre ejecuciones
- **Attachments**: Logs y archivos de debugging

## 🏗️ Arquitectura de Testing

### Unit Testing Strategy

```
Service Layer Testing
├── Mock todas las dependencias
├── Test lógica de negocio aislada
├── Validar parámetros de entrada
├── Verificar llamadas a dependencias
└── Cubrir casos edge y errores
```

### Integration Testing Strategy

```
End-to-End API Testing
├── Test servidor real running
├── Validar HTTP requests/responses
├── Test flujos completos de usuario
├── Verificar integración entre capas
└── Test reglas de negocio integradas
```

## 🎓 Learning Outcomes

Al completar estos ejemplos, los estudiantes aprenderán:

1. **Unit Testing**:

   - Crear mocks efectivos
   - Testear lógica de negocio aisladamente
   - Escribir tests mantenibles
   - Entender coverage reports

2. **Integration Testing**:

   - Testear APIs HTTP completas
   - Validar integración entre componentes
   - Manejar setup/teardown de tests
   - Debugging de integration tests

3. **Best Practices**:
   - Estructura de proyectos de testing
   - Naming conventions
   - Test organization
   - Reporting y monitoring

## 🔧 Configuración

### Jest Configuration (`jest.config.js`)

- TypeScript support con ts-jest
- Coverage thresholds configurables
- Allure integration
- Custom matchers

### Playwright Configuration (`playwright.config.ts`)

- Multi-browser testing
- Allure reports con screenshots
- Base URL configuration
- Test timeouts y retries

## 📖 Próximos Pasos

Para extender estos ejemplos:

1. **Agregar más servicios** en `src/services/`
2. **Crear sus unit tests** en `tests/unit/`
3. **Añadir endpoints** en `src/controllers/`
4. **Testear integration** en `tests/integration/`
5. **Ejecutar y analizar reportes**

## 🚨 Troubleshooting

### Problemas Comunes

**Jest no encuentra módulos:**

```bash
npm run build
```

**Playwright integration tests:**

```bash
# Terminal 1: Levantar servidor
npm run dev

# Terminal 2: Ejecutar tests
npm run test:integration

# Ver tests disponibles
npx playwright test --list
```

**Allure reports no generan:**

```bash
npm install -g allure-commandline
allure --version
```

## 📞 Support

Para preguntas sobre estos ejemplos de testing, revisa:

1. Los comentarios en el código
2. La documentación de Jest y Playwright
3. Los reportes de coverage para identificar gaps
