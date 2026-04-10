import { useEffect, useState, useRef } from "react";
import { apiClient } from "@/core/api/client";

export interface SidebarItemType {
  id: number;
  nombre: string;
  codigo: string;
  valor_orden: number;
  icono?: string;
  ruta?: string;
}

export const useSidebar = () => {
  const [items, setItems] = useState<SidebarItemType[]>([]);
  const [loading, setLoading] = useState(true);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const fetchSidebar = async () => {
      try {
        const res = await apiClient.get("/genericas/valores/?generica_id=3");
        console.log("Sidebar data:", res.data);

        // Extraer items del objeto de respuesta
        const items = res.data.data?.items || [];

        // Ordenar por valor_orden
        const sorted = items.sort(
          (a: SidebarItemType, b: SidebarItemType) =>
            (a.valor_orden || 0) - (b.valor_orden || 0)
        );

        setItems(sorted);
      } catch (error) {
        console.error("Error sidebar:", error);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebar();
  }, []);

  return { items, loading };
};