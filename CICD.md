# CI/CD Pipeline - GitHub Actions

Este documento explica la configuración de CI/CD implementada para demostrar los conceptos fundamentales en el contexto de testing.

## 🎯 Objetivos de Aprendizaje

- Entender qué es CI/CD y por qué es importante
- Ver cómo automatizar testing en un pipeline
- Comprender las diferentes etapas de un pipeline
- Observar las mejores prácticas de DevOps

## 📋 Conceptos Básicos

### ¿Qué es CI/CD?

**Continuous Integration (CI)**: Práctica de integrar cambios de código frecuentemente, con verificación automática.

**Continuous Deployment (CD)**: Automatización del proceso de despliegue a producción después de pasar todas las verificaciones.

### Beneficios

- ✅ **Detección temprana de errores**
- ✅ **Calidad de código consistente**
- ✅ **Deployments más seguros**
- ✅ **Feedback rápido para desarrolladores**
- ✅ **Reducción de trabajo manual**

## 🔄 Nuestro Pipeline

### Disparadores (Triggers)

```yaml
on:
  push:
    branches: [main, master] # Cada push a main
  pull_request:
    branches: [main, master] # Cada PR hacia main
  workflow_dispatch: # Ejecución manual
```

### Jobs del Pipeline

#### 1. 🔨 Job CI (Continuous Integration)

**Objetivo**: Verificar que el código funciona correctamente

**Pasos**:

1. **Checkout**: Descargar el código del repositorio
2. **Setup Node.js**: Configurar el entorno de Node.js v18
3. **Install**: Instalar dependencias con `npm ci`
4. **Type Check**: Verificar tipos TypeScript
5. **Build**: Compilar el proyecto
6. **Unit Tests**: Ejecutar tests unitarios con Jest
7. **Coverage**: Generar reporte de cobertura
8. **Integration Tests**: Ejecutar tests con Playwright
9. **Artifacts**: Guardar reportes para análisis

```bash
# Comandos principales ejecutados:
npm ci                    # Instalación limpia
npm run build            # Compilación
npm run test:unit        # Tests unitarios
npm run test:integration # Tests de integración
```

#### 2. 🔒 Job Security & Quality

**Objetivo**: Verificar seguridad y calidad del código

**Pasos**:

- **Audit**: Verificar vulnerabilidades en dependencias
- **Outdated Check**: Detectar dependencias desactualizadas

#### 3. 🚀 Job Deploy (Continuous Deployment)

**Objetivo**: Desplegar a producción (simulado)

**Condiciones**:

- Solo ejecuta en push a `main`/`master`
- Requiere que CI y Security pasen exitosamente

**Pasos**:

- Build para producción
- Deploy simulado (en caso real: servidor, Docker, Kubernetes, etc.)

## 📊 Matriz de Ejecución

| Evento                | CI  | Security |       Deploy |
| --------------------- | --- | -------: | -----------: |
| Push a main           | ✅  |       ✅ |           ✅ |
| Push a feature branch | ✅  |       ✅ |           ❌ |
| Pull Request          | ✅  |       ✅ |           ❌ |
| Manual                | ✅  |       ✅ | Solo en main |

## 🎮 Cómo Probarlo

### 1. Ejecución Manual

1. Ve a la pestaña "Actions" en GitHub
2. Selecciona "CI/CD Pipeline"
3. Click en "Run workflow"
4. Observa la ejecución en tiempo real

### 2. Simular Development Workflow

```bash
# Crear una rama de feature
git checkout -b feature/nueva-funcionalidad

# Hacer cambios y commit
echo "console.log('Nueva feature');" >> src/index.ts
git add .
git commit -m "feat: agregar nueva funcionalidad"

# Push (disparará CI en PR)
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
```

### 3. Simular Deploy a Producción

```bash
# Merge a main (disparará full pipeline)
git checkout main
git merge feature/nueva-funcionalidad
git push origin main
```

## 📈 Interpretando los Resultados

### ✅ Success Indicators

- **Verde**: Todos los tests pasaron
- **Artifacts**: Reportes de coverage y tests disponibles
- **Deploy**: Mensaje de éxito en deploy simulado

### ❌ Failure Scenarios

- **Rojo**: Al menos un job falló
- **Tests**: Fallos en unit tests o integration tests
- **Build**: Error de compilación TypeScript
- **Security**: Vulnerabilidades críticas encontradas

## 🔧 Configuración Avanzada

### Environment Variables

```yaml
env:
  NODE_VERSION: "18" # Versión de Node.js
  CI: true # Indica entorno CI
```

### Artifacts & Reports

- **Coverage Report**: Disponible por 30 días
- **Playwright Report**: Tests de integración
- **Build Assets**: Archivos compilados

### Optimizaciones Implementadas

- **Cache npm**: Acelera instalación de dependencias
- **Parallel Jobs**: Security ejecuta en paralelo con CI
- **Conditional Deploy**: Solo en main branch
- **Retry Logic**: Playwright reintenta tests fallidos en CI

## 📚 Próximos Pasos

### Para Producción Real

1. **Secrets Management**: Usar GitHub Secrets para APIs keys
2. **Environment Stages**: Staging → Production pipeline
3. **Database Migrations**: Automatizar cambios de schema
4. **Rollback Strategy**: Plan de reversión automática
5. **Monitoring**: Alertas post-deploy

### Herramientas Adicionales

- **SonarQube**: Análisis de calidad de código
- **Snyk**: Security scanning avanzado
- **Semantic Release**: Versionado automático
- **Slack/Teams**: Notificaciones de pipeline

## 🤔 Preguntas para Reflexión

1. ¿Qué pasaría si un test unitario falla en CI?
2. ¿Por qué es importante que el deploy solo ocurra en main?
3. ¿Cómo ayudan los artifacts a debugging?
4. ¿Qué otros checks de calidad podrías agregar?

---

**Nota para Estudiantes**: Este pipeline es educativo y simplificado. En producción, los pipelines suelen ser más complejos con múltiples environments, más verificaciones de seguridad, y estrategias de deploy más sofisticadas.
