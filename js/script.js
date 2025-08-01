// =========================================================
// Archivo script.js final (Firebase + Navegación)
// =========================================================

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyB9RY4wK8PR1zIYXOqbku8_snieNY37M5k",
    authDomain: "go-web-login.firebaseapp.com",
    projectId: "go-web-login",
    storageBucket: "go-web-login.firebasestorage.app",
    messagingSenderId: "100324552886",
    appId: "1:100324552886:web:e4fd5104155f3b7b2c3617",
    measurementId: "G-1VNK1K706D"
};

// Configuración de EmailJS (si la sigues usando para otras cosas)
const EMAILJS_CONFIG = {
    serviceId: 'service_fzbcjn2',
    templateId: 'template_k956gl2', 
    publicKey: 'Eq7na919j59oXPRcd'
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

// =========================================================
// Lógica de Navegación SPA
// =========================================================
class Navigation {
    constructor() {
        this.sections = document.querySelectorAll('.page-section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.setupNavigation();
    }

    setupNavigation() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = link.dataset.section;
                if (sectionId) {
                    this.showSection(sectionId);
                }
            });
        });
        
        const navLogo = document.querySelector('.nav-logo');
        if (navLogo) {
            navLogo.addEventListener('click', () => this.showSection('home'));
        }
    }

    showSection(sectionId) {
        this.sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
        this.updateActiveLink(sectionId);
    }
    
    updateActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// =========================================================
// Lógica de Autenticación de Firebase
// =========================================================
const signInButton = document.getElementById('google-signin-button');
const userSignedInContainer = document.getElementById('user-signed-in');
const userInfoSpan = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');
const adminLink = document.querySelector('.admin-only');

auth.onAuthStateChanged(user => {
    if (user) {
        signInButton.style.display = 'none';
        userSignedInContainer.style.display = 'flex';
        userInfoSpan.textContent = user.displayName;
        checkUserRole(user);
    } else {
        signInButton.style.display = 'flex';
        userSignedInContainer.style.display = 'none';
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
});

if (signInButton) {
    signInButton.addEventListener('click', () => {
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                const userRef = db.collection('users').doc(user.uid);
                userRef.get().then(doc => {
                    if (!doc.exists) {
                        userRef.set({ name: user.displayName, email: user.email, role: 'user' });
                    }
                });
            })
            .catch(error => {
                console.error("Error al iniciar sesión:", error);
            });
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log("Sesión cerrada correctamente.");
        }).catch(error => {
            console.error("Error al cerrar sesión:", error);
        });
    });
}

function checkUserRole(user) {
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then(doc => {
        if (doc.exists) {
            const userRole = doc.data().role;
            if (userRole === 'admin') {
                if (adminLink) {
                    adminLink.style.display = 'flex';
                }
            } else {
                if (adminLink) {
                    adminLink.style.display = 'none';
                }
            }
        }
    }).catch(error => {
        console.error("Error al leer el rol del usuario:", error);
    });
}

// =========================================================
// Inicialización
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
    window.navigation = new Navigation();
    window.navigation.showSection('home');
});
