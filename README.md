# 🛒 Products - Aplicación de Carrito de Compras

Aplicación web moderna de gestión de productos bancarios con carrito de compras, construida con React, TypeScript, Tailwind CSS y Ant Design.

## ✨ Características

- 📦 **Catálogo de Productos**: Visualización de productos bancarios (cuentas, créditos, tarjetas)
- 🛍️ **Carrito de Compras**: Sistema completo de carrito con persistencia en localStorage
- ➕➖ **Gestión de Cantidades**: Aumentar/disminuir cantidades de productos en el carrito
- 💰 **Cálculo de Totales**: Total de items y precio total en tiempo real
- 🎨 **UI Moderna**: Interfaz responsive con Tailwind CSS y componentes de Ant Design
- 💾 **Persistencia de Datos**: Estado del carrito persistido con Zustand
- 🧪 **Tests Unitarios**: Suite completa de tests con React Testing Library y Vitest
- ⚡ **Carga Asíncrona**: Simulación de carga de datos con estados de loading

## 🛠️ Tecnologías

### Core

- **React 19.2** - Biblioteca de UI
- **TypeScript 5.9** - Tipado estático
- **Vite 7.3** - Build tool y dev server

### UI/Estilos

- **Tailwind CSS 4.2** - Framework de CSS utility-first
- **Ant Design 6.3** - Biblioteca de componentes UI
- **@ant-design/icons** - Iconos

### Estado y Validación

- **Zustand 5.0** - Gestión de estado global con persistencia
- **React Hook Form 7.71** - Manejo de formularios

### Testing

- **Vitest 3.2** - Framework de testing
- **React Testing Library 16.3** - Testing de componentes React
- **@testing-library/jest-dom** - Matchers personalizados
- **@testing-library/user-event** - Simulación de eventos de usuario
- **jsdom** - Entorno DOM para tests

### Desarrollo

- **ESLint 9.39** - Linter
- **PostCSS 8.5** - Procesador de CSS
- **Autoprefixer** - Prefijos CSS automáticos

## 📁 Estructura del Proyecto

```
products/
├── public/                    # Archivos estáticos
├── src/
│   ├── components/           # Componentes React
│   │   ├── Cart.tsx         # Componente del carrito
│   │   ├── Cart.test.tsx    # Tests del carrito
│   │   ├── Product.tsx      # Tarjeta de producto
│   │   ├── Product.test.tsx # Tests del producto
│   │   ├── Products.tsx     # Lista de productos
│   │   ├── Products.test.tsx # Tests de productos
│   │   └── Form/            # Componentes de formularios
│   ├── hooks/               # Custom hooks
│   │   └── useProducts.ts   # Hook para manejo de productos
│   ├── mock/                # Datos de prueba
│   │   └── products.ts      # Productos mock
│   ├── store/               # Gestión de estado
│   │   └── products.ts      # Store de Zustand para carrito
│   ├── test/                # Configuración de tests
│   │   └── setup.ts         # Setup de testing library
│   ├── types/               # Tipos TypeScript
│   │   └── products.ts      # Interfaces de productos
│   ├── App.tsx              # Componente principal
│   ├── App.test.tsx         # Tests de App
│   ├── main.tsx             # Punto de entrada
│   └── index.css            # Estilos globales
├── eslint.config.js         # Configuración de ESLint
├── postcss.config.js        # Configuración de PostCSS
├── tailwind.config.js       # Configuración de Tailwind
├── tsconfig.json            # Configuración de TypeScript
├── vite.config.ts           # Configuración de Vite
├── vitest.config.ts         # Configuración de Vitest
└── package.json             # Dependencias y scripts
```

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd products
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Iniciar servidor de desarrollo**

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📜 Scripts Disponibles

### Desarrollo

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Previsualiza el build de producción
npm run lint         # Ejecuta el linter
```

### Testing

```bash
npm run test              # Ejecuta tests en modo watch
npm run test:ui           # Abre la interfaz visual de Vitest
npm run test:coverage     # Genera reporte de cobertura de tests
```

## 🧪 Testing

El proyecto incluye una suite completa de tests unitarios:

- **24 tests** distribuidos en 4 archivos
- Cobertura de componentes principales
- Mocks configurados para Zustand y Ant Design
- Tests de interacción de usuario

Ejecutar tests:

```bash
npm test
```

Ver interfaz de tests:

```bash
npm run test:ui
```

## 🎯 Funcionalidades Implementadas

### Carrito de Compras

- ✅ Agregar productos al carrito
- ✅ Incrementar cantidad de productos
- ✅ Decrementar cantidad de productos
- ✅ Eliminar productos cuando la cantidad llega a 0
- ✅ Persistencia en localStorage
- ✅ Badge con cantidad total de items
- ✅ Cálculo de precio total

### UI/UX

- ✅ Grid responsive (1-5 columnas según viewport)
- ✅ Estados de carga (skeletons)
- ✅ Drawer lateral para el carrito
- ✅ FloatButton para acceso rápido al carrito
- ✅ Mensajes cuando el carrito está vacío

### Estado

- ✅ Gestión global con Zustand
- ✅ Persistencia automática con middleware
- ✅ Custom hooks para lógica reutilizable

## 🎨 Diseño Responsive

La aplicación se adapta a diferentes tamaños de pantalla:

- **Mobile** (< 640px): 1 columna
- **Tablet** (≥ 640px): 2 columnas
- **Desktop** (≥ 768px): 3 columnas
- **Large** (≥ 1024px): 4 columnas
- **XL** (≥ 1280px): 5 columnas

## 🔧 Configuración

### Tailwind CSS v4

El proyecto usa Tailwind CSS v4 con el nuevo plugin de PostCSS:

```js
// postcss.config.js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {}
  }
};
```

### Zustand Store

Estado del carrito con persistencia:

```typescript
interface ProductsState {
  cartProducts: { product: IProduct; count: number }[];
  addProduct: (product: IProduct) => void;
  removeProduct: (id: number) => void;
  deleteProduct: (id: number) => void;
}
```

## 📝 Tipos de Datos

```typescript
interface IProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
}
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es privado y está en desarrollo.

## 👨‍💻 Autor

Abel Heredia

---

Desarrollado con React + TypeScript + Vite
