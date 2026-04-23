import { CustomModal } from "@/shared/ui/modal/components/CustomModal";
import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";

interface GenericaModalListProps {
    genericaName: string;
    open: boolean;
    onClose: () => void;
}

export function GenericaModalList({ genericaName, open, onClose }: GenericaModalListProps){
    return(
        <CustomModal
            open={open}
            onClose={onClose}
            title={`Listado de valores genéricas - ¡ ${genericaName} !`}
            maxWidth="md"
            disableBackdropClose={false}
            actionLoading={false}
            actionLoadingLabel=""
            actions={
                <CustomButton label="Cancelar" variant="outlined" onClick={onClose} />
            }
        >
            <h1>hola</h1>
        </CustomModal>
    )



}