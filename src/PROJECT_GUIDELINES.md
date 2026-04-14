# PROJECT_GUIDELINES

Guía obligatoria del equipo para crear y mantener módulos en este frontend.

Este documento no es una sugerencia.

- `OBLIGATORIO`: debe cumplirse sin excepción.
- `SIEMPRE`: regla fija del proyecto.
- `NUNCA`: práctica prohibida.

Si un cambio no cumple esta guía, el cambio debe corregirse antes de considerarse terminado.

Este proyecto se organiza en 3 capas:

- `src/core`: infraestructura global de la aplicación.
- `src/shared`: piezas reutilizables entre módulos.
- `src/modules`: funcionalidad de negocio por dominio.

Si vas a crear una nueva funcionalidad, debe vivir en `src/modules/{modulo}`, salvo que sea claramente infraestructura global o una pieza compartida real.

## 1. Regla principal

Todo módulo debe seguir esta idea de forma obligatoria:

`page -> hook -> api`

Eso significa:

- La `page` renderiza la pantalla y conecta componentes.
- El `hook` contiene estado, eventos, validaciones, loading y coordinación.
- La `api` hace llamadas HTTP y transforma payloads mínimos.

Reglas obligatorias:

- `SIEMPRE` se respeta el flujo `page -> hook -> api`.
- `NUNCA` una `page` llama `axios` ni `apiClient` directamente.
- `NUNCA` un `component` llama APIs directamente.
- `NUNCA` un archivo en `api/` maneja estado visual, navegación o lógica de UI.
- `OBLIGATORIO` que cada capa tenga una única responsabilidad.

## 2. Estructura obligatoria por módulo

Estructura base:

```text
src/
  modules/
    auth/
      api/
        authApi.ts
      components/
        AuthLayout.tsx
        LoginForm.tsx
        ConfirmCodeForm.tsx
      hooks/
        useLoginScreen.ts
      pages/
        LoginPage.tsx
      styles/
        loginScreenStyles.ts
      types/
        auth.types.ts
```

Plantilla obligatoria para cualquier módulo nuevo:

```text
src/modules/{modulo}/
  api/
    {modulo}Api.ts
  components/
    {Modulo}Form.tsx
    {Modulo}Table.tsx
    {Modulo}Filters.tsx
  hooks/
    use{Modulo}Page.ts
  pages/
    {Modulo}Page.tsx
  styles/
    {modulo}Styles.ts
  types/
    {modulo}.types.ts
```

Carpetas opcionales, solo si el módulo realmente lo necesita:

- `constants/`
- `utils/`
- `context/`
- `schema/`

- `NUNCA` crear carpetas vacías "por si acaso".
- `NUNCA` crear una estructura más compleja que la necesidad real del módulo.

## 3. Responsabilidad de cada carpeta

### `api/`

Responsabilidad:

- Encapsular requests HTTP del módulo.
- Usar `apiClient` desde `src/core/api/client.ts`.
- Definir funciones con nombres de acción.

Debe hacer, obligatoriamente:

- `loginRequest(...)`
- `fetchMeRequest(...)`
- `createGenericaRequest(...)`
- `updateGenericaRequest(...)`

No debe hacer, bajo ninguna circunstancia:

- `useState`
- `useEffect`
- navegación
- abrir snackbars
- transformar lógica visual

### `hooks/`

Responsabilidad:

- Orquestar la pantalla.
- Manejar estado local.
- Ejecutar APIs.
- Resolver validaciones de flujo.
- Exponer handlers listos para la UI.

Ejemplo real del proyecto:

- `useLoginScreen.ts`

Debe devolver algo como:

- `isLoading`
- `formValues`
- `onSubmit`
- `onRetry`
- `onChangeFilters`

### `components/`

Responsabilidad:

- UI del módulo reutilizable dentro del mismo módulo.
- Componentes presentacionales o secciones de pantalla.

Ejemplos reales:

- `LoginForm.tsx`
- `ConfirmCodeForm.tsx`
- `LoginLeftPanel.tsx`

Reglas obligatorias:

- `SIEMPRE` si un componente sirve solo a un módulo, se queda en ese módulo.
- `SOLO` si sirve de verdad a varios módulos, se evalúa moverlo a `src/shared`.

### `pages/`

Responsabilidad:

- Punto de entrada de la ruta.
- Componer layout + componentes del módulo.
- Conectar el hook principal de la pantalla.

Regla obligatoria:

- `SIEMPRE` cada pantalla enrutable termina en `Page`.

Ejemplos:

- `LoginPage.tsx`
- `HomePage.tsx`
- `GenericaPage.tsx`

### `types/`

Responsabilidad:

- Tipos e interfaces del módulo.
- Tipos de payload, response y modelos de UI si pertenecen al dominio.

Ejemplo real:

- `auth.types.ts`

Reglas obligatorias:

- `SIEMPRE` los tipos del módulo viven en `types/{modulo}.types.ts`.
- `NUNCA` repartas tipos del mismo módulo en muchos archivos sin necesidad real.

### `styles/`

Responsabilidad:

- Objetos `sx`, helpers visuales y estilos del módulo.

Ejemplo real:

- `loginScreenStyles.ts`

Reglas obligatorias:

- `SIEMPRE` si el estilo solo se usa en un archivo y es pequeño, déjalo en el componente.
- `OBLIGATORIO` moverlo a `styles/` cuando crece o se comparte dentro del módulo.

## 4. Convenciones estrictas de nombres

Estas reglas se siguen siempre y no son negociables.

### Módulos

- `SIEMPRE` carpeta del módulo en minúscula: `auth`, `generica`, `clientes`.
- `NUNCA` usar espacios, guiones o PascalCase en nombre de carpeta de módulo.

### Pages

- `OBLIGATORIO` formato: `{Modulo}Page.tsx`
- Ejemplos: `LoginPage.tsx`, `GenericaPage.tsx`, `ClientesPage.tsx`

### Hooks

- `SIEMPRE` empiezan por `use`
- `OBLIGATORIO` formato: `use{NombreDePantallaOCaso}.ts`
- Ejemplos: `useLoginScreen.ts`, `useGenericaPage.ts`, `useClientesFilters.ts`

### APIs

- `OBLIGATORIO` archivo principal: `{modulo}Api.ts`
- `OBLIGATORIO` funciones: verbo + entidad + `Request`
- Ejemplos:
  - `loginRequest`
  - `verifyCodeRequest`
  - `fetchGenericasRequest`
  - `createGenericaRequest`

Nombres prohibidos:

- `getData`
- `callApi`
- `request`
- `service`

### Types

- `OBLIGATORIO` archivo: `{modulo}.types.ts`
- `SIEMPRE` interfaces y tipos en PascalCase
- Ejemplos:
  - `LoginCredentials`
  - `AuthTokens`
  - `GenericaItem`
  - `CreateGenericaPayload`

### Components

- `SIEMPRE` archivo en PascalCase
- `OBLIGATORIO` que el nombre describa su función
- Ejemplos:
  - `GenericaTable.tsx`
  - `GenericaFilters.tsx`
  - `GenericaForm.tsx`

Nombres prohibidos:

- `Modal.tsx`
- `Table.tsx`
- `Form.tsx`

### Styles

- `OBLIGATORIO` archivo en camelCase descriptivo
- Ejemplos:
  - `loginScreenStyles.ts`
  - `genericaPageStyles.ts`

## 5. Flujo correcto de datos

Patrón obligatorio e innegociable:

### 1. `Page`

La página, obligatoriamente:

- llama el hook principal
- pasa props a componentes
- arma el layout

Ejemplo:

```tsx
export function GenericaPage() {
  const {
    items,
    isLoading,
    filters,
    onChangeFilters,
    onSubmit,
  } = useGenericaPage();

  return (
    <Layout>
      <GenericaFilters value={filters} onChange={onChangeFilters} />
      <GenericaTable rows={items} loading={isLoading} />
      <GenericaForm onSubmit={onSubmit} />
    </Layout>
  );
}
```

### 2. `Hook`

El hook, obligatoriamente:

- maneja estado
- ejecuta requests
- interpreta respuestas
- dispara efectos secundarios de pantalla

Ejemplo:

```ts
export function useGenericaPage() {
  const [items, setItems] = useState<GenericaItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchGenericasRequest();
      setItems(response.data ?? []);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { items, isLoading, loadItems };
}
```

### 3. `Api`

La API, obligatoriamente:

- solo habla con backend
- devuelve tipos claros

Ejemplo:

```ts
const GENERICA_PREFIX = "/genericas";

export async function fetchGenericasRequest(): Promise<ApiResponse<GenericaItem[]>> {
  const { data } = await apiClient.get<ApiResponse<GenericaItem[]>>(`${GENERICA_PREFIX}/`);
  return data;
}
```

## 6. Qué va en `core` y qué va en `shared`

### `src/core`

Va aquí solo infraestructura global:

- `core/api`: cliente HTTP, errores comunes, tipos base
- `core/auth`: provider, contexto, token storage
- `core/router`: rutas y guards
- `core/theme`: tema global

- `NUNCA` metas lógica de negocio específica de módulos en `core`.

### `src/shared`

Va aquí solo lo reutilizable entre módulos:

- layout global
- navbar
- sidebar
- botones reutilizables
- componentes UI genéricos
- contextos compartidos

Reglas obligatorias:

- `SIEMPRE` si algo solo lo usa `auth`, vive en `modules/auth`.
- `SOLO` si lo usan 2 o más módulos de forma real, considera moverlo a `shared`.
- `NUNCA` mover algo a `shared` por intuición o anticipación.

## 7. Registro de rutas

Cuando crees una nueva página enrutable, es obligatorio:

1. Crea la page dentro de `src/modules/{modulo}/pages/`
2. Importa la page en `src/core/router/routeDefinitions.tsx`
3. Registra la ruta con su nivel de acceso

Ejemplo:

```tsx
import { GenericaPage } from "@/modules/generica/pages/GenericaPage";

export const appRouteDefinitions: AppRouteDefinition[] = [
  { path: "/", element: <HomePage />, access: "protected" },
  { path: "/generica", element: <GenericaPage />, access: "protected" },
];
```

## 8. Reglas obligatorias del equipo

- `SIEMPRE` usar imports con alias `@/` para código dentro de `src`.
- `SIEMPRE` mantener cada módulo autocontenido.
- `OBLIGATORIO` exportar tipos explícitos en requests y hooks.
- `OBLIGATORIO` nombrar funciones según intención de negocio.
- `SIEMPRE` mantener la lógica HTTP dentro de `api/`.
- `SIEMPRE` mantener la lógica de pantalla dentro de `hooks/`.
- `SIEMPRE` mantener componentes lo más puros posible.
- `SIEMPRE` separar tipos del dominio en `types/`.
- `OBLIGATORIO` reutilizar `core/api/types.ts` para `ApiResponse` y errores base.
- `OBLIGATORIO` reutilizar `core/api/client.ts` en vez de crear clientes HTTP nuevos.
- `SIEMPRE` mover a `shared` solo lo verdaderamente transversal.
- `NUNCA` crear nombres genéricos si puedes nombrar la intención real.
- `NUNCA` duplicar lógica de negocio entre módulos.
- `NUNCA` duplicar tipos si ya existe una fuente clara en el módulo.
- `OBLIGATORIO` que todo archivo nuevo tenga una razón clara para existir.

## 9. Antipatrones prohibidos

Esto no se debe hacer nunca.

- Llamar `apiClient` directamente desde una `page`.
- Hacer requests dentro de componentes como `GenericaTable.tsx`.
- Mezclar tipos del módulo dentro de `page`, `hook` y `api` duplicados.
- Crear archivos genéricos tipo `utils.ts`, `helpers.ts` o `types.ts` dentro del módulo sin contexto claro.
- Meter componentes de un módulo dentro de `src/shared` "por si luego sirven".
- Crear hooks que hagan de todo para varios módulos distintos.
- Usar nombres como `data`, `item`, `response2`, `test`, `temp`.
- Poner lógica de negocio de `auth`, `generica` o `clientes` dentro de `core`.
- Saltarse el flujo `page -> hook -> api`.
- Registrar rutas sin crear su `Page` dentro del módulo.
- Crear componentes gigantes con lógica de negocio, requests y render mezclados.
- Crear hooks que expongan estado sin intención clara o con nombres ambiguos.
- Dejar lógica temporal en producción con comentarios tipo `TODO: luego`.
- Importar desde rutas largas relativas si existe alias `@/`.

## 10. Ejemplo recomendado: módulo `generica`

```text
src/modules/generica/
  api/
    genericaApi.ts
  components/
    GenericaFilters.tsx
    GenericaForm.tsx
    GenericaTable.tsx
  hooks/
    useGenericaPage.ts
  pages/
    GenericaPage.tsx
  types/
    generica.types.ts
```

Archivos esperados de forma obligatoria:

- `genericaApi.ts`: requests del módulo
- `useGenericaPage.ts`: estado, handlers y carga de datos
- `GenericaPage.tsx`: pantalla principal del módulo
- `GenericaTable.tsx`: tabla del módulo
- `GenericaForm.tsx`: formulario del módulo
- `generica.types.ts`: payloads, entidades y tipos del módulo

## 11. Checklist antes de crear un módulo

Antes de dar un módulo por correcto, verifica obligatoriamente:

1. Existe en `src/modules/{modulo}`.
2. Tiene al menos `pages/`, `hooks/`, `api/` y `types/`.
3. La `Page` no hace requests directos.
4. El `Hook` concentra estado y handlers.
5. La `Api` solo hace comunicación HTTP.
6. Los nombres de archivos siguen la convención.
7. La ruta fue registrada en `core/router/routeDefinitions.tsx`.
8. No moviste a `shared` nada que todavía sea específico del módulo.

## 12. Regla final del equipo

Si dudas dónde poner algo, aplica esta prioridad obligatoria:

1. ¿Es infraestructura global? -> `core`
2. ¿Es reutilizable entre módulos? -> `shared`
3. ¿Es negocio de una funcionalidad puntual? -> `modules/{modulo}`

En este proyecto, la forma correcta de crecer no es crear carpetas genéricas. Es crear módulos bien aislados, con nombres claros y con el flujo `page -> hook -> api` respetado siempre.

## 13. Criterios de rechazo en revisión

Un cambio debe rechazarse en revisión si ocurre cualquiera de estos casos:

- La funcionalidad nueva no fue creada dentro de `src/modules/{modulo}` sin justificación real.
- La `Page` hace requests directos.
- El `Hook` no concentra el flujo principal de pantalla.
- La `Api` mezcla lógica visual o navegación.
- Los nombres de archivos no siguen la convención definida.
- Se movieron archivos a `shared` sin reutilización real.
- Se agregó lógica de negocio a `core`.
- Se crearon archivos genéricos o ambiguos.
- No se registró correctamente la ruta del módulo.
- La estructura del módulo no es consistente con esta guía.

Si alguno de estos puntos ocurre, el trabajo no está terminado.
