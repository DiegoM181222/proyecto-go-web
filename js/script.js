const EMAILJS_CONFIG = {
    serviceId: 'service_fzbcjn2',
    templateId: 'template_k956gl2', 
    publicKey: 'Eq7na919j59oXPRcd'

        // =========================================================
// Archivo script.js final con la integración de Firebase
// =========================================================

// Configuración de Firebase (debe ser la que copiaste de tu consola)
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

// Referencias a los elementos HTML
const signInButton = document.getElementById('google-signin-button');
const userSignedInContainer = document.getElementById('user-signed-in');
const userInfoSpan = document.getElementById('userInfo');
const logoutBtn = document.getElementById('logoutBtn');
const adminLink = document.querySelector('.admin-only'); // Usamos el selector de clase

// =========================================================
// Lógica de Autenticación de Firebase
// =========================================================

// Maneja el estado de autenticación (cuando el usuario inicia o cierra sesión)
auth.onAuthStateChanged(user => {
    if (user) {
        // El usuario está conectado
        signInButton.style.display = 'none';
        userSignedInContainer.style.display = 'flex';
        userInfoSpan.textContent = user.displayName;
        
        // Verifica el rol del usuario en la base de datos
        checkUserRole(user);
    } else {
        // El usuario está desconectado
        signInButton.style.display = 'flex';
        userSignedInContainer.style.display = 'none';
        
        // Oculta el enlace de admin
        if (adminLink) {
            adminLink.style.display = 'none';
        }
    }
});

// Event listener para el botón de inicio de sesión con Google
if (signInButton) {
    signInButton.addEventListener('click', () => {
        auth.signInWithPopup(provider)
            .then(result => {
                const user = result.user;
                const userRef = db.collection('users').doc(user.uid);
                
                userRef.get().then(doc => {
                    if (!doc.exists) {
                        // Si el usuario es nuevo, lo registra con el rol por defecto
                        userRef.set({ name: user.displayName, email: user.email, role: 'user' });
                    }
                });
            })
            .catch(error => {
                console.error("Error al iniciar sesión:", error);
            });
    });
}

// Event listener para el botón de cerrar sesión
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            console.log("Sesión cerrada correctamente.");
        }).catch(error => {
            console.error("Error al cerrar sesión:", error);
        });
    });
}

// Función para verificar el rol del usuario en Firestore
function checkUserRole(user) {
    const userRef = db.collection('users').doc(user.uid);
    userRef.get().then(doc => {
        if (doc.exists) {
            const userRole = doc.data().role;
            if (userRole === 'admin') {
                if (adminLink) {
                    adminLink.style.display = 'flex'; // Muestra el enlace si es admin
                }
            } else {
                if (adminLink) {
                    adminLink.style.display = 'none'; // Oculta si no es admin
                }
            }
        }
    }).catch(error => {
        console.error("Error al leer el rol del usuario:", error);
    });
}
