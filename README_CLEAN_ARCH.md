# NestJS Clean Architecture Project

Proyecto completo de NestJS implementando Clean Architecture con TypeORM, PostgreSQL, Docker y Tests.

## 📋 Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Docker](#docker)

## 🏗️ Arquitectura

Este proyecto sigue los principios de Clean Architecture, separando la lógica en capas:

### Capas

1. **Domain** (Dominio): Entidades de negocio y reglas de negocio
2. **Application** (Aplicación): Casos de uso y DTOs
3. **Adapters** (Adaptadores): Controladores y repositorios
4. **Infrastructure** (Infraestructura): Configuración y módulos

## 📁 Estructura del Proyecto

```
src/
├── domain/                    # Capa de Dominio
│   ├── entities/             # Entidades del negocio
│   │   ├── Product.ts
│   │   └── User.ts
│   ├── repositories/         # Interfaces de repositorios
│   │   ├── IProductRepository.ts
│   │   └── IUserRepository.ts
│   └── errors/               # Errores de dominio
│       └── DomainError.ts
├── application/              # Capa de Aplicación
│   ├── use-cases/           # Casos de uso
│   │   ├── CreateProduct.ts
│   │   ├── GetAllProducts.ts
│   │   ├── CreateUser.ts
│   │   └── ...
│   └── dtos/                # Data Transfer Objects
│       ├── CreateProductDTO.ts
│       └── CreateUserDTO.ts
├── adapters/                 # Capa de Adaptadores
│   ├── api/                 # Controladores REST
│   │   └── controllers/
│   │       ├── ProductController.ts
│   │       └── UserController.ts
│   └── db/                  # Adaptadores de base de datos
│       ├── entities/        # Entidades de TypeORM
│       │   ├── ProductEntity.ts
│       │   └── UserEntity.ts
│       └── repositories/    # Implementaciones de repositorios
│           ├── TypeOrmProductRepository.ts
│           └── TypeOrmUserRepository.ts
├── infrastructure/           # Capa de Infraestructura
│   └── config/              # Configuraciones
│       └── database.config.ts
└── shared/                   # Utilidades compartidas
    └── utils/
        └── IdGenerator.ts
```

## 🔧 Requisitos Previos

- Node.js >= 18
- npm >= 9
- Docker y Docker Compose
- PostgreSQL (si no usas Docker)

## 📦 Instalación

1. Clonar el repositorio
```bash
git clone <repository-url>
cd prueba-clean-architecture
```

2. Instalar dependencias
```bash
npm install
```

## ⚙️ Configuración

1. Crear archivo `.env` en la raíz del proyecto:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=cleanarch_db

# Application
PORT=3000
NODE_ENV=development
```

## 🚀 Uso

### Con Docker (Recomendado)

```bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Detener servicios
docker-compose down
```

### Sin Docker

1. Asegurarse de tener PostgreSQL corriendo

2. Ejecutar migraciones si es necesario

3. Iniciar la aplicación:
```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## 📡 API Endpoints

### Products

#### Crear producto
```http
POST /products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "High performance laptop",
  "price": 999.99,
  "stock": 50
}
```

#### Obtener todos los productos
```http
GET /products
```

#### Obtener producto por ID
```http
GET /products/:id
```

#### Actualizar producto
```http
PUT /products/:id
Content-Type: application/json

{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 899.99
}
```

#### Aumentar stock
```http
PATCH /products/:id/increase-stock
Content-Type: application/json

{
  "quantity": 10
}
```

#### Disminuir stock
```http
PATCH /products/:id/decrease-stock
Content-Type: application/json

{
  "quantity": 5
}
```

#### Eliminar producto
```http
DELETE /products/:id
```

### Users

#### Crear usuario
```http
POST /users
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com"
}
```

#### Obtener todos los usuarios
```http
GET /users
```

#### Obtener usuario por ID
```http
GET /users/:id
```

#### Actualizar usuario
```http
PUT /users/:id
Content-Type: application/json

{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

#### Activar/Desactivar usuario
```http
PATCH /users/:id/activate
PATCH /users/:id/deactivate
```

#### Eliminar usuario
```http
DELETE /users/:id
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🐳 Docker

El proyecto incluye configuración completa de Docker:

### docker-compose.yml

- **PostgreSQL**: Base de datos en el puerto 5432
- **App**: Aplicación NestJS en el puerto 3000

### Comandos útiles

```bash
# Build
docker-compose build

# Logs
docker-compose logs -f

# Ejecutar comandos en el contenedor
docker-compose exec app npm run test

# Limpiar volúmenes
docker-compose down -v
```

## 📚 Principios Aplicados

### Clean Architecture

- **Independencia de frameworks**: El dominio no depende de NestJS
- **Testeable**: La lógica de negocio es fácil de testear
- **Independiente de la UI**: Puede cambiar sin afectar el dominio
- **Independiente de la BD**: Puedes cambiar PostgreSQL por otra BD
- **Independiente de servicios externos**: El dominio no sabe de APIs externas

### SOLID

- **Single Responsibility**: Cada clase tiene una única responsabilidad
- **Open/Closed**: Abierto para extensión, cerrado para modificación
- **Liskov Substitution**: Las implementaciones pueden sustituirse
- **Interface Segregation**: Interfaces específicas y pequeñas
- **Dependency Inversion**: Dependemos de abstracciones, no de concreciones

## 🛠️ Tecnologías

- **NestJS**: Framework de Node.js
- **TypeORM**: ORM para TypeScript
- **PostgreSQL**: Base de datos relacional
- **Docker**: Containerización
- **Class Validator**: Validación de DTOs
- **UUID**: Generación de IDs únicos
- **Jest**: Framework de testing

## 📝 Notas de Desarrollo

### Agregar una nueva entidad

1. Crear entidad de dominio en `src/domain/entities/`
2. Crear interfaz de repositorio en `src/domain/repositories/`
3. Crear DTOs en `src/application/dtos/`
4. Crear casos de uso en `src/application/use-cases/`
5. Crear entidad de TypeORM en `src/adapters/db/entities/`
6. Implementar repositorio en `src/adapters/db/repositories/`
7. Crear controlador en `src/adapters/api/controllers/`
8. Registrar en el módulo correspondiente

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

