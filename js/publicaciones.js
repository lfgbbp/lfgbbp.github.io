let todosLosPapers = [];
let mapaInvestigadoresGlobal = new Map();
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    cargarPaginaPublicaciones();
});

async function cargarPaginaPublicaciones() {
    try {
        const respuestaPapers = await fetch('../data/papers.json');
        if (!respuestaPapers.ok) {
            throw new Error('No se pudo cargar el archivo de papers.');
        }
        todosLosPapers = await respuestaPapers.json(); // Guardamos en la variable global

        // Generamos los filtros con todos los papers
        generarFiltros(todosLosPapers);

        // Renderizamos inicialmente todos los papers
        renderizarPublicaciones(todosLosPapers);

        // Activamos la lógica de los filtros de año Y la nueva barra de búsqueda
        activarLogicaFiltrosYBusqueda();

    } catch (error) {
        console.error("Error al cargar la página de publicaciones:", error);
        const contenedor = document.getElementById('publicaciones-container');
         if (contenedor) {
             contenedor.innerHTML = '<p style="color: #ff8a8a;">Error al cargar publicaciones.</p>';
         }
    }
}

function generarFiltros(papers) {
    const contenedor = document.getElementById('filtros-container');
    if (!contenedor) return; 

    const years = [...new Set(papers.map(p => p.fechaPublicacion ? p.fechaPublicacion.substring(0, 4) : 'N/A'))]
                    .filter(year => year !== 'N/A');
    years.sort((a, b) => b - a);

    let botonesHTML = '<button class="filtro-btn active" data-year="all">Mostrar Todas</button>';
    years.forEach(year => {
        botonesHTML += `<button class="filtro-btn" data-year="${year}">${year}</button>`;
    });

    contenedor.innerHTML = botonesHTML;
}

// ✅ FUNCIÓN MODIFICADA para renderizar según filtros
function renderizarPublicaciones(papersParaMostrar) {
    const contenedor = document.getElementById('publicaciones-container');
    if (!contenedor) return;

    // Agrupar los papers filtrados por año
    const papersPorAnio = papersParaMostrar.reduce((acc, paper) => {
        const year = paper.fechaPublicacion ? paper.fechaPublicacion.substring(0, 4) : 'N/A';
        if (year !== 'N/A') {
             if (!acc[year]) {
                acc[year] = [];
            }
            acc[year].push(paper);
        }
        return acc;
    }, {});

    const aniosOrdenados = Object.keys(papersPorAnio).sort((a, b) => b - a);

    let html = '';
    if (papersParaMostrar.length === 0) {
        html = '<p class="no-results">No se encontraron publicaciones que coincidan con la búsqueda.</p>';
    } else {
        aniosOrdenados.forEach(year => {
            html += `<div class="year-section" data-year="${year}">
                        <h2 class="year-title">${year}</h2>`;

            papersPorAnio[year]
                .sort((a, b) => (b.fechaPublicacion || '').localeCompare(a.fechaPublicacion || ''))
                .forEach(paper => {
                    const autoresString = paper.autores || 'Autores no disponibles';
                    html += `
                        <div class="publication-item">
                            <a href="${paper.enlace}" target="_blank" rel="noopener noreferrer">
                                <span class="publication-title">${paper.titulo || 'Título no disponible'}</span>
                                <p class="publication-authors">${autoresString}</p>
                                <span class="publication-meta">Publicado en: ${paper.publicadoEn || 'N/A'}</span>
                            </a>
                        </div>`;
                });

            html += '</div>';
        });
    }
    contenedor.innerHTML = html;
}

// ✅ FUNCIÓN MODIFICADA para manejar ambos filtros (año y búsqueda)
function activarLogicaFiltrosYBusqueda() {
    const contenedorFiltros = document.getElementById('filtros-container');
    const inputBusqueda = document.getElementById('search-input');
    if (!contenedorFiltros || !inputBusqueda) return;

    let filtroAnioActual = 'all';
    let filtroBusquedaActual = '';

    // Función para aplicar filtros y re-renderizar
    const aplicarFiltros = () => {
        let papersFiltrados = todosLosPapers;

        // 1. Filtrar por año
        if (filtroAnioActual !== 'all') {
            papersFiltrados = papersFiltrados.filter(paper => 
                (paper.fechaPublicacion ? paper.fechaPublicacion.substring(0, 4) : '') === filtroAnioActual
            );
        }

        // 2. Filtrar por búsqueda (título o autores)
        if (filtroBusquedaActual) {
            const busquedaLower = filtroBusquedaActual.toLowerCase();
            papersFiltrados = papersFiltrados.filter(paper => 
                (paper.titulo || '').toLowerCase().includes(busquedaLower) ||
                (paper.autores || '').toLowerCase().includes(busquedaLower)
            );
        }

        renderizarPublicaciones(papersFiltrados);
    };

    // Listener para los botones de año
    contenedorFiltros.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') return;

        const botonActivo = contenedorFiltros.querySelector('.active');
        if (botonActivo) botonActivo.classList.remove('active');
        event.target.classList.add('active');

        filtroAnioActual = event.target.getAttribute('data-year');
        aplicarFiltros(); // Re-renderizar con el nuevo filtro de año
    });

    // Listener para la barra de búsqueda (se activa mientras escribes)
    inputBusqueda.addEventListener('input', () => {
        filtroBusquedaActual = inputBusqueda.value;
        aplicarFiltros(); // Re-renderizar con el nuevo filtro de búsqueda
    });
}