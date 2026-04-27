import { DeleteOutline, Edit, Save } from '@mui/icons-material';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import { getButtonPreset } from '../buttonPresets';
import type { CustomButtonProps } from '../types/CustomButton.types';
import { CustomButton } from './CustomButton';

/** Múltiples `sx` en un solo valor tipado para `CustomButton`. */
function combineSx(...parts: Array<SxProps<Theme> | undefined>): SxProps<Theme> | undefined {
  const flat = parts.filter(Boolean) as SxProps<Theme>[];
  if (flat.length === 0) return undefined;
  if (flat.length === 1) return flat[0];
  return flat as unknown as SxProps<Theme>;
}

type BasePropsBotonCrud = Omit<CustomButtonProps, 'variant' | 'label'> & {
  label?: ReactNode;
};

export type GuardarBotonProps = BasePropsBotonCrud & {
  /** Icono de disquete por defecto; desactívalo con false. */
  mostrarIconoGuardar?: boolean;
};

/** Guardar / actualizar: azul relleno e icono de disquete por defecto. */
export function GuardarBoton({
  label = 'Guardar',
  mostrarIconoGuardar = true,
  startIcon,
  sx,
  ...props
}: GuardarBotonProps) {
  const { variant, sx: presetSx, ...presetRest } = getButtonPreset('save');
  const resolvedIcon = mostrarIconoGuardar ? (startIcon ?? <Save fontSize="small" />) : startIcon;
  return (
    <CustomButton
      label={label}
      variant={variant}
      startIcon={resolvedIcon}
      sx={combineSx(presetSx, sx)}
      {...presetRest}
      {...props}
    />
  );
}

export type CancelarBotonProps = BasePropsBotonCrud;

/** Cancelar: solo texto gris. */
export function CancelarBoton({ label = 'Cancelar', sx, ...props }: CancelarBotonProps) {
  const { variant, sx: presetSx, ...presetRest } = getButtonPreset('cancel');
  return (
    <CustomButton
      label={label}
      variant={variant}
      sx={combineSx(presetSx, sx)}
      {...presetRest}
      {...props}
    />
  );
}

export type EditarBotonProps = BasePropsBotonCrud & {
  /** Icono de lápiz por defecto; desactívalo con false. */
  mostrarIconoEditar?: boolean;
};

/** Editar: azul relleno e icono de lápiz por defecto. */
export function EditarBoton({
  label = 'Editar',
  mostrarIconoEditar = true,
  startIcon,
  sx,
  ...props
}: EditarBotonProps) {
  const { variant, sx: presetSx, ...presetRest } = getButtonPreset('edit');
  const resolvedIcon = mostrarIconoEditar ? (startIcon ?? <Edit fontSize="small" />) : startIcon;
  return (
    <CustomButton
      label={label}
      variant={variant}
      startIcon={resolvedIcon}
      sx={combineSx(presetSx, sx)}
      {...presetRest}
      {...props}
    />
  );
}

export type EliminarBotonProps = BasePropsBotonCrud & {
  /** Icono de papelera opcional. */
  mostrarIconoEliminar?: boolean;
};

/** Eliminar: siempre rojo relleno y texto blanco. */
export function EliminarBoton({
  label = 'Eliminar',
  mostrarIconoEliminar = false,
  startIcon,
  sx,
  ...props
}: EliminarBotonProps) {
  const { variant, sx: presetSx, ...presetRest } = getButtonPreset('delete');
  const resolvedIcon = mostrarIconoEliminar ? (startIcon ?? <DeleteOutline fontSize="small" />) : startIcon;
  return (
    <CustomButton
      label={label}
      variant={variant}
      startIcon={resolvedIcon}
      sx={combineSx(presetSx, sx)}
      {...presetRest}
      {...props}
    />
  );
}
