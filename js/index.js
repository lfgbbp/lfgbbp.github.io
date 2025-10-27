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
            menuToggle.classList.toggle('active');
            navBar.classList.toggle('active');
        });
    }

    const modal = document.getElementById('research-modal');
    const closeBtn = document.getElementById('modal-close-btn'); 

    if (modal && closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Cerrar al hacer clic fuera del contenido del modal
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.error("No se encontró el modal o el botón de cierre.");
    }
    cargarLineasInvestigacion();
});

async function cargarInvestigadores() {
    try {
        const respuesta = await fetch('./data/investigadoresAct.json');
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
                            <p class="card-sub-title">${investigador.titulo}</p>
                            <p class="card-text">${investigador.descripcion}</p>
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
        // Solo necesitamos cargar el archivo de papers
        const respuestaPapers = await fetch('./data/papers.json');

        if (!respuestaPapers.ok) {
            throw new Error('No se pudo cargar el archivo de papers.');
        }

        const papers = await respuestaPapers.json();
        
        // Ya no necesitamos cargar investigadores ni crear el mapa

        const papersOrdenados = papers
            .filter(p => p.fechaPublicacion && p.fechaPublicacion !== 'N/A') // Asegurarse de que tengan fecha válida
            .sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion));

        const ultimos5Papers = papersOrdenados.slice(0, 5);

        const contenedor = document.getElementById('contenedor-publicaciones');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        ultimos5Papers.forEach(paper => {
            // Usamos directamente el string 'paper.autores' del JSON
            const autoresString = paper.autores || 'Autores no disponibles'; 

            const publicacionHTML = `
                <div class="publication-item">
                    <a href="${paper.enlace}" target="_blank" rel="noopener noreferrer">
                        <span class="publication-title">${paper.titulo || 'Título no disponible'}</span>
                        <p class="publication-authors">${autoresString}</p>
                        <span class="publication-meta">Publicado en: ${paper.publicadoEn || 'N/A'}, ${paper.fechaPublicacion}</span>
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

let lineasInvestigacionData = []; 

async function cargarLineasInvestigacion() {
    try {
        const respuesta = await fetch('./data/researchLines.json'); 
        if (!respuesta.ok) {
            throw new Error(`Error al cargar líneas de investigación: ${respuesta.status}`);
        }
        lineasInvestigacionData = await respuesta.json(); 

        const contenedor = document.getElementById('contenedor-research');
        if (!contenedor) return;

        contenedor.innerHTML = ''; 

        lineasInvestigacionData.forEach(linea => {
            const itemHTML = `
                <div class="research-item">
                    <span class="research-title" id="title-${linea.id}"></span> 
                    <button class="modal-open-btn" data-id="${linea.id}">+</button>
                </div>
            `;
            contenedor.innerHTML += itemHTML;
            const titleSpan = document.getElementById(`title-${linea.id}`);
            if (titleSpan) {
                titleSpan.innerHTML = linea.titulo; 
            }
        });

        contenedor.querySelectorAll('.modal-open-btn').forEach(button => {
            button.addEventListener('click', () => {
                const id = parseInt(button.getAttribute('data-id')); 
                mostrarModalInvestigacion(id);
            });
        });

    } catch (error) {
        console.error("Error al cargar líneas de investigación:", error);
    }
}

function mostrarModalInvestigacion(id) {
    const linea = lineasInvestigacionData.find(l => l.id === id);
    if (!linea) return; 

    const modal = document.getElementById('research-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');

    if (modal && modalTitle && modalImage && modalDescription) {
        // ✅ CAMBIO 2: Usamos innerHTML para el título del modal también
        modalTitle.innerHTML = linea.titulo; 
        modalImage.src = linea.image || './imgs/placeholder.jpg'; 
        modalImage.alt = `Imagen sobre ${linea.titulo}`;
        modalDescription.textContent = linea.descripcion; // La descripción sigue siendo textContent

        modal.style.display = 'block'; 
    } else {
        console.error("Error: No se encontraron todos los elementos del modal en el HTML.");
    }
}