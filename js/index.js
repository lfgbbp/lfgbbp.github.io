let lineasInvestigacionData = [];
let investigadoresData = [];

document.addEventListener('DOMContentLoaded', () => {
    // ... (Tu código de inicialización existente) ...
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) yearElement.textContent = currentYear;

    cargarServicios();
    mostrarUltimasPublicaciones();
    cargarLineasInvestigacion();
    cargarInvestigadores();

    setupMenuToggle();

    const btnPast = document.getElementById('btn-past-members');
    const btnCollab = document.getElementById('btn-collaborators');
    if (btnPast) btnPast.addEventListener('click', cargarExIntegrantes);
    if (btnCollab) btnCollab.addEventListener('click', cargarColaboradores);
    
    // Listener cierre modal lista
    const closeListBtn = document.getElementById('list-modal-close-btn');
    if (closeListBtn) {
        closeListBtn.addEventListener('click', () => cerrarModal('list-modal'));
    }
    
    // Configuración inicial de cierre para los otros modales
    setupModalClickOutsideClose('research-modal');
    setupModalClickOutsideClose('researcher-modal');
    setupModalClickOutsideClose('list-modal');
});

function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const menuClose = document.getElementById('menu-close');
    const navBar = document.getElementById('navC');
    const navLinks = document.querySelectorAll('.liNav a');

    const closeMenu = () => {
        if (navBar) navBar.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (menuToggle && navBar) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navBar.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (menuClose) {
        menuClose.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', (event) => {
        if (navBar && navBar.classList.contains('active')) {
            if (!navBar.contains(event.target) && event.target !== menuToggle) {
                closeMenu();
            }
        }
    });
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

function cerrarModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        toggleBodyScroll(false); 
    }
}

function setupModalClickOutsideClose(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                cerrarModal(modalId);
            }
        });
    }
}

function limpiarHTML(texto) {
    return texto ? texto.replace(/<[^>]*>?/gm, '') : '';
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

    if (modal && modalImage && modalName && modalTitle && modalDescription && closeBtn) {
        const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
        modalImage.src = investigador.fotoUrl || './imgs/placeholder.png'; 
        modalImage.alt = `Foto de ${limpiarHTML(nombreCompleto)}`;
        modalName.innerHTML = nombreCompleto;
        modalTitle.innerHTML = investigador.titulo || '';
        modalDescription.innerHTML = investigador.descripcion || '';
        closeBtn.onclick = () => cerrarModal('researcher-modal');
        modal.style.display = 'flex'; 
        toggleBodyScroll(true); 
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

        investigadoresActuales.forEach((investigador) => {
            const nombreCompleto = `${investigador.nombre} ${investigador.apellido}`;
            const cardHTML = `
                <div class="researcher-card" data-id="${investigador.id}" role="button" tabindex="0">
                    <img src="${investigador.fotoUrl || './imgs/placeholder.png'}" alt="Foto de ${limpiarHTML(nombreCompleto)}">
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
        const respuestaPapers = await fetch('./data/papers.json');
        if (!respuestaPapers.ok) {
            throw new Error('No se pudo cargar el archivo de papers.');
        }

        const papers = await respuestaPapers.json();
        
        const papersOrdenados = papers
            .filter(p => p.fechaPublicacion && p.fechaPublicacion !== 'N/A')
            .sort((a, b) => b.fechaPublicacion.localeCompare(a.fechaPublicacion));

        const ultimos4Papers = papersOrdenados.slice(0, 4);

        const contenedor = document.getElementById('contenedor-publicaciones');
        if (!contenedor) return;

        contenedor.innerHTML = '';

        ultimos4Papers.forEach(paper => {
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

                // Cerrar TODOS los items
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

        closeBtn.onclick = () => cerrarModal('research-modal');

        modal.style.display = 'flex'; 
        toggleBodyScroll(true);
    } else {
        console.error("Error modal lineas");
    }
}

async function cargarExIntegrantes() {
    try {
        const respuesta = await fetch('./data/investigadoresPast.json');
        if (!respuesta.ok) throw new Error('Error al cargar ex-integrantes');
        const data = await respuesta.json();

        const agrupados = data.reduce((acc, persona) => {
            const tipo = persona.participacion || 'Otros';
            if (!acc[tipo]) acc[tipo] = [];
            acc[tipo].push(persona);
            return acc;
        }, {});

        let htmlContent = '';
        const ordenPreferido = ['Doctorado', 'Posdoctorado', 'Seminario de Investigación', 'Tesina de Grado'];
        const tiposDisponibles = Object.keys(agrupados);
        const tiposOrdenados = [...new Set([...ordenPreferido, ...tiposDisponibles])];

        tiposOrdenados.forEach(tipo => {
            if (agrupados[tipo]) { 
                htmlContent += `
                    <div class="participation-group">
                        <h4 class="participation-title">${tipo}</h4>
                        <ul class="participation-list">
                            ${agrupados[tipo].map(p => `
                                <li class="participation-item">
                                    <strong>${p.nombre}</strong>
                                    <span>${p.lugarDeTrabajoActual || ''}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `;
            }
        });

        mostrarModalLista('Ex-Integrantes del Laboratorio', htmlContent);

    } catch (error) {
        console.error(error);
    }
}

async function cargarColaboradores() {
    try {
        const respuesta = await fetch('./data/colaboradores.json');
        if (!respuesta.ok) throw new Error('Error al cargar colaboradores');
        const data = await respuesta.json();

        let htmlContent = '<div class="collaborators-list">';
        data.forEach(colab => {
            htmlContent += `
                <div class="collaborator-item">
                    <span class="collaborator-name">${colab.nombre}</span>
                    <span class="collaborator-place">${colab.lugarDeTrabajoActual}</span>
                </div>
            `;
        });
        htmlContent += '</div>';

        mostrarModalLista('Colaboradores', htmlContent);

    } catch (error) {
        console.error(error);
    }
}

function mostrarModalLista(titulo, contenidoHTML) {
    const modal = document.getElementById('list-modal');
    const modalTitle = document.getElementById('list-modal-title');
    const modalBody = document.getElementById('list-modal-body');
    const closeBtn = document.getElementById('list-modal-close-btn');

    if (modal && modalTitle && modalBody) {
        modalTitle.textContent = titulo;
        modalBody.innerHTML = contenidoHTML;
        
        if(closeBtn) closeBtn.onclick = () => cerrarModal('list-modal');

        modal.style.display = 'flex';
        toggleBodyScroll(true);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modales = ['research-modal', 'researcher-modal', 'list-modal'];
        modales.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal && modal.style.display === 'flex') {
                cerrarModal(modalId);
            }
        });
    }
});
