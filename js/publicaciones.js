document.addEventListener('DOMContentLoaded', () => {
    // Lógica para actualizar el año en el footer
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
        const papers = await respuestaPapers.json();

        generarFiltros(papers);
        renderizarPublicaciones(papers);
        activarLogicaFiltros();

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

function renderizarPublicaciones(papers) {
    const contenedor = document.getElementById('publicaciones-container');
    if (!contenedor) return;

    // Agrupar papers por año (usando el método seguro)
    const papersPorAnio = papers.reduce((acc, paper) => {
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

    contenedor.innerHTML = html;
}

function activarLogicaFiltros() {
    const contenedorFiltros = document.getElementById('filtros-container');
    const seccionesDeAnio = document.querySelectorAll('.year-section');
    if (!contenedorFiltros) return; 

    contenedorFiltros.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') return;

        const botonActivo = contenedorFiltros.querySelector('.active');
        if (botonActivo) {
            botonActivo.classList.remove('active');
        }
        event.target.classList.add('active');

        const anioSeleccionado = event.target.getAttribute('data-year');

        seccionesDeAnio.forEach(section => {
            if (anioSeleccionado === 'all' || section.getAttribute('data-year') === anioSeleccionado) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    });
}