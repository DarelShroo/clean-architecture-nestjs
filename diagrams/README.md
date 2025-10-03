# 📊 Architecture Diagrams

Este directorio contiene diagramas profesionales de Graphviz (.dot) que ilustran diferentes aspectos de la Clean Architecture implementada en el proyecto NestJS.

## 🔧 Prerequisitos

Para generar las imágenes, necesitas tener instalado **Graphviz**:

```bash
# Ubuntu/Debian
sudo apt-get install graphviz

# macOS
brew install graphviz

# Windows (Chocolatey)
choco install graphviz

# Windows (Scoop)
scoop install graphviz
```

## 📋 Diagramas Disponibles

### 1. 🏛️ Clean Architecture Layers (`clean-architecture-layers.dot`)

**Descripción**: Diagrama principal que muestra las 5 capas de Clean Architecture y sus dependencias.

**Características**:
- ✅ **Presentation Layer**: Controllers y API endpoints
- ✅ **Application Layer**: Use Cases y DTOs
- ✅ **Domain Layer**: Entities, Value Objects, Repositories interfaces, Events
- ✅ **Infrastructure Layer**: Database adapters, Mappers, TypeORM entities
- ✅ **External Layer**: PostgreSQL y servicios externos

**Generar**:
```bash
dot -Tpng diagrams/clean-architecture-layers.dot -o diagrams/clean-architecture-layers.png
dot -Tsvg diagrams/clean-architecture-layers.dot -o diagrams/clean-architecture-layers.svg
```

---

### 2. 🔄 Request Flow (`request-flow.dot`)

**Descripción**: Flujo completo de una request HTTP desde el cliente hasta la persistencia en base de datos.

**Ejemplo**: Crear un producto (POST /products)

**Fases del flujo**:
1. 🌐 **HTTP Request**: Cliente envía datos
2. 🎯 **Controller**: Recibe y valida request  
3. ✅ **DTO Validation**: Valida datos de entrada
4. ⚙️ **Use Case**: Lógica de aplicación
5. 🆔 **ID Generation**: Genera UUID único
6. 📦 **Domain Creation**: Crea entidad de dominio
7. 📡 **Domain Events**: Publica eventos
8. 🗃️ **Repository**: Persiste datos
9. 🔄 **Mapper**: Convierte entidades
10. 📤 **Response**: Retorna resultado

**Generar**:
```bash
dot -Tpng diagrams/request-flow.dot -o diagrams/request-flow.png
dot -Tsvg diagrams/request-flow.dot -o diagrams/request-flow.svg
```

---

### 3. 📁 File Structure (`file-structure.dot`)

**Descripción**: Estructura completa de archivos del proyecto organizada por capas arquitectónicas.

**Incluye**:
- 📂 Jerarquía de directorios
- 📄 Archivos principales con sus responsabilidades
- 🧪 Estructura de tests
- ⚙️ Archivos de configuración
- 📚 Documentación

**Generar**:
```bash
dot -Tpng diagrams/file-structure.dot -o diagrams/file-structure.png
dot -Tsvg diagrams/file-structure.dot -o diagrams/file-structure.svg
```

---

### 4. 📡 Events Flow (`events-flow.dot`)

**Descripción**: Sistema de eventos de dominio y comunicación asíncrona.

**Componentes**:
- 🎉 **Domain Events**: ProductCreated, StockChanged, UserCreated, etc.
- 🚌 **EventBus**: Sistema de publicación/suscripción
- 📬 **Event Handlers**: Procesamiento asíncrono
- 🌐 **External Systems**: Email, Analytics, Cache, ERP

**Patrones mostrados**:
- ✅ Publish-Subscribe Pattern
- ✅ Event-Driven Architecture
- ✅ Asynchronous Processing
- ✅ System Integration

**Generar**:
```bash
dot -Tpng diagrams/events-flow.dot -o diagrams/events-flow.png
dot -Tsvg diagrams/events-flow.dot -o diagrams/events-flow.svg
```

## 🚀 Generar Todos los Diagramas

### Script Bash (Linux/macOS)
```bash
#!/bin/bash
cd diagrams

# PNG format (for presentations, docs)
dot -Tpng clean-architecture-layers.dot -o clean-architecture-layers.png
dot -Tpng request-flow.dot -o request-flow.png  
dot -Tpng file-structure.dot -o file-structure.png
dot -Tpng events-flow.dot -o events-flow.png

# SVG format (for web, scalable)
dot -Tsvg clean-architecture-layers.dot -o clean-architecture-layers.svg
dot -Tsvg request-flow.dot -o request-flow.svg
dot -Tsvg file-structure.dot -o file-structure.svg
dot -Tsvg events-flow.dot -o events-flow.svg

# PDF format (for documentation)
dot -Tpdf clean-architecture-layers.dot -o clean-architecture-layers.pdf
dot -Tpdf request-flow.dot -o request-flow.pdf
dot -Tpdf file-structure.dot -o file-structure.pdf
dot -Tpdf events-flow.dot -o events-flow.pdf

echo "✅ All diagrams generated successfully!"
```

### Script PowerShell (Windows)
```powershell
# Cambiar al directorio de diagramas
cd diagrams

# PNG format
dot -Tpng clean-architecture-layers.dot -o clean-architecture-layers.png
dot -Tpng request-flow.dot -o request-flow.png
dot -Tpng file-structure.dot -o file-structure.png  
dot -Tpng events-flow.dot -o events-flow.png

# SVG format
dot -Tsvg clean-architecture-layers.dot -o clean-architecture-layers.svg
dot -Tsvg request-flow.dot -o request-flow.svg
dot -Tsvg file-structure.dot -o file-structure.svg
dot -Tsvg events-flow.dot -o events-flow.svg

Write-Host "✅ All diagrams generated successfully!" -ForegroundColor Green
```

## 🎨 Formatos de Salida Disponibles

Graphviz soporta múltiples formatos de salida:

| Formato | Extensión | Uso recomendado |
|---------|-----------|-----------------|
| **PNG** | `.png` | Documentación, presentaciones |
| **SVG** | `.svg` | Web, escalable, interactivo |
| **PDF** | `.pdf` | Documentos profesionales |
| **JPG** | `.jpg` | Redes sociales, compresión |
| **GIF** | `.gif` | Animaciones (con herramientas adicionales) |

## 🎯 Casos de Uso

### 👨‍💼 Para Desarrolladores
- **Onboarding**: Entender la arquitectura rápidamente
- **Desarrollo**: Saber dónde ubicar nuevas funcionalidades  
- **Code Review**: Validar que se siguen los principios arquitectónicos

### 👨‍💻 Para Arquitectos
- **Documentación**: Comunicar decisiones arquitectónicas
- **Presentations**: Mostrar la estructura del sistema
- **Análisis**: Identificar dependencias y posibles mejoras

### 👨‍🏫 Para Stakeholders
- **Overview**: Entender la estructura general del sistema
- **Planning**: Estimar impacto de nuevos requerimientos
- **Quality**: Ver la calidad arquitectónica del proyecto

## 🔄 Mantenimiento

Los diagramas deben actualizarse cuando:

- ✅ Se agreguen nuevas capas o componentes
- ✅ Se modifique la estructura de directorios
- ✅ Se implementen nuevos patrones arquitectónicos  
- ✅ Se agreguen nuevos tipos de eventos de dominio
- ✅ Cambios significativos en el flujo de requests

## 📚 Recursos Adicionales

- [Graphviz Documentation](https://graphviz.org/documentation/)
- [DOT Language Guide](https://graphviz.org/doc/info/lang.html)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [NestJS Documentation](https://docs.nestjs.com/)

## 🤝 Contribución

Para contribuir con mejoras a los diagramas:

1. Modifica el archivo `.dot` correspondiente
2. Genera la imagen para verificar el resultado
3. Actualiza esta documentación si es necesario
4. Haz commit de los cambios con un mensaje descriptivo

---

**⚡ Los diagramas son código también - manténlos actualizados y versionados!**
