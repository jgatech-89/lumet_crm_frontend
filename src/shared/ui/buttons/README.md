# Componentes Generales

Esta carpeta contiene componentes reutilizables para toda la aplicación.

## Exportaciones

- `CustomButton`: botón reusable basado en MUI.
- `ActionIconButton`: botón de icono para acciones compactas (tabla/listado).
- `BUTTON_PRESETS` / `getButtonPreset`: presets básicos para acciones comunes.

## Uso recomendado

Importa los componentes desde este punto de entrada cuando quieras mantener el código ordenado:

```tsx
import { CustomButton } from '../../components';
```

Para acciones de tabla:

```tsx
import { ActionIconButton } from '../../components';
```

Para presets:

```tsx
import { getButtonPreset } from '../../components';
```

## `CustomButton`

Botón reutilizable con soporte para:

- `label`: texto principal del botón.
- `variant`: `contained`, `outlined` o `text`.
- `size`: `small`, `medium` o `large`.
- `startIcon` o `icon`: icono al inicio.
- `loading`: estado de carga con spinner.
- `colorHex`: color personalizado para casos de marca o botones especiales.

## `ActionIconButton`

Botón reutilizable para acciones con icono y tooltip:

- `label`: texto accesible y tooltip.
- `icon`: icono visual.
- `colorHex`: color personalizado del icono.
- `showTooltip`: permite ocultar el tooltip si no se necesita.

### Ejemplos

```tsx
<ActionIconButton
  label="Ver detalle"
  icon={<ViewIcon fontSize="small" />}
  onClick={() => onView(id)}
/>

<ActionIconButton
  label="Eliminar"
  icon={<DeleteIcon fontSize="small" />}
  colorHex="#D32F2F"
  onClick={() => onDelete(id)}
/>
```

### Ejemplos

```tsx
<CustomButton label="Nueva persona" onClick={handleOpenCreate} />

<CustomButton
  label="Guardar Cambios"
  variant="contained"
  colorHex="#0063B1"
  startIcon={<SaveIcon />}
  type="submit"
/>

<CustomButton
  label="Eliminar"
  variant="outlined"
  color="error"
  startIcon={<DeleteIcon />}
/>

<CustomButton
  label="Cargando..."
  loading
  colorHex="#1E88E5"
/>

<CustomButton
  label="Guardar"
  type="submit"
  {...getButtonPreset('save')}
/>
```

## Buenas prácticas

- Usa este componente para mantener consistencia visual.
- Evita duplicar estilos de botón en páginas o modales.
- Si un botón necesita comportamiento muy específico, crea una variante nueva antes de improvisar en la vista.
