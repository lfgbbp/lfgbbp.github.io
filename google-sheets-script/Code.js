/**
 * ==============================================================================
 * LFGBBP - SISTEMA DE GESTIÓN DE CONTENIDO PARA GOOGLE SHEETS
 * Laboratorio de Fisiología y Genética de Bacterias Beneficiosas para Plantas
 * Universidad Nacional de Quilmes (UNQ) - CONICET - CIC-BA
 * ==============================================================================
 * 
 * Este script permite administrar directamente desde Google Sheets los 6 módulos
 * de datos que alimentan el sitio web oficial (https://lfgbbp.github.io):
 * 
 * 1. Investigadores Actuales    -> data/investigadoresAct.json
 * 2. Ex-Miembros / Becarios     -> data/investigadoresPast.json
 * 3. Colaboradores Científicos  -> data/colaboradores.json
 * 4. Líneas de Investigación    -> data/researchLines.json
 * 5. Papers de Investigación    -> data/papers.json
 * 6. Servicios Tecnológicos     -> data/servicios.json
 */

/* ==============================================================================
 * 1. CONFIGURACIÓN GLOBAL Y ESQUEMA DE DATOS
 * ============================================================================== */
const CONFIG = {
  UI_TITLE: 'LFGBBP - Panel de Gestión',
  PRIMARY_COLOR: '#1a365d', // Azul institucional
  SECONDARY_COLOR: '#2b6cb0',
  ACCENT_COLOR: '#319795',
  
  SHEETS: {
    INVESTIGADORES: {
      key: 'INVESTIGADORES',
      sheetName: 'Investigadores',
      tabColor: '#1a365d',
      jsonFile: 'investigadoresAct.json',
      idField: 'id',
      idType: 'number',
      label: 'Investigador',
      pluralLabel: 'Investigadores',
      icon: '👤',
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'nombre', label: 'Nombre', width: 130, type: 'string', required: true },
        { key: 'apellido', label: 'Apellido', width: 130, type: 'string', required: true },
        { key: 'titulo_es', label: 'Título (ES)', width: 260, type: 'string', required: true },
        { key: 'titulo_en', label: 'Título (EN)', width: 260, type: 'string', required: true },
        { key: 'fotoUrl', label: 'Foto URL / Ruta', width: 220, type: 'string', required: false, hint: 'Ej: ./imgs/investigadores/foto claudio.jpg' },
        { key: 'descripcion_es', label: 'Descripción (ES)', width: 380, type: 'multiline', required: true },
        { key: 'descripcion_en', label: 'Descripción (EN)', width: 380, type: 'multiline', required: true }
      ],
      getDisplayLabel: function(item) {
        return `#${item.id} - ${item.apellido || ''}, ${item.nombre || ''} (${item.titulo_es ? item.titulo_es.substring(0, 30) + '...' : ''})`;
      }
    },

    EX_MIEMBROS: {
      key: 'EX_MIEMBROS',
      sheetName: 'Ex-Miembros',
      tabColor: '#2b6cb0',
      jsonFile: 'investigadoresPast.json',
      idField: 'id',
      idType: 'number',
      label: 'Ex-Miembro',
      pluralLabel: 'Ex-Miembros',
      icon: '🎓',
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'nombre_es', label: 'Nombre (ES)', width: 180, type: 'string', required: true },
        { key: 'nombre_en', label: 'Nombre (EN)', width: 180, type: 'string', required: true },
        { key: 'participacion_es', label: 'Participación (ES)', width: 190, type: 'string', required: true, hint: 'Ej: Doctorado, Seminario de Investigación, Tesina' },
        { key: 'participacion_en', label: 'Participación (EN)', width: 190, type: 'string', required: true, hint: 'Ej: PhD, Research Seminar, Thesis' },
        { key: 'lugarDeTrabajoActual_es', label: 'Lugar de Trabajo Actual (ES)', width: 300, type: 'string', required: true },
        { key: 'lugarDeTrabajoActual_en', label: 'Lugar de Trabajo Actual (EN)', width: 300, type: 'string', required: true }
      ],
      getDisplayLabel: function(item) {
        return `#${item.id} - ${item.nombre_es || 'Sin nombre'} (${item.participacion_es || ''})`;
      }
    },

    COLABORADORES: {
      key: 'COLABORADORES',
      sheetName: 'Colaboradores',
      tabColor: '#2c7a7b',
      jsonFile: 'colaboradores.json',
      idField: 'id',
      idType: 'number',
      label: 'Colaborador',
      pluralLabel: 'Colaboradores',
      icon: '🤝',
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'nombre_es', label: 'Nombre (ES)', width: 180, type: 'string', required: true },
        { key: 'nombre_en', label: 'Nombre (EN)', width: 180, type: 'string', required: true },
        { key: 'lugarDeTrabajoActual_es', label: 'Lugar de Trabajo Actual (ES)', width: 320, type: 'string', required: true },
        { key: 'lugarDeTrabajoActual_en', label: 'Lugar de Trabajo Actual (EN)', width: 320, type: 'string', required: true }
      ],
      getDisplayLabel: function(item) {
        return `#${item.id} - ${item.nombre_es || 'Sin nombre'}`;
      }
    },

    LINEAS: {
      key: 'LINEAS',
      sheetName: 'Lineas_Investigacion',
      tabColor: '#38a169',
      jsonFile: 'researchLines.json',
      idField: 'id',
      idType: 'number',
      label: 'Línea de Investigación',
      pluralLabel: 'Líneas de Investigación',
      icon: '🧬',
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'titulo_es', label: 'Título (ES)', width: 280, type: 'string', required: true },
        { key: 'titulo_en', label: 'Título (EN)', width: 280, type: 'string', required: true },
        { key: 'descripcion_es', label: 'Descripción (ES)', width: 400, type: 'multiline', required: true },
        { key: 'descripcion_en', label: 'Descripción (EN)', width: 400, type: 'multiline', required: true },
        { key: 'imagen', label: 'Imagen URL / Ruta', width: 220, type: 'string', required: false, hint: 'Ej: ./imgs/lineas/linea1_2.jpeg' }
      ],
      getDisplayLabel: function(item) {
        const title = (item.titulo_es || '').replace(/<[^>]+>/g, '');
        return `#${item.id} - ${title.substring(0, 45)}...`;
      }
    },

    PAPERS: {
      key: 'PAPERS',
      sheetName: 'Papers',
      tabColor: '#d69e2e',
      jsonFile: 'papers.json',
      idField: 'paperId',
      idType: 'number',
      label: 'Paper de Investigación',
      pluralLabel: 'Papers de Investigación',
      icon: '📄',
      columns: [
        { key: 'paperId', label: 'Paper ID', width: 80, type: 'number', required: true },
        { key: 'fechaPublicacion', label: 'Año / Fecha', width: 100, type: 'string', required: true, hint: 'Ej: 2024' },
        { key: 'titulo', label: 'Título', width: 340, type: 'multiline', required: true },
        { key: 'publicadoEn', label: 'Revista / Journal', width: 220, type: 'string', required: true, hint: 'Ej: PLANTS, Molecular Microbiology' },
        { key: 'enlace', label: 'Enlace (DOI / URL)', width: 260, type: 'string', required: true, hint: 'Ej: https://doi.org/10.3390/plants13152130' },
        { key: 'autores', label: 'Autores', width: 320, type: 'string', required: true, hint: 'Ej: Lorch, M., Valverde, C., Agaras, B.' }
      ],
      getDisplayLabel: function(item) {
        const title = item.titulo || 'Sin título';
        return `[${item.fechaPublicacion || 'S/A'}] #${item.paperId} - ${title.substring(0, 40)}...`;
      }
    },

    SERVICIOS: {
      key: 'SERVICIOS',
      sheetName: 'Servicios',
      tabColor: '#805ad5',
      jsonFile: 'servicios.json',
      idField: 'id',
      idType: 'number',
      label: 'Servicio',
      pluralLabel: 'Servicios',
      icon: '🛠️',
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'titulo_es', label: 'Título (ES)', width: 260, type: 'string', required: true },
        { key: 'titulo_en', label: 'Título (EN)', width: 260, type: 'string', required: true },
        { key: 'descripcion_es', label: 'Descripción (ES)', width: 400, type: 'multiline', required: true },
        { key: 'descripcion_en', label: 'Descripción (EN)', width: 400, type: 'multiline', required: true }
      ],
      getDisplayLabel: function(item) {
        return `#${item.id} - ${item.titulo_es || 'Sin título'}`;
      }
    }
  }
};

/* ==============================================================================
 * 2. MENÚ PRINCIPAL Y DISPARADORES DE HOJA (onOpen, onEdit)
 * ============================================================================== */

/**
 * Se ejecuta automáticamente al abrir el archivo de Google Sheets.
 * Crea el menú personalizado "🔬 LFGBBP Gestión".
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  const menu = ui.createMenu('🔬 LFGBBP Gestión')
    .addItem('📱 Abrir Panel de Gestión (Sidebar)', 'showSidebar')
    .addItem('✏️ Editar registro de fila seleccionada', 'editSelectedRow')
    .addSeparator();

  // Submenú para agregar o modificar módulo por módulo
  const subMenu = ui.createMenu('➕ Agregar / ✏️ Modificar...')
    .addItem('👤 Investigadores Actuales', 'openInvestigadoresForm')
    .addItem('🎓 Ex-Miembros', 'openExMiembrosForm')
    .addItem('🤝 Colaboradores', 'openColaboradoresForm')
    .addItem('🧬 Líneas de Investigación', 'openLineasForm')
    .addItem('📄 Papers de Investigación', 'openPapersForm')
    .addItem('🛠️ Servicios', 'openServiciosForm');
  
  menu.addSubMenu(subMenu)
    .addSeparator()
    .addItem('⚙️ Inicializar y Formatear Hojas', 'setupAllSheets')
    .addItem('📥 Cargar Datos Iniciales (desde JSON)', 'populateInitialData')
    .addItem('📤 Exportar Datos a JSON', 'showExportDialog')
    .addSeparator()
    .addItem('🔢 Asignar / Reparar IDs faltantes', 'fixMissingIds')
    .addToUi();
}

/**
 * Trigger que detecta si el usuario escribe directamente en una fila y no tiene ID.
 * Genera automáticamente el ID correlativo correspondiente.
 */
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  
  // Buscar a qué entidad pertenece la hoja
  let matchedConfig = null;
  for (const key in CONFIG.SHEETS) {
    if (CONFIG.SHEETS[key].sheetName === sheetName) {
      matchedConfig = CONFIG.SHEETS[key];
      break;
    }
  }
  if (!matchedConfig) return;

  const row = e.range.getRow();
  if (row <= 1) return; // Encabezado

  const idCol = 1; // El ID siempre está en la columna 1
  const idCell = sheet.getRange(row, idCol);
  const currentId = idCell.getValue();

  // Si la celda de ID está vacía pero hay datos en otras columnas de esa fila
  if (currentId === '' || currentId === null || currentId === undefined) {
    const numCols = matchedConfig.columns.length;
    const rowValues = sheet.getRange(row, 1, 1, numCols).getValues()[0];
    const hasData = rowValues.slice(1).some(val => val !== '' && val !== null && val !== undefined);
    
    if (hasData) {
      const nextId = getNextAvailableId(matchedConfig);
      idCell.setValue(nextId);
      idCell.setHorizontalAlignment('center');
    }
  }
}

/* ==============================================================================
 * 3. APERTURA DE DIÁLOGOS Y SIDEBAR
 * ============================================================================== */

/**
 * Abre el sidebar principal de gestión con la sección por defecto o la especificada.
 */
function showSidebar(initialSection) {
  const sectionKey = (typeof initialSection === 'string' && CONFIG.SHEETS[initialSection])
    ? initialSection
    : 'INVESTIGADORES';

  let html;
  try {
    const template = HtmlService.createTemplateFromFile('Sidebar');
    template.initialSection = sectionKey;
    template.initialRecordId = '';
    html = template.evaluate()
      .setTitle(CONFIG.UI_TITLE)
      .setWidth(450);
  } catch (err) {
    // Si no se encuentra Sidebar.html como archivo separado, generar fallback integrado
    html = HtmlService.createHtmlOutput(getEmbeddedSidebarHtml(sectionKey, ''))
      .setTitle(CONFIG.UI_TITLE)
      .setWidth(450);
  }
  
  SpreadsheetApp.getUi().showSidebar(html);
}

/** Accesos directos desde el submenú */
function openInvestigadoresForm() { showSidebar('INVESTIGADORES'); }
function openExMiembrosForm()    { showSidebar('EX_MIEMBROS'); }
function openColaboradoresForm()  { showSidebar('COLABORADORES'); }
function openLineasForm()         { showSidebar('LINEAS'); }
function openPapersForm()         { showSidebar('PAPERS'); }
function openServiciosForm()      { showSidebar('SERVICIOS'); }

/**
 * Detecta la fila activa seleccionada en la planilla y abre el panel
 * cargando automáticamente dicho registro para su edición inmediata.
 */
function editSelectedRow() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getActiveSheet();
  const sheetName = sheet.getName();

  let matchedKey = null;
  for (const k in CONFIG.SHEETS) {
    if (CONFIG.SHEETS[k].sheetName === sheetName) {
      matchedKey = k;
      break;
    }
  }

  if (!matchedKey) {
    SpreadsheetApp.getUi().alert(
      'Aviso',
      'Por favor colócate en una de las hojas de datos (Investigadores, Ex-Miembros, Colaboradores, Lineas_Investigacion, Papers o Servicios) y selecciona una fila.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    return;
  }

  const activeRow = sheet.getActiveCell().getRow();
  if (activeRow <= 1) {
    SpreadsheetApp.getUi().alert('Aviso', 'Selecciona una fila de datos (fila 2 en adelante).', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  const idVal = sheet.getRange(activeRow, 1).getValue();
  if (!idVal) {
    SpreadsheetApp.getUi().alert('Aviso', 'La fila seleccionada no tiene un ID válido.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  // Abrir sidebar indicando qué elemento cargar
  showSidebarWithSelectedRecord(matchedKey, idVal);
}

/**
 * Abre el sidebar pasando el ID seleccionado para carga automática
 */
function showSidebarWithSelectedRecord(sectionKey, recordId) {
  let html;
  try {
    const template = HtmlService.createTemplateFromFile('Sidebar');
    template.initialSection = sectionKey;
    template.initialRecordId = recordId;
    html = template.evaluate().setTitle(CONFIG.UI_TITLE).setWidth(450);
  } catch (err) {
    html = HtmlService.createHtmlOutput(getEmbeddedSidebarHtml(sectionKey, recordId))
      .setTitle(CONFIG.UI_TITLE)
      .setWidth(450);
  }
  SpreadsheetApp.getUi().showSidebar(html);
}

/**
 * Muestra el modal para exportar todos los datos a JSON.
 */
function showExportDialog() {
  let html;
  try {
    html = HtmlService.createTemplateFromFile('ExportModal')
      .evaluate()
      .setWidth(850)
      .setHeight(620);
  } catch (err) {
    html = HtmlService.createHtmlOutput(getEmbeddedExportModalHtml())
      .setWidth(850)
      .setHeight(620);
  }
  SpreadsheetApp.getUi().showModalDialog(html, '📤 Exportar Datos para el Sitio Web');
}

/* ==============================================================================
 * 4. CONFIGURACIÓN Y MANTENIMIENTO DE HOJAS (setupAllSheets, fixMissingIds)
 * ============================================================================== */

/**
 * Crea las 6 hojas con sus encabezados estilizados, anchos de columna y colores.
 */
function setupAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let createdCount = 0;

  for (const key in CONFIG.SHEETS) {
    const cfg = CONFIG.SHEETS[key];
    let sheet = ss.getSheetByName(cfg.sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(cfg.sheetName);
      createdCount++;
    }

    try {
      sheet.setTabColor(cfg.tabColor);
    } catch(e) {}

    // Configurar encabezados
    const headers = cfg.columns.map(col => col.label);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    
    // Estilos del encabezado
    headerRange
      .setBackground(CONFIG.PRIMARY_COLOR)
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setFontSize(10)
      .setVerticalAlignment('middle')
      .setHorizontalAlignment('center');
    
    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);

    // Configurar anchos de columna
    cfg.columns.forEach((col, idx) => {
      sheet.setColumnWidth(idx + 1, col.width);
    });

    // Formatear columna de ID
    const maxRows = Math.max(sheet.getMaxRows(), 2);
    const idRange = sheet.getRange(2, 1, maxRows - 1, 1);
    idRange.setHorizontalAlignment('center').setNumberFormat('0');
  }

  SpreadsheetApp.getActiveSpreadsheet().toast('Todas las hojas están listas y configuradas correctamente.', '✅ Éxito', 5);
}

/**
 * Busca filas con datos que no tengan ID asignado y les asigna el correlativo siguiente.
 */
function fixMissingIds() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let totalFixed = 0;

  for (const key in CONFIG.SHEETS) {
    const cfg = CONFIG.SHEETS[key];
    const sheet = ss.getSheetByName(cfg.sheetName);
    if (!sheet) continue;

    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) continue;

    const data = sheet.getRange(2, 1, lastRow - 1, cfg.columns.length).getValues();
    let maxId = 0;

    data.forEach(row => {
      const id = Number(row[0]);
      if (!isNaN(id) && id > maxId) maxId = id;
    });

    if (maxId === 0 && cfg.key === 'PAPERS') maxId = 99;

    data.forEach((row, idx) => {
      const currentId = row[0];
      const hasContent = row.slice(1).some(val => val !== '' && val !== null && val !== undefined);
      
      if (hasContent && (currentId === '' || currentId === null || isNaN(Number(currentId)))) {
        maxId++;
        sheet.getRange(idx + 2, 1).setValue(maxId).setHorizontalAlignment('center');
        totalFixed++;
      }
    });
  }

  SpreadsheetApp.getUi().alert(
    'Validación Completa',
    `Se repararon / asignaron ${totalFixed} IDs faltantes.`,
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Calcula el siguiente ID disponible para una entidad.
 */
function getNextAvailableId(cfg) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) return (cfg.key === 'PAPERS') ? 100 : 1;

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return (cfg.key === 'PAPERS') ? 100 : 1;

  const idValues = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let maxId = (cfg.key === 'PAPERS') ? 99 : 0;

  idValues.forEach(row => {
    const val = Number(row[0]);
    if (!isNaN(val) && val > maxId) {
      maxId = val;
    }
  });

  return maxId + 1;
}

/* ==============================================================================
 * 5. CARGA DE DATOS INICIALES (DESDE JSON / SEED DATA)
 * ============================================================================== */

/**
 * Puebla la planilla con los datos existentes del laboratorio definidos en InitialData.js
 */
function populateInitialData() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Confirmar Carga Inicial',
    'Esta acción importará todos los datos actuales del laboratorio (investigadores, ex-miembros, colaboradores, líneas, papers y servicios) en las hojas correspondientes.\n\n¿Deseas continuar?',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  // Asegurar que las hojas existen
  setupAllSheets();

  if (typeof SEED_DATA === 'undefined') {
    ui.alert(
      'Error',
      'No se encontró la variable SEED_DATA. Asegúrate de incluir el archivo InitialData.js en tu proyecto de Apps Script.',
      ui.ButtonSet.OK
    );
    return;
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let summary = [];

  for (const key in CONFIG.SHEETS) {
    const cfg = CONFIG.SHEETS[key];
    const sheet = ss.getSheetByName(cfg.sheetName);
    const dataList = SEED_DATA[key];

    if (!sheet || !Array.isArray(dataList)) continue;

    // Limpiar filas previas respetando el encabezado
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
    }

    if (dataList.length === 0) continue;

    // Mapear objetos a matriz bidimensional
    const rows = dataList.map(item => {
      return cfg.columns.map(col => {
        const val = item[col.key];
        return (val !== undefined && val !== null) ? val : '';
      });
    });

    const range = sheet.getRange(2, 1, rows.length, cfg.columns.length);
    range.setValues(rows);
    range.setVerticalAlignment('top');

    // Centrar la columna de ID
    sheet.getRange(2, 1, rows.length, 1).setHorizontalAlignment('center');

    summary.push(`• ${cfg.pluralLabel}: ${rows.length} registros`);
  }

  ui.alert(
    '✅ Carga Exitosa',
    'Los datos iniciales fueron importados con éxito:\n\n' + summary.join('\n'),
    ui.ButtonSet.OK
  );
}

/* ==============================================================================
 * 6. API INTERNA PARA LA UI (GET, SAVE, DELETE)
 * ============================================================================== */

/**
 * Devuelve la configuración de las entidades para que la UI frontend pueda renderizar los formularios.
 */
function getUIConfiguration() {
  const result = {};
  for (const k in CONFIG.SHEETS) {
    const s = CONFIG.SHEETS[k];
    result[k] = {
      key: s.key,
      sheetName: s.sheetName,
      label: s.label,
      pluralLabel: s.pluralLabel,
      icon: s.icon,
      idField: s.idField,
      columns: s.columns
    };
  }
  return result;
}

/**
 * Obtiene la lista resumida de elementos de una sección para cargar el selector de modificar.
 */
function getEntitiesList(entityKey) {
  const cfg = CONFIG.SHEETS[entityKey];
  if (!cfg) throw new Error('Entidad desconocida: ' + entityKey);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) return [];

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return [];

  const values = sheet.getRange(2, 1, lastRow - 1, cfg.columns.length).getValues();
  const list = [];

  values.forEach((row, idx) => {
    const rawId = row[0];
    if (rawId === '' || rawId === null) return;

    // Reconstruir objeto
    const item = {};
    cfg.columns.forEach((col, cIdx) => {
      item[col.key] = row[cIdx];
    });

    list.push({
      id: rawId,
      rowIndex: idx + 2,
      displayLabel: cfg.getDisplayLabel(item)
    });
  });

  return list;
}

/**
 * Obtiene el registro completo dado su ID.
 */
function getEntityRecord(entityKey, id) {
  const cfg = CONFIG.SHEETS[entityKey];
  if (!cfg) throw new Error('Entidad desconocida: ' + entityKey);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) return null;

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return null;

  const values = sheet.getRange(2, 1, lastRow - 1, cfg.columns.length).getValues();

  for (let i = 0; i < values.length; i++) {
    const row = values[i];
    // Comparación flexible numérica o string
    if (String(row[0]).trim() === String(id).trim()) {
      const record = {};
      cfg.columns.forEach((col, cIdx) => {
        record[col.key] = row[cIdx];
      });
      return record;
    }
  }

  return null;
}

/**
 * Agrega o modifica un registro.
 * @param {string} entityKey - Clave de la entidad (ej: 'INVESTIGADORES')
 * @param {Object} data - Objeto con los datos del formulario
 * @param {boolean} isNew - true para agregar, false para modificar
 */
function saveEntityRecord(entityKey, data, isNew) {
  const cfg = CONFIG.SHEETS[entityKey];
  if (!cfg) throw new Error('Entidad inválida: ' + entityKey);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) {
    setupAllSheets();
    sheet = ss.getSheetByName(cfg.sheetName);
  }

  // Validaciones mínimas
  cfg.columns.forEach(col => {
    if (col.required && col.key !== cfg.idField) {
      const val = data[col.key];
      if (val === undefined || val === null || String(val).trim() === '') {
        throw new Error(`El campo "${col.label}" es obligatorio.`);
      }
    }
  });

  let targetId = data[cfg.idField];
  let targetRow = -1;

  if (isNew) {
    targetId = getNextAvailableId(cfg);
    data[cfg.idField] = targetId;
    targetRow = sheet.getLastRow() + 1;
  } else {
    // Buscar la fila existente por ID
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
      for (let i = 0; i < ids.length; i++) {
        if (String(ids[i][0]).trim() === String(targetId).trim()) {
          targetRow = i + 2;
          break;
        }
      }
    }
    if (targetRow === -1) {
      throw new Error(`No se encontró el registro con ID ${targetId} para actualizar.`);
    }
  }

  // Convertir datos a fila según el orden de columnas
  const rowData = cfg.columns.map(col => {
    let val = data[col.key];
    if (val === undefined || val === null) val = '';
    // Asegurar número para campos ID
    if (col.type === 'number' && val !== '') {
      const num = Number(val);
      if (!isNaN(num)) return num;
    }
    return String(val);
  });

  const range = sheet.getRange(targetRow, 1, 1, rowData.length);
  range.setValues([rowData]);
  range.setVerticalAlignment('top');

  // Centrar ID
  sheet.getRange(targetRow, 1).setHorizontalAlignment('center');

  // Si es un paper, centrar el año de publicación
  if (cfg.key === 'PAPERS') {
    sheet.getRange(targetRow, 2).setHorizontalAlignment('center');
  }

  return {
    success: true,
    isNew: isNew,
    id: targetId,
    message: isNew 
      ? `✅ ${cfg.label} agregado exitosamente con ID ${targetId}.` 
      : `✅ ${cfg.label} #${targetId} actualizado correctamente.`
  };
}

/**
 * Elimina un registro por ID.
 */
function deleteEntityRecord(entityKey, id) {
  const cfg = CONFIG.SHEETS[entityKey];
  if (!cfg) throw new Error('Entidad inválida: ' + entityKey);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) throw new Error('Hoja no encontrada: ' + cfg.sheetName);

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) throw new Error('La hoja está vacía.');

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let targetRow = -1;

  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim() === String(id).trim()) {
      targetRow = i + 2;
      break;
    }
  }

  if (targetRow === -1) {
    throw new Error(`No se encontró el registro con ID ${id} para eliminar.`);
  }

  sheet.deleteRow(targetRow);

  return {
    success: true,
    id: id,
    message: `🗑️ ${cfg.label} #${id} eliminado correctamente.`
  };
}

/* ==============================================================================
 * 7. EXPORTACIÓN A JSON Y WEB APP (doGet)
 * ============================================================================== */

/**
 * Lee todas las hojas y genera los objetos JSON limpios compatibles con el sitio web.
 */
function exportAllJsonData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const result = {};

  for (const key in CONFIG.SHEETS) {
    const cfg = CONFIG.SHEETS[key];
    const sheet = ss.getSheetByName(cfg.sheetName);
    const items = [];

    if (sheet && sheet.getLastRow() > 1) {
      const lastRow = sheet.getLastRow();
      const numCols = cfg.columns.length;
      const values = sheet.getRange(2, 1, lastRow - 1, numCols).getValues();

      values.forEach(row => {
        // Ignorar filas totalmente vacías
        const hasData = row.some(cell => cell !== '' && cell !== null && cell !== undefined);
        if (!hasData) return;

        const item = {};
        cfg.columns.forEach((col, colIdx) => {
          let cellValue = row[colIdx];
          
          if (col.type === 'number') {
            cellValue = Number(cellValue);
            if (isNaN(cellValue)) cellValue = 0;
          } else {
            // Limpiar saltos de línea innecesarios al final
            cellValue = (cellValue !== null && cellValue !== undefined) ? String(cellValue).trim() : '';
          }
          item[col.key] = cellValue;
        });

        items.push(item);
      });
    }

    result[cfg.jsonFile] = {
      filename: cfg.jsonFile,
      label: cfg.pluralLabel,
      icon: cfg.icon,
      count: items.length,
      jsonString: JSON.stringify(items, null, '\t') // Formateado con tabs para coincidir con el repo
    };
  }

  return result;
}

/**
 * Endpoint Web App para servir los datos JSON directamente si se publica como aplicación web.
 * Permite llamadas GET como:
 * - ?type=all
 * - ?type=papers
 * - ?type=investigadores
 * - ?type=servicios
 */
function doGet(e) {
  const data = exportAllJsonData();
  const type = (e && e.parameter && e.parameter.type) ? e.parameter.type.toLowerCase() : 'all';

  let responseData;
  if (type === 'papers' || type === 'papers.json') {
    responseData = JSON.parse(data['papers.json'].jsonString);
  } else if (type === 'investigadores' || type === 'investigadoresact.json') {
    responseData = JSON.parse(data['investigadoresAct.json'].jsonString);
  } else if (type === 'exmiembros' || type === 'investigadorespast.json') {
    responseData = JSON.parse(data['investigadoresPast.json'].jsonString);
  } else if (type === 'colaboradores' || type === 'colaboradores.json') {
    responseData = JSON.parse(data['colaboradores.json'].jsonString);
  } else if (type === 'lineas' || type === 'researchlines.json') {
    responseData = JSON.parse(data['researchLines.json'].jsonString);
  } else if (type === 'servicios' || type === 'servicios.json') {
    responseData = JSON.parse(data['servicios.json'].jsonString);
  } else {
    // Todos los módulos
    responseData = {
      investigadoresAct: JSON.parse(data['investigadoresAct.json'].jsonString),
      investigadoresPast: JSON.parse(data['investigadoresPast.json'].jsonString),
      colaboradores: JSON.parse(data['colaboradores.json'].jsonString),
      researchLines: JSON.parse(data['researchLines.json'].jsonString),
      papers: JSON.parse(data['papers.json'].jsonString),
      servicios: JSON.parse(data['servicios.json'].jsonString)
    };
  }

  return ContentService.createTextOutput(JSON.stringify(responseData, null, 2))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ==============================================================================
 * 8. PLANTILLAS HTML INTEGRADAS (FALLBACK AUTOMÁTICO)
 * ============================================================================== */

/**
 * Fallback en caso de que Sidebar.html no esté creado como archivo separado en Apps Script.
 */
function getEmbeddedSidebarHtml(initialSection, initialRecordId) {
  return `
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --primary: #1a365d;
        --primary-light: #2b6cb0;
        --accent: #319795;
        --bg: #f7fafc;
        --card-bg: #ffffff;
        --text: #2d3748;
        --text-muted: #718096;
        --border: #e2e8f0;
        --success: #38a169;
        --danger: #e53e3e;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', sans-serif;
        background: var(--bg);
        color: var(--text);
        padding: 12px;
        font-size: 13px;
      }
      .header {
        background: linear-gradient(135deg, var(--primary), var(--primary-light));
        color: white;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 12px;
        text-align: center;
      }
      .header h2 { font-size: 15px; font-weight: 700; margin-bottom: 4px; }
      .header p { font-size: 11px; opacity: 0.9; }

      .section-nav {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 6px;
        margin-bottom: 12px;
      }
      .nav-btn {
        background: white;
        border: 1px solid var(--border);
        padding: 8px 4px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        transition: all 0.15s ease;
      }
      .nav-btn:hover { border-color: var(--primary-light); background: #ebf8ff; }
      .nav-btn.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }

      .mode-toggle {
        display: flex;
        background: #edf2f7;
        border-radius: 6px;
        padding: 3px;
        margin-bottom: 12px;
      }
      .mode-btn {
        flex: 1;
        padding: 6px;
        border: none;
        background: transparent;
        font-size: 11px;
        font-weight: 600;
        border-radius: 4px;
        cursor: pointer;
        color: var(--text-muted);
      }
      .mode-btn.active {
        background: white;
        color: var(--primary);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .card {
        background: white;
        border: 1px solid var(--border);
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;
      }

      .field-group { margin-bottom: 10px; }
      .field-label {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 11px;
        font-weight: 600;
        margin-bottom: 4px;
        color: #4a5568;
      }
      .tag-es { background: #e2e8f0; color: #2b6cb0; padding: 1px 4px; border-radius: 3px; font-size: 9px; }
      .tag-en { background: #feebc8; color: #c05621; padding: 1px 4px; border-radius: 3px; font-size: 9px; }
      .tag-req { color: var(--danger); font-weight: bold; }

      input[type="text"], input[type="number"], select, textarea {
        width: 100%;
        padding: 7px 9px;
        border: 1px solid var(--border);
        border-radius: 5px;
        font-size: 12px;
        font-family: inherit;
        background: white;
      }
      input:focus, select:focus, textarea:focus {
        border-color: var(--primary-light);
        outline: none;
        box-shadow: 0 0 0 2px rgba(43, 108, 176, 0.15);
      }
      textarea { resize: vertical; min-height: 60px; line-height: 1.4; }
      .hint { font-size: 10px; color: var(--text-muted); margin-top: 3px; }

      .btn-container { display: flex; gap: 8px; margin-top: 14px; }
      .btn {
        flex: 1;
        padding: 9px;
        border: none;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
      }
      .btn-primary { background: var(--primary); color: white; }
      .btn-primary:hover { background: var(--primary-light); }
      .btn-danger { background: #fff5f5; color: var(--danger); border: 1px solid #fed7d7; }
      .btn-danger:hover { background: var(--danger); color: white; }
      .btn-secondary { background: #edf2f7; color: var(--text); }

      .alert {
        padding: 10px;
        border-radius: 6px;
        font-size: 11px;
        margin-bottom: 12px;
        display: none;
      }
      .alert-success { background: #f0fff4; color: #22543d; border: 1px solid #c6f6d5; }
      .alert-error { background: #fff5f5; color: #742a2a; border: 1px solid #fed7d7; }
      .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid white; border-top-color: transparent; border-radius: 50%; animation: spin 0.8s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>LFGBBP - Panel Web</h2>
      <p>Gestor de Contenido para lfgbbp.github.io</p>
    </div>

    <!-- Navegación de Secciones -->
    <div class="section-nav">
      <button class="nav-btn" onclick="selectSection('INVESTIGADORES')"><span>👤</span> Investigadores</button>
      <button class="nav-btn" onclick="selectSection('EX_MIEMBROS')"><span>🎓</span> Ex-Miembros</button>
      <button class="nav-btn" onclick="selectSection('COLABORADORES')"><span>🤝</span> Colaboradores</button>
      <button class="nav-btn" onclick="selectSection('LINEAS')"><span>🧬</span> Líneas</button>
      <button class="nav-btn" onclick="selectSection('PAPERS')"><span>📄</span> Papers</button>
      <button class="nav-btn" onclick="selectSection('SERVICIOS')"><span>🛠️</span> Servicios</button>
    </div>

    <!-- Toggle Modo (Agregar / Modificar) -->
    <div class="mode-toggle">
      <button id="mode-add-btn" class="mode-btn active" onclick="setMode(true)">➕ Agregar Nuevo</button>
      <button id="mode-edit-btn" class="mode-btn" onclick="setMode(false)">✏️ Modificar Existente</button>
    </div>

    <!-- Mensajes de alerta -->
    <div id="alert-box" class="alert"></div>

    <!-- Selector de registro para Modificar -->
    <div id="selector-card" class="card" style="display: none;">
      <div class="field-label">Seleccionar registro para editar:</div>
      <select id="record-select" onchange="onRecordSelectChange()">
        <option value="">-- Cargando lista... --</option>
      </select>
    </div>

    <!-- Formulario Dinámico -->
    <div class="card">
      <div id="form-header" style="font-weight: 700; font-size: 12px; margin-bottom: 12px; color: var(--primary);"></div>
      <form id="dynamic-form" onsubmit="handleFormSubmit(event)">
        <div id="form-fields"></div>
        <div class="btn-container">
          <button type="submit" id="save-btn" class="btn btn-primary">
            <span id="save-btn-text">💾 Guardar</span>
          </button>
          <button type="button" id="delete-btn" class="btn btn-danger" style="display: none;" onclick="handleDelete()">
            🗑️ Eliminar
          </button>
          <button type="button" class="btn btn-secondary" onclick="resetForm()">
            🔄 Limpiar
          </button>
        </div>
      </form>
    </div>

    <script>
      let UI_CONFIG = null;
      let currentSection = '${initialSection || "INVESTIGADORES"}';
      let isNewMode = true;
      let preselectedId = '${initialRecordId || ""}';

      window.onload = function() {
        google.script.run
          .withSuccessHandler(function(config) {
            UI_CONFIG = config;
            selectSection(currentSection);
          })
          .withFailureHandler(showError)
          .getUIConfiguration();
      };

      function selectSection(key) {
        currentSection = key;
        document.querySelectorAll('.nav-btn').forEach(btn => {
          btn.classList.toggle('active', btn.innerText.includes(UI_CONFIG[key].icon) || btn.innerText.includes(UI_CONFIG[key].pluralLabel.substring(0, 5)));
        });

        if (preselectedId) {
          isNewMode = false;
        }
        updateModeUI();
        loadSectionEntities();
        renderForm();
      }

      function setMode(isNew) {
        isNewMode = isNew;
        preselectedId = '';
        updateModeUI();
        if (!isNewMode) {
          loadSectionEntities();
        } else {
          resetForm();
        }
      }

      function updateModeUI() {
        document.getElementById('mode-add-btn').classList.toggle('active', isNewMode);
        document.getElementById('mode-edit-btn').classList.toggle('active', !isNewMode);
        document.getElementById('selector-card').style.display = isNewMode ? 'none' : 'block';
        document.getElementById('delete-btn').style.display = isNewMode ? 'none' : 'block';
        document.getElementById('save-btn-text').innerText = isNewMode ? '➕ Agregar ' + UI_CONFIG[currentSection].label : '💾 Guardar Cambios';
        document.getElementById('form-header').innerText = (isNewMode ? 'Nuevo ' : 'Modificar ') + UI_CONFIG[currentSection].label;
      }

      function loadSectionEntities() {
        const select = document.getElementById('record-select');
        select.innerHTML = '<option value="">-- Cargando... --</option>';

        google.script.run
          .withSuccessHandler(function(list) {
            select.innerHTML = '<option value="">-- Selecciona un registro (' + list.length + ') --</option>';
            list.forEach(item => {
              const opt = document.createElement('option');
              opt.value = item.id;
              opt.text = item.displayLabel;
              if (String(item.id) === String(preselectedId)) {
                opt.selected = true;
              }
              select.appendChild(opt);
            });

            if (preselectedId) {
              onRecordSelectChange();
              preselectedId = '';
            }
          })
          .withFailureHandler(showError)
          .getEntitiesList(currentSection);
      }

      function onRecordSelectChange() {
        const select = document.getElementById('record-select');
        const id = select.value;
        if (!id) {
          resetForm();
          return;
        }

        showAlert('Cargando datos...', 'info');
        google.script.run
          .withSuccessHandler(function(record) {
            hideAlert();
            if (record) {
              populateForm(record);
            }
          })
          .withFailureHandler(showError)
          .getEntityRecord(currentSection, id);
      }

      function renderForm() {
        const container = document.getElementById('form-fields');
        container.innerHTML = '';
        const cfg = UI_CONFIG[currentSection];

        cfg.columns.forEach(col => {
          if (col.key === cfg.idField) {
            // Campo de ID sólo informativo si se edita
            const hiddenId = document.createElement('input');
            hiddenId.type = 'hidden';
            hiddenId.id = 'field_' + col.key;
            hiddenId.name = col.key;
            container.appendChild(hiddenId);
            return;
          }

          const group = document.createElement('div');
          group.className = 'field-group';

          const label = document.createElement('div');
          label.className = 'field-label';
          
          let tagBadge = '';
          if (col.key.endsWith('_es')) tagBadge = '<span class="tag-es">ES</span>';
          if (col.key.endsWith('_en')) tagBadge = '<span class="tag-en">EN</span>';
          
          label.innerHTML = '<span>' + col.label + (col.required ? ' <span class="tag-req">*</span>' : '') + '</span>' + tagBadge;
          group.appendChild(label);

          let input;
          if (col.type === 'multiline') {
            input = document.createElement('textarea');
            input.rows = 3;
          } else {
            input = document.createElement('input');
            input.type = col.type === 'number' ? 'number' : 'text';
          }
          input.id = 'field_' + col.key;
          input.name = col.key;
          if (col.required) input.required = true;
          group.appendChild(input);

          if (col.hint) {
            const hint = document.createElement('div');
            hint.className = 'hint';
            hint.innerText = col.hint;
            group.appendChild(hint);
          }

          container.appendChild(group);
        });
      }

      function populateForm(record) {
        const cfg = UI_CONFIG[currentSection];
        cfg.columns.forEach(col => {
          const el = document.getElementById('field_' + col.key);
          if (el) {
            el.value = (record[col.key] !== undefined && record[col.key] !== null) ? record[col.key] : '';
          }
        });
      }

      function resetForm() {
        document.getElementById('dynamic-form').reset();
        const idField = document.getElementById('field_' + UI_CONFIG[currentSection].idField);
        if (idField) idField.value = '';
        if (isNewMode) {
          hideAlert();
        }
      }

      function handleFormSubmit(e) {
        e.preventDefault();
        const cfg = UI_CONFIG[currentSection];
        const data = {};

        cfg.columns.forEach(col => {
          const el = document.getElementById('field_' + col.key);
          if (el) data[col.key] = el.value;
        });

        const saveBtn = document.getElementById('save-btn');
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="spinner"></span> Guardando...';

        google.script.run
          .withSuccessHandler(function(res) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<span id="save-btn-text">' + (isNewMode ? '➕ Agregar ' + cfg.label : '💾 Guardar Cambios') + '</span>';
            showAlert(res.message, 'success');

            if (isNewMode) {
              resetForm();
            } else {
              loadSectionEntities();
            }
          })
          .withFailureHandler(function(err) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<span id="save-btn-text">' + (isNewMode ? '➕ Agregar ' + cfg.label : '💾 Guardar Cambios') + '</span>';
            showError(err);
          })
          .saveEntityRecord(currentSection, data, isNewMode);
      }

      function handleDelete() {
        const idField = document.getElementById('field_' + UI_CONFIG[currentSection].idField);
        const id = idField ? idField.value : null;
        if (!id) {
          alert('No hay ningún registro seleccionado para eliminar.');
          return;
        }

        if (!confirm('¿Estás seguro de que deseas eliminar este registro permanentemente?')) return;

        showAlert('Eliminando...', 'info');
        google.script.run
          .withSuccessHandler(function(res) {
            showAlert(res.message, 'success');
            resetForm();
            loadSectionEntities();
          })
          .withFailureHandler(showError)
          .deleteEntityRecord(currentSection, id);
      }

      function showAlert(msg, type) {
        const box = document.getElementById('alert-box');
        box.className = 'alert alert-' + (type === 'success' ? 'success' : 'error');
        box.innerText = msg;
        box.style.display = 'block';
      }

      function hideAlert() {
        document.getElementById('alert-box').style.display = 'none';
      }

      function showError(err) {
        showAlert('Error: ' + (err.message || err), 'error');
      }
    </script>
  </body>
</html>
  `;
}

/**
 * Fallback en caso de que ExportModal.html no esté creado como archivo separado en Apps Script.
 */
function getEmbeddedExportModalHtml() {
  return `
<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 15px; margin: 0; background: #f8fafc; font-size: 13px; color: #1e293b; }
      .tabs { display: flex; gap: 4px; border-bottom: 2px solid #e2e8f0; margin-bottom: 12px; overflow-x: auto; }
      .tab { padding: 8px 12px; background: transparent; border: none; cursor: pointer; font-weight: 600; font-size: 12px; border-radius: 6px 6px 0 0; color: #64748b; }
      .tab.active { background: #1a365d; color: white; }
      .actions-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
      .btn { padding: 7px 12px; font-size: 12px; font-weight: 600; border-radius: 5px; cursor: pointer; border: 1px solid #cbd5e1; background: white; }
      .btn-primary { background: #1a365d; color: white; border-color: #1a365d; }
      .btn-primary:hover { background: #2b6cb0; }
      pre { background: #0f172a; color: #f8fafc; padding: 12px; border-radius: 6px; height: 380px; overflow: auto; font-family: monospace; font-size: 11px; }
      .info-banner { background: #ebf8ff; border: 1px solid #bee3f8; color: #2b6cb0; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 11px; }
    </style>
  </head>
  <body>
    <div class="info-banner">
      💡 <b>Instrucciones:</b> Copia o descarga cada archivo JSON y colócalo en la carpeta <code>data/</code> de tu repositorio. Luego haz commit y push para actualizar el sitio web.
    </div>
    <div id="tab-container" class="tabs"></div>
    <div class="actions-bar">
      <div>
        <span id="current-filename" style="font-weight: 700; font-size: 13px;"></span>
        <span id="current-count" style="color: #64748b; font-size: 11px; margin-left: 8px;"></span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary" onclick="copyCurrentJson()">📋 Copiar JSON</button>
        <button class="btn" onclick="downloadCurrentJson()">💾 Descargar Archivo</button>
        <button class="btn" onclick="downloadAllJsonFiles()">📦 Descargar Todos (.JSON)</button>
      </div>
    </div>
    <pre id="json-viewer">// Cargando datos...</pre>

    <script>
      let exportData = {};
      let activeFile = '';

      window.onload = function() {
        google.script.run
          .withSuccessHandler(function(data) {
            exportData = data;
            renderTabs();
          })
          .withFailureHandler(function(err) {
            document.getElementById('json-viewer').innerText = 'Error: ' + err.message;
          })
          .exportAllJsonData();
      };

      function renderTabs() {
        const container = document.getElementById('tab-container');
        container.innerHTML = '';
        const files = Object.keys(exportData);

        files.forEach((fileKey, idx) => {
          const item = exportData[fileKey];
          const btn = document.createElement('button');
          btn.className = 'tab' + (idx === 0 ? ' active' : '');
          btn.innerHTML = item.icon + ' ' + item.filename;
          btn.onclick = () => switchTab(fileKey);
          container.appendChild(btn);
        });

        if (files.length > 0) switchTab(files[0]);
      }

      function switchTab(fileKey) {
        activeFile = fileKey;
        document.querySelectorAll('.tab').forEach(t => {
          t.classList.toggle('active', t.innerText.includes(exportData[fileKey].filename));
        });

        const item = exportData[fileKey];
        document.getElementById('current-filename').innerText = item.filename;
        document.getElementById('current-count').innerText = '(' + item.count + ' registros)';
        document.getElementById('json-viewer').innerText = item.jsonString;
      }

      function copyCurrentJson() {
        if (!activeFile) return;
        const text = exportData[activeFile].jsonString;
        navigator.clipboard.writeText(text).then(() => {
          alert('✅ ' + activeFile + ' copiado al portapapeles.');
        });
      }

      function downloadCurrentJson() {
        if (!activeFile) return;
        const text = exportData[activeFile].jsonString;
        downloadBlob(text, activeFile);
      }

      function downloadAllJsonFiles() {
        Object.keys(exportData).forEach((k, idx) => {
          setTimeout(() => {
            downloadBlob(exportData[k].jsonString, exportData[k].filename);
          }, idx * 300);
        });
      }

      function downloadBlob(content, filename) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    </script>
  </body>
</html>
  `;
}
