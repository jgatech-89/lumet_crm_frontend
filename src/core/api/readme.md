# 📡 API Client - Guía rápida de uso

Este módulo centraliza todas las llamadas HTTP y el manejo de errores del frontend.

👉 **No necesitas manejar Axios directamente.**
👉 **No necesitas parsear errores manualmente.**

---

# 🚀 Lo único que debes usar

## 1. `apiClient` → hacer requests

Cliente HTTP configurado con:

* Base URL
* Token automático
* Refresh token automático
* Manejo global de errores

### ✅ Ejemplo

```ts
import { apiClient } from "@/core/api/client";

const { data } = await apiClient.get("/clientes");
```

---

## 2. `getRequestErrorMessage(error)` → mostrar errores

Convierte cualquier error en un mensaje limpio para UI.

### ✅ Ejemplo

```ts
import { getRequestErrorMessage } from "@/core/api/client";

try {
  await apiClient.post("/login", data);
} catch (error) {
  toast.error(getRequestErrorMessage(error));
}
```

---

## 3. `isApiRequestError(error)` → manejar errores avanzados

Permite acceder a detalles del error (fields, code, status).

### ✅ Ejemplo (formularios)

```ts
import { isApiRequestError } from "@/core/api/client";

try {
  await apiClient.post("/login", data);
} catch (error) {
  if (isApiRequestError(error)) {
    setErrores(error.errors);
  }
}
```

---

# 🧩 Ejemplo completo (caso real)

```ts
try {
  await apiClient.post("/users", formData);
  toast.success("Usuario creado");
} catch (error) {
  if (isApiRequestError(error)) {
    setErrores(error.errors);
  }

  toast.error(getRequestErrorMessage(error));
}
```

---

# ⚠️ Reglas importantes

* ❌ NO usar Axios directamente

* ❌ NO leer `error.response.data`

* ❌ NO parsear errores manualmente

* ✅ SIEMPRE usar:

  * `apiClient`
  * `getRequestErrorMessage`
  * `isApiRequestError`

---

# 🧠 Resumen

| Necesidad          | Qué usar                 |
| ------------------ | ------------------------ |
| Hacer request      | `apiClient`              |
| Mostrar error      | `getRequestErrorMessage` |
| Manejar validación | `isApiRequestError`      |

---

# 💡 Nota

El manejo de errores ya está resuelto globalmente.
Solo concéntrate en la UI y lógica de negocio.
