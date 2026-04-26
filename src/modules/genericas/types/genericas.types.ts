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