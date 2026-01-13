let todosLosPapers = [];

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
        todosLosPapers = await respuestaPapers.json(); 

        generarFiltrosPorRango();
        renderizarPublicaciones(todosLosPapers);
        activarLogicaFiltrosYBusqueda();
    } catch (error) {
        console.error("Error al cargar la página de publicaciones:", error);
        const contenedor = document.getElementById('publicaciones-container');
        if (contenedor) {
            contenedor.innerHTML = '<p style="color: #ff8a8a;">Error al cargar publicaciones.</p>';
        }
    }
}

function generarFiltrosPorRango() {
    const contenedor = document.getElementById('filtros-container');
    if (!contenedor) return; 

    const ranges = [
        '2025-2020',
        '2019-2014',
        '2013-2009',
        '2008-2003',
        '2002-1997'
    ];

    let botonesHTML = '<button class="filtro-btn active" data-range="all" data-i18n="publications.showAll">Mostrar Todas</button>';

    ranges.forEach(range => {
        botonesHTML += `<button class="filtro-btn" data-range="${range}">${range}</button>`;
    });

    contenedor.innerHTML = botonesHTML;

    if (typeof applyTranslations === 'function' && typeof currentLang !== 'undefined') {
        applyTranslations(currentLang);
    }
}

function renderizarPublicaciones(papersParaMostrar) {
    const contenedor = document.getElementById('publicaciones-container');
    if (!contenedor) return;

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
        html = '<p class="no-results">No se encontraron publicaciones que coincidan con los filtros.</p>';
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

function activarLogicaFiltrosYBusqueda() {
    const contenedorFiltros = document.getElementById('filtros-container');
    const inputBusqueda = document.getElementById('search-input');
    if (!contenedorFiltros || !inputBusqueda) return;

    let filtroRangoActual = 'all'; 
    let filtroBusquedaActual = '';

    const aplicarFiltros = () => {
        console.log(`Aplicando filtros - Rango: ${filtroRangoActual}, Búsqueda: "${filtroBusquedaActual}"`);
        let papersFiltrados = todosLosPapers;

        if (filtroRangoActual !== 'all') {
            try {
                const years = filtroRangoActual.split('-').map(Number);
                const startYear = Math.min(...years);
                const endYear = Math.max(...years);
                
                papersFiltrados = papersFiltrados.filter(paper => {
                    const yearStr = paper.fechaPublicacion ? paper.fechaPublicacion.substring(0, 4) : null;
                    if (yearStr && !isNaN(yearStr)) { 
                        const year = parseInt(yearStr);
                        return year >= startYear && year <= endYear; 
                    }
                    return false; 
                });
            } catch (e) {
                console.error("Error al parsear el rango de años:", filtroRangoActual, e);
            }
        }

        if (filtroBusquedaActual) {
            const busquedaLower = filtroBusquedaActual.toLowerCase().trim();
            if (busquedaLower) { 
                papersFiltrados = papersFiltrados.filter(paper => 
                    (paper.titulo && paper.titulo.toLowerCase().includes(busquedaLower)) ||
                    (paper.autores && paper.autores.toLowerCase().includes(busquedaLower))
                );
            }
        }
        
        console.log(`- Papers después de filtrar: ${papersFiltrados.length}`); 
        renderizarPublicaciones(papersFiltrados);
    };

    contenedorFiltros.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') return;

        const botonActivo = contenedorFiltros.querySelector('.active');
        if (botonActivo) botonActivo.classList.remove('active');
        event.target.classList.add('active');

        filtroRangoActual = event.target.getAttribute('data-range'); 
        aplicarFiltros(); 
    });

    inputBusqueda.addEventListener('input', () => {
        clearTimeout(inputBusqueda.timer); 
        inputBusqueda.timer = setTimeout(() => {
            filtroBusquedaActual = inputBusqueda.value;
            aplicarFiltros(); 
        }, 300); 
    });
}