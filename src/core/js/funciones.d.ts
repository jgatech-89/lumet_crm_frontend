// existe solo para que TypeScript entienda el import del .js, no “daña” la estructura;
// ese es el problema que estaba al momento de hacer la importacion del js.


declare module "@/core/js/funciones.js" {
  export function obtenerValoresGenerica(genericaId: number): Promise<unknown[]>;

  export function obtenerValoresFiltros(params?: Record<string, unknown>): Promise<{
    data: unknown[];
    pagination: unknown | null;
  }>;

  export function obtenerPermisosValoresGenerica(params?: Record<string, unknown>): Promise<unknown>;

  export function obtenerPermisosValor(id: number): Promise<unknown>;

  export function crearFormData(data: Record<string, unknown>): FormData;
}
