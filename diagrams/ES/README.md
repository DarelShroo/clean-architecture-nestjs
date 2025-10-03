# 📊 Diagramas de Arquitectura en Español

Este directorio contiene la versión completa en español de todos los diagramas profesionales de Graphviz (.dot) que ilustran los diferentes aspectos de la Clean Architecture implementada en el proyecto NestJS.

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

## 📋 Diagramas Disponibles en Español

### 1. 🏛️ Arquitectura Limpia - Capas (`arquitectura-limpia-capas.dot`)

**Descripción**: Diagrama principal que muestra las 5 capas de Clean Architecture y sus dependencias.

**Características en Español**:
- ✅ **Capa de Presentación**: Controladores y endpoints de API
- ✅ **Capa de Aplicación**: Casos de Uso y DTOs
- ✅ **Capa de Dominio**: Entidades, Objetos de Valor, Interfaces de Repositorio, Eventos
- ✅ **Capa de Infraestructura**: Adaptadores de base de datos, Mapeadores, Entidades TypeORM
- ✅ **Capa Externa**: PostgreSQL y servicios externos

**Elementos traducidos**:
- Nombres de clases y métodos en español
- Etiquetas y descripciones localizadas
- Comentarios y documentación en español

**Generar**:
```bash
dot -Tpng arquitectura-limpia-capas.dot -o arquitectura-limpia-capas.png
dot -Tsvg arquitectura-limpia-capas.dot -o arquitectura-limpia-capas.svg
```

---

### 2. 🔄 Flujo de Petición (`flujo-peticion.dot`)

**Descripción**: Flujo completo de una petición HTTP desde el cliente hasta la persistencia en base de datos.

**Ejemplo**: Crear un producto (POST /productos)

**Fases del flujo en español**:
1. 🌐 **Petición HTTP**: Cliente envía datos
2. 🎯 **Controlador**: Recibe y valida petición  
3. ✅ **Validación DTO**: Valida datos de entrada
4. ⚙️ **Caso de Uso**: Lógica de aplicación
5. 🆔 **Generación de ID**: Genera UUID único
6. 📦 **Creación de Dominio**: Crea entidad de dominio
7. 📡 **Eventos de Dominio**: Publica eventos
8. 🗃️ **Repositorio**: Persiste datos
9. 🔄 **Mapeador**: Convierte entidades
10. 📤 **Respuesta**: Retorna resultado

**Generar**:
```bash
dot -Tpng flujo-peticion.dot -o flujo-peticion.png
dot -Tsvg flujo-peticion.dot -o flujo-peticion.svg
```

---

### 3. 📁 Estructura de Archivos (`estructura-archivos.dot`)

**Descripción**: Estructura completa de archivos del proyecto organizada por capas arquitectónicas.

**Incluye en español**:
- 📂 Jerarquía de directorios con nombres descriptivos
- 📄 Archivos principales con sus responsabilidades traducidas
- 🧪 Estructura de pruebas explicada
- ⚙️ Archivos de configuración documentados
- 📚 Documentación localizada

**Generar**:
```bash
dot -Tpng estructura-archivos.dot -o estructura-archivos.png
dot -Tsvg estructura-archivos.dot -o estructura-archivos.svg
```

---

### 4. 📡 Flujo de Eventos (`flujo-eventos.dot`)

**Descripción**: Sistema de eventos de dominio y comunicación asíncrona.

**Componentes en español**:
- 🎉 **Eventos de Dominio**: ProductoCreado, StockCambiado, UsuarioCreado, etc.
- 🚌 **BusEventos**: Sistema de publicación/suscripción
- 📬 **Manejadores de Eventos**: Procesamiento asíncrono
- 🌐 **Sistemas Externos**: Email, Analíticas, Cache, ERP

**Patrones mostrados**:
- ✅ Patrón Publicar-Suscribir
- ✅ Arquitectura Dirigida por Eventos
- ✅ Procesamiento Asíncrono
- ✅ Integración de Sistemas

**Generar**:
```bash
dot -Tpng flujo-eventos.dot -o flujo-eventos.png
dot -Tsvg flujo-eventos.dot -o flujo-eventos.svg
```

## 🚀 Generar Todos los Diagramas en Español

### Script Bash (Linux/macOS)
```bash
#!/bin/bash
cd ES

# Ejecutar script de generación
chmod +x generar-todos.sh
./generar-todos.sh
```

### Manual (todos los formatos)
```bash
cd ES

# PNG format (para presentaciones, docs)
dot -Tpng arquitectura-limpia-capas.dot -o arquitectura-limpia-capas.png
dot -Tpng flujo-peticion.dot -o flujo-peticion.png  
dot -Tpng estructura-archivos.dot -o estructura-archivos.png
dot -Tpng flujo-eventos.dot -o flujo-eventos.png

# SVG format (para web, escalable)
dot -Tsvg arquitectura-limpia-capas.dot -o arquitectura-limpia-capas.svg
dot -Tsvg flujo-peticion.dot -o flujo-peticion.svg
dot -Tsvg estructura-archivos.dot -o estructura-archivos.svg
dot -Tsvg flujo-eventos.dot -o flujo-eventos.svg

# PDF format (para documentación)
dot -Tpdf arquitectura-limpia-capas.dot -o arquitectura-limpia-capas.pdf
dot -Tpdf flujo-peticion.dot -o flujo-peticion.pdf
dot -Tpdf estructura-archivos.dot -o estructura-archivos.pdf
dot -Tpdf flujo-eventos.dot -o flujo-eventos.pdf
```

## 🎯 Casos de Uso Específicos en Español

### 👨‍💼 Para Equipos de Desarrollo Hispanohablantes
- **Onboarding**: Explicar arquitectura en idioma nativo
- **Formación**: Capacitar nuevos desarrolladores en español
- **Code Review**: Validar principios con terminología familiar

### 👨‍💻 Para Arquitectos de Sistemas
- **Presentaciones**: Comunicar decisiones técnicas en español
- **Documentación**: Documentar patrones para equipos locales
- **Consultoría**: Explicar arquitectura a clientes hispanohablantes

### 👨‍🏫 Para Formación y Educación
- **Cursos**: Material educativo en español
- **Tutoriales**: Guías de Clean Architecture localizadas
- **Workshops**: Talleres de arquitectura en idioma nativo

## 🌍 Terminología Técnica Utilizada

### Inglés → Español
- **Clean Architecture** → **Arquitectura Limpia**
- **Use Cases** → **Casos de Uso**
- **Value Objects** → **Objetos de Valor**
- **Repository** → **Repositorio**
- **Domain Events** → **Eventos de Dominio**
- **Event Bus** → **Bus de Eventos**
- **Mappers** → **Mapeadores**
- **Request Flow** → **Flujo de Petición**
- **File Structure** → **Estructura de Archivos**

### Consistencia Terminológica
- Se mantiene consistencia en la traducción técnica
- Los nombres de archivos de código permanecen en inglés (convención)
- La documentación y diagramas están completamente en español
- Los conceptos técnicos siguen estándares de traducción de software

## 📚 Documentación Relacionada

- [README principal (inglés)](../README.md) - Versión completa en inglés
- [Mejoras de Clean Architecture](../../CLEAN_ARCHITECTURE_IMPROVEMENTS.md) - Documentación detallada
- [README Clean Architecture](../../README_CLEAN_ARCH.md) - Documentación del proyecto

## 🤝 Contribución

Para contribuir con mejoras a los diagramas en español:

1. Modifica el archivo `.dot` correspondiente en esta carpeta
2. Mantén la consistencia terminológica establecida
3. Genera la imagen para verificar el resultado
4. Actualiza esta documentación si es necesario
5. Haz commit de los cambios con mensaje en español

### Estándares de Traducción
- Usar terminología técnica establecida en español
- Mantener nombres de métodos y clases en inglés (convención de código)
- Traducir descripciones, comentarios y documentación
- Preservar la estructura visual y colores del diagrama original

## 🔄 Sincronización con Versión en Inglés

Esta carpeta ES se mantiene sincronizada con los diagramas en inglés:
- Misma estructura visual y layout
- Mismo nivel de detalle técnico
- Actualizaciones paralelas cuando se modifique la versión en inglés
- Consistencia en colores y estilos visuales

---

**⚡ Los diagramas en español facilitan la comprensión y adopción de Clean Architecture en equipos hispanohablantes!**
