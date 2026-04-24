import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { ListarDatos } from "@/shared/ui/listar-datos";
import type { ValorGenerica } from "../types/genericas.types";
import { formatAppDate } from "@/shared/utils";
import { Typography } from "@mui/material";

interface GenericaModalListProps {
    genericaName: string;
    open: boolean;
    onClose: () => void;
    valoresGenerica: ValorGenerica[];
    loadingValoresGenerica: boolean;
}

export function GenericaModalList({
    genericaName,
    open,
    onClose,
    valoresGenerica,
    loadingValoresGenerica,
}: GenericaModalListProps) {
    return (
        <CustomModal
            open={open}
            onClose={onClose}
            title={`¡ ${genericaName} !`}
            maxWidth="lg"
            disableBackdropClose={false}
            actionLoading={false}
            actionLoadingLabel=""
            contentLoading={loadingValoresGenerica}
            contentLoadingLabel="Cargando valores..."
            contentLoadingVariant="linear"
            contentSx={{
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                overflow: "hidden",
                px: 0,
                pt: 1,
                pb: 1.5,
            }}
            actions={
                <CustomButton
                    label="Cancelar"
                    variant="outlined"
                    onClick={onClose}
                    sx={{
                        borderColor: "divider",
                        color: "text.secondary",
                        fontWeight: 500,
                        "&:hover": {
                            borderColor: "primary.light",
                            backgroundColor: "action.hover",
                            color: "text.primary",
                        },
                    }}
                />
            }
        >
            <ListarDatos
                data={valoresGenerica}
                fillParentHeight
                variant="embedded"
                sx={{ flex: 1, minHeight: 0, my: 0 }}
                summaryTitle="Listado de valores genéricas"
                primary={{ key: ["id", "nombre"] }}
                loading={false}
                fields={[
                    {
                        key: "created_at",
                        label: "Fecha de creación",
                        render: (value) => (
                            <Typography variant="body2" sx={{ color: "text.secondary", fontSize: "0.8rem" }}>
                                {formatAppDate(value as string | null | undefined, { mode: "datetime" })}
                            </Typography>
                        )
                    },
                    { key: "codigo", label: "Código" },
                ]}
                actions={[]}
                enableSearch={true}
                searchPlaceholder="Buscar valor"
                searchKeys={["nombre", "codigo"]}
            />
        </CustomModal>
    );
}