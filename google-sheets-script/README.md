# LFGBBP - Sistema de Gestion de Contenido para Google Sheets

Este script desarrollado en **Google Apps Script** permite administrar y actualizar todo el contenido del sitio web del **Laboratorio de Fisiologia y Genetica de Bacterias Beneficiosas para Plantas (LFGBBP - UNQ/CONICET/CIC-BA)** directamente desde una planilla de Google Sheets.

Incluye integracion directa con la **API de GitHub**, lo que permite realizar **commit y push de manera automatica** a la rama de produccion con un solo clic, eliminando por completo la necesidad de intervencion manual del programador para actualizar los archivos JSON.

---

## Modulos Administrados

El sistema gestiona los 6 modulos de datos que alimentan el sitio web:

| Modulo | Pestana en Google Sheets | Archivo JSON generado | Campos administrados |
| :--- | :--- | :--- | :--- |
| **Investigadores Actuales** | `Investigadores` | `data/investigadoresAct.json` | `id`, `nombre`, `apellido`, `titulo_es`, `titulo_en`, `fotoUrl`, `descripcion_es`, `descripcion_en` |
| **Ex-Miembros / Becarios** | `Ex-Miembros` | `data/investigadoresPast.json` | `id`, `nombre_es`, `nombre_en`, `participacion_es`, `participacion_en`, `lugarDeTrabajoActual_es`, `lugarDeTrabajoActual_en` |
| **Colaboradores** | `Colaboradores` | `data/colaboradores.json` | `id`, `nombre_es`, `nombre_en`, `lugarDeTrabajoActual_es`, `lugarDeTrabajoActual_en` |
| **Lineas de Investigacion** | `Lineas_Investigacion` | `data/researchLines.json` | `id`, `titulo_es`, `titulo_en`, `descripcion_es`, `descripcion_en`, `imagen` |
| **Papers de Investigacion** | `Papers` | `data/papers.json` | `paperId`, `fechaPublicacion`, `titulo`, `publicadoEn`, `enlace`, `autores` |
| **Servicios Tecnologicos** | `Servicios` | `data/servicios.json` | `id`, `titulo_es`, `titulo_en`, `descripcion_es`, `descripcion_en` |

---

## Guia de Instalacion en Google Sheets

### Paso 1: Crear una nueva planilla de Google Sheets
1. Ingresa a [Google Sheets](https://sheets.google.com) y crea una nueva planilla en blanco.
2. Asigna un nombre al documento, por ejemplo: **"LFGBBP - Base de Datos Web"**.

### Paso 2: Abrir el editor de Apps Script
1. En el menu superior de Google Sheets, selecciona **Extensiones** > **Apps Script**.
2. Se abrira el entorno de desarrollo de Google Apps Script.

### Paso 3: Copiar los archivos del proyecto
Crea los archivos correspondientes en el editor copiando el codigo de esta carpeta:

1. **`Code.gs`**:
   - Reemplaza el codigo existente con el contenido de [`Code.js`](./Code.js).
2. **`InitialData.gs`**:
   - Haz clic en **+** (Agregar un archivo) > **Secuencia de comandos**.
   - Asigna el nombre `InitialData` y pega el contenido de [`InitialData.js`](./InitialData.js).
3. **`Sidebar.html`**:
   - Haz clic en **+** > **HTML**.
   - Asigna el nombre `Sidebar` y pega el contenido de [`Sidebar.html`](./Sidebar.html).
4. **`ExportModal.html`**:
   - Haz clic en **+** > **HTML**.
   - Asigna el nombre `ExportModal` y pega el contenido de [`ExportModal.html`](./ExportModal.html).
5. **`GithubConfigModal.html`**:
   - Haz clic en **+** > **HTML**.
   - Asigna el nombre `GithubConfigModal` y pega el contenido de [`GithubConfigModal.html`](./GithubConfigModal.html).

> Haz clic en **Guardar proyecto** (`Ctrl + S`).

### Paso 4: Inicializar la planilla y cargar los datos
1. Regresa a la pestana de Google Sheets y recarga la pagina (`F5`).
2. En la barra superior aparecera el menu: **`LFGBBP - Gestion Web`**.
3. Selecciona **`LFGBBP - Gestion Web`** > **`Inicializar y formatear hojas`**:
   - Se crearan las 6 hojas con los colores institucionales y encabezados predeterminados.
4. Selecciona **`LFGBBP - Gestion Web`** > **`Cargar datos iniciales (desde JSON)`**:
   - Se importaran automaticamente todos los registros actuales del laboratorio.

---

## Configuracion de la Sincronizacion Automatica con GitHub (Commit y Push)

Para que los investigadores puedan publicar cambios directamente en el sitio web:

### 1. Generar un Personal Access Token (PAT) en GitHub
1. Inicia sesion en GitHub con la cuenta con permisos en el repositorio `lfgbbp/lfgbbp.github.io`.
2. Dirigete a: **Settings** > **Developer settings** > **Personal access tokens** > **Tokens (classic)** (o Fine-grained).
3. Haz clic en **Generate new token**.
4. En permisos (Scopes), tilda la casilla **`repo`** (o `Contents: Read and write` en tokens fine-grained).
5. Copia el token generado (comienza con `ghp_` o `github_pat_`).

### 2. Configurar el Token en la planilla
1. En Google Sheets, ve a **`LFGBBP - Gestion Web`** > **`Configuracion de GitHub`**.
2. Completa los campos:
   - **Propietario:** `lfgbbp`
   - **Repositorio:** `lfgbbp.github.io`
   - **Rama:** `main`
   - **Personal Access Token:** Pega el token generado.
3. Haz clic en **Probar Conexion** para verificar que las credenciales sean validas.
4. Haz clic en **Guardar Configuracion**.

> El token se almacena de forma cifrada en las propiedades privadas del script (`ScriptProperties`), por lo que no queda visible en las celdas de la planilla.

---

## Flujo de Trabajo para los Investigadores

A partir de este momento, cualquier miembro autorizado del laboratorio puede realizar actualizaciones siguiendo estos sencillos pasos:

### 1. Agregar o Modificar Datos
- **Desde el Panel Lateral:**
  1. Ve a **`LFGBBP - Gestion Web`** > **`Abrir panel de gestion (Sidebar)`**.
  2. Selecciona la seccion deseada (`Investigadores`, `Ex-Miembros`, `Colaboradores`, `Lineas`, `Papers`, `Servicios`).
  3. Para agregar: completa los campos y haz clic en **Guardar**. El sistema asigna el ID automaticamente.
  4. Para modificar: activa **Modificar existente**, selecciona el registro en la lista desplegable, edita los datos y haz clic en **Guardar cambios**.
- **Desde las celdas de la planilla:**
  - Tambien se pueden editar directamente las filas o agregar filas nuevas. El script detecta nuevas entradas y genera los IDs correlativos automaticamente.

### 2. Publicar en el Sitio Web (Commit y Push)
Cuando los cambios esten listos:
1. Haz clic en el boton verde **`Publicar cambios en el sitio web (Commit y Push)`** en el panel lateral, o selecciona en el menu superior: **`LFGBBP - Gestion Web`** > **`Publicar cambios en sitio web (Commit y Push)`**.
2. Opcionalmente, ingresa un comentario describiendo los cambios (por ejemplo: *"Se agrego nuevo paper 2025 y se actualizo la descripcion de Betina Agaras"*).
3. El script ejecuta las siguientes acciones de forma automatica:
   - Lee los datos de todas las hojas de Google Sheets.
   - Genera los 6 archivos JSON con el formato exacto requerido por el sitio web.
   - Realiza un commit atomico con los archivos modificados en la carpeta `data/`.
   - Efectua el push directamente a la rama `main` del repositorio.
4. GitHub Pages detecta el nuevo commit y republica el sitio web en cuestion de segundos.

---

## Exportacion Manual Alternativa

Si en alguna oportunidad se requiere una copia de respaldo local de los archivos JSON sin subirlos a GitHub:
1. Ve a **`LFGBBP - Gestion Web`** > **`Exportar datos a JSON local`**.
2. El modal permite copiar el texto al portapapeles o descargar individualmente o en conjunto los 6 archivos `.json`.
