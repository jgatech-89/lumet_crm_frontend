import {
  Container,
  Typography,
  Box,
  Stack,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@mui/material";
import { PersonAdd as PersonAddIcon, KeyboardArrowDown } from "@mui/icons-material";

import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { getButtonPreset } from "@/shared/ui/buttons/buttonPresets";
import { ConfirmModal } from "@/shared/ui/modal/components/ConfirmModal";
import { AppSkeleton, LinearLoader } from "@/shared/ui/loading";

import { PersonaDetailModal } from "../components/PersonaDetailModal";
import { PersonaModal } from "../components/PersonaModal";
import { PersonaTable } from "../components/PersonaTable";
import { usePersonaPage } from "../hooks/usePersonaPage";
import {
  personaFilterLabelSx,
  personaFilterSelectSx,
  personaPageContainerSx,
} from "../styles/personaPageStyles";

export function PersonaPage() {
  const primaryButtonPreset = getButtonPreset("primary");
  const {
    filteredPersonas,
    isListLoading,
    modalOpen,
    editingPersona,
    detailOpen,
    selectedPersona,
    personaToDelete,
    isDeleting,
    filterRol,
    filterEstado,
    tablePage,
    setFilterRol,
    setFilterEstado,
    setTablePage,
    onOpenCreate,
    onOpenEdit,
    onOpenDetail,
    onCloseDetail,
    onDetailExited,
    onEditFromDetail,
    onAskDelete,
    onCancelDelete,
    onConfirmDelete,
    onCloseModal,
    onSavePersona,
  } = usePersonaPage();

  return (
    <Container maxWidth="lg" sx={personaPageContainerSx}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "flex-start" }}
        spacing={{ xs: 2.25, sm: 0 }}
        mb={{ xs: 3, sm: 4 }}
      >
        <Box>
          <Typography
            variant="h3"
            fontWeight={700}
            color="#263238"
            gutterBottom
            sx={{ fontSize: { xs: "1.9rem", sm: "2.5rem" }, lineHeight: 1.12 }}
          >
            Gestión de Personas
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: { xs: "0.92rem", sm: "1rem" } }}>
            administra tus supervisores y comerciales
          </Typography>
        </Box>
        <CustomButton
          label="Nueva persona"
          startIcon={<PersonAddIcon />}
          onClick={onOpenCreate}
          {...primaryButtonPreset}
          sx={{
            width: { xs: "100%", sm: "auto" },
            justifyContent: "center",
          }}
        />
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1.5, md: 4 }}
        alignItems={{ xs: "stretch", md: "center" }}
        mb={{ xs: 3, sm: 6 }}
        sx={{ pl: { xs: 0, md: 1 } }}
      >
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <Typography sx={{ ...personaFilterLabelSx, minWidth: { sm: "auto", md: 36 } }}>ROL:</Typography>
          <FormControl variant="standard" sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Select
              value={filterRol}
              onChange={(e) => {
                setFilterRol(e.target.value);
              }}
              disableUnderline
              IconComponent={KeyboardArrowDown}
              sx={personaFilterSelectSx}
            >
              <MenuItem value="todos">Todos los roles</MenuItem>
              <MenuItem value="supervisor">Supervisor</MenuItem>
              <MenuItem value="comercial">Comercial</MenuItem>
              <MenuItem value="cerrador">Cerrador</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          alignItems={{ xs: "flex-start", sm: "center" }}
          sx={{ width: { xs: "100%", md: "auto" } }}
        >
          <Typography sx={{ ...personaFilterLabelSx, minWidth: { sm: "auto", md: 58 } }}>ESTADO:</Typography>
          <FormControl variant="standard" sx={{ width: { xs: "100%", sm: "auto" } }}>
            <Select
              value={filterEstado}
              onChange={(e) => {
                setFilterEstado(e.target.value);
              }}
              disableUnderline
              IconComponent={KeyboardArrowDown}
              sx={personaFilterSelectSx}
            >
              <MenuItem value="todos">Todos los estados</MenuItem>
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Stack>

      {isListLoading ? (
        <Paper elevation={0} sx={{ borderRadius: 2, bgcolor: "#ffffff", p: { xs: 1.5, sm: 2 } }}>
          <LinearLoader label="Cargando personas..." sx={{ mb: 2 }} />
          <AppSkeleton rows={8} showHeader />
        </Paper>
      ) : (
        <PersonaTable
          rows={filteredPersonas}
          page={tablePage}
          onPageChange={setTablePage}
          onViewDetail={onOpenDetail}
          onEdit={onOpenEdit}
          onAskDelete={onAskDelete}
        />
      )}

      <PersonaModal open={modalOpen} onClose={onCloseModal} onSave={onSavePersona} personaData={editingPersona} />

      <PersonaDetailModal
        open={detailOpen}
        onClose={onCloseDetail}
        onExited={onDetailExited}
        onEdit={onEditFromDetail}
        personaData={selectedPersona}
      />

      <ConfirmModal
        open={Boolean(personaToDelete)}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
        title="Eliminar persona"
        description={
          personaToDelete ? (
            <>
              Esta acción no se puede deshacer. Se eliminarán permanentemente los datos y documentos asociados a{" "}
              <strong>{personaToDelete.nombre}</strong>.
            </>
          ) : (
            "Esta acción no se puede deshacer."
          )
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        loading={isDeleting}
        loadingText="Eliminando persona..."
        variant="danger"
        disableBackdropClose
      />
    </Container>
  );
}
