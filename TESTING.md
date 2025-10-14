# Allure Report Configuration

## Configuración de Allure para Jest y Playwright

Este proyecto está configurado para generar reportes visuales usando Allure Report que incluyen:

### Features incluidas:

- **Coverage reports**: Cobertura de código con Jest
- **Test results**: Resultados detallados de unit tests e integration tests
- **Screenshots**: Capturas automáticas en fallos (Playwright)
- **Test history**: Historial de ejecuciones
- **Attachments**: Logs y archivos adjuntos

### Comandos disponibles:

```bash
# Ejecutar todos los tests y generar reporte
npm run test
npm run report

# Solo unit tests con coverage
npm run test:unit
npm run coverage

# Solo integration tests
npm run test:integration

# Ver reporte en tiempo real
npm run test:watch
```

### Instalación de Allure CLI (requerido):

```bash
# macOS
brew install allure

# npm global
npm install -g allure-commandline
```

### Estructura de reportes:

- `allure-results/`: Datos raw de las ejecuciones
- `allure-report/`: Reporte HTML generado
- `coverage/`: Reportes de cobertura de Jest
