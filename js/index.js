/* ==============================================
   VARIABLES GLOBALES DE DATOS
   (Actúan como caché para no recargar fetch)
============================================== */
let investigadoresData = [];
let lineasInvestigacionData = [];
let serviciosData = [];
let exIntegrantesData = [];
let colaboradoresData = [];
let papersData = []; // Por si decidimos traducir algo aquí

/* ==============================================
   INICIALIZACIÓN
============================================== */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Configurar año actual
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = currentYear;

    // 2. Iniciar Cargas (Fetch)
    cargarServicios();
    mostrarUltimasPublicaciones();
    cargarLineasInvestigacion();
    cargarInvestigadores();
    cargarDatosExIntegrantes(); // Precarga datos
    cargarDatosColaboradores(); // Precarga datos

    // 3. Configurar UI
    setupMenuToggle();
    setupListenersModales();
    ajustarPaddingBody();
});

// ESCUCHA EL CAMBIO DE IDIOMA (Disparado por language-switcher.js)
window.addEventListener('languageChanged', (e) => {
    // Cuando cambia el idioma, volvemos a renderizar todo sin hacer fetch de nuevo
    renderServicios();
    renderLineasInvestigacion(); 
    // Los investigadores en la home son solo nombre/foto, pero si tuvieran cargo traducible:
    // renderInvestigadores(); 
    
    // Si tienes papers con textos traducibles, descomenta:
    // renderUltimasPublicaciones();
});

/* ==============================================
   HELPER: OBTENER IDIOMA ACTUAL
============================================== */
function getLang() {
    return localStorage.getItem('preferredLanguage') || 'es';
}

/* ==============================================
   1. INVESTIGADORES (ACTUALES)
============================================== */
async function cargarInvestigadores() { 
    try {
        const respuesta = await fetch('./data/investigadoresAct.json');
        if (!respuesta.ok) throw new Error('Error cargando investigadores');
        investigadoresData = await respuesta.json(); 
        
        renderInvestigadores();
    } catch (error) {
        console.error("Error:", error); 
    }
}

function renderInvestigadores() {
    const contenedor = document.getElementById('contenedor-investigadores'); 
    if (!contenedor) return;

    contenedor.innerHTML = '';
    const lang = getLang(); // 'es' o 'en'

    investigadoresData.forEach((investigador) => {
        // Asumimos que nombre y apellido son universales, si no, usar investigador['nombre_' + lang]
        const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
        
        const cardHTML = `
            <div class="researcher-card" data-id="${investigador.id}" role="button" tabindex="0">
                <img src="${investigador.fotoUrl || './imgs/placeholder.png'}" 
                     alt="${lang === 'es' ? 'Foto de' : 'Photo of'} ${limpiarHTML(nombreCompleto)}">
                <span class="researcher-name">${nombreCompleto}</span>
            </div>`;
        contenedor.innerHTML += cardHTML;
    });

    // Reasignar eventos click
    contenedor.querySelectorAll('.researcher-card').forEach(card => {
        const action = () => {
            const id = parseInt(card.getAttribute('data-id')); 
            mostrarModalInvestigador(id);
        };
        card.addEventListener('click', action);
        card.addEventListener('keydown', (e) => { if (e.key === 'Enter') action(); });
    });
}

function mostrarModalInvestigador(id) {
    const investigador = investigadoresData.find(inv => inv.id === id);
    if (!investigador) return; 

    const lang = getLang(); // Detectar idioma al momento del click

    const modal = document.getElementById('researcher-modal');
    const modalImage = document.getElementById('researcher-modal-image');
    const modalName = document.getElementById('researcher-modal-name');
    const modalTitle = document.getElementById('researcher-modal-title');
    const modalDescription = document.getElementById('researcher-modal-description');
    
    if (modal) {
        const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
        
        modalImage.src = investigador.fotoUrl || './imgs/placeholder.png'; 
        // Traducción dinámica del ALT
        const prefix = lang === 'es' ? 'Foto de' : 'Photo of';
        modalImage.alt = `${prefix} ${limpiarHTML(nombreCompleto)}`;
        
        modalName.innerHTML = nombreCompleto;
        
        // SELECCIÓN DE IDIOMA: titulo_es vs titulo_en
        modalTitle.innerHTML = investigador[`titulo_${lang}`] || investigador.titulo_es || '';
        modalDescription.innerHTML = investigador[`descripcion_${lang}`] || investigador.descripcion_es || '';
        
        modal.style.display = 'flex'; 
        toggleBodyScroll(true); 
    }
}

/* ==============================================
   2. LÍNEAS DE INVESTIGACIÓN
============================================== */
async function cargarLineasInvestigacion() {
    try {
        const respuesta = await fetch('./data/researchLines.json'); 
        if (!respuesta.ok) throw new Error('Error cargando líneas');
        lineasInvestigacionData = await respuesta.json(); 
        
        renderLineasInvestigacion();
    } catch (error) {
        console.error(error);
    }
}

function renderLineasInvestigacion() {
    const contenedor = document.getElementById('contenedor-research');
    if (!contenedor) return;

    contenedor.innerHTML = ''; 
    const lang = getLang();

    lineasInvestigacionData.forEach(linea => {
        // Título traducido para la tarjeta
        const titulo = linea[`titulo_${lang}`] || linea.titulo_es;
        
        const itemHTML = `
            <div class="research-item">
                <span class="research-title">${titulo}</span> 
                <button class="modal-open-btn" data-id="${linea.id}">+</button>
            </div>
        `;
        contenedor.innerHTML += itemHTML;
    });

    // Eventos
    contenedor.querySelectorAll('.modal-open-btn').forEach(button => {
        button.addEventListener('click', () => {
            mostrarModalInvestigacion(parseInt(button.getAttribute('data-id')));
        });
    });
}

function mostrarModalInvestigacion(id) {
    const linea = lineasInvestigacionData.find(l => l.id === id);
    if (!linea) return; 

    const lang = getLang();
    const modal = document.getElementById('research-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');

    if (modal) {
        // Datos traducidos
        const titulo = linea[`titulo_${lang}`] || linea.titulo_es;
        const descripcion = linea[`descripcion_${lang}`] || linea.descripcion_es;

        modalTitle.innerHTML = titulo; 
        modalImage.src = linea.imagen || './imgs/placeholder.jpg'; 
        
        const prefix = lang === 'es' ? 'Imagen sobre' : 'Image about';
        modalImage.alt = `${prefix} ${limpiarHTML(titulo)}`;
        
        modalDescription.innerHTML = descripcion; 

        modal.style.display = 'flex'; 
        toggleBodyScroll(true);
    }
}

/* ==============================================
   3. SERVICIOS
============================================== */
async function cargarServicios() {
    try {
        const respuesta = await fetch('./data/servicios.json');
        if (!respuesta.ok) throw new Error('Error servicios');
        serviciosData = await respuesta.json();
        
        renderServicios();
    } catch (error) { console.error(error); }
}

function renderServicios() {
    const contenedor = document.getElementById('contenedor-servicios');
    if (!contenedor) return;
    
    contenedor.innerHTML = '';
    const lang = getLang();

    serviciosData.forEach(servicio => {
        const titulo = servicio[`titulo_${lang}`] || servicio.titulo_es;
        const descripcion = servicio[`descripcion_${lang}`] || servicio.descripcion_es;

        const itemHTML = `
            <div class="custom-accordion-item">
                <button class="accordion-title">
                    <span class="accordion-title-text">${titulo}</span>
                    <span class="accordion-icon"></span>
                </button>
                <div class="accordion-content">
                    <p>${descripcion}</p>
                </div>
            </div>`;
        contenedor.innerHTML += itemHTML;
    });

    // Reactivar acordeón (lógica de UI)
    const titulos = contenedor.querySelectorAll('.accordion-title');
    titulos.forEach(titulo => {
        titulo.addEventListener('click', () => {
            const item = titulo.parentElement;
            const estabaActivo = item.classList.contains('active');
            contenedor.querySelectorAll('.custom-accordion-item').forEach(i => i.classList.remove('active'));
            if (!estabaActivo) item.classList.add('active');
        });
    });
}

/* ==============================================
   4. EX-INTEGRANTES Y COLABORADORES
   (Ahora con carga separada y renderizado on-click)
============================================== */

// Pre-carga de datos (se llama al inicio)
async function cargarDatosExIntegrantes() {
    try {
        const res = await fetch('./data/investigadoresPast.json');
        if(res.ok) exIntegrantesData = await res.json();
    } catch(e) { console.error(e); }
}

async function cargarDatosColaboradores() {
    try {
        const res = await fetch('./data/colaboradores.json');
        if(res.ok) colaboradoresData = await res.json();
    } catch(e) { console.error(e); }
}

// Funciones de visualización (se llaman al hacer click en los botones)
function mostrarExIntegrantes() {
    if (exIntegrantesData.length === 0) return; // O mostrar error/loading
    
    const lang = getLang();
    
    // Agrupar dinámicamente según el idioma
    const agrupados = exIntegrantesData.reduce((acc, persona) => {
        // Usamos participacion_es o participacion_en como clave de grupo
        const tipo = persona[`participacion_${lang}`] || persona.participacion_es || 'Otros';
        if (!acc[tipo]) acc[tipo] = [];
        acc[tipo].push(persona);
        return acc;
    }, {});

    let htmlContent = '';
    // Definimos el orden de prioridades, traduciendo las claves si es necesario
    // Nota: Como las claves ahora son dinámicas, el orden fijo puede fallar si no coincide exactamente el string.
    // Una forma simple es iterar las claves disponibles.
    
    Object.keys(agrupados).forEach(tipo => {
        htmlContent += `
            <div class="participation-group">
                <h4 class="participation-title">${tipo}</h4>
                <ul class="participation-list">
                    ${agrupados[tipo].map(p => `
                        <li class="participation-item">
                            <strong>${p[`nombre_${lang}`] || p.nombre_es || p.nombre}</strong>
                            <span>${p[`lugarDeTrabajoActual_${lang}`] || p.lugarDeTrabajoActual_es || ''}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    });

    const tituloModal = lang === 'es' ? 'Ex-Integrantes del Laboratorio' : 'Past Laboratory Members';
    mostrarModalLista(tituloModal, htmlContent);
}

function mostrarColaboradores() {
    if (colaboradoresData.length === 0) return;

    const lang = getLang();
    let htmlContent = '<div class="collaborators-list">';
    
    colaboradoresData.forEach(colab => {
        const nombre = colab[`nombre_${lang}`] || colab.nombre_es || colab.nombre;
        const lugar = colab[`lugarDeTrabajoActual_${lang}`] || colab.lugarDeTrabajoActual_es || '';
        
        htmlContent += `
            <div class="collaborator-item">
                <span class="collaborator-name">${nombre}</span>
                <span class="collaborator-place">${lugar}</span>
            </div>
        `;
    });
    htmlContent += '</div>';

    const tituloModal = lang === 'es' ? 'Colaboradores' : 'Collaborators';
    mostrarModalLista(tituloModal, htmlContent);
}

/* ==============================================
   5. PUBLICACIONES
============================================== */
async function mostrarUltimasPublicaciones() {
    try {
        const respuesta = await fetch('./data/papers.json');
        if (!respuesta.ok) throw new Error('Error papers');
        papersData = await respuesta.json();
        
        renderUltimasPublicaciones();
    } catch (error) {
        console.error("Error publications:", error);
    }
}

function renderUltimasPublicaciones() {
    const contenedor = document.getElementById('contenedor-publicaciones');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    
    // Filtro y Orden
    const papersOrdenados = papersData
        .filter(p => p.fechaPublicacion && p.fechaPublicacion !== 'N/A')
        .sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion));
    const ultimos4 = papersOrdenados.slice(0, 4);

    const lang = getLang();
    const textoPublicado = lang === 'es' ? 'Publicado en:' : 'Published in:';

    ultimos4.forEach(paper => {
        // Asumimos que títulos de papers no se traducen usualmente
        const titulo = paper.titulo; 
        
        const publicacionHTML = `
            <div class="publication-item">
                <a href="${paper.enlace}" target="_blank" rel="noopener noreferrer">
                    <span class="publication-title">${titulo}</span>
                    <p class="publication-authors">${paper.autores || ''}</p>
                    <span class="publication-meta">${textoPublicado} ${paper.publicadoEn || 'N/A'}, ${paper.fechaPublicacion}</span>
                </a>
            </div>`;
        contenedor.innerHTML += publicacionHTML;
    });
}

/* ==============================================
   UTILIDADES (Modales, Menú, Scroll)
============================================== */
function setupListenersModales() {
    // Botones de equipo (Ex-integrantes y Colaboradores)
    const btnPast = document.getElementById('btn-past-members');
    const btnCollab = document.getElementById('btn-collaborators');
    
    // IMPORTANTE: Ahora llamamos a las funciones que renderizan, no a las que cargan
    if (btnPast) btnPast.addEventListener('click', mostrarExIntegrantes);
    if (btnCollab) btnCollab.addEventListener('click', mostrarColaboradores);
    
    // Cierres
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) cerrarModal(modal.id);
        });
    });

    // Clic fuera para cerrar
    ['research-modal', 'researcher-modal', 'list-modal'].forEach(id => {
        const modal = document.getElementById(id);
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) cerrarModal(id);
            });
        }
    });

    // Tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(m => {
                if (m.style.display === 'flex') cerrarModal(m.id);
            });
        }
    });
}

function mostrarModalLista(titulo, contenidoHTML) {
    const modal = document.getElementById('list-modal');
    const modalTitle = document.getElementById('list-modal-title');
    const modalBody = document.getElementById('list-modal-body');

    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = titulo;
        modalBody.innerHTML = contenidoHTML;
        modal.style.display = 'flex';
        toggleBodyScroll(true);
    }
}

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        toggleBodyScroll(false); 
    }
}

function toggleBodyScroll(bloquear) {
    if (bloquear) {
        document.body.classList.add('modal-open');
        document.documentElement.classList.add('modal-open'); 
    } else {
        document.body.classList.remove('modal-open');
        document.documentElement.classList.remove('modal-open');
    }
}

function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close'); // Si tuvieras botón cerrar específico
    const navBar = document.getElementById('navC');
    const navLinks = document.querySelectorAll('.liNav a');

    const closeMenu = () => {
        if (navBar) navBar.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll nativo si el menu lo bloquea
    };

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navBar.classList.toggle('active');
            // Opcional: Bloquear scroll al abrir menú movil
            // document.body.style.overflow = navBar.classList.contains('active') ? 'hidden' : 'auto';
        });
    }

    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (event) => {
        if (navBar && navBar.classList.contains('active')) {
            if (!navBar.contains(event.target) && event.target !== menuToggle) {
                closeMenu();
            }
        }
    });
}

function limpiarHTML(texto) {
    return texto ? texto.replace(/<[^>]*>?/gm, '') : '';
}

/* ==============================================
   AJUSTE DE PADDING (Header Fixed)
============================================== */
function ajustarPaddingBody() {
    const header = document.querySelector('.header-main');
    const body = document.body;

    if (!header) return;

    if (window.innerWidth >= 1025) {
        const alturaExacta = header.offsetHeight;
        if (alturaExacta > 0) body.style.paddingTop = `${alturaExacta}px`;
    } else {
        body.style.paddingTop = '0px';
    }
}

// Ejecución inicial y eventos de resize
ajustarPaddingBody();
window.addEventListener('resize', ajustarPaddingBody);
window.addEventListener('load', ajustarPaddingBody);