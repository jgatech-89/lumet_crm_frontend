import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { ConfirmModal } from "@/shared/ui/modal/components/ConfirmModal";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { ListarDatos } from "@/shared/ui/listar-datos";
import type { ValorGenerica, ValorGenericaDetail } from "../types/genericas.types";
import { formatAppDate } from "@/shared/utils";
import { Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import type { Action } from "@/shared/ui/table/components/TableRow";
import { ValorGenericaDetailModal } from "./ValorGenericaList";

interface GenericaModalListProps {
    genericaName: string;
    open: boolean;
    onClose: () => void;
    valoresGenerica: ValorGenerica[];
    loadingValoresGenerica: boolean;
    actionsValues: Action<ValorGenerica>[];
    detailValorId: number | null;
    onCloseDetailValor: () => void;
    valorGenericaDetail: ValorGenericaDetail | null;
    loadingValorGenericaDetail: boolean;
    errorValorGenericaDetail: string | null;
    deleteConfirmOpen: boolean;
    deleteTargetNombre: string | null;
    deleteLoading: boolean;
    deleteError: string | null;
    onCloseDeleteConfirm: () => void;
    onConfirmDeleteValor: () => void | Promise<void>;
    onCrearValor?: () => void;
}

export function GenericaModalList({
    genericaName,
    open,
    onClose,
    valoresGenerica,
    loadingValoresGenerica,
    actionsValues,
    detailValorId,
    onCloseDetailValor,
    valorGenericaDetail,
    loadingValorGenericaDetail,
    errorValorGenericaDetail,
    deleteConfirmOpen,
    deleteTargetNombre,
    deleteLoading,
    deleteError,
    onCloseDeleteConfirm,
    onConfirmDeleteValor,
    onCrearValor,
}: GenericaModalListProps) {
    const nombreEtiqueta = deleteTargetNombre?.trim() || "este valor";
    const deleteDescription = (
        <>
            ¿Estás seguro de eliminar «<strong>{nombreEtiqueta}</strong>»?
            {deleteError ? (
                <>
                    <br />
                    <span style={{ color: "#D32F2F", fontWeight: 600 }}>{deleteError}</span>
                </>
            ) : null}
        </>
    );

    return (
        <>
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
            actionsSx={{ justifyContent: "center" }}
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
                <>
                    <CustomButton
                        label="Crear"
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={() => onCrearValor?.()}
                    />
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
                </>
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
                actions={actionsValues}
                enableSearch={true}
                searchPlaceholder="Buscar valor"
                searchKeys={["nombre", "codigo"]}
            />
        </CustomModal>
        <ValorGenericaDetailModal
            open={detailValorId != null}
            onClose={onCloseDetailValor}
            detail={valorGenericaDetail}
            loading={loadingValorGenericaDetail}
            error={errorValorGenericaDetail}
        />
        <ConfirmModal
            open={deleteConfirmOpen}
            onClose={onCloseDeleteConfirm}
            onConfirm={onConfirmDeleteValor}
            description={deleteDescription}
            loading={deleteLoading}
            loadingText="Eliminando..."
            variant="danger"
        />
        </>
    );
}
