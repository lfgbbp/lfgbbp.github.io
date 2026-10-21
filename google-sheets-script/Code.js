/**
 * ==============================================================================
 * LFGBBP - SISTEMA DE GESTION DE CONTENIDO PARA GOOGLE SHEETS
 * Laboratorio de Fisiologia y Genetica de Bacterias Beneficiosas para Plantas
 * Universidad Nacional de Quilmes (UNQ) - CONICET - CIC-BA
 * ==============================================================================
 * 
 * Este script permite administrar directamente desde Google Sheets los 6 modulos
 * de datos que alimentan el sitio web oficial (https://lfgbbp.github.io):
 * 
 * 1. Investigadores Actuales    -> data/investigadoresAct.json
 * 2. Ex-Miembros / Becarios     -> data/investigadoresPast.json
 * 3. Colaboradores Cientificos  -> data/colaboradores.json
 * 4. Lineas de Investigacion    -> data/researchLines.json
 * 5. Papers de Investigacion    -> data/papers.json
 * 6. Servicios Tecnologicos     -> data/servicios.json
 * 
 * Adicionalmente, incluye sincronizacion directa con la API de GitHub para
 * realizar commit y push de manera automatica a la rama de produccion.
 */

/* ==============================================================================
 * 1. CONFIGURACION GLOBAL Y ESQUEMA DE DATOS
 * ============================================================================== */
const CONFIG = {
  UI_TITLE: 'LFGBBP - Panel de Gestion',
  PRIMARY_COLOR: '#1a365d',
  SECONDARY_COLOR: '#2b6cb0',
  ACCENT_COLOR: '#2c7a7b',
  
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
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'nombre', label: 'Nombre', width: 130, type: 'string', required: true },
        { key: 'apellido', label: 'Apellido', width: 130, type: 'string', required: true },
        { key: 'titulo_es', label: 'Titulo (ES)', width: 260, type: 'string', required: true },
        { key: 'titulo_en', label: 'Titulo (EN)', width: 260, type: 'string', required: true },
        { key: 'fotoUrl', label: 'Foto URL / Ruta', width: 220, type: 'string', required: false, hint: 'Ej: ./imgs/investigadores/foto claudio.jpg' },
        { key: 'descripcion_es', label: 'Descripcion (ES)', width: 380, type: 'multiline', required: true },
        { key: 'descripcion_en', label: 'Descripcion (EN)', width: 380, type: 'multiline', required: true }
      ],
      getDisplayLabel: function(item) {
        return '#' + item.id + ' - ' + (item.apellido || '') + ', ' + (item.nombre || '') + ' (' + (item.titulo_es ? item.titulo_es.substring(0, 30) + '...' : '') + ')';
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
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'nombre_es', label: 'Nombre (ES)', width: 180, type: 'string', required: true },
        { key: 'nombre_en', label: 'Nombre (EN)', width: 180, type: 'string', required: true },
        { key: 'participacion_es', label: 'Participacion (ES)', width: 190, type: 'string', required: true, hint: 'Ej: Doctorado, Seminario de Investigacion, Tesina' },
        { key: 'participacion_en', label: 'Participacion (EN)', width: 190, type: 'string', required: true, hint: 'Ej: PhD, Research Seminar, Thesis' },
        { key: 'lugarDeTrabajoActual_es', label: 'Lugar de Trabajo Actual (ES)', width: 300, type: 'string', required: true },
        { key: 'lugarDeTrabajoActual_en', label: 'Lugar de Trabajo Actual (EN)', width: 300, type: 'string', required: true }
      ],
      getDisplayLabel: function(item) {
        return '#' + item.id + ' - ' + (item.nombre_es || 'Sin nombre') + ' (' + (item.participacion_es || '') + ')';
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
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'nombre_es', label: 'Nombre (ES)', width: 180, type: 'string', required: true },
        { key: 'nombre_en', label: 'Nombre (EN)', width: 180, type: 'string', required: true },
        { key: 'lugarDeTrabajoActual_es', label: 'Lugar de Trabajo Actual (ES)', width: 320, type: 'string', required: true },
        { key: 'lugarDeTrabajoActual_en', label: 'Lugar de Trabajo Actual (EN)', width: 320, type: 'string', required: true }
      ],
      getDisplayLabel: function(item) {
        return '#' + item.id + ' - ' + (item.nombre_es || 'Sin nombre');
      }
    },

    LINEAS: {
      key: 'LINEAS',
      sheetName: 'Lineas_Investigacion',
      tabColor: '#38a169',
      jsonFile: 'researchLines.json',
      idField: 'id',
      idType: 'number',
      label: 'Linea de Investigacion',
      pluralLabel: 'Lineas de Investigacion',
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'titulo_es', label: 'Titulo (ES)', width: 280, type: 'string', required: true },
        { key: 'titulo_en', label: 'Titulo (EN)', width: 280, type: 'string', required: true },
        { key: 'descripcion_es', label: 'Descripcion (ES)', width: 400, type: 'multiline', required: true },
        { key: 'descripcion_en', label: 'Descripcion (EN)', width: 400, type: 'multiline', required: true },
        { key: 'imagen', label: 'Imagen URL / Ruta', width: 220, type: 'string', required: false, hint: 'Ej: ./imgs/lineas/linea1_2.jpeg' }
      ],
      getDisplayLabel: function(item) {
        const title = (item.titulo_es || '').replace(/<[^>]+>/g, '');
        return '#' + item.id + ' - ' + title.substring(0, 45) + '...';
      }
    },

    PAPERS: {
      key: 'PAPERS',
      sheetName: 'Papers',
      tabColor: '#d69e2e',
      jsonFile: 'papers.json',
      idField: 'paperId',
      idType: 'number',
      label: 'Paper de Investigacion',
      pluralLabel: 'Papers de Investigacion',
      columns: [
        { key: 'paperId', label: 'Paper ID', width: 80, type: 'number', required: true },
        { key: 'fechaPublicacion', label: 'Ano / Fecha', width: 100, type: 'string', required: true, hint: 'Ej: 2024' },
        { key: 'titulo', label: 'Titulo', width: 340, type: 'multiline', required: true },
        { key: 'publicadoEn', label: 'Revista / Journal', width: 220, type: 'string', required: true, hint: 'Ej: PLANTS, Molecular Microbiology' },
        { key: 'enlace', label: 'Enlace (DOI / URL)', width: 260, type: 'string', required: true, hint: 'Ej: https://doi.org/10.3390/plants13152130' },
        { key: 'autores', label: 'Autores', width: 320, type: 'string', required: true, hint: 'Ej: Lorch, M., Valverde, C., Agaras, B.' }
      ],
      getDisplayLabel: function(item) {
        const title = item.titulo || 'Sin titulo';
        return '[' + (item.fechaPublicacion || 'S/A') + '] #' + item.paperId + ' - ' + title.substring(0, 40) + '...';
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
      columns: [
        { key: 'id', label: 'ID', width: 60, type: 'number', required: true },
        { key: 'titulo_es', label: 'Titulo (ES)', width: 260, type: 'string', required: true },
        { key: 'titulo_en', label: 'Titulo (EN)', width: 260, type: 'string', required: true },
        { key: 'descripcion_es', label: 'Descripcion (ES)', width: 400, type: 'multiline', required: true },
        { key: 'descripcion_en', label: 'Descripcion (EN)', width: 400, type: 'multiline', required: true }
      ],
      getDisplayLabel: function(item) {
        return '#' + item.id + ' - ' + (item.titulo_es || 'Sin titulo');
      }
    }
  }
};

/* ==============================================================================
 * 2. MENU PRINCIPAL Y DISPARADORES DE HOJA (onOpen, onEdit)
 * ============================================================================== */

/**
 * Se ejecuta automaticamente al abrir el archivo de Google Sheets.
 * Crea el menu "LFGBBP - Gestion Web".
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  
  const menu = ui.createMenu('LFGBBP - Gestion Web')
    .addItem('Abrir panel de gestion (Sidebar)', 'showSidebar')
    .addItem('Editar registro de fila seleccionada', 'editSelectedRow')
    .addSeparator();

  // Submenu para agregar o modificar modulo por modulo
  const subMenu = ui.createMenu('Agregar o modificar...')
    .addItem('Investigadores actuales', 'openInvestigadoresForm')
    .addItem('Ex-miembros', 'openExMiembrosForm')
    .addItem('Colaboradores', 'openColaboradoresForm')
    .addItem('Lineas de investigacion', 'openLineasForm')
    .addItem('Papers de investigacion', 'openPapersForm')
    .addItem('Servicios', 'openServiciosForm');
  
  menu.addSubMenu(subMenu)
    .addSeparator()
    .addItem('Publicar cambios en sitio web (Commit y Push)', 'promptPublishToGitHub')
    .addItem('Configuracion de GitHub', 'openGitHubConfigModal')
    .addSeparator()
    .addItem('Inicializar y formatear hojas', 'setupAllSheets')
    .addItem('Cargar datos iniciales (desde JSON)', 'populateInitialData')
    .addItem('Exportar datos a JSON local', 'showExportDialog')
    .addSeparator()
    .addItem('Asignar o reparar IDs faltantes', 'fixMissingIds')
    .addToUi();
}

/**
 * Trigger que detecta si el usuario escribe directamente en una fila y no tiene ID.
 * Genera automaticamente el ID correlativo correspondiente.
 */
function onEdit(e) {
  if (!e || !e.range) return;
  const sheet = e.range.getSheet();
  const sheetName = sheet.getName();
  
  let matchedConfig = null;
  for (const key in CONFIG.SHEETS) {
    if (CONFIG.SHEETS[key].sheetName === sheetName) {
      matchedConfig = CONFIG.SHEETS[key];
      break;
    }
  }
  if (!matchedConfig) return;

  const row = e.range.getRow();
  if (row <= 1) return;

  const idCol = 1;
  const idCell = sheet.getRange(row, idCol);
  const currentId = idCell.getValue();

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
 * 3. APERTURA DE DIALOGOS Y SIDEBAR
 * ============================================================================== */

/**
 * Abre el sidebar principal de gestion.
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
    html = HtmlService.createHtmlOutput(getEmbeddedSidebarHtml(sectionKey, ''))
      .setTitle(CONFIG.UI_TITLE)
      .setWidth(450);
  }
  
  SpreadsheetApp.getUi().showSidebar(html);
}

function openInvestigadoresForm() { showSidebar('INVESTIGADORES'); }
function openExMiembrosForm()    { showSidebar('EX_MIEMBROS'); }
function openColaboradoresForm()  { showSidebar('COLABORADORES'); }
function openLineasForm()         { showSidebar('LINEAS'); }
function openPapersForm()         { showSidebar('PAPERS'); }
function openServiciosForm()      { showSidebar('SERVICIOS'); }

/**
 * Detecta la fila activa seleccionada en la planilla y abre el panel
 * cargando automaticamente dicho registro para su edicion.
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
      'Por favor colocate en una de las hojas de datos (Investigadores, Ex-Miembros, Colaboradores, Lineas_Investigacion, Papers o Servicios) y selecciona una fila.',
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
    SpreadsheetApp.getUi().alert('Aviso', 'La fila seleccionada no tiene un ID valido.', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  showSidebarWithSelectedRecord(matchedKey, idVal);
}

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
  SpreadsheetApp.getUi().showModalDialog(html, 'Exportar datos para el sitio web');
}

function openGitHubConfigModal() {
  let html;
  try {
    html = HtmlService.createTemplateFromFile('GithubConfigModal')
      .evaluate()
      .setWidth(580)
      .setHeight(480);
  } catch (err) {
    html = HtmlService.createHtmlOutput(getEmbeddedGitHubConfigModalHtml())
      .setWidth(580)
      .setHeight(480);
  }
  SpreadsheetApp.getUi().showModalDialog(html, 'Configuracion de sincronizacion con GitHub');
}

/* ==============================================================================
 * 4. CONFIGURACION Y MANTENIMIENTO DE HOJAS
 * ============================================================================== */

function setupAllSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  for (const key in CONFIG.SHEETS) {
    const cfg = CONFIG.SHEETS[key];
    let sheet = ss.getSheetByName(cfg.sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(cfg.sheetName);
    }

    try {
      sheet.setTabColor(cfg.tabColor);
    } catch(e) {}

    const headers = cfg.columns.map(col => col.label);
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    
    headerRange
      .setBackground(CONFIG.PRIMARY_COLOR)
      .setFontColor('#FFFFFF')
      .setFontWeight('bold')
      .setFontSize(10)
      .setVerticalAlignment('middle')
      .setHorizontalAlignment('center');
    
    sheet.setRowHeight(1, 35);
    sheet.setFrozenRows(1);

    cfg.columns.forEach((col, idx) => {
      sheet.setColumnWidth(idx + 1, col.width);
    });

    const maxRows = Math.max(sheet.getMaxRows(), 2);
    const idRange = sheet.getRange(2, 1, maxRows - 1, 1);
    idRange.setHorizontalAlignment('center').setNumberFormat('0');
  }

  SpreadsheetApp.getActiveSpreadsheet().toast('Todas las hojas estan listas y configuradas correctamente.', 'Exito', 5);
}

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
    'Validacion Completa',
    'Se asignaron o repararon ' + totalFixed + ' IDs faltantes.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

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
 * 5. CARGA DE DATOS INICIALES (DESDE JSON)
 * ============================================================================== */

function populateInitialData() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Confirmar Carga Inicial',
    'Esta accion importara los datos existentes del laboratorio (investigadores, ex-miembros, colaboradores, lineas, papers y servicios) en las hojas correspondientes.\n\nDeseas continuar?',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  setupAllSheets();

  if (typeof SEED_DATA === 'undefined') {
    ui.alert(
      'Error',
      'No se encontro la variable SEED_DATA. Asegurate de incluir el archivo InitialData.js en tu proyecto de Apps Script.',
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

    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clearContent();
    }

    if (dataList.length === 0) continue;

    const rows = dataList.map(item => {
      return cfg.columns.map(col => {
        const val = item[col.key];
        return (val !== undefined && val !== null) ? val : '';
      });
    });

    const range = sheet.getRange(2, 1, rows.length, cfg.columns.length);
    range.setValues(rows);
    range.setVerticalAlignment('top');

    sheet.getRange(2, 1, rows.length, 1).setHorizontalAlignment('center');
    summary.push('- ' + cfg.pluralLabel + ': ' + rows.length + ' registros');
  }

  ui.alert(
    'Carga Exitosa',
    'Los datos iniciales fueron importados con exito:\n\n' + summary.join('\n'),
    ui.ButtonSet.OK
  );
}

/* ==============================================================================
 * 6. API INTERNA PARA LA UI (GET, SAVE, DELETE)
 * ============================================================================== */

function getUIConfiguration() {
  const result = {};
  for (const k in CONFIG.SHEETS) {
    const s = CONFIG.SHEETS[k];
    result[k] = {
      key: s.key,
      sheetName: s.sheetName,
      label: s.label,
      pluralLabel: s.pluralLabel,
      idField: s.idField,
      columns: s.columns
    };
  }
  return result;
}

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

function saveEntityRecord(entityKey, data, isNew) {
  const cfg = CONFIG.SHEETS[entityKey];
  if (!cfg) throw new Error('Entidad invalida: ' + entityKey);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) {
    setupAllSheets();
    sheet = ss.getSheetByName(cfg.sheetName);
  }

  cfg.columns.forEach(col => {
    if (col.required && col.key !== cfg.idField) {
      const val = data[col.key];
      if (val === undefined || val === null || String(val).trim() === '') {
        throw new Error('El campo "' + col.label + '" es obligatorio.');
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
      throw new Error('No se encontro el registro con ID ' + targetId + ' para actualizar.');
    }
  }

  const rowData = cfg.columns.map(col => {
    let val = data[col.key];
    if (val === undefined || val === null) val = '';
    if (col.type === 'number' && val !== '') {
      const num = Number(val);
      if (!isNaN(num)) return num;
    }
    return String(val);
  });

  const range = sheet.getRange(targetRow, 1, 1, rowData.length);
  range.setValues([rowData]);
  range.setVerticalAlignment('top');

  sheet.getRange(targetRow, 1).setHorizontalAlignment('center');

  if (cfg.key === 'PAPERS') {
    sheet.getRange(targetRow, 2).setHorizontalAlignment('center');
  }

  return {
    success: true,
    isNew: isNew,
    id: targetId,
    message: isNew 
      ? cfg.label + ' agregado con exito con ID ' + targetId + '.' 
      : cfg.label + ' #' + targetId + ' actualizado correctamente.'
  };
}

function deleteEntityRecord(entityKey, id) {
  const cfg = CONFIG.SHEETS[entityKey];
  if (!cfg) throw new Error('Entidad invalida: ' + entityKey);

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(cfg.sheetName);
  if (!sheet) throw new Error('Hoja no encontrada: ' + cfg.sheetName);

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) throw new Error('La hoja esta vacia.');

  const ids = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
  let targetRow = -1;

  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]).trim() === String(id).trim()) {
      targetRow = i + 2;
      break;
    }
  }

  if (targetRow === -1) {
    throw new Error('No se encontro el registro con ID ' + id + ' para eliminar.');
  }

  sheet.deleteRow(targetRow);

  return {
    success: true,
    id: id,
    message: cfg.label + ' #' + id + ' eliminado correctamente.'
  };
}

/* ==============================================================================
 * 7. EXPORTACION A JSON
 * ============================================================================== */

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
        const hasData = row.some(cell => cell !== '' && cell !== null && cell !== undefined);
        if (!hasData) return;

        const item = {};
        cfg.columns.forEach((col, colIdx) => {
          let cellValue = row[colIdx];
          
          if (col.type === 'number') {
            cellValue = Number(cellValue);
            if (isNaN(cellValue)) cellValue = 0;
          } else {
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
      count: items.length,
      jsonString: JSON.stringify(items, null, '\t')
    };
  }

  return result;
}

/* ==============================================================================
 * 8. INTEGRACION CON GITHUB (COMMIT Y PUSH AUTOMATICO)
 * ============================================================================== */

function getGitHubConfig() {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('GITHUB_TOKEN') || '';
  return {
    owner: props.getProperty('GITHUB_OWNER') || 'lfgbbp',
    repo: props.getProperty('GITHUB_REPO') || 'lfgbbp.github.io',
    branch: props.getProperty('GITHUB_BRANCH') || 'main',
    hasToken: Boolean(token && token.length > 5)
  };
}

function saveGitHubConfig(config) {
  if (!config || !config.owner || !config.repo || !config.branch) {
    throw new Error('Propietario, repositorio y rama son obligatorios.');
  }
  const props = PropertiesService.getScriptProperties();
  props.setProperty('GITHUB_OWNER', config.owner.trim());
  props.setProperty('GITHUB_REPO', config.repo.trim());
  props.setProperty('GITHUB_BRANCH', config.branch.trim());
  if (config.token && config.token.trim()) {
    props.setProperty('GITHUB_TOKEN', config.token.trim());
  }
  return { success: true, message: 'Configuracion de GitHub guardada correctamente.' };
}

function testGitHubConnection(config) {
  let token = (config && config.token) ? config.token.trim() : '';
  const props = PropertiesService.getScriptProperties();
  if (!token) token = props.getProperty('GITHUB_TOKEN') || '';
  if (!token) {
    return { success: false, message: 'No se ha configurado un Personal Access Token de GitHub.' };
  }

  const owner = (config && config.owner) ? config.owner.trim() : (props.getProperty('GITHUB_OWNER') || 'lfgbbp');
  const repo = (config && config.repo) ? config.repo.trim() : (props.getProperty('GITHUB_REPO') || 'lfgbbp.github.io');
  const branch = (config && config.branch) ? config.branch.trim() : (props.getProperty('GITHUB_BRANCH') || 'main');

  try {
    const url = 'https://api.github.com/repos/' + owner + '/' + repo + '/branches/' + branch;
    const options = {
      method: 'get',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'LFGBBP-Sheets-Sync'
      },
      muteHttpExceptions: true
    };
    const res = UrlFetchApp.fetch(url, options);
    const code = res.getResponseCode();
    if (code === 200) {
      return { success: true, message: 'Conexion exitosa con ' + owner + '/' + repo + ' en la rama ' + branch + '.' };
    } else if (code === 401) {
      return { success: false, message: 'Token de acceso invalido o revocado (Error 401).' };
    } else if (code === 404) {
      return { success: false, message: 'No se encontro el repositorio o la rama (' + owner + '/' + repo + ' / ' + branch + '). Verifica nombres y permisos (Error 404).' };
    } else {
      let errDetail = res.getContentText();
      try { errDetail = JSON.parse(errDetail).message || errDetail; } catch(e) {}
      return { success: false, message: 'Error de GitHub (' + code + '): ' + errDetail };
    }
  } catch (err) {
    return { success: false, message: 'Fallo al conectar con GitHub: ' + err.message };
  }
}

/**
 * Publica todos los archivos JSON directamente en el repositorio de GitHub realizando
 * commit y push automatico a la rama configurada (por defecto 'main').
 */
function publishToGitHub(commitMessage) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty('GITHUB_TOKEN') || '';
  if (!token) {
    throw new Error('No esta configurado el Token de GitHub. Abre el menu "LFGBBP - Gestion Web > Configuracion de GitHub" para ingresarlo.');
  }

  const owner = props.getProperty('GITHUB_OWNER') || 'lfgbbp';
  const repo = props.getProperty('GITHUB_REPO') || 'lfgbbp.github.io';
  const branch = props.getProperty('GITHUB_BRANCH') || 'main';

  const defaultMsg = 'Actualizacion de datos desde Google Sheets (' + Utilities.formatDate(new Date(), 'GMT-3', 'yyyy-MM-dd HH:mm') + ')';
  const msg = (commitMessage && commitMessage.trim()) ? commitMessage.trim() : defaultMsg;

  const headers = {
    'Authorization': 'Bearer ' + token,
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'LFGBBP-Sheets-Sync'
  };

  // 1. Obtener JSON actual desde las hojas
  const exportData = exportAllJsonData();

  // 2. Obtener SHA del commit actual de la rama
  const refUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/git/ref/heads/' + branch;
  const refRes = UrlFetchApp.fetch(refUrl, { method: 'get', headers: headers, muteHttpExceptions: true });
  if (refRes.getResponseCode() !== 200) {
    throw new Error('No se pudo acceder a la rama ' + branch + ' en GitHub. Codigo: ' + refRes.getResponseCode());
  }
  const latestCommitSha = JSON.parse(refRes.getContentText()).object.sha;

  // 3. Obtener el tree SHA del ultimo commit
  const commitUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/git/commits/' + latestCommitSha;
  const commitRes = UrlFetchApp.fetch(commitUrl, { method: 'get', headers: headers, muteHttpExceptions: true });
  if (commitRes.getResponseCode() !== 200) {
    throw new Error('No se pudo obtener la informacion del commit base ' + latestCommitSha);
  }
  const baseTreeSha = JSON.parse(commitRes.getContentText()).tree.sha;

  // 4. Crear el arbol (Tree) con los 6 archivos JSON en data/
  const treeItems = [
    {
      path: 'data/investigadoresAct.json',
      mode: '100644',
      type: 'blob',
      content: exportData['investigadoresAct.json'].jsonString
    },
    {
      path: 'data/investigadoresPast.json',
      mode: '100644',
      type: 'blob',
      content: exportData['investigadoresPast.json'].jsonString
    },
    {
      path: 'data/colaboradores.json',
      mode: '100644',
      type: 'blob',
      content: exportData['colaboradores.json'].jsonString
    },
    {
      path: 'data/researchLines.json',
      mode: '100644',
      type: 'blob',
      content: exportData['researchLines.json'].jsonString
    },
    {
      path: 'data/papers.json',
      mode: '100644',
      type: 'blob',
      content: exportData['papers.json'].jsonString
    },
    {
      path: 'data/servicios.json',
      mode: '100644',
      type: 'blob',
      content: exportData['servicios.json'].jsonString
    }
  ];

  const createTreeUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/git/trees';
  const treeRes = UrlFetchApp.fetch(createTreeUrl, {
    method: 'post',
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeItems
    }),
    muteHttpExceptions: true
  });

  if (treeRes.getResponseCode() !== 201) {
    throw new Error('Error al preparar archivos en GitHub: ' + treeRes.getContentText());
  }
  const newTreeSha = JSON.parse(treeRes.getContentText()).sha;

  // Si el nuevo arbol es identico, no hubo modificaciones
  if (newTreeSha === baseTreeSha) {
    return {
      success: true,
      noChanges: true,
      message: 'No se detectaron modificaciones respecto a la version actual publicada en el repositorio.'
    };
  }

  // 5. Crear el commit
  const createCommitUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/git/commits';
  const newCommitRes = UrlFetchApp.fetch(createCommitUrl, {
    method: 'post',
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify({
      message: msg,
      tree: newTreeSha,
      parents: [latestCommitSha]
    }),
    muteHttpExceptions: true
  });

  if (newCommitRes.getResponseCode() !== 201) {
    throw new Error('Error al registrar commit en GitHub: ' + newCommitRes.getContentText());
  }
  const newCommitSha = JSON.parse(newCommitRes.getContentText()).sha;

  // 6. Actualizar la rama (Push)
  const updateRefUrl = 'https://api.github.com/repos/' + owner + '/' + repo + '/git/refs/heads/' + branch;
  const updateRes = UrlFetchApp.fetch(updateRefUrl, {
    method: 'patch',
    contentType: 'application/json',
    headers: headers,
    payload: JSON.stringify({
      sha: newCommitSha,
      force: false
    }),
    muteHttpExceptions: true
  });

  if (updateRes.getResponseCode() !== 200) {
    throw new Error('Error al actualizar la rama en GitHub: ' + updateRes.getContentText());
  }

  const commitUrlBrowser = 'https://github.com/' + owner + '/' + repo + '/commit/' + newCommitSha;

  return {
    success: true,
    commitSha: newCommitSha,
    commitUrl: commitUrlBrowser,
    message: 'Publicacion completada exitosamente en la rama ' + branch + '. El sitio web se actualizara en breve.'
  };
}

/**
 * Accion directa desde el menu para solicitar confirmacion y publicar.
 */
function promptPublishToGitHub() {
  const ui = SpreadsheetApp.getUi();
  const config = getGitHubConfig();

  if (!config.hasToken) {
    const res = ui.alert(
      'Configuracion Requerida',
      'No se ha configurado el Token de GitHub para la sincronizacion automatica.\nDeseas configurarlo ahora?',
      ui.ButtonSet.YES_NO
    );
    if (res === ui.Button.YES) openGitHubConfigModal();
    return;
  }

  const promptResult = ui.prompt(
    'Confirmar Publicacion en Sitio Web',
    'Ingresa una breve descripcion de los cambios realizados (o deja en blanco para usar la fecha actual):',
    ui.ButtonSet.OK_CANCEL
  );

  if (promptResult.getSelectedButton() !== ui.Button.OK) return;

  const commitMsg = promptResult.getResponseText();

  try {
    SpreadsheetApp.getActiveSpreadsheet().toast('Conectando con GitHub y subiendo cambios...', 'Publicando', 10);
    const result = publishToGitHub(commitMsg);

    if (result.noChanges) {
      ui.alert('Sin Cambios', result.message, ui.ButtonSet.OK);
    } else {
      ui.alert('Publicacion Exitosa', result.message + '\n\nEnlace del commit:\n' + result.commitUrl, ui.ButtonSet.OK);
    }
  } catch (err) {
    ui.alert('Error de Publicacion', err.message, ui.ButtonSet.OK);
  }
}

/* ==============================================================================
 * 9. ENDPOINT REST PARA WEB APP (doGet)
 * ============================================================================== */

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
 * 10. PLANTILLAS HTML INTEGRADAS (FALLBACK AUTOMATICO)
 * ============================================================================== */

function getEmbeddedSidebarHtml(initialSection, initialRecordId) {
  return `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
      :root {
        --primary: #1a365d;
        --primary-light: #2b6cb0;
        --bg: #f8fafc;
        --text: #1e293b;
        --text-muted: #64748b;
        --border: #e2e8f0;
        --success: #15803d;
        --danger: #b91c1c;
      }
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        background: var(--bg);
        color: var(--text);
        padding: 12px;
        font-size: 13px;
      }
      .header {
        background: var(--primary);
        color: white;
        padding: 12px 14px;
        border-radius: 6px;
        margin-bottom: 12px;
        text-align: center;
      }
      .header h2 { font-size: 14px; font-weight: 700; margin-bottom: 2px; }
      .header p { font-size: 11px; opacity: 0.85; }

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
        border-radius: 5px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.15s ease;
        color: var(--text);
        text-align: center;
      }
      .nav-btn:hover { border-color: var(--primary-light); background: #f1f5f9; color: var(--primary); }
      .nav-btn.active {
        background: var(--primary);
        color: white;
        border-color: var(--primary);
      }

      .publish-card {
        background: #f8fafc;
        border: 1px solid #cbd5e1;
        border-radius: 6px;
        padding: 10px 12px;
        margin-bottom: 12px;
      }
      .publish-card-header {
        font-size: 11px;
        font-weight: 700;
        color: var(--primary);
        margin-bottom: 4px;
      }
      .publish-card-text {
        font-size: 11px;
        color: var(--text-muted);
        margin-bottom: 8px;
        line-height: 1.3;
      }

      .mode-toggle {
        display: flex;
        background: #e2e8f0;
        border-radius: 5px;
        padding: 2px;
        margin-bottom: 12px;
      }
      .mode-btn {
        flex: 1;
        padding: 7px;
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
        box-shadow: 0 1px 2px rgba(0,0,0,0.08);
      }

      .card {
        background: white;
        border: 1px solid var(--border);
        border-radius: 6px;
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
        color: #334155;
      }
      .tag-es { background: #e2e8f0; color: #1e3a8a; padding: 1px 5px; border-radius: 3px; font-size: 9px; font-weight: 700; }
      .tag-en { background: #fef3c7; color: #92400e; padding: 1px 5px; border-radius: 3px; font-size: 9px; font-weight: 700; }
      .tag-req { color: var(--danger); font-weight: bold; }

      input[type="text"], input[type="number"], select, textarea {
        width: 100%;
        padding: 7px 9px;
        border: 1px solid var(--border);
        border-radius: 4px;
        font-size: 12px;
        font-family: inherit;
        background: white;
      }
      input:focus, select:focus, textarea:focus {
        border-color: var(--primary-light);
        outline: none;
        box-shadow: 0 0 0 2px rgba(43, 108, 176, 0.15);
      }
      textarea { resize: vertical; min-height: 55px; line-height: 1.4; }
      .hint { font-size: 10px; color: var(--text-muted); margin-top: 3px; }

      .btn-container { display: flex; gap: 6px; margin-top: 14px; }
      .btn {
        flex: 1;
        padding: 8px;
        border: none;
        border-radius: 5px;
        font-size: 11px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
      }
      .btn-primary { background: var(--primary); color: white; }
      .btn-primary:hover { background: var(--primary-light); }
      .btn-danger { background: #fef2f2; color: var(--danger); border: 1px solid #fecaca; }
      .btn-danger:hover { background: var(--danger); color: white; }
      .btn-secondary { background: #f1f5f9; color: var(--text); border: 1px solid #cbd5e1; }
      .btn-publish {
        background: #047857;
        color: white;
        width: 100%;
        padding: 8px;
        font-size: 11px;
      }
      .btn-publish:hover { background: #065f46; }

      .alert {
        padding: 9px 12px;
        border-radius: 5px;
        font-size: 11px;
        margin-bottom: 12px;
        display: none;
        line-height: 1.4;
      }
      .alert-success { background: #f0fdf4; color: var(--success); border: 1px solid #bbf7d0; }
      .alert-error { background: #fef2f2; color: var(--danger); border: 1px solid #fecaca; }
      .alert-info { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
      .spinner {
        display: inline-block;
        width: 12px;
        height: 12px;
        border: 2px solid currentColor;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        vertical-align: middle;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
    </style>
  </head>
  <body>
    <div class="header">
      <h2>LFGBBP - Panel de Gestion</h2>
      <p>Administracion del Sitio Web Oficial</p>
    </div>

    <div class="section-nav">
      <button class="nav-btn" onclick="selectSection('INVESTIGADORES')">Investigadores</button>
      <button class="nav-btn" onclick="selectSection('EX_MIEMBROS')">Ex-Miembros</button>
      <button class="nav-btn" onclick="selectSection('COLABORADORES')">Colaboradores</button>
      <button class="nav-btn" onclick="selectSection('LINEAS')">Lineas</button>
      <button class="nav-btn" onclick="selectSection('PAPERS')">Papers</button>
      <button class="nav-btn" onclick="selectSection('SERVICIOS')">Servicios</button>
    </div>

    <div class="publish-card">
      <div class="publish-card-header">Sincronizacion Web</div>
      <div class="publish-card-text">Publica los datos actualizados de la planilla en GitHub para actualizar el sitio web automaticamente.</div>
      <button type="button" class="btn btn-publish" id="publish-btn" onclick="handlePublishToGitHub()">
        Publicar cambios en el sitio web (Commit y Push)
      </button>
    </div>

    <div class="mode-toggle">
      <button id="mode-add-btn" class="mode-btn active" onclick="setMode(true)">Agregar nuevo</button>
      <button id="mode-edit-btn" class="mode-btn" onclick="setMode(false)">Modificar existente</button>
    </div>

    <div id="alert-box" class="alert"></div>

    <div id="selector-card" class="card" style="display: none;">
      <div class="field-label">Seleccionar registro para editar:</div>
      <select id="record-select" onchange="onRecordSelectChange()">
        <option value="">-- Cargando lista... --</option>
      </select>
    </div>

    <div class="card">
      <div id="form-header" style="font-weight: 700; font-size: 12px; margin-bottom: 12px; color: var(--primary);"></div>
      <form id="dynamic-form" onsubmit="handleFormSubmit(event)">
        <div id="form-fields"></div>
        <div class="btn-container">
          <button type="submit" id="save-btn" class="btn btn-primary">
            <span id="save-btn-text">Guardar</span>
          </button>
          <button type="button" id="delete-btn" class="btn btn-danger" style="display: none;" onclick="handleDelete()">
            Eliminar
          </button>
          <button type="button" class="btn btn-secondary" onclick="resetForm()">
            Limpiar
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
          const cfg = UI_CONFIG[key];
          btn.classList.toggle('active', btn.innerText.trim().toLowerCase() === cfg.pluralLabel.toLowerCase() || btn.innerText.trim().toLowerCase().startsWith(cfg.pluralLabel.substring(0, 4).toLowerCase()));
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
        
        if (UI_CONFIG && UI_CONFIG[currentSection]) {
          document.getElementById('save-btn-text').innerText = isNewMode 
            ? 'Agregar ' + UI_CONFIG[currentSection].label 
            : 'Guardar cambios';
          document.getElementById('form-header').innerText = (isNewMode ? 'Nuevo ' : 'Modificar ') + UI_CONFIG[currentSection].label;
        }
      }

      function loadSectionEntities() {
        const select = document.getElementById('record-select');
        select.innerHTML = '<option value="">-- Cargando... --</option>';

        google.script.run
          .withSuccessHandler(function(list) {
            select.innerHTML = '<option value="">-- Seleccionar registro (' + list.length + ') --</option>';
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
            saveBtn.innerHTML = '<span id="save-btn-text">' + (isNewMode ? 'Agregar ' + cfg.label : 'Guardar cambios') + '</span>';
            showAlert(res.message, 'success');

            if (isNewMode) {
              resetForm();
            } else {
              loadSectionEntities();
            }
          })
          .withFailureHandler(function(err) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<span id="save-btn-text">' + (isNewMode ? 'Agregar ' + cfg.label : 'Guardar cambios') + '</span>';
            showError(err);
          })
          .saveEntityRecord(currentSection, data, isNewMode);
      }

      function handleDelete() {
        const idField = document.getElementById('field_' + UI_CONFIG[currentSection].idField);
        const id = idField ? idField.value : null;
        if (!id) {
          alert('No hay ningun registro seleccionado para eliminar.');
          return;
        }

        if (!confirm('Confirma que deseas eliminar este registro permanentemente?')) return;

        showAlert('Eliminando registro...', 'info');
        google.script.run
          .withSuccessHandler(function(res) {
            showAlert(res.message, 'success');
            resetForm();
            loadSectionEntities();
          })
          .withFailureHandler(showError)
          .deleteEntityRecord(currentSection, id);
      }

      function handlePublishToGitHub() {
        const commitMsg = prompt('Ingresa un comentario descriptivo para la actualizacion (opcional):', 'Actualizacion de datos desde Google Sheets');
        if (commitMsg === null) return;

        const pubBtn = document.getElementById('publish-btn');
        pubBtn.disabled = true;
        pubBtn.innerHTML = '<span class="spinner"></span> Publicando en GitHub...';
        showAlert('Conectando con GitHub para crear commit y push...', 'info');

        google.script.run
          .withSuccessHandler(function(res) {
            pubBtn.disabled = false;
            pubBtn.innerText = 'Publicar cambios en el sitio web (Commit y Push)';
            if (res.success) {
              showAlert(res.message, 'success');
            } else {
              showAlert(res.message, 'error');
            }
          })
          .withFailureHandler(function(err) {
            pubBtn.disabled = false;
            pubBtn.innerText = 'Publicar cambios en el sitio web (Commit y Push)';
            showError(err);
          })
          .publishToGitHub(commitMsg);
      }

      function showAlert(msg, type) {
        const box = document.getElementById('alert-box');
        box.className = 'alert alert-' + (type === 'success' ? 'success' : (type === 'info' ? 'info' : 'error'));
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
</html>`;
}

function getEmbeddedExportModalHtml() {
  return `<!DOCTYPE html>
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
      .info-banner { background: #f1f5f9; border: 1px solid #cbd5e1; color: #334155; padding: 8px 12px; border-radius: 6px; margin-bottom: 12px; font-size: 11px; }
    </style>
  </head>
  <body>
    <div class="info-banner">
      Instrucciones: Puedes copiar o descargar los archivos JSON si deseas una copia manual. Para publicar directamente en el sitio web sin descargar archivos, utiliza la opcion Publicar cambios en el sitio web (Commit y Push).
    </div>
    <div id="tab-container" class="tabs"></div>
    <div class="actions-bar">
      <div>
        <span id="current-filename" style="font-weight: 700; font-size: 13px;"></span>
        <span id="current-count" style="color: #64748b; font-size: 11px; margin-left: 8px;"></span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary" onclick="copyCurrentJson()">Copiar JSON</button>
        <button class="btn" onclick="downloadCurrentJson()">Descargar Archivo</button>
        <button class="btn" onclick="downloadAllJsonFiles()">Descargar Todos</button>
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
          btn.innerText = item.filename;
          btn.onclick = () => switchTab(fileKey);
          container.appendChild(btn);
        });

        if (files.length > 0) switchTab(files[0]);
      }

      function switchTab(fileKey) {
        activeFile = fileKey;
        document.querySelectorAll('.tab').forEach(t => {
          t.classList.toggle('active', t.innerText === exportData[fileKey].filename);
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
          alert(activeFile + ' copiado al portapapeles.');
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
</html>`;
}

function getEmbeddedGitHubConfigModalHtml() {
  return `<!DOCTYPE html>
<html>
  <head>
    <base target="_top">
    <meta charset="UTF-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 18px; margin: 0; background: #f8fafc; font-size: 13px; color: #1e293b; }
      .instructions { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 12px; margin-bottom: 16px; font-size: 12px; line-height: 1.5; }
      .form-group { margin-bottom: 14px; }
      label { display: block; font-weight: 600; font-size: 12px; margin-bottom: 4px; }
      input[type="text"], input[type="password"] { width: 100%; padding: 8px 10px; border: 1px solid #cbd5e1; border-radius: 5px; box-sizing: border-box; }
      .btn { padding: 8px 14px; font-size: 12px; font-weight: 600; border-radius: 5px; cursor: pointer; border: 1px solid #cbd5e1; background: white; }
      .btn-primary { background: #1a365d; color: white; border-color: #1a365d; }
      .alert { padding: 10px; border-radius: 5px; margin-bottom: 14px; font-size: 12px; display: none; }
      .alert-success { background: #f0fdf4; border: 1px solid #bbf7d0; color: #15803d; }
      .alert-error { background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c; }
    </style>
  </head>
  <body>
    <div id="status-alert" class="alert"></div>
    <div class="instructions">
      <strong>Configuracion de sincronizacion con GitHub</strong>
      <p style="margin-top: 4px;">Ingresa el Personal Access Token de GitHub con permisos de escritura (repo o Contents: Read and write) para permitir commit y push directo.</p>
    </div>
    <form id="config-form" onsubmit="saveConfiguration(event)">
      <div class="form-group">
        <label>Propietario (Owner)</label>
        <input type="text" id="owner" required placeholder="lfgbbp">
      </div>
      <div class="form-group">
        <label>Repositorio</label>
        <input type="text" id="repo" required placeholder="lfgbbp.github.io">
      </div>
      <div class="form-group">
        <label>Rama (Branch)</label>
        <input type="text" id="branch" required placeholder="main">
      </div>
      <div class="form-group">
        <label>Personal Access Token (GitHub PAT)</label>
        <input type="password" id="token" placeholder="ghp_... o github_pat_...">
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 8px; margin-top: 18px;">
        <button type="button" class="btn" onclick="testConnection()">Probar Conexion</button>
        <button type="submit" class="btn btn-primary">Guardar Configuracion</button>
      </div>
    </form>
    <script>
      window.onload = function() {
        google.script.run
          .withSuccessHandler(function(config) {
            if (config) {
              document.getElementById('owner').value = config.owner || 'lfgbbp';
              document.getElementById('repo').value = config.repo || 'lfgbbp.github.io';
              document.getElementById('branch').value = config.branch || 'main';
              if (config.hasToken) {
                document.getElementById('token').placeholder = 'Token configurado (dejar en blanco para no modificar)';
              }
            }
          })
          .getGitHubConfig();
      };

      function testConnection() {
        const config = {
          owner: document.getElementById('owner').value.trim(),
          repo: document.getElementById('repo').value.trim(),
          branch: document.getElementById('branch').value.trim(),
          token: document.getElementById('token').value.trim()
        };
        google.script.run
          .withSuccessHandler(function(res) {
            const box = document.getElementById('status-alert');
            box.className = 'alert alert-' + (res.success ? 'success' : 'error');
            box.innerText = res.message;
            box.style.display = 'block';
          })
          .testGitHubConnection(config);
      }

      function saveConfiguration(e) {
        e.preventDefault();
        const config = {
          owner: document.getElementById('owner').value.trim(),
          repo: document.getElementById('repo').value.trim(),
          branch: document.getElementById('branch').value.trim(),
          token: document.getElementById('token').value.trim()
        };
        google.script.run
          .withSuccessHandler(function(res) {
            const box = document.getElementById('status-alert');
            box.className = 'alert alert-success';
            box.innerText = res.message;
            box.style.display = 'block';
          })
          .saveGitHubConfig(config);
      }
    </script>
  </body>
</html>`;
}
