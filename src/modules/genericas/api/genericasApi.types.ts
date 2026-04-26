export type ListGenericasParams = {
    page: number;
};

export type CreateGenericaPayload = {
    nombre: string;
    descripcion?: string;
  };

export type UpdateGenericaPayload = {
    id: number;
    nombre: string;
    descripcion?: string;
};

export type ListValoresGenericaParams = {
    generica: number;
};

export type UpdateValorGenericaPayload = {
  id: number;
  fields: Record<string, string | number | null>;
  archivo?: File | null;
};