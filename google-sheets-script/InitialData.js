/**
 * LFGBBP - Datos iniciales para poblar Google Sheets
 * Este archivo contiene los datos actuales del sitio web para inicializar la planilla.
 */

const SEED_DATA = {
  "INVESTIGADORES": [
    {
      "id": 1,
      "nombre": "Claudio",
      "apellido": "Valverde",
      "titulo_es": "Dr. de la Fac. Cs. Exactas (UNLP) - Investigador Principal CONICET",
      "titulo_en": "PhD in Exact Sciences (UNLP) - Principal Researcher CONICET",
      "fotoUrl": "./imgs/investigadores/foto claudio.jpg",
      "descripcion_es": "Soy Profesor Titular de la Universidad Nacional de Quilmes, dónde dicto el curso Fisiología y Genética de Bacterias para la Licenciatura en Biotecnología. Dirijo el Laboratorio de Fisiología y Genética de Bacterias Beneficiosas para Plantas (LFGBBP), perteneciente al Centro de Bioquímica y Microbiología del Suelo (CBMS) de la Universidad Nacional de Quilmes y la CIC-BA. Lidero proyectos en el campo de las interacciones entre microorganismos y plantas, particularmente sobre mecanismos de las bacterias que promueven el crecimiento y la salud vegetal, y su regulación genética.",
      "descripcion_en": "I am a Full Professor at the National University of Quilmes, where I teach the Bacterial Physiology and Genetics course for the Biotechnology degree. I lead the Laboratory of Physiology and Genetics of Plant-Beneficial Bacteria (LFGBBP), part of the Center for Soil Biochemistry and Microbiology (CBMS) at the National University of Quilmes and CIC-BA. I lead projects in the field of microorganism-plant interactions, particularly on mechanisms by which bacteria promote plant growth and health, and their genetic regulation."
    },
    {
      "id": 2,
      "nombre": "Betina",
      "apellido": "Agaras",
      "titulo_es": "Dra. en Ciencia y Tecnología UNQ (Microbiología agrícola) - Investigadora independiente CONICET - Profesora Instructora Bioquímica (UNQ)",
      "titulo_en": "PhD in Science and Technology UNQ (Agricultural Microbiology) - Associate Researcher CONICET - Instructor Professor in Biochemistry (UNQ)",
      "fotoUrl": "./imgs/investigadores/Foto BA nueva.jpg",
      "descripcion_es": "Mi formación doctoral se basó en metodologías de biología molecular y microbiología para el análisis poblacional de <i>Pseudomonas</i> en suelos agrícolas, tanto con técnicas dependientes (recuentos en placa, PCR-RFLP) como independientes de cultivo (DGGE, PCR en tiempo real). Además, logré la caracterización funcional de aislamientos de <i>Pseudomonas</i> spp. seleccionados a partir de su capacidad de inhibir <i>in vitro</i> el crecimiento de hongos fitopatógenos que afectan a cultivos agrícolas extensivos. Además del enfoque aplicado, buscando como objetivo final el desarrollo de biosinsumos eficientes para el agro, mi interés radica en identificar y entender los mecanismos por los cuales estas bacterias ejercen la actividad antagonista por la cual fueron seleccionadas, así como en comprender la interacción planta-bacteria y los factores que intervienen en una buena colonización de los tejidos vegetales. Todo como parte de una estrategia integral para mejorar el desempeño de los inoculantes bacterianos en las condiciones naturales y edafoclimáticas donde debe actuar.",
      "descripcion_en": "My doctoral training was based on molecular biology and microbiology methodologies for population analysis of <i>Pseudomonas</i> in agricultural soils, using both culture-dependent (plate counts, PCR-RFLP) and culture-independent techniques (DGGE, real-time PCR). Additionally, I achieved functional characterization of <i>Pseudomonas</i> spp. isolates selected based on their ability to inhibit <i>in vitro</i> growth of phytopathogenic fungi affecting extensive agricultural crops. Beyond the applied approach, aiming for the development of efficient biological inputs for agriculture, my interest lies in identifying and understanding the mechanisms by which these bacteria exert the antagonistic activity for which they were selected, as well as understanding plant-bacteria interaction and the factors involved in successful colonization of plant tissues. All as part of a comprehensive strategy to improve the performance of bacterial inoculants under natural and edaphoclimatic conditions."
    },
    {
      "id": 3,
      "nombre": "Antonio",
      "apellido": "Lagares Jr.",
      "titulo_es": "Lic. en Bioquímica y Dr. en Ciencias Exactas (UNLP). Investigador Adjunto del CONICET y Docente-Investigador en la UNQ",
      "titulo_en": "BSc in Biochemistry and PhD in Exact Sciences (UNLP). Associate Researcher at CONICET and Teaching Researcher at UNQ",
      "fotoUrl": "./imgs/investigadores/foto antonio.jpg",
      "descripcion_es": "Mis intereses se centran en la comprensión a nivel molecular de fenómenos fundamentales en modelos microbianos de importancia estratégica. Combino estrategias microbiológicas clásicas, de biología molecular, análisis ómicos y bioinformáticos para estudiar procesos de (ribo)regulación metabólica y de transferencia horizontal genética en bacterias. <br> En el ámbito docente, dicto un curso de grado sobre metabolismo Intermedio (UNQ), y de posgrado sobre tecnologías ómicas para el estudio de sistemas biológicos (UNLP). <br> Busco integrar de manera continua mi perfil docente e investigador, promoviendo la colaboración científica a nivel local e internacional, y contribuyendo activamente a la formación de recursos humanos en todos los niveles.",
      "descripcion_en": "My interests focus on the molecular-level understanding of fundamental phenomena in strategically important microbial models. I combine classical microbiological strategies, molecular biology, omic and bioinformatic analyses to study processes of metabolic (ribo)regulation and horizontal gene transfer in bacteria. <br> In teaching, I conduct an undergraduate course on Intermediate Metabolism (UNQ), and a graduate course on omic technologies for studying biological systems (UNLP). <br> I seek to continuously integrate my teaching and research profile, promoting scientific collaboration at local and international levels, and actively contributing to human resource training at all levels."
    },
    {
      "id": 4,
      "nombre": "Patricio",
      "apellido": "Sobrero",
      "titulo_es": "Dr. en Ciencia y Tecnología UNQ - Investigador Asistente CONICET",
      "titulo_en": "PhD in Science and Technology UNQ - Assistant Researcher CONICET",
      "fotoUrl": "./imgs/investigadores/Foto patricio.jpg",
      "descripcion_es": "A lo largo de mi trayectoria científica me he especializado en microbiología molecular, con un enfoque particular en la regulación de la expresión génica en bacterias promotoras del crecimiento vegetal. Mis investigaciones se han centrado en comprender cómo estas bacterias perciben y procesan señales ambientales para modular la expresión génica de manera eficiente y adaptativa. Actualmente, mis líneas de investigación se orientan a desentrañar el funcionamiento de las redes regulatorias que controlan la biosíntesis de metabolitos especializados en <i>Pseudomonas</i>. Abordamos esta problemática mediante un enfoque cuali-cuantitativo, integrando diferentes niveles de regulación transcripcional, post-transcripcional y epigenético con el objetivo de construir una visión sistémica de la regulación génica en esta especie modelo. Mi trabajo busca aportar al entendimiento de los mecanismos evolutivos y adaptativos que moldean la regulación génica en bacterias de relevancia agrobiotecnológica.",
      "descripcion_en": "Throughout my scientific career, I have specialized in molecular microbiology, with a particular focus on gene expression regulation in plant growth-promoting bacteria. My research has focused on understanding how these bacteria perceive and process environmental signals to modulate gene expression efficiently and adaptively. Currently, my research lines aim to unravel the functioning of regulatory networks that control specialized metabolite biosynthesis in <i>Pseudomonas</i>. We address this problem through a quali-quantitative approach, integrating different levels of transcriptional, post-transcriptional, and epigenetic regulation with the goal of building a systemic vision of gene regulation in this model species. My work seeks to contribute to understanding the evolutionary and adaptive mechanisms that shape gene regulation in bacteria of agrobiotechnological relevance."
    },
    {
      "id": 5,
      "nombre": "Melina",
      "apellido": "Martins",
      "titulo_es": "Lic. en Biotecnología (UNQ) - Becaria Doctoral CONICET",
      "titulo_en": "BSc in Biotechnology (UNQ) - CONICET Doctoral Fellow",
      "fotoUrl": "./imgs/investigadores/foto melina.jpg",
      "descripcion_es": "Licenciada en Biotecnología con orientación en Genética Molecular (UNQ). Durante mi tesis de grado, realicé la puesta a punto de condiciones de cultivo para estudios metabolómicos y proteómicos del aislamiento <i>Pseudomonas donghuensis</i> SVBP6, identificando condiciones óptimas de crecimiento bajo estimulación con medio condicionado de los fitopatógenos <i>Xanthomonas vesicatoria</i> y <i>Sclerotinia sclerotiorum</i>. Asimismo, llevé a cabo estudios de control biológico utilizando el patosistema <i>Xanthomonas</i>-tomate. Actualmente, realizo mi doctorado en el LFGBBP, donde empleo técnicas de Biología Molecular y Microbiología para la caracterización del aislamiento probiótico autóctono <i>Pseudomonas donghuensis</i> SVBP6, con el objetivo de describir el metabolismo involucrado en la interacción bacteria-patógeno y dilucidar los mecanismos moleculares que median el antagonismo.",
      "descripcion_en": "Bachelor's degree in Biotechnology with orientation in Molecular Genetics (UNQ). During my undergraduate thesis, I optimized culture conditions for metabolomic and proteomic studies of the isolate <i>Pseudomonas donghuensis</i> SVBP6, identifying optimal growth conditions under stimulation with conditioned medium from the phytopathogens <i>Xanthomonas vesicatoria</i> and <i>Sclerotinia sclerotiorum</i>. I also carried out biological control studies using the <i>Xanthomonas</i>-tomato pathosystem. Currently, I am pursuing my doctorate at LFGBBP, where I employ Molecular Biology and Microbiology techniques for characterizing the native probiotic isolate <i>Pseudomonas donghuensis</i> SVBP6, with the aim of describing the metabolism involved in bacteria-pathogen interaction and elucidating the molecular mechanisms that mediate antagonism."
    },
    {
      "id": 6,
      "nombre": "Yanina",
      "apellido": "Magaldi",
      "titulo_es": "Licenciada en Biotecnología con Orientación en Genética Molecular (UNQ)",
      "titulo_en": "Bachelor's in Biotechnology with Orientation in Molecular Genetics (UNQ)",
      "fotoUrl": "./imgs/investigadores/foto yanina.jpg",
      "descripcion_es": "Actualmente soy becaria doctoral del CONICET y realizo el Doctorado en Ciencia y Tecnología en la Universidad Nacional de Quilmes, desempeñándome en tareas de docencia e investigación. Mi línea de investigación se centra en el estudio de Pseudomonas BP01, una bacteria aislada de suelo rizosférico con potencial como bacteria beneficiosa para plantas. Esta cepa produce un pigmento negro cuya naturaleza química y función biológica aún no han sido completamente caracterizadas. Mi trabajo aborda la regulación genética y metabólica de la producción del pigmento y su relación con el metabolismo del triptófano. Investigo la participación de este pigmento, y de otros metabolitos secundarios, en la actividad antagonista frente a bacterias y hongos fitopatógenos de plantas de tomate. El estudio de estos mecanismos resulta de particular importancia por su potencial aplicación en el desarrollo de estrategias biotecnológicas sustentables para el control de enfermedades en cultivos, contribuyendo a una agricultura más sostenible y a la reducción del uso de agroquímicos.",
      "descripcion_en": "I am currently a CONICET doctoral fellow and pursuing a PhD in Science and Technology at the National University of Quilmes, working in teaching and research tasks. My research line focuses on the study of Pseudomonas BP01, a bacterium isolated from rhizospheric soil with potential as a beneficial bacterium for plants. This strain produces a black pigment whose chemical nature and biological function have not yet been fully characterized. My work addresses the genetic and metabolic regulation of pigment production and its relationship with tryptophan metabolism. I investigate the participation of this pigment, and other secondary metabolites, in antagonistic activity against phytopathogenic bacteria and fungi of tomato plants. The study of these mechanisms is particularly important for their potential application in developing sustainable biotechnological strategies for disease control in crops, contributing to more sustainable agriculture and reduced use of agrochemicals."
    },
    {
      "id": 7,
      "nombre": "Ariel",
      "apellido": "Bravo",
      "titulo_es": "Lic. en Biotecnología con orientación en Agrobiotecnología (UNQ) - Estudiante doctoral UNQ",
      "titulo_en": "BSc in Biotechnology with orientation in Agrobiotechnology (UNQ) - UNQ Doctoral Student",
      "fotoUrl": "./imgs/investigadores/foto ariel.png",
      "descripcion_es": "Me desempeño como docente en el Centro universitario de la Innovación de la Matanza (UNQ-CUDI) en las áreas de química y microbiología. Mi trabajo de tesis se centra en la caracterización de sRNA en <i>Sinorhizobium meliloti</i>. Actualmente realizo actividades de investigación en la Johannes Gutenberg-Universität Mainz, donde trabajo en el estudio de proteínas intrínsecamente desordenadas.",
      "descripcion_en": "I work as a teacher at the University Center for Innovation of La Matanza (UNQ-CUDI) in the areas of chemistry and microbiology. My thesis work focuses on the characterization of sRNA in <i>Sinorhizobium meliloti</i>. I am currently conducting research activities at Johannes Gutenberg-Universität Mainz, where I work on the study of intrinsically disordered proteins."
    },
    {
      "id": 8,
      "nombre": "Priscila",
      "apellido": "Fredez",
      "titulo_es": "Lic. en Biotecnología (UNQ) - Becaria Doctoral CONICET",
      "titulo_en": "BSc in Biotechnology (UNQ) - CONICET Doctoral Fellow",
      "fotoUrl": "./imgs/investigadores/foto priscila.jpg",
      "descripcion_es": "Mi investigación se centra en estudiar a un rizobio como modelo de microorganismos promotores del crecimiento en leguminosas. Específicamente, busco entender a nivel molecular el proceso de hibernación metabólica de la bacteria con el objetivo de generar conocimiento que permita mejorar los bioinsumos para la agricultura. En mi formación de grado, enfoqué mi tesis en la transferencia horizontal de genes a través de partículas GTAs (gene transfer agents). Logré demostrar este proceso entre bacterias relacionadas filogenéticamente, lo que posiciona a estos agentes como potenciales vectores de flujo genético en comunidades microbianas complejas. Además de investigar, me desempeño como auxiliar académica en el área de Bioquímica.",
      "descripcion_en": "My research focuses on studying a rhizobium as a model of growth-promoting microorganisms in legumes. Specifically, I seek to understand at a molecular level the metabolic hibernation process of bacteria with the aim of generating knowledge that allows improving bioinputs for agriculture. In my undergraduate training, I focused my thesis on horizontal gene transfer through GTAs (gene transfer agents) particles. I managed to demonstrate this process among phylogenetically related bacteria, which positions these agents as potential vectors of gene flow in complex microbial communities. In addition to research, I work as an academic assistant in the area of ​​Biochemistry."
    },
    {
      "id": 9,
      "nombre": "Melani",
      "apellido": "Lorch",
      "titulo_es": "Licenciada en Biotecnología y Doctora en Ciencia y Tecnología de la Universidad Nacional de Quilmes",
      "titulo_en": "Bachelor's in Biotechnology and PhD in Science and Technology from the National University of Quilmes",
      "fotoUrl": "./imgs/investigadores/foto melani.jpg",
      "descripcion_es": "Durante mi tesina de licenciatura investigué el impacto de la aplicación reiterada del herbicida glifosato sobre la comunidad cultivable de Pseudomonas en un pastizal natural. Mi tesis doctoral, financiada mediante una beca CONICET, se centró en el estudio de la persistencia en semillas y la competitividad rizosférica de diversos aislamientos del género Pseudomonas con propiedades de promoción del crecimiento vegetal, mediante un enfoque multidisciplinario que integró técnicas de biología molecular, microbiología y microscopía. Actualmente realizo un servicio para YPF Tecnología (Y-TEC), que involucra el cultivo y enriquecimiento de microorganismos anaerobios capaces de utilizar poliacrilamida parcialmente hidrolizada (HPAM) como fuente de carbono y energía. Además de mis tareas de investigación, me desempeño como instructora de la materia Fisiología y Genética de Bacterias, correspondiente al ciclo superior de la Licenciatura en Biotecnología en la misma Universidad.",
      "descripcion_en": "During my undergraduate thesis, I investigated the impact of repeated glyphosate herbicide application on the cultivable Pseudomonas community in a natural grassland. My doctoral thesis, funded by a CONICET grant, focused on studying seed persistence and rhizospheric competitiveness of various isolates of the genus Pseudomonas with plant growth-promoting properties, through a multidisciplinary approach that integrated molecular biology, microbiology, and microscopy techniques. I currently provide services for YPF Technology (Y-TEC), involving the cultivation and enrichment of anaerobic microorganisms capable of using partially hydrolyzed polyacrylamide (HPAM) as a carbon and energy source. In addition to my research tasks, I serve as an instructor for the Bacterial Physiology and Genetics course, corresponding to the upper cycle of the Biotechnology degree at the same University."
    },
    {
      "id": 10,
      "nombre": "Lucia",
      "apellido": "Nuñez",
      "titulo_es": "Estudiante avanzada de la Licenciatura en Biotecnología con orientación en Bioprocesos (UNQ)",
      "titulo_en": "Advanced student of the Bachelor's in Biotechnology with orientation in Bioprocesses (UNQ)",
      "fotoUrl": "./imgs/investigadores/foto lucia.jpeg",
      "descripcion_es": "Mi interés se orienta al estudio de microorganismos con potencial aplicación en agricultura sustentable y el desarrollo de estrategias biotecnológicas para el cuidado y manejo del ambiente. Actualmente realizo mi tesina de grado sobre la caracterización fisiológica y genómica de variantes morfológicas espontáneas de la cepa estimulante de cereales <i>Pseudomonas pergaminensis</i> en el LFGBBP en la UNQ, bajo la dirección del Dr. Claudio Valverde. Además, me desempeño como auxiliar docente en el área de Microbiología e Inmunología y como tutora de ingresantes en el Taller de Vida Universitaria en la misma Universidad. Participo activamente en la organización de jornadas académicas y actividades de divulgación científica, y me interesa la comunicación pública de la ciencia y su vinculación con la sociedad.",
      "descripcion_en": "My interest is oriented towards the study of microorganisms with potential application in sustainable agriculture and the development of biotechnological strategies for environmental care and management. I am currently working on my undergraduate thesis on the physiological and genomic characterization of spontaneous morphological variants of the cereal-stimulating strain <i>Pseudomonas pergaminensis</i> at LFGBBP at UNQ, under the direction of Dr. Claudio Valverde. Additionally, I work as a teaching assistant in the Microbiology and Immunology area and as a tutor for new students in the University Life Workshop at the same University. I actively participate in organizing academic conferences and science outreach activities, and I am interested in public science communication and its connection with society."
    },
    {
      "id": 11,
      "nombre": "Sofia",
      "apellido": "Díaz",
      "titulo_es": "Estudiante avanzada de la Licenciatura en Biotecnología con orientación en Genética Molecular (UNQ)",
      "titulo_en": "Advanced student of the Bachelor's in Biotechnology with orientation in Molecular Genetics (UNQ)",
      "fotoUrl": "./imgs/investigadores/foto sofia.jpeg",
      "descripcion_es": "Ademas de ser estudiante también me desempeño como auxiliar académico de laboratorio en el área de Ciencias Básicas de Alimentos. Actualmente, soy Becaria CIC de entrenamiento en el en el LFGBBP, donde me encuentro realizando mi seminario de grado enfocado en la caracterización molecular de proteínas de unión a ARN de la familia Crs-Rsm en <i>Pseudomonas aeruginosa</i>. Mi formación se centra en dos áreas que me han apasionado durante toda la carrera, la microbiología y biología molecular. Me interesa particularmente comprender los mecanismos moleculares que regulan la interacción entre microorganismos y su entorno, con una mirada aplicada hacia la biotecnología.",
      "descripcion_en": "In addition to being a student, I also work as an academic laboratory assistant in the Food Basic Sciences area. Currently, I am a CIC training fellow at LFGBBP, where I am conducting my undergraduate seminar focused on the molecular characterization of RNA-binding proteins of the Crs-Rsm family in <i>Pseudomonas aeruginosa</i>. My training focuses on two areas that have passionate me throughout my career: microbiology and molecular biology. I am particularly interested in understanding the molecular mechanisms that regulate the interaction between microorganisms and their environment, with an applied view towards biotechnology."
    },
    {
      "id": 12,
      "nombre": "Micaela",
      "apellido": "Arnoso Ventancour",
      "titulo_es": "Estudiante avanzada de la Licenciatura en Biotecnología con orientación en genética molecular (UNQ)",
      "titulo_en": "Advanced student of the Bachelor's in Biotechnology with orientation in molecular genetics (UNQ)",
      "fotoUrl": "./imgs/investigadores/foto micaela.jpeg",
      "descripcion_es": "Actualmente, me encuentro realizando mi tesina de grado en el LFGBBP, sobre el desarrollo de bioinsumos bacterianos para mejorar la productividad y la calidad del cultivo de <i>Cannabis sativa</i> para su uso medicinal, bajo la dirección de la Dra. Betina Agaras",
      "descripcion_en": "Currently, I am working on my undergraduate thesis at LFGBBP on the development of bacterial bioinputs to improve productivity and quality of <i>Cannabis sativa</i> cultivation for medicinal use, under the direction of Dr. Betina Agaras"
    },
    {
      "id": 13,
      "nombre": "Alexa",
      "apellido": "Gallardo Lafon",
      "titulo_es": "Estudiante de la Licenciatura en Biotecnología (UNQ) | Técnica laboratorista (UNQ) | Técnica en Nutrición Comunitaria (UNLa)",
      "titulo_en": "Student of the Bachelor's in Biotechnology (UNQ) | Laboratory Technician (UNQ) | Community Nutrition Technician (UNLa)",
      "fotoUrl": "./imgs/investigadores/foto alexa.jpg",
      "descripcion_es": "Como estudiante avanzada de la Licenciatura en Biotecnología con orientación en bioprocesos mis intereses se enfocan en la biotecnología sustentable y ambiental. Actualmente soy beneficiaria de la Becas de Formación en la Investigación para Estudiantes en etapa final de Carrera de Grado de la Universidad Nacional de Quilmes y me encuentro trabajando con un aislamiento autóctono de pseudomonas productora de pigmento con potencial de aplicación como fitoprotector solar para cultivos de interés agronómico, bajo la dirección del Dr. Patricio Sobrero. Además, me desempeño como auxiliar académica en el área de ambiente y participo como voluntaria en los proyectos de extensión PACHA Programa de Alimentacion, Comunidad y Huerta Agroecológica de la UNLa, y Compostando y Cultivando ConCiencia, proyecto de gestión de residuos orgánicos y restauración ecológica de la UNQ.",
      "descripcion_en": "As an advanced student of the Bachelor's in Biotechnology with orientation in bioprocesses, my interests focus on sustainable and environmental biotechnology. I am currently a beneficiary of the Research Training Scholarships for Students in the final stage of Undergraduate Degree at the National University of Quilmes and I am working with a native isolate of pigment-producing pseudomonas with potential application as a plant sunscreen for crops of agronomic interest, under the direction of Dr. Patricio Sobrero. Additionally, I work as an academic assistant in the environmental area and participate as a volunteer in the extension projects PACHA Food, Community and Agroecological Garden Program of UNLa, and Composting and Cultivating ConScience, an organic waste management and ecological restoration project of UNQ."
    }
  ],
  "EX_MIEMBROS": [
    {
      "id": 1,
      "nombre_es": "Dr. Germán Ceizel-Borella",
      "nombre_en": "Dr. Germán Ceizel-Borella",
      "participacion_es": "Doctorado",
      "participacion_en": "PhD",
      "lugarDeTrabajoActual_es": "Especialista en asuntos regulatorios de la Secretaría de Agricultura, Ganadería y Pesca de la Nación (Argentina)",
      "lugarDeTrabajoActual_en": "Regulatory Affairs Specialist at the National Secretariat of Agriculture, Livestock and Fisheries (Argentina)"
    },
    {
      "id": 2,
      "nombre_es": "Dra. Indra Roux",
      "nombre_en": "Dr. Indra Roux",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Investigadora asociada en la unidad de Toxicologia de la Universidad de Cambridge (Reino Unido)",
      "lugarDeTrabajoActual_en": "Associate Researcher in the Toxicology Unit at Cambridge University (United Kingdom)"
    },
    {
      "id": 3,
      "nombre_es": "Dr. Federico Muzio",
      "nombre_en": "Dr. Federico Muzio",
      "participacion_es": "Doctorado",
      "participacion_en": "PhD",
      "lugarDeTrabajoActual_es": "Posdoc en la Univesidad de Pittsburgh (EEUU)",
      "lugarDeTrabajoActual_en": "Postdoc at the University of Pittsburgh (USA)"
    },
    {
      "id": 4,
      "nombre_es": "Lic. Teresita Ybarra",
      "nombre_en": "BSc. Teresita Ybarra",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Asistente de ensayos clinicos en IQVIA (Argentina)",
      "lugarDeTrabajoActual_en": "Clinical Trials Assistant at IQVIA (Argentina)"
    },
    {
      "id": 5,
      "nombre_es": "Ing. Agrobiotec. Maria Fernanda Sosa",
      "nombre_en": "Agrobiotech Eng. Maria Fernanda Sosa",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Tecnica de ventas en Onelab S.A. (Argentina)",
      "lugarDeTrabajoActual_en": "Sales Technician at Onelab S.A. (Argentina)"
    },
    {
      "id": 6,
      "nombre_es": "Dr. Leticia Fernandez",
      "nombre_en": "Dr. Leticia Fernandez",
      "participacion_es": "Posdoctorado",
      "participacion_en": "Postdoctoral",
      "lugarDeTrabajoActual_es": "Investigadora Adjunta de CONICET (LABEA, UNS, Argentina)",
      "lugarDeTrabajoActual_en": "Associate Researcher at CONICET (LABEA, UNS, Argentina)"
    },
    {
      "id": 7,
      "nombre_es": "Lic. Florencia Farina",
      "nombre_en": "BSc. Florencia Farina",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Emprendedora de Oreshki (Argentina)",
      "lugarDeTrabajoActual_en": "Entrepreneur at Oreshki (Argentina)"
    },
    {
      "id": 8,
      "nombre_es": "Mg. Mariana Marrero",
      "nombre_en": "MSc. Mariana Marrero",
      "participacion_es": "Maestria",
      "participacion_en": "Master's Degree",
      "lugarDeTrabajoActual_es": "Docente JTP en la facultad de Ciencias Agrarias de la UNLZ (Argentina)",
      "lugarDeTrabajoActual_en": "Teaching Assistant Professor at the Faculty of Agricultural Sciences, UNLZ (Argentina)"
    },
    {
      "id": 9,
      "nombre_es": "Lic. Julián D'Ambrosio",
      "nombre_en": "BSc. Julián D'Ambrosio",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Analista Senior de Aseguramiento de Calidad en Nutrihome S.A (Argentina)",
      "lugarDeTrabajoActual_en": "Senior Quality Assurance Analyst at Nutrihome S.A (Argentina)"
    },
    {
      "id": 10,
      "nombre_es": "Dr. Andres Muzlera",
      "nombre_en": "Dr. Andres Muzlera",
      "participacion_es": "Doctorado",
      "participacion_en": "PhD",
      "lugarDeTrabajoActual_es": "MLOPs Engineer en Santander Tecnología Argentina (Argentina)",
      "lugarDeTrabajoActual_en": "MLOPs Engineer at Santander Technology Argentina (Argentina)"
    },
    {
      "id": 11,
      "nombre_es": "Dr. Matías Garavaglia",
      "nombre_en": "Dr. Matías Garavaglia",
      "participacion_es": "Posdoctorado",
      "participacion_en": "Postdoctoral",
      "lugarDeTrabajoActual_es": "Docente Investigador en la Universidad Nacional de Hurlingham (Argentina)",
      "lugarDeTrabajoActual_en": "Teaching Researcher at the National University of Hurlingham (Argentina)"
    },
    {
      "id": 12,
      "nombre_es": "Dr. Alexandre Jousset",
      "nombre_en": "Dr. Alexandre Jousset",
      "participacion_es": "Posdoctorado",
      "participacion_en": "Postdoctoral",
      "lugarDeTrabajoActual_es": "CEO & Co-Fundador de Genedance (Suiza)",
      "lugarDeTrabajoActual_en": "CEO & Co-Founder of Genedance (Switzerland)"
    },
    {
      "id": 13,
      "nombre_es": "Lic. María Cecilia Álvarez Crespo",
      "nombre_en": "BSc. María Cecilia Álvarez Crespo",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Escuela Secundaria de Educación Técnica y Departamento de Ciencia y Tecnología, Universidad Nacional de Quilmes (Argentina)",
      "lugarDeTrabajoActual_en": "Technical Education High School and Department of Science and Technology, National University of Quilmes (Argentina)"
    },
    {
      "id": 14,
      "nombre_es": "Lic. Dante Ruiz",
      "nombre_en": "BSc. Dante Ruiz",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Coordinador de Ingenieria en Koppert Argentina (Argentina)",
      "lugarDeTrabajoActual_en": "Engineering Coordinator at Koppert Argentina (Argentina)"
    },
    {
      "id": 15,
      "nombre_es": "Bqca. Malena Weisinger Calvo",
      "nombre_en": "Biochemist Malena Weisinger Calvo",
      "participacion_es": "Seminario de Investigación",
      "participacion_en": "Research Seminar",
      "lugarDeTrabajoActual_es": "Bioquimica en el Hospital Ana Goitia en Avellaneda, Buenos Aires (Argentina)",
      "lugarDeTrabajoActual_en": "Biochemist at Ana Goitia Hospital in Avellaneda, Buenos Aires (Argentina)"
    }
  ],
  "COLABORADORES": [
    {
      "id": 1,
      "nombre_es": "Dr. Adam Deutschbauer",
      "nombre_en": "Dr. Adam Deutschbauer",
      "lugarDeTrabajoActual_es": "Genómica comparativa y funcional en el Laboratorio Nacional Lawrence Berkeley (EEUU)",
      "lugarDeTrabajoActual_en": "Comparative and Functional Genomics at Lawrence Berkeley National Laboratory (USA)"
    },
    {
      "id": 2,
      "nombre_es": "Dra. Anke Becker",
      "nombre_en": "Dr. Anke Becker",
      "lugarDeTrabajoActual_es": "Universidad Phillips de Marburg, Centro de Microbiología Sintética (SYNMIKRO, Alemania)",
      "lugarDeTrabajoActual_en": "Philipps University of Marburg, Center for Synthetic Microbiology (SYNMIKRO, Germany)"
    },
    {
      "id": 3,
      "nombre_es": "Dr. Marco Masi",
      "nombre_en": "Dr. Marco Masi",
      "lugarDeTrabajoActual_es": "Departamento de Ciencias Químicas, Universidad de Nápoles Federico II (Italia)",
      "lugarDeTrabajoActual_en": "Department of Chemical Sciences, University of Naples Federico II (Italy)"
    },
    {
      "id": 4,
      "nombre_es": "Dr. Alessio Cimmino",
      "nombre_en": "Dr. Alessio Cimmino",
      "lugarDeTrabajoActual_es": "Departamento de Ciencias Químicas, Universidad de Nápoles Federico II (Italia)",
      "lugarDeTrabajoActual_en": "Department of Chemical Sciences, University of Naples Federico II (Italy)"
    },
    {
      "id": 5,
      "nombre_es": "Dra. Ana Cohen",
      "nombre_en": "Dr. Ana Cohen",
      "lugarDeTrabajoActual_es": "Instituto de Biología Agrícola de Mendoza (IBAM-CONICET, UNCuyo, Argentina)",
      "lugarDeTrabajoActual_en": "Institute of Agricultural Biology of Mendoza (IBAM-CONICET, UNCuyo, Argentina)"
    },
    {
      "id": 6,
      "nombre_es": "Dra. María Trinidad Gallegos",
      "nombre_en": "Dr. María Trinidad Gallegos",
      "lugarDeTrabajoActual_es": "Estación Experimental del Zaidín-CSIC (Granada, España)",
      "lugarDeTrabajoActual_en": "Zaidín Experimental Station-CSIC (Granada, Spain)"
    },
    {
      "id": 7,
      "nombre_es": "Dr. Matías Garavaglia",
      "nombre_en": "Dr. Matías Garavaglia",
      "lugarDeTrabajoActual_es": "Laboratorio de Aplicaciones Biotecnológicas y Microbiología (LAByM) - Universidad Nacional de Hurlingham",
      "lugarDeTrabajoActual_en": "Laboratory of Biotecnological Applications and Microbiology (LAByM) - National University of Hurlingham"
    },
    {
      "id": 8,
      "nombre_es": "Dr. Guillermo Maroniche",
      "nombre_en": "Dr. Guillermo Maroniche",
      "lugarDeTrabajoActual_es": "Facultad de Ciencias Agrarias, Universidad Nacional de Mar del Plata (UNMdP)",
      "lugarDeTrabajoActual_en": "Faculty of Agricultural Sciences, National University of Mar del Plata (UNMdP)"
    }
  ],
  "LINEAS": [
    {
      "id": 1,
      "titulo_es": "Aislamientos nativos del genero <i>Pseudomonas</i>: estudios funcionales para el desarrollo de bioinsumos.",
      "titulo_en": "Native isolates of the genus <i>Pseudomonas</i>: functional studies for bioinput development.",
      "descripcion_es": "Las bacterias del género <i>Pseudomonas</i> son microorganismos ubicuos con una gran diversidad metabólica y ecológica. Algunas especies poseen características promotoras del crecimiento vegetal y biocontrol de fitopatógenos, por lo que son candidatas ideales para el desarrollo de bioinsumos agrícolas sustentables. En esta línea de investigación, nos enfocamos en el aislamiento y caracterización de cepas autóctonas de <i>Pseudomonas</i> con potencial aplicación agrícola, así como en el estudio de sus mecanismos moleculares de acción y su interacción con los diferentes cultivos.",
      "descripcion_en": "<i>Pseudomonas</i> bacteria are ubiquitous microorganisms with great metabolic and ecological diversity. Some species possess plant growth-promoting and phytopathogen biocontrol characteristics, making them ideal candidates for developing sustainable agricultural bioinputs. In this research line, we focus on the isolation and characterization of native <i>Pseudomonas</i> strains with potential agricultural application, as well as studying their molecular mechanisms of action and interaction with different crops.",
      "imagen": "./imgs/lineas/linea1_2.jpeg"
    },
    {
      "id": 2,
      "titulo_es": "Riborregulación del metabolismo en rizobios",
      "titulo_en": "Riboregulation of metabolism in rhizobia",
      "descripcion_es": "Estudiamos los mecanismos de regulación post-transcripcional mediados por ARNs pequeños (sRNAs) en bacterias simbiontes de leguminosas fijadoras de nitrógeno, utilizando a Sinorhizobium meliloti como organismo modelo. Nuestro objetivo es comprender cómo estas redes de regulación integran señales del entorno para ajustar diversos procesos del metabolismo celular.",
      "descripcion_en": "We study post-transcriptional regulation mechanisms mediated by small RNAs (sRNAs) in nitrogen-fixing legume symbiotic bacteria, using Sinorhizobium meliloti as a model organism. Our goal is to understand how these regulatory networks integrate environmental signals to adjust various cellular metabolism processes.",
      "imagen": "./imgs/banner/4.jpeg"
    },
    {
      "id": 3,
      "titulo_es": "Biología de los Agentes de Transferencia Génica (GTAs)",
      "titulo_en": "Biology of Gene Transfer Agents (GTAs)",
      "descripcion_es": "Los GTAs son elementos simil-fagos que son producidos por ciertas bacterias y empaquetan fragmentos del propio genoma bacteriano para donarlos a otras células. En el laboratorio, investigamos la regulación, función y rol ecológico de GTAs como vectores de transferencia genética horizontal en modelos de alfaproteobacterias.",
      "descripcion_en": "GTAs are phage-like elements produced by certain bacteria that package fragments of their own bacterial genome to donate them to other cells. In the laboratory, we investigate the regulation, function, and ecological role of GTAs as horizontal gene transfer vectors in alphaproteobacteria models.",
      "imagen": "./imgs/lineas/GTA.png"
    },
    {
      "id": 4,
      "titulo_es": "Análisis molecular de las redes regulatorias implicadas en el control de la expresión génica en bacterias",
      "titulo_en": "Molecular analysis of regulatory networks involved in bacterial gene expression control",
      "descripcion_es": "Estudiamos cómo las bacterias del género <i>Pseudomonas</i> perciben señales ambientales y las integran en redes regulatorias complejas que controlan la biosíntesis de metabolitos especializados. Empleamos un abordaje sistémico, integrando niveles de regulación transcripcional y postranscripcional, tanto en estudios poblacionales como de célula única. Esta línea de investigación busca comprender los principios evolutivos y adaptativos que gobiernan los circuitos regulatorios de la expresión génica, a fin de poder transferir este conocimiento fundamental al diseño de racional de potenciales bioinsumos.",
      "descripcion_en": "We study how <i>Pseudomonas</i> bacteria perceive environmental signals and integrate them into complex regulatory networks that control specialized metabolite biosynthesis. We employ a systems approach, integrating transcriptional and post-transcriptional regulation levels in both population and single-cell studies. This research line seeks to understand the evolutionary and adaptive principles governing gene expression regulatory circuits, in order to transfer this fundamental knowledge to the rational design of potential bioinputs.",
      "imagen": "./imgs/lineas/lineaGenoma.jpg"
    },
    {
      "id": 5,
      "titulo_es": "Bases genéticas de la promoción del crecimiento por parte de <i>Pseudomonas pergaminensis</i> 1008",
      "titulo_en": "Genetic basis of growth promotion by <i>Pseudomonas pergaminensis</i> 1008",
      "descripcion_es": "Esta cepa de una nueva especie del género que definimos en nuestro laboratorio, es el ingrediente activo de bioinsumos comerciales que promueven el rendimiento en grano de cereales. Buscamos comprender sus características microbiológicas, sus mecanismos de promoción de crecimiento, y su interacción con los tejidos vegetales.",
      "descripcion_en": "This strain of a new species of the genus that we defined in our laboratory is the active ingredient in commercial bioinputs that promote cereal grain yield. We seek to understand its microbiological characteristics, growth promotion mechanisms, and interaction with plant tissues.",
      "imagen": "./imgs/lineas/basesGeneticas.jpg"
    },
    {
      "id": 6,
      "titulo_es": "Caracterización funcional del ARN pequeño Sm84 de <i>Sinorhizobium meliloti</i>",
      "titulo_en": "Functional characterization of the small RNA Sm84 from <i>Sinorhizobium meliloti</i>",
      "descripcion_es": "Sm84 es un ARN no codificante muy conservado en rizobiales con diferentes estilos de vida, cuya función biológica es desconocida. En este proyecto, queremos identificar el rol funcional del alelo sm84 de <i>Sinorhizobium meliloti</i> tanto en vida libre como en su asociación simbiótica con alfalfa.",
      "descripcion_en": "Sm84 is a highly conserved non-coding RNA in rhizobia with different lifestyles, whose biological function is unknown. In this project, we want to identify the functional role of the sm84 allele of <i>Sinorhizobium meliloti</i> both in free-living and in its symbiotic association with alfalfa.",
      "imagen": "./imgs/lineas/caracterizacionFuncional.jpg"
    },
    {
      "id": 7,
      "titulo_es": "ARNs pequeños regulatorios del clan Rsm en bacterias del género <i>Pseudomonas</i>",
      "titulo_en": "Small regulatory RNAs of the Rsm clan in bacteria of the genus <i>Pseudomonas</i>",
      "descripcion_es": "Los ARNs no codificantes del clan Rsm son intermediarios funcionales clave para la regulación global de la expresión genética a nivel post-transcripcional en el género <i>Pseudomonas</i>. Tratamos de comprender su multiplicidad génica en los distintos grupos intragénero, y caracterizar nuevas familias identificadas en cromosomas y elementos génicos móviles.",
      "descripcion_en": "Non-coding RNAs of the Rsm clan are key functional intermediaries for global regulation of gene expression at the post-transcriptional level in the genus <i>Pseudomonas</i>. We seek to understand their gene multiplicity in different intra-genus groups and characterize new families identified in chromosomes and mobile genetic elements.",
      "imagen": "./imgs/lineas/arnPequeños.JPG"
    },
    {
      "id": 8,
      "titulo_es": "Caracterización de metabolitos especializados de <i>Pseudomonas</i> autóctonas",
      "titulo_en": "Characterization of specialized metabolites from native <i>Pseudomonas</i>",
      "descripcion_es": "Los genomas de los distintos linajes del género <i>Pseudomonas</i> contienen un patrimonio enormemente rico de agrupamientos génicos para la biosíntesis de metabolitos bioactivos de naturaleza desconocida. Nos interesa en particular la identificación de determinantes genéticos y/o moléculas bioactivas con actividad antimicrobiana, en aislamientos autóctonos de especies con rasgos biopesticidas.",
      "descripcion_en": "The genomes of different lineages of the genus <i>Pseudomonas</i> contain an enormously rich heritage of gene clusters for the biosynthesis of bioactive metabolites of unknown nature. We are particularly interested in identifying genetic determinants and/or bioactive molecules with antimicrobial activity in native isolates of species with biopesticide traits.",
      "imagen": "./imgs/lineas/metabolitos.jpg"
    },
    {
      "id": 9,
      "titulo_es": "Desarrollo de bioinsumos bacterianos para mejorar la productividad y la calidad del cultivo de <i>Cannabis sativa</i> para su uso medicinal",
      "titulo_en": "Development of bacterial bioinputs to improve productivity and quality of <i>Cannabis sativa</i> cultivation for medicinal use",
      "descripcion_es": "El objetivo de esta línea de trabajo es la generación de una mezcla de aislamientos promotores del crecimiento vegetal del género <i>Pseudomonas</i> para su utilización como bioinsumo en el cultivo de cannabis para mejorar su rendimiento y/o calidad fitoquímica.",
      "descripcion_en": "The objective of this line of work is to generate a mixture of plant growth-promoting isolates of the genus <i>Pseudomonas</i> for use as a bioinput in cannabis cultivation to improve its yield and/or phytochemical quality.",
      "imagen": "./imgs/lineas/linea desarrollo.jpeg"
    }
  ],
  "PAPERS": [
    {
      "paperId": 100,
      "fechaPublicacion": "2024",
      "titulo": "Variability in maize seed bacterization and survival correlating with root colonization by Pseudomonas isolates with plant-probiotic traits.",
      "publicadoEn": "PLANTS",
      "enlace": "https://doi.org/10.3390/plants13152130",
      "autores": "Lorch, M., Valverde, C., Agaras, B."
    },
    {
      "paperId": 101,
      "fechaPublicacion": "2025",
      "titulo": "Autochthonous isolate Pseudomonas 42P4 as a sustainable strategy to control Rhizoctonia solani and promote growth of tomato plants.",
      "publicadoEn": "J NATURAL PESTICIDE RESEARCH",
      "enlace": "https://doi.org/10.1016/j.napere.2025.100164",
      "autores": "Pérez-Rodriguez, M., Lucero, G., Agaras, B., Lobato-Ureche, M., Fernández, M., Espino, M., Cohen, A."
    },
    {
      "paperId": 102,
      "fechaPublicacion": "2024",
      "titulo": "Comparative Multi‐Omics Survey Reveals Novel Specialized Metabolites and Biosynthetic Gene Clusters Under GacS Control in Pseudomonas donghuensis Strain SVBP6",
      "publicadoEn": "Molecular Microbiology",
      "enlace": "https://doi.org/10.1111/mmi.15329",
      "autores": "Muzio, F., Hamilton, C., Stincone, P., Agaras, B., Haney, C., Petras, D., Valverde, C."
    },
    {
      "paperId": 103,
      "fechaPublicacion": "2024",
      "titulo": "Small Regulatory RNAs of the Rsm Clan in Pseudomonas",
      "publicadoEn": "Molecular Microbiology",
      "enlace": "https://doi.org/10.1111/mmi.15313",
      "autores": "Gallegos, M., Garavaglia, M., Valverde, C."
    },
    {
      "paperId": 104,
      "fechaPublicacion": "2024",
      "titulo": "Orfamide production in Pseudomonas protegens CHA0T promotes rhizospheric colonization and influences assemblage of the bacterial community of wheat roots in soil.",
      "publicadoEn": "Rhizosphere",
      "enlace": "https://doi.org/10.1016/j.rhisph.2024.100882",
      "autores": "Muzlera, A., Sobrero, P., Agaras, B., Valverde, C."
    },
    {
      "paperId": 105,
      "fechaPublicacion": "2023",
      "titulo": "Comparative genomics and informational content analysis uncovered internal regions of the core genes rpoD, pepN and gltX for an MLSA with genome-level resolving power within the genus Pseudomonas",
      "publicadoEn": "Molecular Phylogenetics and Evolution",
      "enlace": "https://doi.org/10.1016/j.ympev.2022.107663",
      "autores": "Garavaglia, M., Muzlera, A., Valverde, C."
    },
    {
      "paperId": 106,
      "fechaPublicacion": "2021",
      "titulo": "Repeated annual application of glyphosate reduces the abundance and alters the community structure of soil culturable pseudomonads in a temperate grassland",
      "publicadoEn": "Agriculture, Ecosystems & Environment",
      "enlace": "https://doi.org/10.1016/j.agee.2021.107503",
      "autores": "Lorch, M., Agaras, B., García-Parisi, P., Druille, M., Omacini, M., Valverde, C."
    },
    {
      "paperId": 107,
      "fechaPublicacion": "2020",
      "titulo": "A black-pigmented pseudomonad isolate with antibacterial activity against phyllospheric pathogens",
      "publicadoEn": "Rhizosphere",
      "enlace": "https://doi.org/10.1016/j.rhisph.2020.100207",
      "autores": "Sosa, F., Sobrero, P., Valverde, C., Agaras, B."
    },
    {
      "paperId": 108,
      "fechaPublicacion": "2020",
      "titulo": "Biocontrol potential index of pseudomonads, instead of their direct-growth promotion traits, is a predictor of seed inoculation effect on crop productivity under field conditions",
      "publicadoEn": "Biological Control",
      "enlace": "https://doi.org/10.1016/j.biocontrol.2020.104209",
      "autores": "Agaras, B., Noguera, F., Gonzales Anta, G., Wall, L., Valverde, C."
    },
    {
      "paperId": 109,
      "fechaPublicacion": "2020",
      "titulo": "Biocontrol Traits Correlate With Resistance to Predation by Protists in Soil Pseudomonads",
      "publicadoEn": "Frontiers in Microbiology",
      "enlace": "https://doi.org/10.3389/fmicb.2020.614194",
      "autores": "Amacker, N., Zhilei, G., Agaras, B., Latz, E., Kowalchuk, G., Valverde, C., Jousset, A., Weidner, S."
    },
    {
      "paperId": 110,
      "fechaPublicacion": "2020",
      "titulo": "Comparative Genomics and Evolutionary Analysis of RNA-Binding Proteins of the CsrA Family in the Genus Pseudomonas",
      "publicadoEn": "Frontiers in Molecular Biosciences",
      "enlace": "https://doi.org/10.3389/fmolb.2020.00127",
      "autores": "Sobrero, P., Valverde, C."
    },
    {
      "paperId": 111,
      "fechaPublicacion": "2022",
      "titulo": "Visualising the concept of metabolic regulation in bacteria: a simple laboratory experiment on polyhydroxybutyrate storage",
      "publicadoEn": "Journal of Biological Education",
      "enlace": "https://doi.org/10.1080/00219266.2020.1757482",
      "autores": "Lagares, A. Jr., Garavaglia, M., Robledo, N., Valverde, C., Goñi, S., Lozano, M."
    },
    {
      "paperId": 112,
      "fechaPublicacion": "2020",
      "titulo": "7‐hydroxytropolone is the main metabolite responsible for the fungal antagonism of Pseudomonas donghuensis strain SVBP6",
      "publicadoEn": "Environmental Microbiology",
      "enlace": "https://doi.org/10.1111/1462-2920.14925",
      "autores": "Muzio, F., Agaras, B., Masi, M., Tuzi, A., Evidente, A., Valverde, C."
    },
    {
      "paperId": 113,
      "fechaPublicacion": "2019",
      "titulo": "A mutation in the glta gene from a native isolate of the Pseudomonas chlororaphis subgroup induces a phenotypic change associated with phenazine production",
      "publicadoEn": "Archives of Phytopathology and Plant Protection",
      "enlace": "https://doi.org/10.1080/03235408.2018.1549649",
      "autores": "Agaras, B., Valverde, C."
    },
    {
      "paperId": 114,
      "fechaPublicacion": "2018",
      "titulo": "Expression of the small regulatory RNA gene mmgR is regulated negatively by AniA and positively by NtrC in Sinorhizobium meliloti 2011",
      "publicadoEn": "Microbiology",
      "enlace": "https://doi.org/10.1099/mic.0.000586",
      "autores": "Borella, G.C., Lagares, A. Jr., Valverde, C."
    },
    {
      "paperId": 115,
      "fechaPublicacion": "2018",
      "titulo": "Friends or foes in the rhizosphere: traits of fluorescent Pseudomonas that hinder Azospirillum brasilense growth and root colonization",
      "publicadoEn": "FEMS microbiology ecology",
      "enlace": "https://doi.org/10.1093/femsec/fiy202",
      "autores": "Maroniche, G., Diaz, P., Borrajo, M., Valverde, C., Creus, C."
    },
    {
      "paperId": 116,
      "fechaPublicacion": "2018",
      "titulo": "Genomic insights into the broad antifungal activity, plant-probiotic properties, and their regulation, in Pseudomonas donghuensis strain SVBP6",
      "publicadoEn": "PLOS ONE",
      "enlace": "https://doi.org/10.1371/journal.pone.0194088",
      "autores": "Agaras, B., Virolle, M.-J., Iriarte, A., Valverde, C."
    },
    {
      "paperId": 117,
      "fechaPublicacion": "2018",
      "titulo": "Guidelines for inferring and characterizing a family of bacterial trans-acting small noncoding RNAs",
      "publicadoEn": "Methods in Molecular Biology",
      "enlace": "https://doi.org/10.1007/978-1-4939-7634-8_2",
      "autores": "Lagares, A. Jr., Valverde, C."
    },
    {
      "paperId": 118,
      "fechaPublicacion": "2018",
      "titulo": "A Novel Oligonucleotide Pair for Genotyping Members of the <i>Pseudomonas</i> Genus by Single-Round PCR Amplification of the <i>gyrB</i> Gene",
      "publicadoEn": "Methods and Protocols",
      "enlace": "https://doi.org/10.3390/mps1030024",
      "autores": "Agaras, B., Valverde, C."
    },
    {
      "paperId": 119,
      "fechaPublicacion": "2017",
      "titulo": "A matter of hierarchy: activation of orfamide production by the post-transcriptional Gac-Rsm cascade of Pseudomonas protegens CHA0 through expression upregulation of the two dedicated transcriptional regulators",
      "publicadoEn": "Environmental Microbiology Reports",
      "enlace": "https://doi.org/10.1111/1758-2229.12566",
      "autores": "Sobrero, P., Muzlera, A., Frescura, J., Jofré, E., Valverde, C."
    },
    {
      "paperId": 120,
      "fechaPublicacion": "2017",
      "titulo": "Protozoa stimulate the plant beneficial activity of rhizospheric pseudomonads",
      "publicadoEn": "Plant and Soil",
      "enlace": "https://doi.org/10.1007/s11104-016-3094-8",
      "autores": "Weidner, S., Latz, E., Agaras, B., Valverde, C., Jousset, A."
    },
    {
      "paperId": 121,
      "fechaPublicacion": "2017",
      "titulo": "Regulation of polyhydroxybutyrate accumulation in Sinorhizobium meliloti by the trans-encoded small RNA MmgR",
      "publicadoEn": "Journal of Bacteriology",
      "enlace": "https://doi.org/10.1128/jb.00776-16",
      "autores": "Lagares, A., Borella, G.C., Linne, U., Becker, A., Valverde, C."
    },
    {
      "paperId": 122,
      "fechaPublicacion": "2017",
      "titulo": "The Irr and RirA proteins participate in a complex regulatory circuit and act in concert to modulate bacterioferritin expression in Ensifer meliloti 1021",
      "publicadoEn": "Applied and Environmental Microbiology",
      "enlace": "https://doi.org/10.1128/aem.00895-17",
      "autores": "Costa, D., Amarelle, V., Valverde, C., O'Brian, M.R., Fabiano, E."
    },
    {
      "paperId": 123,
      "fechaPublicacion": "2017",
      "titulo": "Who's the boss here? The post-transcriptional global regulator Hfq takes over control of secondary metabolite production in the nematode symbiont Photorhabdus luminiscens",
      "publicadoEn": "Environmental Microbiology",
      "enlace": "https://doi.org/10.1111/1462-2920.13635",
      "autores": "Valverde, C."
    },
    {
      "paperId": 124,
      "fechaPublicacion": "2016",
      "titulo": "Expression of the Sinorhizobium meliloti small RNA gene mmgR is controlled by the nitrogen source",
      "publicadoEn": "FEMS Microbiology Letters",
      "enlace": "https://doi.org/10.1093/femsle/fnw069",
      "autores": "Borella, G.C., Lagares Jr, A., Valverde, C."
    },
    {
      "paperId": 125,
      "fechaPublicacion": "2016",
      "titulo": "Interspecific cooperation: Enhanced growth, attachment and strain-specific distribution in biofilms through Azospirillum brasilense-Pseudomonas protegens co-cultivation",
      "publicadoEn": "FEMS Microbiology Letters",
      "enlace": "https://doi.org/10.1093/femsle/fnw238",
      "autores": "Pagnussat, L.A., Salcedo, F., Maroniche, G., Keel, C., Valverde, C., Creus, C.M."
    },
    {
      "paperId": 126,
      "fechaPublicacion": "2016",
      "titulo": "Major cereal crops benefit from biological nitrogen fixation when inoculated with the nitrogen-fixing bacterium Pseudomonas protegens Pf-5 X940",
      "publicadoEn": "Environmental Microbiology",
      "enlace": "https://doi.org/10.1111/1462-2920.13376",
      "autores": "Fox, A.R., Soto, G., Valverde, C., Russo, D., Lagares Jr, A., Zorreguieta, Á., Alleva, K., Pascuan, C., Frare, R., Mercado-Blanco, J. et al."
    },
    {
      "paperId": 127,
      "fechaPublicacion": "2016",
      "titulo": "Phylogenetic distribution and evolutionary pattern of an α-proteobacterial small RNA gene that controls polyhydroxybutyrate accumulation in Sinorhizobium meliloti",
      "publicadoEn": "Molecular Phylogenetics and Evolution",
      "enlace": "https://doi.org/10.1016/j.ympev.2016.03.026",
      "autores": "Lagares Jr, A., Roux, I., Valverde, C."
    },
    {
      "paperId": 128,
      "fechaPublicacion": "2015",
      "titulo": "A cultivation-independent PCR-RFLP assay targeting oprF gene for detection and identification of Pseudomonas spp. in samples from fibrocystic pediatric patients",
      "publicadoEn": "Journal of Microbiological Methods",
      "enlace": "https://doi.org/10.1016/j.mimet.2015.05.008",
      "autores": "Lagares Jr, A., Agaras, B., Bettiol, M.P., Gatti, B.M., Valverde, C."
    },
    {
      "paperId": 129,
      "fechaPublicacion": "2015",
      "titulo": "Abundance and ribotypes of phosphate-solubilizing bacteria in Argentinean agricultural soils under no-till management",
      "publicadoEn": "Annals of Microbiology",
      "enlace": "https://doi.org/10.1007/s13213-014-1006-9",
      "autores": "Fernández, L.A., Agaras, B., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 130,
      "fechaPublicacion": "2015",
      "titulo": "Contribution of the RNA Chaperone Hfq to Environmental Fitness and Symbiosis in Sinorhizobium meliloti",
      "publicadoEn": "Biological Nitrogen Fixation",
      "enlace": "https://doi.org/10.1002/9781119053095.ch73",
      "autores": "Jiménez-Zurdo, J.I., Torres-Quesada, O., Valverde, C., Sobrero, P."
    },
    {
      "paperId": 131,
      "fechaPublicacion": "2015",
      "titulo": "Current Research on Plant-Growth Promoting Rhizobacteria in Latin America: Meeting Report from the 2nd Latin American PGPR Workshop",
      "publicadoEn": "Journal of Plant Growth Regulation",
      "enlace": "https://doi.org/10.1007/s00344-014-9470-9",
      "autores": "Valverde, C., Ramírez, C., Kloepper, J.W., Cassán, F."
    },
    {
      "paperId": 132,
      "fechaPublicacion": "2015",
      "titulo": "Molecular Biology of Infection and Nodule Development in Discaria trinervis-Frankia Actinorhizal Symbiosis",
      "publicadoEn": "Biological Nitrogen Fixation",
      "enlace": "https://doi.org/10.1002/9781119053095.ch43",
      "autores": "Imanishi, L., Vayssières, A., Vaissayre, V., Perrine-Walker, F., Moukouanga, D., Lucas, M., Gherbi, H., Laplaze, L., Gabbarini, L., Valverde, C. et al."
    },
    {
      "paperId": 133,
      "fechaPublicacion": "2015",
      "titulo": "Pseudomonas and azospirillum",
      "publicadoEn": "Handbook for Azospirillum: Technical Issues and Protocols",
      "enlace": "https://doi.org/10.1007/978-3-319-06542-7_21",
      "autores": "Valverde, C., Anta, G.G., Ferraris, G."
    },
    {
      "paperId": 134,
      "fechaPublicacion": "2015",
      "titulo": "Quantification of the potential biocontrol and direct plant growth promotion abilities based on multiple biological traits distinguish different groups of Pseudomonas spp. isolates",
      "publicadoEn": "Biological Control",
      "enlace": "https://doi.org/10.1016/j.biocontrol.2015.07.003",
      "autores": "Agaras, B., Scandiani, M., Luque, A., Fernández, L., Farina, F., Carmona, M., Gally, M., Romero, A., Wall, L., Valverde, C."
    },
    {
      "paperId": 135,
      "fechaPublicacion": "2015",
      "titulo": "Selective enrichment of pseudomonas spp. In the rhizoplane of different plant species,Enriquecimiento diferencial de Pseudomonas spp. En el rizoplano de distintas especies cultivadas",
      "publicadoEn": "Revista Argentina de Microbiologia",
      "enlace": "https://doi.org/10.1016/j.ram.2015.03.007",
      "autores": "Marrero, M.A., Agaras, B., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 136,
      "fechaPublicacion": "2014",
      "titulo": "Influence of agricultural practices and seasons on the abundance and community structure of culturable pseudomonads in soils under no-till management in Argentina",
      "publicadoEn": "Plant and Soil",
      "enlace": "https://doi.org/10.1007/s11104-014-2095-8",
      "autores": "Agaras, B.C., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 137,
      "fechaPublicacion": "2013",
      "titulo": "A CsrA/RsmA translational regulator gene encoded in the replication region of a sinorhizobium meliloti cryptic plasmid complements pseudomonas fluorescens rsmA/E mutants",
      "publicadoEn": "Microbiology (United Kingdom)",
      "enlace": "https://doi.org/10.1099/mic.0.061614-0",
      "autores": "Agaras, B., Sobrero, P., Valverde, C."
    },
    {
      "paperId": 138,
      "fechaPublicacion": "2013",
      "titulo": "A simple laboratory class using a Pseudomonas aeruginosa auxotroph to illustrate UV-mutagenic killing, DNA photorepair and mutagenic DNA repair",
      "publicadoEn": "Journal of Biological Education",
      "enlace": "https://doi.org/10.1080/00219266.2012.688850",
      "autores": "Sobrero, P., Valverde, C."
    },
    {
      "paperId": 139,
      "fechaPublicacion": "2013",
      "titulo": "Biological control of the false root-knot nematode Nacobbus aberrans by Pseudomonas protegens under controlled conditions",
      "publicadoEn": "Crop Protection",
      "enlace": "https://doi.org/10.1016/j.cropro.2013.02.020",
      "autores": "Lax, P., Marro, N., Agaras, B., Valverde, C., Doucet, M.E., Becerra, A."
    },
    {
      "paperId": 140,
      "fechaPublicacion": "2013",
      "titulo": "Insights into the Noncoding RNome of nitrogen-fixing endosymbiotic a-proteobacteria",
      "publicadoEn": "Molecular Plant-Microbe Interactions",
      "enlace": "https://doi.org/10.1094/mpmi-07-12-0186-cr",
      "autores": "Jiménez-Zurdo, J.I., Valverde, C., Becker, A."
    },
    {
      "paperId": 141,
      "fechaPublicacion": "2013",
      "titulo": "Isolation and characterization of atrazine-degrading Arthrobacter sp. strains from Argentine agricultural soils",
      "publicadoEn": "Annals of Microbiology",
      "enlace": "https://doi.org/10.1007/s13213-012-0463-2",
      "autores": "Fernández, L.A., Valverde, C., Gómez, M.A."
    },
    {
      "paperId": 142,
      "fechaPublicacion": "2012",
      "titulo": "Erratum to Characterization and screening of plant probiotic traits of bacteria isolated from rice seeds cultivated in Argentina (The Journal of Microbiology, (2011), 49, 6 (902-912), 10.1007/s12275-011-1073-6)",
      "publicadoEn": "Journal of Microbiology",
      "enlace": "https://doi.org/10.1007/s12275-012-0634-7",
      "autores": "Ruiz, D., Agaras, B., de Werra, P., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 143,
      "fechaPublicacion": "2012",
      "titulo": "Pseudomonas spp. isolates with high phosphate-mobilizing potential and root colonization properties from agricultural bulk soils under no-till management",
      "publicadoEn": "Biology and Fertility of Soils",
      "enlace": "https://doi.org/10.1007/s00374-012-0665-6",
      "autores": "Fernández, L., Agaras, B., Zalba, P., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 144,
      "fechaPublicacion": "2012",
      "titulo": "Quantitative Proteomic Analysis of the Hfq-Regulon in Sinorhizobium meliloti 2011",
      "publicadoEn": "PLoS ONE",
      "enlace": "https://doi.org/10.1371/journal.pone.0048494",
      "autores": "Sobrero, P., Schlüter, J.-P., Lanner, U., Schlosser, A., Becker, A., Valverde, C."
    },
    {
      "paperId": 145,
      "fechaPublicacion": "2012",
      "titulo": "Specific enumeration and analysis of the community structure of culturable pseudomonads in agricultural soils under no-till management in Argentina",
      "publicadoEn": "Applied Soil Ecology",
      "enlace": "https://doi.org/10.1016/j.apsoil.2011.11.016",
      "autores": "Agaras, B., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 146,
      "fechaPublicacion": "2012",
      "titulo": "The bacterial protein Hfq: Much more than a mere RNA-binding factor",
      "publicadoEn": "Critical Reviews in Microbiology",
      "enlace": "https://doi.org/10.3109/1040841x.2012.664540",
      "autores": "Sobrero, P., Valverde, C."
    },
    {
      "paperId": 147,
      "fechaPublicacion": "2011",
      "titulo": "Characterization and screening of plant probiotic traits of bacteria isolated from rice seeds cultivated in Argentina",
      "publicadoEn": "Journal of Microbiology",
      "enlace": "https://doi.org/10.1007/s12275-011-1073-6",
      "autores": "Ruiza, D., Agaras, B., de Werrab, P., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 148,
      "fechaPublicacion": "2011",
      "titulo": "Circadian variation in Pseudomonas fluorescens (CHA0)-mediated paralysis of Caenorhabditis elegans",
      "publicadoEn": "Microbial Pathogenesis",
      "enlace": "https://doi.org/10.1016/j.micpath.2010.09.001",
      "autores": "Romanowski, A., Migliori, M.L., Valverde, C., Golombek, D.A."
    },
    {
      "paperId": 149,
      "fechaPublicacion": "2011",
      "titulo": "Evidences of autoregulation of hfq expression in Sinorhizobium meliloti strain 2011",
      "publicadoEn": "Archives of Microbiology",
      "enlace": "https://doi.org/10.1007/s00203-011-0701-1",
      "autores": "Sobrero, P., Valverde, C."
    },
    {
      "paperId": 150,
      "fechaPublicacion": "2009",
      "titulo": "A single mutation in the oprF mRNA leader confers strict translational control by the Gac/Rsm system in pseudomonas fluorescens CHA0",
      "publicadoEn": "Current Microbiology",
      "enlace": "https://doi.org/10.1007/s00284-008-9306-6",
      "autores": "Alvarez Crespo, M.C., Valverde, C."
    },
    {
      "paperId": 151,
      "fechaPublicacion": "2009",
      "titulo": "Artificial sRNAs activating the Gac/Rsm signal transduction pathway in Pseudomonas fluorescens",
      "publicadoEn": "Archives of Microbiology",
      "enlace": "https://doi.org/10.1007/s00203-009-0459-x",
      "autores": "Valverde, C."
    },
    {
      "paperId": 152,
      "fechaPublicacion": "2009",
      "titulo": "Effects of calcium in the nitrogen-fixing symbiosis between actinorhizal discaria trinervis (rhamnaceae) and frankia",
      "publicadoEn": "Symbiosis",
      "enlace": "https://doi.org/10.1007/s13199-009-0046-6",
      "autores": "Valverde, C., Ferrari, A., Wall, L.G."
    },
    {
      "paperId": 153,
      "fechaPublicacion": "2008",
      "titulo": "Genome-wide search reveals a novel GacA-regulated small RNA in Pseudomonas species",
      "publicadoEn": "BMC Genomics",
      "enlace": "https://doi.org/10.1186/1471-2164-9-167",
      "autores": "González, N., Heeb, S., Valverde, C., Kay, E., Reimmann, C., Junier, T., Haas, D."
    },
    {
      "paperId": 154,
      "fechaPublicacion": "2008",
      "titulo": "Prediction of Sinorhizobium meliloti sRNA genes and experimental detection in strain 2011",
      "publicadoEn": "BMC Genomics",
      "enlace": "https://doi.org/10.1186/1471-2164-9-416",
      "autores": "Valverde, C., Livny, J., Schlüter, J.-P., Reinkensmeier, J., Becker, A., Parisi, G."
    },
    {
      "paperId": 155,
      "fechaPublicacion": "2008",
      "titulo": "Small RNAs controlled by two-component systems",
      "publicadoEn": "Advances in Experimental Medicine and Biology",
      "enlace": "https://doi.org/10.1007/978-0-387-78885-2_5",
      "autores": "Valverde, C., Haas, D."
    },
    {
      "paperId": 156,
      "fechaPublicacion": "2007",
      "titulo": "Genome characteristics of facultatively symbiotic Frankia sp. strains reflect host range and host plant biogeography",
      "publicadoEn": "Genome Research",
      "enlace": "https://doi.org/10.1101/gr.5798407",
      "autores": "Normand, P., Lapierre, P., Tisa, L.S., Gogarten, J.P., Alloisio, N., Bagnarol, E., Bassi, C.A., Berry, A.M., Bickhart, D.M., Choisne, N. et al."
    },
    {
      "paperId": 157,
      "fechaPublicacion": "2006",
      "titulo": "Local adaptation of Frankia to different Discaria (Rhamnaceae) host species growing in Patagonia",
      "publicadoEn": "Current Microbiology",
      "enlace": "https://doi.org/10.1007/s00284-006-0306-0",
      "autores": "Chaia, E.E., Valverde, C., Wall, L.G."
    },
    {
      "paperId": 158,
      "fechaPublicacion": "2006",
      "titulo": "Secondary metabolites help biocontrol strain Pseudomonas fluorescens CHA0 to escape protozoan grazing",
      "publicadoEn": "Applied and Environmental Microbiology",
      "enlace": "https://doi.org/10.1128/aem.00557-06",
      "autores": "Jousset, A., Lara, E., Wall, L.G., Valverde, C."
    },
    {
      "paperId": 159,
      "fechaPublicacion": "2006",
      "titulo": "Two GacA-dependent small RNAs modulate the quorum-sensing response in Pseudomonas aeruginosa",
      "publicadoEn": "Journal of Bacteriology",
      "enlace": "https://doi.org/10.1128/jb.00409-06",
      "autores": "Kay, E., Humair, B., Dénervaud, V., Riedel, K., Spahr, S., Eberl, L., Valverde, C., Haas, D."
    },
    {
      "paperId": 160,
      "fechaPublicacion": "2005",
      "titulo": "Ethylene modulates the susceptibility of the root for nodulation in actinorhizal Discaria trinervis",
      "publicadoEn": "Physiologia Plantarum",
      "enlace": "https://doi.org/10.1111/j.1399-3054.2005.00503.x",
      "autores": "Valverde, C., Wall, L.G."
    },
    {
      "paperId": 161,
      "fechaPublicacion": "2005",
      "titulo": "Posttranscriptional repression of GacS/GacA-controlled genes by the RNA-binding protein RsmE acting together with RsmA in the biocontrol strain Pseudomonas fluorescens CHA0",
      "publicadoEn": "Journal of Bacteriology",
      "enlace": "https://doi.org/10.1128/jb.187.1.276-285.2005",
      "autores": "Reimmann, C., Valverde, C., Kay, E., Haas, D."
    },
    {
      "paperId": 162,
      "fechaPublicacion": "2005",
      "titulo": "Role of the stress sigma factor RpoS in GacA/RsmA-controlled secondary metabolism and resistance to oxidative stress in Pseudomonas fluorescens CHA0",
      "publicadoEn": "FEMS Microbiology Letters",
      "enlace": "https://doi.org/10.1016/j.femsle.2004.12.008",
      "autores": "Heeb, S., Valverde, C., Gigot-Bonnefoy, C., Haas, D."
    },
    {
      "paperId": 163,
      "fechaPublicacion": "2004",
      "titulo": "A repeated GGA motif is critical for the activity and stability of the riboregulator RsmY of Pseudomonas fluorescens",
      "publicadoEn": "Journal of Biological Chemistry",
      "enlace": "https://doi.org/10.1074/jbc.m401870200",
      "autores": "Valverde, C., Lindell, M., Wagner, E.G.H., Haas, D."
    },
    {
      "paperId": 164,
      "fechaPublicacion": "2003",
      "titulo": "Ammonium assimilation in root nodules of actinorhizal Discaria trinervis. Regulation of enzyme activities and protein levels by the availability of macronutrients (N, P and C)",
      "publicadoEn": "Plant and Soil",
      "enlace": "https://doi.org/10.1023/a:1024907130981",
      "autores": "Valverde, C., Wall, L.G."
    },
    {
      "paperId": 165,
      "fechaPublicacion": "2003",
      "titulo": "Regulation of nodulation in the absence of N<inf>2</inf> is different in actinorhizal plants with different infection pathways",
      "publicadoEn": "Journal of Experimental Botany",
      "enlace": "https://doi.org/10.1093/jxb/erg131",
      "autores": "Wall, L.G., Valverde, C., Huss-Danell, K."
    },
    {
      "paperId": 166,
      "fechaPublicacion": "2003",
      "titulo": "RsmY, a small regulatory RNA, is required in concert with RsmZ for GacA-dependent expression of biocontrol traits in Pseudomonas fluorescens CHA0",
      "publicadoEn": "Molecular Microbiology",
      "enlace": "https://doi.org/10.1046/j.1365-2958.2003.03774.x",
      "autores": "Valverde, C., Heeb, S., Keel, C., Haas, D."
    },
    {
      "paperId": 167,
      "fechaPublicacion": "2003",
      "titulo": "The regulation of nodulation, nitrogen fixation and ammonium assimilation under a carbohydrate shortage stress in the Discaria trinervis-Frankia symbiosis",
      "publicadoEn": "Plant and Soil",
      "enlace": "https://doi.org/10.1023/a:1024982527843",
      "autores": "Valverde, C., Wall, L.G."
    },
    {
      "paperId": 168,
      "fechaPublicacion": "2002",
      "titulo": "Nodule distribution on the roots of actinorhizal Discaria trinervis (Rhamnaceae) growing in pots",
      "publicadoEn": "Environmental and Experimental Botany",
      "enlace": "https://doi.org/10.1016/s0098-8472(01)00115-0",
      "autores": "Valverde, C., Wall, L.G."
    },
    {
      "paperId": 169,
      "fechaPublicacion": "2002",
      "titulo": "Phosphorus and the regulation of nodulation in the actinorhizal symbiosis between Discaria trinervis (Rhamnaceae) and Frankia BCU110501",
      "publicadoEn": "New Phytologist",
      "enlace": "https://doi.org/10.1046/j.0028-646x.2001.00298.x",
      "autores": "Valverde, C., Ferrari, A., Wall, L.G."
    },
    {
      "paperId": 170,
      "fechaPublicacion": "1999",
      "titulo": "Regulation of nodulation in Discaria trinervis (Rhamnaceae) - Frankia symbiosis",
      "publicadoEn": "Canadian Journal of Botany",
      "enlace": "https://doi.org/10.1139/cjb-77-9-1302",
      "autores": "Valverde, C., Wall, L.G."
    },
    {
      "paperId": 171,
      "fechaPublicacion": "1999",
      "titulo": "Time course of nodule development in the Discaria trinervis (Rhamnaceae) - Frankia symbiosis",
      "publicadoEn": "New Phytologist",
      "enlace": "https://doi.org/10.1046/j.1469-8137.1999.00345.x",
      "autores": "Valverde, C., Wall, L.G."
    },
    {
      "paperId": 172,
      "fechaPublicacion": "1997",
      "titulo": "Rapid preparation of affinity-purified lipo-polysaccharide samples for electrophoretic analysis",
      "publicadoEn": "BioTechniques",
      "enlace": "https://doi.org/10.2144/97222bm07",
      "autores": "Valverde, C., Hozbor, D.F., Lagares, A."
    },
    {
      "paperId": 173,
      "fechaPublicacion": "2009",
      "titulo": "DIURNAL VARIATION IN ENDOTOXIN-INDUCED MORTALITY IN MICE: CORRELATION WITH PROINFLAMMATORY FACTORS",
      "publicadoEn": "Chronobiology International",
      "enlace": "https://doi.org/10.3109/07420520903408358",
      "autores": "Marpegan, L., Leone, M. J., Katz, M. E., Sobrero, P. M., Bekinstein, T. A., Golombek, D. A."
    },
    {
      "paperId": 174,
      "fechaPublicacion": "2025",
      "titulo": "A systems-level insight into PHB-driven metabolic adaptation orchestrated by the PHB-binding transcriptional regulator AniA (PhaR)",
      "publicadoEn": "mSystems",
      "enlace": "https://doi.org/10.1128/msystems.00760-25",
      "autores": "Lagares Jr, A., Krol, E., Jühling, T., Glatter, T., Becker, A."
    },
    {
      "paperId": 175,
      "fechaPublicacion": "2024",
      "titulo": "An Integrated Affinity Chromatography-Based Approach to Unravel the sRNA Interactome in Nitrogen-Fixing Rhizobia",
      "publicadoEn": "Methods in Molecular Biology",
      "enlace": "https://doi.org/10.1007/978-1-0716-3565-0_19",
      "autores": "García-Tomsig, N. I., Lagares Jr, A., Becker, A., Valverde, C., Jiménez-Zurdo, J. I."
    },
    {
      "paperId": 176,
      "fechaPublicacion": "2024",
      "titulo": "Modular Low-Copy-Number Plasmid Vectors for Rhodobacterales with Extended Host Range in Alphaproteobacteria",
      "publicadoEn": "ACS Synthetic Biology",
      "enlace": "https://doi.org/10.1021/acssynbio.4c00062",
      "autores": "Körner, D., Schäfer, N. M., Lagares Jr, A., Birmes, L., Oehlmann, N. N., Addison, H., Pöhl, S., Thanbichler, M., Rebelein, J. G., Petersen, J., et al."
    },
    {
      "paperId": 177,
      "fechaPublicacion": "2019",
      "titulo": "Codon Usage Heterogeneity in the Multipartite Prokaryote Genome: Selection-Based Coding Bias Associated with Gene Location, Expression Level, and Ancestry",
      "publicadoEn": "mBio",
      "enlace": "https://doi.org/10.1128/mbio.00505-19",
      "autores": "López, J. L., Lozano, M. J., Lagares Jr, A., Fabre, M. L., Draghi, W. O., Del Papa, M. F., Pistorio, M., Becker, A., Wibberg, D., Schlüter, A., et al."
    },
    {
      "paperId": 178,
      "fechaPublicacion": "2017",
      "titulo": "Quantification of Bacterial Polyhydroxybutyrate Content by Flow Cytometry",
      "publicadoEn": "BIO-PROTOCOL",
      "enlace": "https://doi.org/10.21769/bioprotoc.2638",
      "autores": "Lagares Jr, A., Valverde, C."
    },
    {
      "paperId": 179,
      "fechaPublicacion": "2016",
      "titulo": "A consolidated analysis of the physiologic and molecular responses induced under acid stress in the legume-symbiont model-soil bacterium Sinorhizobium meliloti",
      "publicadoEn": "Scientific Reports",
      "enlace": "https://doi.org/10.1038/srep29278",
      "autores": "Draghi, W. O., Del Papa, M. F., Hellweg, C., Watt, S. A., Watt, T. F., Barsch, A., Lozano, M. J., Lagares Jr, A., Salas, M. E., López, J. L., et al."
    },
    {
      "paperId": 181,
      "fechaPublicacion": "2023",
      "titulo": "Unveiling the Secrets of Calcium-Dependent Proteins in Plant Growth-Promoting Rhizobacteria: An Abundance of Discoveries Awaits",
      "publicadoEn": "Plants",
      "enlace": "https://doi.org/10.3390/plants12193398",
      "autores": "Agaras, B., Grossi, C. E. M., Ulloa, R. M."
    },
    {
      "paperId": 182,
      "fechaPublicacion": "2023",
      "titulo": "Generalised mutagenesis with transposon Tn<i>5</i>. A laboratory procedure for the identification of genes responsible for a bacterial phenotype and its regulation, illustrated with phenazine production in <i>Pseudomonas chlororaphis</i>",
      "publicadoEn": "Journal of Biological Education",
      "enlace": "https://doi.org/10.1080/00219266.2021.2006266",
      "autores": "Muzio, F. M., Sobrero, P. M., Agaras, B. C., Valverde, C."
    }
  ],
  "SERVICIOS": [
    {
      "id": 1,
      "titulo_es": "Identificación de microorganismos / Minería genómica",
      "titulo_en": "Identification of microbes / Genomic mining",
      "descripcion_es": "Secuenciación del gen 16S rRNA / Secuenciación del genoma completo (WGS) / Ensamblaje y anotación de genomas bacterianos / Análisis filogenético y taxonómico / MLSA",
      "descripcion_en": "16S rRNA gene sequencing / Whole genome sequencing (WGS) / Bacterial genome assembly and annotation / Phylogenetic and taxonomic analysis / MLSA"
    },
    {
      "id": 2,
      "titulo_es": "Calidad de inoculantes",
      "titulo_en": "Inoculant quality",
      "descripcion_es": "Recuentos de viables (CFU) / Pruebas de viabilidad y pureza / Evaluación de la eficacia del inoculante en condiciones controladas / Cuantificación de viables mediante métodos no cultivables (vqPCR)",
      "descripcion_en": "Viable counts (CFU) / Viability and purity tests / Evaluation of inoculant efficacy under controlled conditions / Quantification of viable cells using non-cultivable methods (vqPCR)"
    },
    {
      "id": 3,
      "titulo_es": "Preservación de microorganismo",
      "titulo_en": "Microorganism preservation",
      "descripcion_es": "Liofilización / Ultracongelación",
      "descripcion_en": "Lyophilization / Ultra-freezing"
    },
    {
      "id": 4,
      "titulo_es": "Aislamiento y caracterización de microorganismos",
      "titulo_en": "Isolation and characterization of microbes",
      "descripcion_es": "Aislamiento, caracterización, e identificación de microorganismos a partir de muestras de suelo y de tejidos vegetales. La caracterización e identificación de microorganismos se lleva a cabo tanto mediante métodos clásicos microbiológicos así como mediante técnicas moleculares",
      "descripcion_en": "Isolation, characterization, and identification of microbes from soil and plant samples. The characterization and identification of microorganisms is carried out using both classical microbiological methods and molecular techniques"
    },
    {
      "id": 5,
      "titulo_es": "Análisis de propiedades promotoras del crecimiento vegetal",
      "titulo_en": "Analysis of plant growth-promoting properties",
      "descripcion_es": "Contamos con métodos para la detección de actividades de promoción del desarrollo vegetal y el control biológico (antagonismo) de fitopatógenos mediante ensayos in vitro y en planta en condiciones controladas)",
      "descripcion_en": "We have methods for detecting plant growth-promoting activities and biological control (antagonism) of phytopathogens through in vitro and in planta assays under controlled conditions)"
    },
    {
      "id": 6,
      "titulo_es": "Genética bacteriana y estudio de la expresión génica en bacterias",
      "titulo_en": "Bacterial genetics and study of gene expression in bacteria",
      "descripcion_es": "Contamos con herramientas y procedimientos para generar mutantes para estudios de función génica, y para análisis de la expresión genética)",
      "descripcion_en": "We have tools and procedures for generating mutants for genetic studies, and for gene expression analysis)"
    },
    {
      "id": 7,
      "titulo_es": "Generación de cepas con etiquetas génicas",
      "titulo_en": "Generation of strains with genetic tags",
      "descripcion_es": "Contamos con herramientas y procedimientos para introducir genes que codifican proteínas fluorescentes y de resistencia a antibióticos, para facilitar para estudios de colonización bacteriana de tejidos vegetales",
      "descripcion_en": "We have tools and procedures to introduce genes that encode fluorescent proteins and antibiotic resistance, to facilitate studies of bacterial colonization of plant tissues"
    },
    {
      "id": 8,
      "titulo_es": "Desarrollo de proyectos microbiológicos a demanda",
      "titulo_en": "Development of microbiological projects on demand",
      "descripcion_es": "A partir de tu necesidad e interés, podemos trabajar juntos en la elaboración de una propuesta de trabajo basada en nuestras capacidades y experticias",
      "descripcion_en": "Based on your needs and interests, we can work together to develop a work proposal based on our capabilities and expertise"
    }
  ]
};
