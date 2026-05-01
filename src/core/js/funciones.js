import { apiClient } from "@/core/api/client";
import { listValoresGenericaRequest } from "@/modules/genericas/api/genericasApi";

// Construye FormData desde un objeto plano
// @param data Clave-valor a serializar
// @returns FormData listo para enviar
export const crearFormData = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
        if (value === null || value === undefined) return;
        if (value instanceof File) formData.append(key, value);
        else formData.append(key, String(value));
    });
    return formData;
};

// Obtiene todos los valores asociados a una genérica específica
// @param genericaId ID de la genérica (ej: modulos, perfiles, tipos de identificacion)
// @returns Lista de valores pertenecientes a esa genérica
// @example
// // Obtener valores de la genérica "modulos"
// const valores = await obtenerValoresGenerica(3);
//
// // Uso típico en un select
// const options = valores.map(v => ({
//   label: v.nombre,
//   value: v.id,
// }));
//
// // Ejemplo real:
// // [{ id: 1, nombre: "Activo" }, { id: 2, nombre: "Inactivo" }]
export const obtenerValoresGenerica = async (genericaId) => {
    const response = await listValoresGenericaRequest({ generica: genericaId });
    return response.data;
};

// Consulta valores de genéricas aplicando filtros dinámicos vía query params
// @param params Objeto con filtros (ej: { codigo, estado, generica })
// @returns { data, pagination } lista de valores y metadata de paginación
// @example
// const { data } = await obtenerValoresFiltros({
//   codigo: "personas_act",
//   estado: 1,
// });
export const obtenerValoresFiltros = async (params = {}) => {
    const response = await apiClient.get("/genericas/valores-genericas/buscar/", { params });
    const { data, pagination } = response.data;
    return {
        data: data ?? [],
        pagination: pagination ?? null,
    };
};

// Obtiene relaciones de permisos entre valores de genéricas (principal y secundario)
// @param params Filtros opcionales (ej: { principal, secundario__generica, principal__codigo })
// @returns Lista de permisos que cumplen los criterios
// @example
// const permisos = await obtenerPermisosValoresGenerica({
//   principal: 5,
//   secundario__generica: 10,
// });
export const obtenerPermisosValoresGenerica = async (params = {}) => {
    const response = await apiClient.get("/genericas/valores-genericas/permisos/", { params });
    return response.data;
};


// Obtiene los permisos asociados a un valor específico (como principal)
// @param id ID del valor principal
// @returns Lista de relaciones donde ese valor es el principal
// @example
// const permisos = await obtenerPermisosValor(5);
export const obtenerPermisosValor = async (id) => {
    return obtenerPermisosValoresGenerica({ principal: id });
};
