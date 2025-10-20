document.addEventListener('DOMContentLoaded', () =>{
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
    
    cargarPaginaPublicaciones();
});

async function cargarPaginaPublicaciones() {
    try {
        const [respuestaPapers, respuestaInvestigadores] = await Promise.all([
            fetch('../data/papers.json'),
            fetch('../data/investigadores.json')
        ]);
        if (!respuestaPapers.ok || !respuestaInvestigadores.ok) {
            throw new Error('No se pudieron cargar los datos.');
        }
        const papers = await respuestaPapers.json();
        const investigadores = await respuestaInvestigadores.json();

        // Crear mapa de búsqueda rápida para los autores
        const mapaInvestigadores = new Map(
            investigadores.map(inv => [inv.id, inv.apellido])
        );

        generarFiltros(papers);

        renderizarPublicaciones(papers, mapaInvestigadores);

        activarLogicaFiltros();

    } catch (error) {
        console.error("Error al cargar la página de publicaciones:", error);
    }
}

function generarFiltros(papers) {
    const contenedor = document.getElementById('filtros-container');
    
    const years = [...new Set(papers.map(p => p.fechaPublicacion.substring(0, 4)))];
    years.sort((a, b) => b - a);

    let botonesHTML = '<button class="filtro-btn active" data-year="all">Mostrar Todas</button>';
    years.forEach(year => {
        botonesHTML += `<button class="filtro-btn" data-year="${year}">${year}</button>`;
    });

    contenedor.innerHTML = botonesHTML;
}

function renderizarPublicaciones(papers, mapaInvestigadores) {
    const contenedor = document.getElementById('publicaciones-container');
    
    const papersPorAnio = papers.reduce((acc, paper) => {
        const year = paper.fechaPublicacion.substring(0, 4);
        if (!acc[year]) {
            acc[year] = [];
        }
        acc[year].push(paper);
        return acc;
    }, {});

    const aniosOrdenados = Object.keys(papersPorAnio).sort((a, b) => b - a);

    let html = '';
    aniosOrdenados.forEach(year => {
        html += `<div class="year-section" data-year="${year}">
                    <h2 class="year-title">${year}</h2>`;
        
        papersPorAnio[year]
            .sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion))
            .forEach(paper => {
                const apellidosAutores = paper.autoresIds
                    .map(id => mapaInvestigadores.get(id))
                    .filter(Boolean)
                    .join(', ');

                html += `
                    <div class="publication-item">
                        <a href="${paper.enlace}" target="_blank" rel="noopener noreferrer">
                            <span class="publication-title">${paper.titulo}</span>
                            <p class="publication-authors">${apellidosAutores}</p>
                            <span class="publication-meta">Publicado en: ${paper.publicadoEn}</span>
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

    contenedorFiltros.addEventListener('click', (event) => {
        if (event.target.tagName !== 'BUTTON') return;

        contenedorFiltros.querySelector('.active').classList.remove('active');
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
