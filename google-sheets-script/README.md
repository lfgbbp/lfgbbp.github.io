# 🔬 LFGBBP - Script de Gestión de Contenido para Google Sheets

Este script de **Google Apps Script** permite administrar y actualizar todo el contenido del sitio web del **Laboratorio de Fisiología y Genética de Bacterias Beneficiosas para Plantas (LFGBBP - UNQ/CONICET)** directamente desde una planilla de Google Sheets, de forma sencilla, visual y sin necesidad de editar código JSON a mano.

---

## 📋 Módulos que permite Agregar y Modificar

El script gestiona los 6 módulos principales del sitio web:

| Módulo | Pestaña en Google Sheets | Archivo JSON generado | Campos administrados |
| :--- | :--- | :--- | :--- |
| **👤 Investigadores Actuales** | `Investigadores` | `data/investigadoresAct.json` | `id`, `nombre`, `apellido`, `titulo_es`, `titulo_en`, `fotoUrl`, `descripcion_es`, `descripcion_en` |
| **🎓 Ex-Miembros / Becarios** | `Ex-Miembros` | `data/investigadoresPast.json` | `id`, `nombre_es`, `nombre_en`, `participacion_es`, `participacion_en`, `lugarDeTrabajoActual_es`, `lugarDeTrabajoActual_en` |
| **🤝 Colaboradores** | `Colaboradores` | `data/colaboradores.json` | `id`, `nombre_es`, `nombre_en`, `lugarDeTrabajoActual_es`, `lugarDeTrabajoActual_en` |
| **🧬 Líneas de Investigación**| `Lineas_Investigacion` | `data/researchLines.json` | `id`, `titulo_es`, `titulo_en`, `descripcion_es`, `descripcion_en`, `imagen` |
| **📄 Papers de Investigación**| `Papers` | `data/papers.json` | `paperId`, `fechaPublicacion`, `titulo`, `publicadoEn`, `enlace`, `autores` |
| **🛠️ Servicios Tecnológicos** | `Servicios` | `data/servicios.json` | `id`, `titulo_es`, `titulo_en`, `descripcion_es`, `descripcion_en` |

---

## 🚀 Guía de Instalación Rápida (Paso a Paso)

### Paso 1: Crear una nueva planilla de Google Sheets
1. Entra a [Google Sheets](https://sheets.google.com) y crea una nueva planilla en blanco.
2. Nómbrala, por ejemplo: **"LFGBBP - Base de Datos Web"**.

### Paso 2: Abrir el editor de Apps Script
1. En el menú superior de Google Sheets, haz clic en **Extensiones** > **Apps Script**.
2. Se abrirá una pestaña con el editor de código.

### Paso 3: Copiar los archivos del proyecto
Crea los siguientes 4 archivos en el editor de Apps Script copiando el código de esta carpeta:

1. **`Code.gs`** (o `Code.js`):
   - Reemplaza el contenido del archivo `Código.gs` existente con el código de [`Code.js`](./Code.js).
2. **`InitialData.gs`** (o `InitialData.js`):
   - Haz clic en el botón **+** (Agregar un archivo) > **Secuencia de comandos** (Script).
   - Nómbralo `InitialData` y pega el código de [`InitialData.js`](./InitialData.js).
3. **`Sidebar.html`**:
   - Haz clic en el botón **+** > **HTML**.
   - Nómbralo `Sidebar` y pega el código de [`Sidebar.html`](./Sidebar.html).
4. **`ExportModal.html`**:
   - Haz clic en el botón **+** > **HTML**.
   - Nómbralo `ExportModal` y pega el código de [`ExportModal.html`](./ExportModal.html).

> **Nota:** Haz clic en el ícono de **Guardar proyecto (💾)** o presiona `Ctrl + S`.

### Paso 4: Inicializar la planilla y cargar los datos actuales
1. Regresa a la pestaña de tu Google Sheet y recárgala (`F5`).
2. En la barra superior aparecerá el nuevo menú: **`🔬 LFGBBP Gestión`**.
3. Haz clic en **`🔬 LFGBBP Gestión`** > **`⚙️ Inicializar y Formatear Hojas`**:
   - Se crearán y formatearán automáticamente las 6 hojas con los colores institucionales y encabezados correctos.
4. Haz clic en **`🔬 LFGBBP Gestión`** > **`📥 Cargar Datos Iniciales (desde JSON)`**:
   - Se importarán automáticamente todos los investigadores, papers, líneas, ex-miembros, colaboradores y servicios actuales del laboratorio.

---

## 💡 Cómo Usar el Script

### 1. Panel Lateral de Gestión (Sidebar)
Haz clic en **`🔬 LFGBBP Gestión`** > **`📱 Abrir Panel de Gestión (Sidebar)`**:

- **Navegación:** Cambia entre los 6 módulos con los botones superiores (`👤 Investigadores`, `🎓 Ex-Miembros`, `🤝 Colaboradores`, `🧬 Líneas`, `📄 Papers`, `🛠️ Servicios`).
- **Agregar Nuevo:**
  1. Selecciona el modo **`➕ Agregar Nuevo`**.
  2. Completa los campos (los campos en español tienen etiqueta <span style="background:#e2e8f0;color:#2b6cb0;padding:2px 4px;border-radius:3px;">ES</span> y en inglés <span style="background:#feebc8;color:#c05621;padding:2px 4px;border-radius:3px;">EN</span>).
  3. Haz clic en **`💾 Guardar`**. El script calcula automáticamente el siguiente ID y agrega la fila a la hoja.
- **Modificar Existente:**
  1. Selecciona el modo **`✏️ Modificar Existente`**.
  2. Elige el registro en la lista desplegable. Los datos se cargarán al instante en el formulario.
  3. Modifica los campos que desees y haz clic en **`💾 Guardar Cambios`**.
  4. También dispones de un botón **`🗑️ Eliminar`** para remover un registro si fuera necesario.

### 2. Edición Rápida desde la Fila Seleccionada
Si estás revisando una hoja (por ejemplo, `Papers`) y ves una fila que deseas corregir:
1. Haz clic sobre cualquier celda de esa fila.
2. Ve al menú **`🔬 LFGBBP Gestión`** > **`✏️ Editar registro de fila seleccionada`**.
3. El panel lateral se abrirá inmediatamente con los datos de esa fila listos para editar.

### 3. Edición Directa en las Hojas (con Auto-ID)
También puedes escribir directamente en las celdas de Google Sheets:
- Si agregas una fila nueva al final y dejas la columna **ID** vacía, el trigger `onEdit` le asignará automáticamente el siguiente ID correlativo.
- Si en algún momento quedan filas con IDs faltantes, puedes usar **`🔬 LFGBBP Gestión`** > **`🔢 Asignar / Reparar IDs faltantes`**.

---

## 📤 Exportar a JSON y Actualizar el Sitio Web

Cuando termines de agregar o modificar información y quieras publicar los cambios en el sitio web:

1. En Google Sheets, ve a **`🔬 LFGBBP Gestión`** > **`📤 Exportar Datos a JSON`**.
2. Se abrirá una ventana con pestañas para cada uno de los 6 archivos JSON.
3. Tienes 3 opciones:
   - **`📋 Copiar JSON`**: Copia el JSON actual al portapapeles para pegarlo en el editor.
   - **`💾 Descargar Archivo`**: Descarga directamente el archivo `.json` seleccionado.
   - **`📦 Descargar Todos (.JSON)`**: Descarga los 6 archivos `.json` juntos a tu computadora.
4. Guarda los archivos descargados dentro de la carpeta **`data/`** del repositorio:
   ```text
   lfgbbp.github.io/
   ├── data/
   │   ├── colaboradores.json
   │   ├── investigadoresAct.json
   │   ├── investigadoresPast.json
   │   ├── papers.json
   │   ├── researchLines.json
   │   └── servicios.json
   ```
5. Realiza commit y push a GitHub:
   ```bash
   git add data/
   git commit -m "Actualizar datos desde Google Sheets"
   git push
   ```
   ¡Y listo! Los cambios se reflejarán inmediatamente en el sitio web en vivo.

---

## 🌐 Opción Avanzada: Web App / API REST en Vivo

El script incluye una función `doGet(e)` para convertir la planilla en una API REST pública si se desea consumir los datos en tiempo real:

1. En el editor de Apps Script, ve a **Implementar** (Deploy) > **Nueva implementación**.
2. Tipo: **Aplicación web**.
3. Ejecutar como: **Yo** (tu cuenta).
4. Quién tiene acceso: **Cualquier usuario** (Anyone).
5. Copia la URL generada. Ahora puedes consultar los datos en vivo:
   - `https://script.google.com/macros/s/.../exec?type=all`
   - `https://script.google.com/macros/s/.../exec?type=papers`
   - `https://script.google.com/macros/s/.../exec?type=investigadores`
   - `https://script.google.com/macros/s/.../exec?type=servicios`
   - `https://script.google.com/macros/s/.../exec?type=lineas`
   - `https://script.google.com/macros/s/.../exec?type=colaboradores`
   - `https://script.google.com/macros/s/.../exec?type=exmiembros`
