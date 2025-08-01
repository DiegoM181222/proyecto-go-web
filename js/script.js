const EMAILJS_CONFIG = {
    serviceId: 'service_5q55cy7',
    templateId: 'template_z9ddkwo', 
    publicKey: 'GZ9_VuSUCf8r-u4vE'
};

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Lógica de Autenticación
const authModalOverlay = document.getElementById('authModalOverlay');
const authModalClose = document.getElementById('authModalClose');
const emailPasswordForm = document.getElementById('emailPasswordForm');
const authEmail = document.getElementById('authEmail');
const authPassword = document.getElementById('authPassword');
const authSubmitBtn = document.getElementById('authSubmitBtn');
const authMessage = document.getElementById('authMessage');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const facebookSignInBtn = document.getElementById('facebookSignInBtn');
const toggleAuthMode = document.getElementById('toggleAuthMode');

let isLoginMode = true;

// Abrir/Cerrar el modal
function openAuthModal() {
    authModalOverlay.classList.add('active');
}

function closeAuthModal() {
    authModalOverlay.classList.remove('active');
    authMessage.textContent = '';
    emailPasswordForm.reset();
}

authModalClose.addEventListener('click', closeAuthModal);

// Toggle entre Iniciar Sesión y Crear Cuenta
toggleAuthMode.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        document.querySelector('.auth-modal-title').textContent = 'Iniciar Sesión';
        authSubmitBtn.textContent = 'Iniciar Sesión';
        toggleAuthMode.textContent = 'Crea una aquí';
    } else {
        document.querySelector('.auth-modal-title').textContent = 'Crear Cuenta';
        authSubmitBtn.textContent = 'Crear Cuenta';
        toggleAuthMode.textContent = 'Inicia sesión aquí';
    }
});

// Manejar el formulario de email/contraseña
emailPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = authEmail.value;
    const password = authPassword.value;
    
    authMessage.textContent = 'Cargando...';

    if (isLoginMode) {
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                authMessage.textContent = '¡Inicio de sesión exitoso!';
                setTimeout(closeAuthModal, 2000);
            })
            .catch((error) => {
                authMessage.textContent = `Error al iniciar sesión: ${error.message}`;
            });
    } else {
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                authMessage.textContent = '¡Cuenta creada con éxito!';
                setTimeout(closeAuthModal, 2000);
            })
            .catch((error) => {
                authMessage.textContent = `Error al crear cuenta: ${error.message}`;
            });
    }
});

// Iniciar sesión con Google
googleSignInBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            authMessage.textContent = '¡Inicio de sesión con Google exitoso!';
            setTimeout(closeAuthModal, 2000);
        })
        .catch((error) => {
            authMessage.textContent = `Error con Google: ${error.message}`;
        });
});

// Iniciar sesión con Facebook
facebookSignInBtn.addEventListener('click', () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            authMessage.textContent = '¡Inicio de sesión con Facebook exitoso!';
            setTimeout(closeAuthModal, 2000);
        })
        .catch((error) => {
            authMessage.textContent = `Error con Facebook: ${error.message}`;
        });
});

// Detectar si el usuario está conectado
auth.onAuthStateChanged(user => {
    if (user) {
        console.log('Usuario conectado:', user.email);
        // Aquí puede mostrar un botón de "Cerrar Sesión" o cambiar la interfaz
    } else {
        console.log('No hay usuario conectado.');
    }
});

// Navigation System
class NavigationSystem {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'services', 'maintenance', 'portfolio', 'about', 'whyChooseUs', 'contact', 'privacy', 'terms'];
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSectionButtons();
        this.setupForms();
        this.setupServiceModal();
        this.setupMaintenanceModal();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, .footer-nav-link, .footer-legal-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
                this.closeMobileMenu();
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const mobileMenuClose = document.getElementById('mobileMenuClose');
        
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                this.openMobileMenu();
            });
        }
        if (mobileMenuClose) {
            mobileMenuClose.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', (e) => {
                if (e.target === mobileMenuOverlay) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    openMobileMenu() {
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeMobileMenu() {
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        if (mobileMenuOverlay) {
            mobileMenuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    setupSectionButtons() {
        // Home page buttons
        const sectionButtons = document.querySelectorAll('[data-section]');
        sectionButtons.forEach(btn => {
            if (!btn.classList.contains('nav-link') && !btn.classList.contains('mobile-nav-link') && !btn.classList.contains('footer-nav-link') && !btn.classList.contains('footer-legal-link')) {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const section = btn.dataset.section;
                    this.showSection(section);
                });
            }
        });
        
        // Logo buttons
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', () => {
                this.showSection('home');
            });
        }
        const mobileMenuLogo = document.querySelector('.mobile-menu-logo');
        if (mobileMenuLogo) {
            mobileMenuLogo.addEventListener('click', () => {
                this.showSection('home');
                this.closeMobileMenu();
            });
        }
    }

    showSection(sectionId) {
        // Hide all sections
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }

        // Update nav links
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        // Update dots
        this.updateNavDots();
    }

    updateNavDots() {
        const dots = document.querySelectorAll('.nav-dots .dot');
        const activeIndex = this.sections.indexOf(this.currentSection);
        
        if (activeIndex !== -1) {
            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
    }

    setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmission(e));
        });
    }

    async handleFormSubmission(e) {
        e.preventDefault();
        const form = e.target;
        const formType = form.id;
        let statusMessage;

        // Correctly find the status message element for each form
        if (formType === 'serviceModalForm') {
            statusMessage = document.getElementById('serviceModalMessage');
        } else if (formType === 'maintenanceForm') {
            statusMessage = document.getElementById('maintenanceModalMessage');
        } else if (formType === 'maintenanceMessageForm') {
            statusMessage = document.getElementById('maintenanceMessageFormMessage');
        } else if (formType === 'contactForm') {
            statusMessage = document.getElementById('contactFormMessage');
        } else {
            statusMessage = form.querySelector('.status-message');
        }

        const submitBtn = form.querySelector('button[type="submit"]');

        statusMessage.textContent = 'Enviando...';
        statusMessage.style.color = '#667eea';
        statusMessage.style.display = 'block';
        submitBtn.disabled = true;

        // Collect form data
        const formData = new FormData(form);
        const templateParams = {};
        formData.forEach((value, key) => {
            templateParams[key] = value;
        });

        // Add form_type based on form ID
        templateParams.form_type = formType;

        try {
            await emailjs.send(
                EMAILJS_CONFIG.serviceId, 
                EMAILJS_CONFIG.templateId, 
                templateParams, 
                {
                    publicKey: EMAILJS_CONFIG.publicKey,
                }
            );
            statusMessage.textContent = '¡Mensaje enviado con éxito!';
            statusMessage.style.color = '#28a745';
            form.reset();
        } catch (error) {
            console.error('Error al enviar el email:', error);
            statusMessage.textContent = 'Error al enviar. Inténtalo de nuevo más tarde.';
            statusMessage.style.color = '#dc3545';
        } finally {
            submitBtn.disabled = false;
        }
    }

    setupServiceModal() {
        const serviceCards = document.querySelectorAll('.service-card');
        const modal = document.getElementById('serviceModalOverlay');
        const closeBtn = document.querySelector('.service-modal-close');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceName = card.querySelector('h3').textContent;
                const serviceDesc = card.querySelector('p').textContent;
                const serviceType = card.dataset.service;
                
                document.querySelector('#serviceModalOverlay .service-modal-title').textContent = serviceName;
                document.querySelector('#serviceModalOverlay .service-modal-subtitle').textContent = serviceDesc;
                document.getElementById('serviceModalServiceType').value = serviceType;
                
                modal.classList.add('active');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.getElementById('serviceModalMessage').style.display = 'none';
            });
        }
    }
    
    setupMaintenanceModal() {
        const maintenanceButtons = document.querySelectorAll('.maintenance-contact-btn');
        const modal = document.getElementById('maintenanceModalOverlay');
        const closeBtn = document.querySelector('.maintenance-modal-close');

        maintenanceButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const planCard = btn.closest('.maintenance-card');
                const planName = planCard.querySelector('h3').textContent;
                const planPrice = planCard.querySelector('.maintenance-price').textContent;
                const planType = planCard.dataset.plan;

                document.querySelector('#maintenanceModalOverlay .maintenance-modal-title').textContent = planName;
                document.querySelector('#maintenanceModalOverlay .maintenance-modal-subtitle').textContent = planPrice;
                document.getElementById('maintenancePlanType').value = planType;

                modal.classList.add('active');
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.getElementById('maintenanceModalMessage').style.display = 'none';
            });
        }
    }
}

// Initialize the navigation and other systems once the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new NavigationSystem();
    window.navigation.init();
});
