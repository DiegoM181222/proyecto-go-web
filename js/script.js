// Authentication System
class AuthSystem {
    constructor() {
        this.users = [
            { id: '1', email: 'admin@goweb.com', password: 'admin123', name: 'Administrador', role: 'admin' },
            { id: '2', email: 'user@goweb.com', password: 'user123', name: 'Usuario Regular', role: 'user' }
        ];
        this.currentUser = null;
        this.selectedRole = 'user';
        this.init();
    }

    init() {
        this.setupLoginForm();
        this.setupUserTypeButtons();
        this.setupLogout();
    }

    setupLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }
    }

    setupUserTypeButtons() {
        const userTypeButtons = document.querySelectorAll('.user-type-btn');
        userTypeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                userTypeButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.selectedRole = btn.dataset.role;
            });
        });
    }

    setupLogout() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    async handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        // Hide previous error
        errorMessage.style.display = 'none';

        // Find user
        const user = this.users.find(u => 
            u.email === email && 
            u.password === password && 
            u.role === this.selectedRole
        );

        if (user) {
            this.currentUser = user;
            this.showMainWebsite();
        } else {
            errorMessage.style.display = 'flex';
        }
    }

    showMainWebsite() {
        const loginScreen = document.getElementById('loginScreen');
        const mainWebsite = document.getElementById('mainWebsite');
        const userInfo = document.getElementById('userInfo');

        loginScreen.style.display = 'none';
        mainWebsite.style.display = 'block';
        
        if (userInfo && this.currentUser) {
            userInfo.textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        }

        // Initialize navigation
        window.navigation.init();
    }

    logout() {
        this.currentUser = null;
        const loginScreen = document.getElementById('loginScreen');
        const mainWebsite = document.getElementById('mainWebsite');
        
        loginScreen.style.display = 'flex';
        mainWebsite.style.display = 'none';
        
        // Reset form
        document.getElementById('loginForm').reset();
        document.getElementById('errorMessage').style.display = 'none';
        
        // Reset user type selection
        document.querySelectorAll('.user-type-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.user-type-btn[data-role="user"]').classList.add('active');
        this.selectedRole = 'user';
    }
}

// Navigation System
class NavigationSystem {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'services', 'maintenance', 'portfolio', 'about', 'contact'];
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSectionButtons();
        this.setupForms();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                this.showSection(section);
            });
        });
    }

    setupMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
        }
    }

    setupSectionButtons() {
        // Home page buttons
        const sectionButtons = document.querySelectorAll('[data-section]');
        sectionButtons.forEach(btn => {
            if (!btn.classList.contains('nav-link')) {
                btn.addEventListener('click', () => {
                    const section = btn.dataset.section;
                    this.showSection(section);
                });
            }
        });
    }

    setupForms() {
        // Maintenance form
        const maintenanceForm = document.getElementById('maintenanceForm');
        if (maintenanceForm) {
            maintenanceForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showAlert('Solicitud enviada correctamente. Nos pondremos en contacto contigo pronto.');
                maintenanceForm.reset();
            });
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.showAlert('Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.');
                contactForm.reset();
            });
        }
    }

    showSection(sectionName) {
        // Hide all sections
        this.sections.forEach(section => {
            const element = document.getElementById(`${section}Section`);
            if (element) {
                element.classList.remove('active');
            }
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}Section`);
        if (targetSection) {
            targetSection.classList.add('active');
            targetSection.classList.add('fade-in');
        }

        // Update navigation
        this.updateNavigation(sectionName);
        this.updateNavigationDots(sectionName);
        
        this.currentSection = sectionName;

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    updateNavigation(sectionName) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionName) {
                link.classList.add('active');
            }
        });
    }

    updateNavigationDots(sectionName) {
        const sectionIndex = this.sections.indexOf(sectionName);
        const dotContainers = document.querySelectorAll('.nav-dots');
        
        dotContainers.forEach(container => {
            const dots = container.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.remove('active');
                if (index === sectionIndex) {
                    dot.classList.add('active');
                }
            });
        });
    }

    showAlert(message) {
        // Create a simple alert
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
            max-width: 300px;
        `;
        alertDiv.textContent = message;
        
        document.body.appendChild(alertDiv);
        
        // Remove after 4 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 4000);
    }
}

// Animation System
class AnimationSystem {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.service-card, .portfolio-card, .team-card, .contact-card');
        animatedElements.forEach(el => observer.observe(el));
    }

    setupHoverEffects() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.service-card, .portfolio-card, .team-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize systems
    window.auth = new AuthSystem();
    window.navigation = new NavigationSystem();
    window.animations = new AnimationSystem();
    
    console.log('GoWeb Website initialized successfully!');
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Handle responsive adjustments if needed
    console.log('Window resized');
}, 250));