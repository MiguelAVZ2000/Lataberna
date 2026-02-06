# La Taberna - Plataforma de Rol RPG

**La Taberna** es una plataforma web premium diseñada para aventureros y Directores de Juego. Es el hub definitivo para gestionar tus partidas de Dungeons & Dragons 5e.

## Caracteristicas Principales

### El Mercado (E-commerce)
Un sistema de tienda completo integrado con Supabase para equipar a tus personajes.
- **Catálogo Dinámico**: Productos obtenidos en tiempo real con filtrado por categoría y búsqueda.
- **Carrito de Compras**: Gestión de persistencia local y global con animaciones fluidas.
- **Estética D&D**: Diseño inspirado en pergaminos antiguos y tabernas medievales.

### Wiki de Aventurero
Una enciclopedia completa de conocimientos.
- **Grimorio de Hechizos**: Tabla avanzada con búsqueda, filtros por escuela/nivel y paginación optimizada.
- **Razas y Clases**: Información detallada para la creación de personajes.
- **Búsqueda Global**: Localiza cualquier término en toda la wiki de forma instantánea.

### Gestión de Personajes
- **Autenticación Segura**: Sistema de login y registro integrado con Supabase Auth.
- **Panel de Usuario**: Área personal para gestionar personajes y perfil.

## Tecnologias de Vanguardia

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router).
- **Frontend**: React 19 con TypeScript para un desarrollo robusto y tipado.
- **Backend & DB**: [Supabase](https://supabase.com/) (PostgreSQL, Auth, RLS).
- **Estilos**: Tailwind CSS con un sistema de diseño personalizado (Dorado/Oscuro).
- **Componentes**: Radix UI & Shadcn UI para accesibilidad y consistencia.
- **Iconos**: Lucide React.
- **Rendimiento**: Optimización avanzada con memoización (`useMemo`, `useCallback`) y carga de imágenes inteligente.

## Instalación y Despliegue

### Requisitos Previos
*   Node.js v18.17.0 o superior.
*   NPM v9.0.0 o superior.

### Configuración del Entorno Local

1.  **Clonar el repositorio**
    ```bash
    git clone [URL_DEL_REPOSITORIO]
    cd lataberna
    ```

2.  **Instalar dependencias**
    ```bash
    npm ci
    ```
    *Nota: Se recomienda `npm ci` sobre `npm install` para asegurar la consistencia con `package-lock.json`.*

3.  **Variables de Entorno**
    Crear un archivo `.env.local` en la raíz del proyecto con las credenciales de Supabase:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
    ```

4.  **Ejecutar servidor de desarrollo**
    ```bash
    npm run dev
    ```

## Scripts Disponibles

*   `npm run dev`: Inicia el entorno de desarrollo en `http://localhost:3000`.
*   `npm run build`: Compila la aplicación para producción.
*   `npm run start`: Inicia el servidor de producción localmente.
*   `npm run lint`: Ejecuta el análisis estático de código (ESLint).
*   `npm run test`: Ejecuta la suite de pruebas end-to-end con Playwright.

## Estándares de Calidad

*   **Tipado Estricto**: No se permite el uso de `any` explícito. Todas las interfaces de datos (Supabase) están tipadas.
*   **Componentes Puros**: Se favorece la inyección de dependencias a través de props para facilitar el testing unitario.
*   **Accesibilidad**: Todos los componentes interactivos cumplen con las pautas WAI-ARIA (gestionado a través de Radix UI).
