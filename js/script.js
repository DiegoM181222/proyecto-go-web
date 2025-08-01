const EMAILJS_CONFIG = {
    serviceId: 'service_rb0ryqe',
    templateId: 'template_w1w1xho', 
    publicKey: 'sfBqoTr7DbNcxJOXF'
};

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
