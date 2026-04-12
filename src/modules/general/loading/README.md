# Loading

Este modulo centraliza los componentes generales de carga de la aplicacion y sigue la misma estructura que usas en `modal` y `buttons`.

## Estructura

- `components/`: implementacion visual.
- `types/`: tipados publicos reutilizables.
- `styles/`: estilos compartidos o constantes de UI.
- `index.ts`: exportaciones del modulo.

## Componentes

- `LinearLoader`: barra lineal para cargas de seccion o pantalla completa.
- `AppSkeleton`: placeholder tipo esqueleto para estructura de vistas.
- `LoadingButton`: boton con estado de carga.
- `FullPageSpinner`: wrapper de pantalla completa basado en `LinearLoader`.

## Cuándo usar cada uno

- `LinearLoader`: acciones en progreso, estados de submit, bloqueos breves.
- `AppSkeleton`: cuando la vista tarda en recibir datos pero quieres mantener la estructura.
- `LoadingButton`: submits y acciones puntuales dentro de formularios o modales.
- `FullPageSpinner`: arranque global, rutas protegidas y bootstrap de auth.

## Import recomendado

```tsx
import { LinearLoader, AppSkeleton, LoadingButton, FullPageSpinner } from '@/modules/general';
```

## Ejemplos

```tsx
<LinearLoader label="Cargando personas..." />
```

```tsx
<AppSkeleton rows={6} showHeader />
```

```tsx
<LoadingButton loading loadingLabel="Guardando...">Guardar</LoadingButton>
```

```tsx
<FullPageSpinner />
```
