# Componentes de Botones

Este módulo incluye tres componentes para botones reutilizables:

- `CustomButton`: botón flexible basado en MUI con soporte para `colorHex` e iconos.
- `ActionIconButton`: botón de icono compacto para acciones en tablas/listados con tooltip.
- `getButtonPreset()`: función para aplicar estilos estándar a botones comunes.

## `CustomButton`

Botón reutilizable con soporte total de MUI + customización de color.

Props principales:

- `label` (required): `ReactNode` - texto o contenido del botón.
- `variant`: `'contained'` (default) | `'outlined'` | `'text'` - estilo del botón.
- `size`: `'small'` | `'medium'` (default) | `'large'` - tamaño.
- `startIcon`: `ReactNode` - icono al inicio del botón (display flex).
- `icon`: `ReactNode` - alternativo a `startIcon`; se usa si no hay `startIcon`.
- `loading`: `boolean` (default `false`) - muestra spinner de carga.
- `loadingIndicator`: `ReactNode` - personaliza el spinner de carga (default: `CircularProgress`).
- `colorHex`: `string` - color hexadecimal personalizado (ej: `'#1E88E5'`).
- `disabled`: `boolean` - desactiva el botón.
- Props de MUI `ButtonProps`: hereda todas las props estándar de Button (ej: `onClick`, `type`, `form`, etc).

Internamente es un `forwardRef`, así que puedes pasar `ref` si necesitas acceder al elemento DOM.

Ejemplo basico:

```tsx
<CustomButton
  label="Nueva persona"
  onClick={handleOpenCreate}
/>
```

Ejemplo con icono y color:

```tsx
<CustomButton
  label="Guardar Cambios"
  variant="contained"
  colorHex="#0063B1"
  startIcon={<SaveIcon />}
  type="submit"
/>
```

Ejemplo con loading:

```tsx
<CustomButton
  label="Cargando..."
  loading
  colorHex="#1E88E5"
  disabled
/>
```

Ejemplo outlined:

```tsx
<CustomButton
  label="Eliminar"
  variant="outlined"
  colorHex="#D32F2F"
  startIcon={<DeleteIcon />}
  onClick={() => onDelete(id)}
/>
```

## `ActionIconButton`

Botón de icono para acciones rápidas en tablas, listados o controles compactos.

Renderiza un `IconButton` de MUI dentro de un `Tooltip` (si está habilitado).

Props principales:

- `label` (required): `string` - texto del tooltip y atributo `aria-label`.
- `icon` (required): `ReactNode` - icono a mostrar.
- `colorHex` (default `'#546E7A'`): `string` - color hexadecimal del icono.
- `showTooltip` (default `true`): `boolean` - muestra/oculta el tooltip.
- `size` (default `'small'`): `'small'` | `'medium'` | `'large'` - tamaño del botón.
- `sx`: `SxProps<Theme>` - estilos personalizados.
- Props de MUI `IconButtonProps`: hereda todas las props de IconButton (ej: `onClick`, `disabled`, etc).

Internamente también es un `forwardRef`.

Comportamiento:
- Color de hover: transparencia del color principal (8% de opacidad).
- Si `showTooltip` es `false`, no renderiza el wrapper `Tooltip`.

Ejemplo con vista:

```tsx
<ActionIconButton
  label="Ver detalle"
  icon={<ViewIcon fontSize="small" />}
  onClick={() => onView(id)}
/>
```

Ejemplo con delete (rojo):

```tsx
<ActionIconButton
  label="Eliminar"
  icon={<DeleteIcon fontSize="small" />}
  colorHex="#D32F2F"
  onClick={() => onDelete(id)}
/>
```

Ejemplo sin tooltip:

```tsx
<ActionIconButton
  label="Copiar"
  icon={<FileCopyIcon fontSize="small" />}
  showTooltip={false}
  onClick={() => handleCopy()}
/>
```

## Presets de Botones

`getButtonPreset()` devuelve configuración estándar para acciones comunes.

Presets disponibles:

### `primary`
- **Uso**: acciones principales, llamadas a la acción (CTAs).
- **Estilo**: azul contenido, tamaño large, sombra prominente.
- **Color**: `#1E88E5` azul.
- **Variante**: `contained`.

```tsx
<CustomButton
  label="Crear nueva persona"
  onClick={handleCreate}
  {...getButtonPreset('primary')}
/>
```

### `save`
- **Uso**: guardar cambios en formularios/modales.
- **Estilo**: azul contenido, borderRadius redondeado (24px), sin sombra por defecto.
- **Color**: `#1E88E5` azul.
- **Variante**: `contained`.

```tsx
<CustomButton
  label="Guardar"
  type="submit"
  {...getButtonPreset('save')}
/>
```

### `cancel`
- **Uso**: cancelar, volver atrás, cerrar diálogos.
- **Estilo**: outlined gris claro, blanco fondo, borde suave.
- **Variante**: `outlined`.

```tsx
<CustomButton
  label="Cancelar"
  onClick={handleCancel}
  {...getButtonPreset('cancel')}
/>
```

### `delete`
- **Uso**: acciones destructivas.
- **Estilo**: outlined rojo.
- **Color**: `#D32F2F` rojo.
- **Variante**: `outlined`.

```tsx
<CustomButton
  label="Eliminar"
  onClick={handleDelete}
  {...getButtonPreset('delete')}
/>
```

### `secondary`
- **Uso**: acciones secundarias, menos prominentes.
- **Estilo**: text gris oscuro.
- **Color**: `#546E7A` gris.
- **Variante**: `text`.

```tsx
<CustomButton
  label="Más opciones"
  {...getButtonPreset('secondary')}
/>
```

## Exportaciones

Se exportan desde `src/modules/general/index.ts`:

- `CustomButton`
- `ActionIconButton`
- `BUTTON_PRESETS`
- `getButtonPreset`
- `ButtonPresetKey`
- `ButtonPreset`

## Importar

```tsx
import { CustomButton, ActionIconButton, getButtonPreset } from '../../general';
```

## Buenas prácticas

- Usa presets para mantener consistencia visual.
- Prefiere `getButtonPreset()` sobre estilos inline para acciones comunes.
- Para `ActionIconButton` en tablas, siempre proporciona un `label` accesible.
- Si la aplicación necesita un botón con comportamiento/estilo muy específico, considera si es mejor crear un preset nuevo en lugar de sobreestilizar con `sx`.
