const EMAILJS_CONFIG = {
    serviceId: 'service_fzbcjn2',
    templateId: 'template_k956gl2', 
    publicKey: 'Eq7na919j59oXPRcd'
};

const firebaseConfig = {
  apiKey: "AIzaSyB9RY4wK8PR1zIYXOqbku8_snieNY37M5k",
  authDomain: "go-web-login.firebaseapp.com",
  projectId: "go-web-login",
  storageBucket: "go-web-login.firebasestorage.app",
  messagingSenderId: "100324552886",
  appId: "1:100324552886:web:e4fd5104155f3b7b2c3617",
  measurementId: "G-1VNK1K706D"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

class GoWebSystem {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'services', 'maintenance', 'portfolio', 'about', 'whyChooseUs', 'contact', 'privacy', 'terms'];
    }

    init() {
        this.setupAuthentication();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupForms();
        this.setupModals();
        this.showSection('home'); 
    }

    // --- Lógica de Navegación ---
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

        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', () => {
                this.showSection('home');
            });
        }

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

    showSection(sectionId) {
        const allSections = document.querySelectorAll('.section');
        allSections.forEach(section => {
            section.classList.remove('active');
        });
        const targetSection = document.getElementById(sectionId + 'Section');
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionId;
        }
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

    // --- Lógica de Autenticación de Firebase ---
    setupAuthentication() {
        const authModalOverlay = document.getElementById('authModalOverlay');
        const authModalClose = document.getElementById('authModalClose');
        const loginBtn = document.getElementById('loginBtn');
        const mobileLoginBtn = document.getElementById('mobileLoginBtn');
        const emailPasswordForm = document.getElementById('emailPasswordForm');
        const authEmail = document.getElementById('authEmail');
        const authPassword = document.getElementById('authPassword');
        const authSubmitBtn = document.getElementById('authSubmitBtn');
        const authMessage = document.getElementById('authMessage');
        const googleSignInBtn = document.getElementById('googleSignInBtn');
        const facebookSignInBtn = document.getElementById('facebookSignInBtn');
        const toggleAuthMode = document.getElementById('toggleAuthMode');
        let isLoginMode = true;

        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.openAuthModal());
        }
        if (mobileLoginBtn) {
            mobileLoginBtn.addEventListener('click', () => this.openAuthModal());
        }
        if (authModalClose) {
            authModalClose.addEventListener('click', () => this.closeAuthModal());
        }
        
        if (toggleAuthMode) {
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
        }

        if (emailPasswordForm) {
            emailPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = authEmail.value;
                const password = authPassword.value;
                authMessage.textContent = 'Cargando...';
                if (isLoginMode) {
                    auth.signInWithEmailAndPassword(email, password)
                        .then(() => {
                            authMessage.textContent = '¡Inicio de sesión exitoso!';
                            setTimeout(() => this.closeAuthModal(), 2000);
                        })
                        .catch((error) => {
                            authMessage.textContent = `Error: ${error.message}`;
                        });
                } else {
                    auth.createUserWithEmailAndPassword(email, password)
                        .then(() => {
                            authMessage.textContent = '¡Cuenta creada con éxito!';
                            setTimeout(() => this.closeAuthModal(), 2000);
                        })
                        .catch((error) => {
                            authMessage.textContent = `Error: ${error.message}`;
                        });
                }
            });
        }

        if (googleSignInBtn) {
            googleSignInBtn.addEventListener('click', () => {
                const provider = new firebase.auth.GoogleAuthProvider();
                auth.signInWithPopup(provider)
                    .then(() => {
                        authMessage.textContent = '¡Inicio de sesión con Google exitoso!';
                        setTimeout(() => this.closeAuthModal(), 2000);
                    })
                    .catch((error) => {
                        authMessage.textContent = `Error con Google: ${error.message}`;
                    });
            });
        }

        if (facebookSignInBtn) {
            facebookSignInBtn.addEventListener('click', () => {
                const provider = new firebase.auth.FacebookAuthProvider();
                auth.signInWithPopup(provider)
                    .then(() => {
                        authMessage.textContent = '¡Inicio de sesión con Facebook exitoso!';
                        setTimeout(() => this.closeAuthModal(), 2000);
                    })
                    .catch((error) => {
                        authMessage.textContent = `Error con Facebook: ${error.message}`;
                    });
            });
        }
    }

    openAuthModal() {
        const authModalOverlay = document.getElementById('authModalOverlay');
        if (authModalOverlay) {
            authModalOverlay.classList.add('active');
            const authMessage = document.getElementById('authMessage');
            if(authMessage) authMessage.textContent = '';
            const emailPasswordForm = document.getElementById('emailPasswordForm');
            if(emailPasswordForm) emailPasswordForm.reset();
        }
    }

    closeAuthModal() {
        const authModalOverlay = document.getElementById('authModalOverlay');
        if (authModalOverlay) {
            authModalOverlay.classList.remove('active');
            const authMessage = document.getElementById('authMessage');
            if(authMessage) authMessage.textContent = '';
            const emailPasswordForm = document.getElementById('emailPasswordForm');
            if(emailPasswordForm) emailPasswordForm.reset();
        }
    }
    
    // --- Lógica de Formularios y Modales (EmailJS) ---
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
        const formData = new FormData(form);
        const templateParams = {};
        formData.forEach((value, key) => {
            templateParams[key] = value;
        });
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
    
    setupModals() {
        this.setupServiceModal();
        this.setupMaintenanceModal();
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

document.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
    window.goWeb = new GoWebSystem();
    window.goWeb.init();
});
