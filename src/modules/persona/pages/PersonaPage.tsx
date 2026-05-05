import {
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { PersonAdd as PersonAddIcon } from "@mui/icons-material";

import { CustomButton } from "@/shared/ui/buttons/components/CustomButton";
import { getButtonPreset } from "@/shared/ui/buttons/buttonPresets";
import { ConfirmModal } from "@/shared/ui/modal/components/ConfirmModal";
import { AppSkeleton } from "@/shared/ui/loading";
import { Layout } from "@/shared/layout";

import { PersonaDetailModal } from "@/modules/persona/components/PersonaDetailModal";
import { PersonaFilters } from "@/modules/persona/components/PersonaFilters";
import { PersonaForm } from "@/modules/persona/components/PersonaForm";
import { PersonaTable } from "@/modules/persona/components/PersonaTable";
import { SetPasswordModal } from "@/modules/persona/components/SetPasswordModal";
import { usePersonaPage } from "@/modules/persona/hooks/usePersonaPage";
import { personaPageContainerSx } from "@/modules/persona/styles/personaPageStyles";

export function PersonaPage() {
  const primaryButtonPreset = getButtonPreset("primary");
  const {
    filteredPersonas,
    isListRefreshing,
    modalOpen,
    editingPersona,
    detailOpen,
    selectedPersona,
    personaToDelete,
    isDeleting,
    searchQuery,
    filterRol,
    filterEstado,
    tablePage,
    setFilterRol,
    setFilterEstado,
    setSearchQuery,
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
    rolOpciones,
    rolesCatalogLoading,
    tipoIdentificacionOpciones,
    tipoIdentificacionCatalogLoading,
    setPasswordModalOpen,
    personaToSetPassword,
    isSettingPassword,
    onOpenSetPassword,
    onCloseSetPassword,
    onSavePassword,
    isPersonasTableReady,
  } = usePersonaPage();

  return (
    <Layout
      searchPlaceholder="Buscar personas..."
      onSearch={setSearchQuery}
    >
      <Box sx={personaPageContainerSx}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "stretch", sm: "flex-start" }}
        spacing={{ xs: 1.5, sm: 0 }}
        mb={{ xs: 2, sm: 2.5 }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={700}
            color="text.primary"
            gutterBottom
            sx={{ fontSize: { xs: "1.25rem", sm: "1.45rem" }, lineHeight: 1.2, mb: 0.5 }}
          >
            Gestión de Personas
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: "0.85rem", sm: "0.9rem" } }}>
            Administra tus supervisores y comerciales
          </Typography>
          {searchQuery.trim() ? (
            <Typography variant="caption" color="text.secondary">
              Buscando: "{searchQuery.trim()}"
            </Typography>
          ) : null}
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

      {!isPersonasTableReady ? (
        <AppSkeleton variant="dashboard" tableRows={4} />
      ) : (
        <>
          <PersonaFilters
            filterRol={filterRol}
            filterEstado={filterEstado}
            onChangeFilterRol={setFilterRol}
            onChangeFilterEstado={setFilterEstado}
          />
          {isListRefreshing ? (
            <AppSkeleton variant="dashboard" tableRows={4} />
          ) : (
            <PersonaTable
              rows={filteredPersonas}
              page={tablePage}
              onPageChange={setTablePage}
              onViewDetail={onOpenDetail}
              onEdit={onOpenEdit}
              onSetPassword={onOpenSetPassword}
              onAskDelete={onAskDelete}
              rolOpciones={rolOpciones}
            />
          )}
        </>
      )}

      <PersonaForm
        open={modalOpen}
        onClose={onCloseModal}
        onSave={onSavePersona}
        personaData={editingPersona}
        rolOpciones={rolOpciones}
        rolesCatalogLoading={rolesCatalogLoading}
        tipoIdentificacionOpciones={tipoIdentificacionOpciones}
        tipoIdentificacionCatalogLoading={tipoIdentificacionCatalogLoading}
      />

      <PersonaDetailModal
        open={detailOpen}
        onClose={onCloseDetail}
        onExited={onDetailExited}
        onEdit={onEditFromDetail}
        personaData={selectedPersona}
        rolOpciones={rolOpciones}
      />

      <ConfirmModal
        open={Boolean(personaToDelete)}
        onClose={onCancelDelete}
        onConfirm={onConfirmDelete}
        title="Eliminar persona"
        description={
          personaToDelete ? (
            <>
              La persona dejará de aparecer en listados (baja lógica en el sistema). Datos asociados a{" "}
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

      <SetPasswordModal
        open={setPasswordModalOpen}
        onClose={onCloseSetPassword}
        persona={personaToSetPassword}
        onSave={onSavePassword}
        isLoading={isSettingPassword}
      />
      </Box>
    </Layout>
  );
}
