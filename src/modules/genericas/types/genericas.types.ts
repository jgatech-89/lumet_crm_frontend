export interface Generica {
  id: number;
  nombre: string;
  descripcion: string | null;
  created_at: string;
}

export interface ValorGenerica {
  id: number;
  nombre: string;
  codigo: string;
  created_at: string;
}

/** Fila de listado con permiso respecto a un `ValorGenerica` principal (`permiso` = id o 0). */
export interface ValorGenericaConPermiso extends ValorGenerica {
  permiso: number;
  valor_orden?: number | null;
  valora?: string | null;
}

export interface ValorGenericaDetail {
  id: number;
  generica: number;
  codigo: string | null;
  archivo: string | null;
  icono: string | null;
  nombre: string;
  descripcion: string | null;
  valor_orden: number | null;
  label_valora: string | null;
  valora: string | null;
  label_valorb: string | null;
  valorb: string | null;
  label_valorc: string | null;
  valorc: string | null;
  label_valord: string | null;
  valord: string | null;
  label_valore: string | null;
  valore: string | null;
  label_valorf: string | null;
  valorf: string | null;
  label_valorg: string | null;
  valorg: string | null;
  label_valorh: string | null;
  valorh: string | null;
  label_valori: string | null;
  valori: string | null;
  label_valorj: string | null;
  valorj: string | null;
  estado: string;
}