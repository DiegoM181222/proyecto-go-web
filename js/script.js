const EMAILJS_CONFIG = {
    serviceId: 'service_fzbcjn2',
    templateId: 'template_k956gl2', 
    publicKey: 'rfarXJP58WdYBoU0E'
};

class AuthSystem {
    constructor() {
        this.users = [
            // Oscar accounts
            { id: '1', email: 'oscar@goweb.com', password: 'oscaruser123', name: 'Oscar Gómez', role: 'user' },
            { id: '2', email: 'oscar@goweb.com', password: 'oscaradmin123', name: 'Oscar Gómez', role: 'admin' },
            
            // Sergio accounts
            { id: '3', email: 'sergio@goweb.com', password: 'sergiouser123', name: 'Sergio Rivas', role: 'user' },
            { id: '4', email: 'sergio@goweb.com', password: 'sergioadmin123', name: 'Sergio Rivas', role: 'admin' },
            
            // Diego accounts
            { id: '5', email: 'diego@goweb.com', password: 'diegouser123', name: 'Diego Mendoza', role: 'user' },
            { id: '6', email: 'diego@goweb.com', password: 'diegoadmin123', name: 'Diego Mendoza', role: 'admin' }
        ];
        this.currentUser = null;
        this.selectedRole = 'user';
        this.init();
    }

    init() {
        this.setupLoginForm();
        this.setupUserTypeButtons();
        this.setupLogout();
        this.setupHomeNavigation();
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
        const mobileLogoutBtn = document.getElementById('mobileLogoutBtn');
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
        if (mobileLogoutBtn) {
            mobileLogoutBtn.addEventListener('click', () => this.logout());
        }
    }

    setupHomeNavigation() {
        // Desktop logo navigation
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', () => {
                window.navigation.showSection('home');
            });
        }

        // Mobile logo navigation
        const mobileMenuLogo = document.querySelector('.mobile-menu-logo');
        if (mobileMenuLogo) {
            mobileMenuLogo.addEventListener('click', () => {
                window.navigation.showSection('home');
                window.navigation.closeMobileMenu();
            });
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
        const mobileUserInfo = document.getElementById('mobileUserInfo');

        loginScreen.style.display = 'none';
        mainWebsite.style.display = 'block';
        
        if (userInfo && this.currentUser) {
            userInfo.textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        }
        if (mobileUserInfo && this.currentUser) {
            mobileUserInfo.textContent = `${this.currentUser.name} (${this.currentUser.role})`;
        }

        // Show admin menu if user is admin
        if (this.currentUser.role === 'admin') {
            const adminLinks = document.querySelectorAll('.admin-only');
            adminLinks.forEach(link => {
                link.style.display = 'flex';
            });
        }

        // Initialize navigation
        window.navigation.init();
        window.adminPanel.init();
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

        // Hide admin menu
        const adminLinks = document.querySelectorAll('.admin-only');
        adminLinks.forEach(link => {
            link.style.display = 'none';
        });

        // Close mobile menu if open
        window.navigation.closeMobileMenu();
    }
}

// Navigation System
class NavigationSystem {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'services', 'maintenance', 'portfolio', 'about', 'contact', 'admin'];
    }

    init() {
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupSectionButtons();
        this.setupForms();
    }

    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
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
            if (!btn.classList.contains('nav-link') && !btn.classList.contains('mobile-nav-link')) {
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
            maintenanceForm.addEventListener('submit', (e) => this.handleMaintenanceForm(e));
        }

        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => this.handleContactForm(e));
        }
    }

    async handleMaintenanceForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            // Prepare form data
            const formData = {
                form_type: 'Solicitud de Mantenimiento',
                from_name: form.querySelector('input[placeholder="Tu nombre completo"]').value,
                from_email: form.querySelector('input[placeholder="Tu correo electrónico"]').value,
                phone: form.querySelector('input[placeholder="Tu número de teléfono"]').value,
                website: form.querySelector('input[placeholder="URL de tu sitio web"]').value,
                service: form.querySelector('select').value,
                message: form.querySelector('textarea').value,
                to_email: 'contacto@goweb.com'
            };

            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                formData,
                EMAILJS_CONFIG.publicKey
            );

            // Store message in localStorage for admin panel
            this.storeMessage(formData);

            this.showAlert('¡Solicitud enviada correctamente! Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Error sending email:', error);
            this.showAlert('Error al enviar la solicitud. Por favor, inténtalo de nuevo o contáctanos directamente.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async handleContactForm(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
        submitBtn.disabled = true;

        try {
            // Prepare form data
            const formData = {
                form_type: 'Mensaje de Contacto',
                from_name: form.querySelector('input[placeholder="Tu nombre"]').value,
                from_email: form.querySelector('input[placeholder="Tu correo electrónico"]').value,
                phone: form.querySelector('input[placeholder="Tu teléfono"]').value,
                company: form.querySelector('input[placeholder="Tu empresa (opcional)"]').value,
                service: form.querySelector('select').value,
                message: form.querySelector('textarea').value,
                to_email: 'contacto@goweb.com'
            };

            // Send email using EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.serviceId,
                EMAILJS_CONFIG.templateId,
                formData,
                EMAILJS_CONFIG.publicKey
            );

            // Store message in localStorage for admin panel
            this.storeMessage(formData);

            this.showAlert('¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.', 'success');
            form.reset();
            
        } catch (error) {
            console.error('Error sending email:', error);
            this.showAlert('Error al enviar el mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.', 'error');
        } finally {
            // Restore button state
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    storeMessage(formData) {
        // Get existing messages or create new array
        let messages = JSON.parse(localStorage.getItem('gowebMessages') || '[]');
        
        // Add timestamp and ID to message
        const message = {
            id: Date.now(),
            timestamp: new Date().toLocaleString('es-ES'),
            ...formData
        };
        
        // Add to beginning of array (newest first)
        messages.unshift(message);
        
        // Keep only last 100 messages
        if (messages.length > 100) {
            messages = messages.slice(0, 100);
        }
        
        // Store back to localStorage
        localStorage.setItem('gowebMessages', JSON.stringify(messages));
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
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
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

    showAlert(message, type = 'success') {
        // Create alert element
        const alertDiv = document.createElement('div');
        const isSuccess = type === 'success';
        
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${isSuccess ? '#28a745' : '#dc3545'};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1000;
            font-weight: 500;
            max-width: 350px;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideInRight 0.3s ease;
        `;
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = isSuccess ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
        icon.style.fontSize = '1.2rem';
        
        alertDiv.appendChild(icon);
        alertDiv.appendChild(document.createTextNode(message));
        
        document.body.appendChild(alertDiv);
        
        // Remove after 5 seconds
        setTimeout(() => {
            alertDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.remove();
                }
            }, 300);
        }, 5000);
    }
}

// Admin Panel System
class AdminPanelSystem {
    constructor() {
        this.currentTab = 'services';
    }

    init() {
        this.setupTabs();
        this.loadStoredData();
        this.setupMessagesClearButton();
    }

    setupTabs() {
        const adminTabs = document.querySelectorAll('.admin-tab');
        adminTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.showTab(tabName);
            });
        });
    }

    showTab(tabName) {
        // Update tab buttons
        const adminTabs = document.querySelectorAll('.admin-tab');
        adminTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });

        // Update tab content
        const adminContents = document.querySelectorAll('.admin-content');
        adminContents.forEach(content => {
            content.classList.remove('active');
        });

        const targetContent = document.getElementById(`${tabName}Admin`);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        this.currentTab = tabName;

        // Load messages if messages tab is selected
        if (tabName === 'messages') {
            this.loadMessages();
        }
    }

    setupMessagesClearButton() {
        const clearBtn = document.getElementById('clearMessagesBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('¿Estás seguro de que quieres eliminar todos los mensajes? Esta acción no se puede deshacer.')) {
                    localStorage.removeItem('gowebMessages');
                    this.loadMessages();
                    window.navigation.showAlert('Todos los mensajes han sido eliminados.', 'success');
                }
            });
        }
    }

    loadMessages() {
        const messages = JSON.parse(localStorage.getItem('gowebMessages') || '[]');
        const messagesContainer = document.getElementById('messagesContainer');
        
        if (!messagesContainer) return;

        if (messages.length === 0) {
            messagesContainer.innerHTML = `
                <div class="no-messages">
                    <i class="fas fa-inbox"></i>
                    <h3>No hay mensajes</h3>
                    <p>Los mensajes enviados desde los formularios aparecerán aquí.</p>
                </div>
            `;
            return;
        }

        messagesContainer.innerHTML = messages.map(message => `
            <div class="message-card">
                <div class="message-header">
                    <span class="message-type">${message.form_type}</span>
                    <span class="message-date">${message.timestamp}</span>
                </div>
                <div class="message-info">
                    <div class="message-info-item">
                        <span class="message-info-label">Nombre:</span>
                        <span class="message-info-value">${message.from_name}</span>
                    </div>
                    <div class="message-info-item">
                        <span class="message-info-label">Email:</span>
                        <span class="message-info-value">${message.from_email}</span>
                    </div>
                    <div class="message-info-item">
                        <span class="message-info-label">Teléfono:</span>
                        <span class="message-info-value">${message.phone}</span>
                    </div>
                    ${message.company ? `
                        <div class="message-info-item">
                            <span class="message-info-label">Empresa:</span>
                            <span class="message-info-value">${message.company}</span>
                        </div>
                    ` : ''}
                    ${message.website ? `
                        <div class="message-info-item">
                            <span class="message-info-label">Sitio Web:</span>
                            <span class="message-info-value">${message.website}</span>
                        </div>
                    ` : ''}
                    <div class="message-info-item">
                        <span class="message-info-label">Servicio:</span>
                        <span class="message-info-value">${message.service}</span>
                    </div>
                </div>
                <div class="message-content">
                    <h4>Mensaje:</h4>
                    <p class="message-text">${message.message}</p>
                </div>
            </div>
        `).join('');
    }

    loadStoredData() {
        // Load services data
        const servicesData = localStorage.getItem('gowebServices');
        if (servicesData) {
            const services = JSON.parse(servicesData);
            this.updateServicesDisplay(services);
            this.updateAdminServicesForm(services);
        }

        // Load portfolio data
        const portfolioData = localStorage.getItem('gowebPortfolio');
        if (portfolioData) {
            const portfolio = JSON.parse(portfolioData);
            this.updatePortfolioDisplay(portfolio);
            this.updateAdminPortfolioForm(portfolio);
        }

        // Load team data
        const teamData = localStorage.getItem('gowebTeam');
        if (teamData) {
            const team = JSON.parse(teamData);
            this.updateTeamDisplay(team);
            this.updateAdminTeamForm(team);
        }

        // Load images data
        const imagesData = localStorage.getItem('gowebImages');
        if (imagesData) {
            const images = JSON.parse(imagesData);
            this.updateImagesDisplay(images);
            this.updateAdminImagesForm(images);
        }
    }

    updateServicesDisplay(services) {
        services.forEach((service, index) => {
            const serviceTypes = ['basic', 'gold', 'expert'];
            const serviceType = serviceTypes[index];
            
            if (serviceType) {
                const nameEl = document.getElementById(`${serviceType}ServiceName`);
                const titleEl = document.getElementById(`${serviceType}ServiceTitle`);
                const descEl = document.getElementById(`${serviceType}ServiceDescription`);
                const priceEl = document.getElementById(`${serviceType}ServicePrice`);

                if (nameEl) nameEl.textContent = service.name;
                if (titleEl) titleEl.textContent = service.title;
                if (descEl) descEl.textContent = service.description;
                if (priceEl) priceEl.textContent = service.price;
            }
        });
    }

    updateAdminServicesForm(services) {
        services.forEach((service, index) => {
            const serviceTypes = ['basic', 'gold', 'expert'];
            const serviceType = serviceTypes[index];
            
            if (serviceType) {
                const nameInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Name`);
                const titleInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Title`);
                const descInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Description`);
                const priceInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Price`);

                if (nameInput) nameInput.value = service.name;
                if (titleInput) titleInput.value = service.title;
                if (descInput) descInput.value = service.description;
                if (priceInput) priceInput.value = service.price;
            }
        });
    }

    updatePortfolioDisplay(portfolio) {
        portfolio.forEach((project, index) => {
            const titleEl = document.getElementById(`portfolio${index}Title`);
            const subtitleEl = document.getElementById(`portfolio${index}Subtitle`);
            const descEl = document.getElementById(`portfolio${index}Description`);

            if (titleEl) titleEl.textContent = project.title;
            if (subtitleEl) subtitleEl.textContent = project.subtitle;
            if (descEl) descEl.textContent = project.description;
        });
    }

    updateAdminPortfolioForm(portfolio) {
        portfolio.forEach((project, index) => {
            const titleInput = document.getElementById(`adminPortfolio${index}Title`);
            const subtitleInput = document.getElementById(`adminPortfolio${index}Subtitle`);
            const descInput = document.getElementById(`adminPortfolio${index}Description`);

            if (titleInput) titleInput.value = project.title;
            if (subtitleInput) subtitleInput.value = project.subtitle;
            if (descInput) descInput.value = project.description;
        });
    }

    updateTeamDisplay(team) {
        team.forEach((member, index) => {
            const nameEl = document.getElementById(`team${index}Name`);
            const roleEl = document.getElementById(`team${index}Role`);
            const descEl = document.getElementById(`team${index}Description`);

            if (nameEl) nameEl.textContent = member.name;
            if (roleEl) roleEl.textContent = member.role;
            if (descEl) descEl.textContent = member.description;
        });
    }

    updateAdminTeamForm(team) {
        team.forEach((member, index) => {
            const nameInput = document.getElementById(`adminTeam${index}Name`);
            const roleInput = document.getElementById(`adminTeam${index}Role`);
            const descInput = document.getElementById(`adminTeam${index}Description`);

            if (nameInput) nameInput.value = member.name;
            if (roleInput) roleInput.value = member.role;
            if (descInput) descInput.value = member.description;
        });
    }

    updateImagesDisplay(images) {
        Object.keys(images).forEach(key => {
            const imgEl = document.getElementById(`${key}Image`);
            if (imgEl) {
                imgEl.src = images[key];
            }
        });
    }

    updateAdminImagesForm(images) {
        Object.keys(images).forEach(key => {
            const input = document.getElementById(`admin${key.charAt(0).toUpperCase() + key.slice(1)}ImageUrl`);
            if (input) {
                input.value = images[key];
            }
        });
    }
}

// Service Form Functions
function toggleServiceForm(serviceType) {
    // Hide all service forms first
    const allForms = document.querySelectorAll('.service-form-hidden');
    allForms.forEach(form => {
        form.classList.remove('active');
    });

    // Show the selected form
    const targetForm = document.getElementById(`${serviceType}ServiceForm`);
    if (targetForm) {
        targetForm.classList.add('active');
    }
}

async function submitServiceForm(e, serviceName) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;

    try {
        // Prepare form data
        const formData = {
            form_type: `Solicitud de Servicio - ${serviceName}`,
            from_name: form.querySelector('input[placeholder*="nombre"]').value,
            from_email: form.querySelector('input[placeholder*="correo"]').value,
            phone: form.querySelector('input[placeholder*="teléfono"]').value,
            service: serviceName,
            message: form.querySelector('textarea').value || `Solicito información sobre el servicio: ${serviceName}`,
            to_email: 'contacto@goweb.com'
        };

        // Send email using EmailJS
        await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templateId,
            formData,
            EMAILJS_CONFIG.publicKey
        );

        // Store message in localStorage for admin panel
        window.navigation.storeMessage(formData);

        window.navigation.showAlert(`¡Solicitud de ${serviceName} enviada correctamente! Nos pondremos en contacto contigo pronto.`, 'success');
        form.reset();
        
        // Hide the form after successful submission
        form.closest('.service-form-hidden').classList.remove('active');
        
    } catch (error) {
        console.error('Error sending email:', error);
        window.navigation.showAlert('Error al enviar la solicitud. Por favor, inténtalo de nuevo o contáctanos directamente.', 'error');
    } finally {
        // Restore button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

// Image Upload Handler
function handleImageUpload(imageType, fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
        window.navigation.showAlert('Por favor selecciona un archivo de imagen válido.', 'error');
        return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
        window.navigation.showAlert('El archivo es demasiado grande. Máximo 5MB.', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const dataUrl = e.target.result;
        
        // Update the corresponding URL input
        const urlInput = document.getElementById(`admin${imageType.charAt(0).toUpperCase() + imageType.slice(1)}ImageUrl`);
        if (urlInput) {
            urlInput.value = dataUrl;
        }

        // Show preview
        const imgEl = document.getElementById(`${imageType}Image`);
        if (imgEl) {
            imgEl.src = dataUrl;
        }

        window.navigation.showAlert('Imagen cargada correctamente. No olvides guardar los cambios.', 'success');
    };

    reader.onerror = function() {
        window.navigation.showAlert('Error al cargar la imagen. Inténtalo de nuevo.', 'error');
    };

    reader.readAsDataURL(file);
}

// Global functions for admin panel
function saveService(serviceType) {
    const nameInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Name`);
    const titleInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Title`);
    const descInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Description`);
    const priceInput = document.getElementById(`admin${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}Price`);

    if (!nameInput || !titleInput || !descInput || !priceInput) return;

    const serviceData = {
        name: nameInput.value,
        title: titleInput.value,
        description: descInput.value,
        price: priceInput.value
    };

    // Get existing services or create new array
    let services = JSON.parse(localStorage.getItem('gowebServices') || '[]');
    
    // Ensure we have at least 3 services
    while (services.length < 3) {
        services.push({
            name: 'Nuevo Servicio',
            title: 'Título del Servicio',
            description: 'Descripción del servicio',
            price: '$0/Mes'
        });
    }

    const serviceIndex = serviceType === 'basic' ? 0 : serviceType === 'gold' ? 1 : 2;
    services[serviceIndex] = serviceData;

    localStorage.setItem('gowebServices', JSON.stringify(services));
    window.adminPanel.updateServicesDisplay(services);
    window.navigation.showAlert('Servicio actualizado correctamente', 'success');
}

function savePortfolio(index) {
    const titleInput = document.getElementById(`adminPortfolio${index}Title`);
    const subtitleInput = document.getElementById(`adminPortfolio${index}Subtitle`);
    const descInput = document.getElementById(`adminPortfolio${index}Description`);

    if (!titleInput || !subtitleInput || !descInput) return;

    const projectData = {
        title: titleInput.value,
        subtitle: subtitleInput.value,
        description: descInput.value
    };

    // Get existing portfolio or create new array
    let portfolio = JSON.parse(localStorage.getItem('gowebPortfolio') || '[]');
    
    // Ensure we have at least 3 projects
    while (portfolio.length < 3) {
        portfolio.push({
            title: 'Nuevo Proyecto',
            subtitle: 'Subtítulo del proyecto',
            description: 'Descripción del proyecto'
        });
    }

    portfolio[index] = projectData;

    localStorage.setItem('gowebPortfolio', JSON.stringify(portfolio));
    window.adminPanel.updatePortfolioDisplay(portfolio);
    window.navigation.showAlert('Proyecto actualizado correctamente', 'success');
}

function saveTeam(index) {
    const nameInput = document.getElementById(`adminTeam${index}Name`);
    const roleInput = document.getElementById(`adminTeam${index}Role`);
    const descInput = document.getElementById(`adminTeam${index}Description`);

    if (!nameInput || !roleInput || !descInput) return;

    const memberData = {
        name: nameInput.value,
        role: roleInput.value,
        description: descInput.value
    };

    // Get existing team or create new array
    let team = JSON.parse(localStorage.getItem('gowebTeam') || '[]');
    
    // Ensure we have at least 3 members
    while (team.length < 3) {
        team.push({
            name: 'Nuevo Miembro',
            role: 'Cargo',
            description: 'Descripción del miembro del equipo'
        });
    }

    team[index] = memberData;

    localStorage.setItem('gowebTeam', JSON.stringify(team));
    window.adminPanel.updateTeamDisplay(team);
    window.navigation.showAlert('Miembro del equipo actualizado correctamente', 'success');
}

function saveImage(imageType) {
    const input = document.getElementById(`admin${imageType.charAt(0).toUpperCase() + imageType.slice(1)}ImageUrl`);
    
    if (!input || !input.value.trim()) {
        window.navigation.showAlert('Por favor ingresa una URL válida o sube una imagen.', 'error');
        return;
    }

    // Get existing images or create new object
    let images = JSON.parse(localStorage.getItem('gowebImages') || '{}');
    images[imageType] = input.value;

    localStorage.setItem('gowebImages', JSON.stringify(images));
    window.adminPanel.updateImagesDisplay(images);
    window.navigation.showAlert('Imagen actualizada correctamente', 'success');
}

function savePortfolioImages() {
    const images = {};
    let hasValidImage = false;
    
    for (let i = 0; i < 3; i++) {
        const input = document.getElementById(`adminPortfolio${i}ImageUrl`);
        if (input && input.value.trim()) {
            images[`portfolio${i}`] = input.value;
            hasValidImage = true;
        }
    }

    if (!hasValidImage) {
        window.navigation.showAlert('Por favor ingresa al menos una URL válida o sube una imagen.', 'error');
        return;
    }

    // Get existing images or create new object
    let allImages = JSON.parse(localStorage.getItem('gowebImages') || '{}');
    Object.assign(allImages, images);

    localStorage.setItem('gowebImages', JSON.stringify(allImages));
    window.adminPanel.updateImagesDisplay(allImages);
    window.navigation.showAlert('Imágenes del portafolio actualizadas correctamente', 'success');
}

function saveTeamImages() {
    const images = {};
    let hasValidImage = false;
    
    for (let i = 0; i < 3; i++) {
        const input = document.getElementById(`adminTeam${i}ImageUrl`);
        if (input && input.value.trim()) {
            images[`team${i}`] = input.value;
            hasValidImage = true;
        }
    }

    if (!hasValidImage) {
        window.navigation.showAlert('Por favor ingresa al menos una URL válida o sube una imagen.', 'error');
        return;
    }

    // Get existing images or create new object
    let allImages = JSON.parse(localStorage.getItem('gowebImages') || '{}');
    Object.assign(allImages, images);

    localStorage.setItem('gowebImages', JSON.stringify(allImages));
    window.adminPanel.updateImagesDisplay(allImages);
    window.navigation.showAlert('Imágenes del equipo actualizadas correctamente', 'success');
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
    window.adminPanel = new AdminPanelSystem();
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
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 1024) {
        window.navigation.closeMobileMenu();
    }
}, 250));