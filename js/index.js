let investigadoresData = [];
let lineasInvestigacionData = [];
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }

    cargarServicios();
    mostrarUltimasPublicaciones();
    cargarLineasInvestigacion();
    cargarInvestigadores();

    setupMenuToggle();
    setupModalClickOutsideClose('research-modal');
    setupModalClickOutsideClose('researcher-modal');
});

function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const navBar = document.getElementById('navC');
    const navLinks = document.querySelectorAll('.liNav a');

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', () => {
            navBar.classList.add('active');
        });
    }
    if (menuClose && navBar) {
        menuClose.addEventListener('click', () => {
            navBar.classList.remove('active');
        });
    }
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navBar.classList.remove('active');
        });
    });
}

function setupModalClickOutsideClose(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.warn(`Advertencia: No se encontró el modal con ID "${modalId}" para el cierre exterior.`);
    }
}

function mostrarModalInvestigador(id) {
    const investigador = investigadoresData.find(inv => inv.id === id);
    if (!investigador) return; 

    const modal = document.getElementById('researcher-modal');
    const modalImage = document.getElementById('researcher-modal-image');
    const modalName = document.getElementById('researcher-modal-name');
    const modalTitle = document.getElementById('researcher-modal-title');
    const modalDescription = document.getElementById('researcher-modal-description');
    const closeBtn = document.getElementById('researcher-modal-close-btn');


    if (modal && modalImage && modalName && modalTitle && modalDescription) {
        const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
        modalImage.src = investigador.fotoUrl || './imgs/placeholder.png'; 
        modalImage.alt = `Foto de ${nombreCompleto}`;
        modalName.innerHTML = nombreCompleto;
        modalTitle.innerHTML = investigador.titulo || '';
        modalDescription.innerHTML = investigador.descripcion || '';

        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        modal.style.display = 'block'; 
    } else {
        console.error("Error: No se encontraron todos los elementos del modal de investigador en el HTML.");
    }
}

async function cargarInvestigadores() { 
    try {
        const respuesta = await fetch('./data/investigadoresAct.json');
        if (!respuesta.ok) {
            throw new Error(`Error al cargar investigadores: ${respuesta.status}`);
        }

        investigadoresData = await respuesta.json(); 
        const investigadoresActuales = investigadoresData; 

        const contenedor = document.getElementById('contenedor-investigadores'); 
        if (!contenedor) {
            console.error("Error: Contenedor '#contenedor-investigadores' no encontrado.");
            return;
        }

        contenedor.innerHTML = '';

        if (investigadoresActuales.length === 0) {
            console.warn("Advertencia: El archivo 'investigadoresAct.json' está vacío o no contiene investigadores."); 
        }

        investigadoresActuales.forEach((investigador, index) => {
            const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
            const cardHTML = `
                <div class="researcher-card" data-id="${investigador.id}" role="button" tabindex="0">
                    <img src="${investigador.fotoUrl || './imgs/placeholder.png'}" alt="Foto de ${nombreCompleto}">
                    <span class="researcher-name">${nombreCompleto}</span>
                </div>`;
            contenedor.innerHTML += cardHTML;
        });
        contenedor.querySelectorAll('.researcher-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.getAttribute('data-id')); 
                mostrarModalInvestigador(id);
            });
            card.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                    const id = parseInt(card.getAttribute('data-id')); 
                    mostrarModalInvestigador(id);
                }
            });
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

        const ultimos4Papers = papersOrdenados.slice(0, 4);

        const contenedor = document.getElementById('contenedor-publicaciones');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        ultimos4Papers.forEach(paper => {
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

function limpiarHTML(texto) {
    return texto ? texto.replace(/<[^>]*>?/gm, '') : '';
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
        contenedor.innerHTML = '';
        servicios.forEach(servicio => {
            const itemHTML = `
                <div class="custom-accordion-item">
                    <button class="accordion-title">
                        <span class="accordion-title-text">${servicio.titulo}</span>
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
                const estabaActivo = item.classList.contains('active');
                contenedor.querySelectorAll('.custom-accordion-item').forEach(otroItem => {
                    otroItem.classList.remove('active');
                });
                if (!estabaActivo) {
                    item.classList.add('active');
                }
            });
        });
    } catch (error) {
        console.error(error);
    }
} 

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
    const closeBtn = document.getElementById('modal-close-btn'); 

    if (modal && modalTitle && modalImage && modalDescription && closeBtn) {
        modalTitle.innerHTML = linea.titulo; 
        modalImage.src = linea.imagen || './imgs/placeholder.jpg'; 
        modalImage.alt = `Imagen sobre ${limpiarHTML(linea.titulo)}`;
        modalDescription.innerHTML = linea.descripcion;

        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        modal.style.display = 'block'; 
    } else {
        console.error("Error: No se encontraron todos los elementos del modal de línea de investigación.");
    }
}