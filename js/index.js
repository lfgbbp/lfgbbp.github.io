document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    cargarServicios();
    mostrarUltimasPublicaciones();
    cargarInvestigadores();

    const menuToggle = document.querySelector('.menuB');
    const navBar = document.querySelector('.nav-bar');

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', () => {
            // Añade/quita la clase 'active' tanto al botón como a la barra de navegación
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });
    }
});

async function cargarInvestigadores() {
    try {
        const respuesta = await fetch('./data/investigadores.json');
        if (!respuesta.ok) {
            throw new Error(`Error al cargar investigadores: ${respuesta.status}`);
        }
        const todosLosInvestigadores = await respuesta.json();

        const investigadoresActuales = todosLosInvestigadores.filter(investigador => investigador.estado === 'actual');

        const contenedor = document.getElementById('contenedor-investigadores');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        investigadoresActuales.forEach(investigador => {
            const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
            
            const cardHTML = `
                <div class="col">
                    <div class="card h-100">
                        <img src="${investigador.fotoUrl}" class="card-img-top" alt="Foto de ${nombreCompleto}">
                        <div class="card-body">
                            <h5 class="card-title">${nombreCompleto}</h5>
                            <p class="card-text">${investigador.titulo}</p>
                        </div>
                    </div>
                </div>`;
            contenedor.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error("No se pudieron cargar los investigadores:", error);
    }
}

async function mostrarUltimasPublicaciones() {
    try {
        const [respuestaPapers, respuestaInvestigadores] = await Promise.all([
            fetch('./data/papers.json'),
            fetch('./data/investigadores.json')
        ]);

        if (!respuestaPapers.ok || !respuestaInvestigadores.ok) {
            throw new Error('No se pudieron cargar todos los archivos de datos.');
        }

        const papers = await respuestaPapers.json();
        const investigadores = await respuestaInvestigadores.json();

        const mapaInvestigadores = new Map(
            investigadores.map(inv => [inv.id, inv.apellido])
        );

        const papersOrdenados = papers.sort((a, b) =>
            b.fechaPublicacion.localeCompare(a.fechaPublicacion)
        );
        const ultimos3Papers = papersOrdenados.slice(0, 3);

        const contenedor = document.getElementById('contenedor-publicaciones');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        ultimos3Papers.forEach(paper => {
            // Buscamos los APELLIDOS y los unimos con comas
            const apellidosAutores = paper.autoresIds
                .map(id => mapaInvestigadores.get(id))
                .filter(apellido => apellido)
                .join(', ');

            const publicacionHTML = `
                <div class="publication-item">
                    <a href="${paper.enlace}" target="_blank" rel="noopener noreferrer">
                        <span class="publication-title">${paper.titulo}</span>
                        <p class="publication-authors">${apellidosAutores}</p>
                        <span class="publication-meta">Publicado en: ${paper.publicadoEn}, ${paper.fechaPublicacion}</span>
                    </a>
                </div>`;
            contenedor.innerHTML += publicacionHTML;
        });
    } catch (error) {
        console.error("No se pudieron cargar las publicaciones:", error);
        const contenedor = document.getElementById('contenedor-publicaciones');
        if (contenedor) {
            contenedor.innerHTML = '<p style="color: #ff8a8a;">No se pudieron cargar las publicaciones.</p>';
        }
    }
}

async function cargarServicios() {
    try {
        const respuesta = await fetch('./data/servicios.json');
        if (!respuesta.ok) {
            throw new Error(`Error al cargar servicios: ${respuesta.status}`);
        }
        const servicios = await respuesta.json();
        const contenedor = document.getElementById('contenedor-servicios');
        if (!contenedor) return;
        servicios.forEach(servicio => {
            const itemHTML = `
                <div class="custom-accordion-item">
                    <button class="accordion-title">
                    <span>${servicio.titulo}</span>
                    <span class="accordion-icon"></span>
                    </button>
                    <div class="accordion-content">
                        <p>${servicio.descripcion}</p>
                    </div>
                </div>`;
            contenedor.innerHTML += itemHTML;
        });

        const titulos = contenedor.querySelectorAll('.accordion-title');
        titulos.forEach(titulo => {
            titulo.addEventListener('click', () => {
                const item = titulo.parentElement;
                item.classList.toggle('active');
            });
        });
    } catch (error) {
        console.error(error);
    }
}