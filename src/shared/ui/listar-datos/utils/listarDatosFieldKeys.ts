/** Clave simple o varias claves para mostrar valores unidos (ej. `1 - Perfiles`). */
export type ListarDatosFieldKey<T extends object> = keyof T | readonly (keyof T)[];

export function normalizeFieldKeys<T extends object>(
  key: ListarDatosFieldKey<T>
): (keyof T)[] {
  return Array.isArray(key) ? [...key] : [key];
}

export function formatJoinedRowValues<T extends object>(
  row: T,
  keys: readonly (keyof T)[],
  separator: string
): string {
  const parts = keys
    .map((k) => row[k])
    .filter((v) => v != null && v !== "");
  return parts.map(String).join(separator);
}
