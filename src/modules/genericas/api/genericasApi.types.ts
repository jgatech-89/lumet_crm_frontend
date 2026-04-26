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