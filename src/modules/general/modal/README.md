# Modales reutilizables

Este modulo incluye dos componentes listos para usar:

- `CustomModal`: modal base flexible para contenido libre y acciones personalizadas.
- `ConfirmModal`: modal de confirmacion estandar (normal o peligro).

## Componentes

### `CustomModal`

Wrapper de `Dialog` de MUI con estructura consistente:

- Header opcional: `title`, `subtitle`, `headerIcon`, boton cerrar.
- Body con scroll interno.
- Footer opcional via `actions`.
- Borde inferior visible por defecto y configurable por color.

Props principales:

- `open`: controla apertura/cierre.
- `onClose`: callback de cierre.
- `children`: contenido del body.
- `title`: `ReactNode` (string o nodo custom).
- `subtitle`: `ReactNode` (string o nodo custom).
- `headerIcon`: icono en el header.
- `actions`: acciones del footer.
- `showCloseButton` (default `true`).
- `disableBackdropClose` (default `false`).
- `maxWidth` (default `md`).
- `fullWidth` (default `true`).
- `contentSx`: estilos del body.
- `actionsSx`: estilos del footer.
- `bottomBorderColor` (default `#1E88E5`).

Props heredadas de MUI:

El componente extiende `DialogProps` (excepto `children`, `onClose`, `open`, `title`) y usa API actual de MUI (`slotProps.paper`) para personalizar `Paper`.

Ejemplo basico:

```tsx
<CustomModal
  open={open}
  onClose={handleClose}
  title="Nueva persona"
  subtitle="Completa la informacion"
  actions={<Button>Guardar</Button>}
>
  <Box>Contenido</Box>
</CustomModal>
```

Ejemplo con titulo custom:

```tsx
<CustomModal
  open={open}
  onClose={handleClose}
  title={<Typography sx={{ fontSize: '1rem', fontWeight: 600 }}>Titulo compacto</Typography>}
>
  <Box>Contenido</Box>
</CustomModal>
```

### `ConfirmModal`

Componente opinionado para confirmar acciones.

Props principales:

- `open`
- `onClose`
- `onConfirm`
- `title`
- `description`
- `confirmText` (default `Confirmar`)
- `cancelText` (default `Cancelar`)
- `loading` (default `false`)
- `variant` (default `default`)
- `disableBackdropClose` (default `true`)

Variantes:

- `default`: estilo informativo azul.
- `danger`: estilo destructivo rojo (boton principal, icono y borde inferior).

Ejemplo `default`:

```tsx
<ConfirmModal
  open={open}
  onClose={handleClose}
  onConfirm={handleConfirm}
  title="Confirmar accion"
  description="Se aplicaran cambios en el registro"
/>
```

Ejemplo `danger`:

```tsx
<ConfirmModal
  open={open}
  onClose={handleClose}
  onConfirm={handleDelete}
  title="Eliminar persona"
  description="Esta accion no se puede deshacer"
  confirmText="Eliminar"
  variant="danger"
  loading={isDeleting}
/>
```

## Exportaciones

Se exportan desde:

- `src/modules/general/index.ts`

Disponibles:

- `CustomModal`
- `ConfirmModal`
- `ConfirmModalProps`

## Buenas practicas

- Mantener `CustomModal` presentacional.
- Colocar logica de negocio fuera del modal.
- Usar `ConfirmModal` para confirmaciones estandar (en especial acciones destructivas).
- Si necesitas layouts muy especificos, crear un modal dedicado reutilizando `CustomModal`.
