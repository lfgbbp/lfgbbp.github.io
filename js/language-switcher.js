let translations = {};
let currentLang = 'es'; 

async function loadTranslations() {
    try {
        const response = await fetch('/data/translations.json');
        translations = await response.json();

        const savedLang = localStorage.getItem('preferredLanguage') || 'es';
        currentLang = savedLang;

        applyTranslations(currentLang);
    } catch (error) {
        console.error('Error al cargar traducciones:', error);
    }
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

function applyTranslations(lang) {
    const t = translations[lang];
    if (!t) return;

    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = getNestedValue(t, key);
        
        if (value) {
            if (element.tagName === 'INPUT' && element.hasAttribute('placeholder')) {
                element.setAttribute('placeholder', value);
            } else {
                element.textContent = value;
            }
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        const value = getNestedValue(t, key);
        if (value) {
            element.innerHTML = value;
        }
    });

    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
        const key = element.getAttribute('data-i18n-aria');
        const value = getNestedValue(t, key);
        if (value) {
            element.setAttribute('aria-label', value);
        }
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        const value = getNestedValue(t, key);
        if (value) {
            element.setAttribute('alt', value);
        }
    });

    const footerDev = document.querySelector('footer p:last-child');
    if (footerDev) {
        const devLink = footerDev.querySelector('.anchorD');
        if (devLink) {
            footerDev.innerHTML = `${t.footer.developedBy} <a href="https://github.com/Bertolini-Victor" class="anchorD" target="_blank">Victor Bertolini</a>`;
        }
    }

    updateLanguageToggle(lang);
}

function updateLanguageToggle(lang) {
    const options = document.querySelectorAll('.lang-option');
    options.forEach(option => {
        if (option.textContent === lang.toUpperCase()) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });
}

function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';

            localStorage.setItem('preferredLanguage', currentLang);

            applyTranslations(currentLang);

            window.dispatchEvent(new CustomEvent('languageChanged', { 
                detail: { lang: currentLang } 
            }));
        });
    }
}

function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadTranslations();
    setupLanguageToggle();
    updateCurrentYear();
});