// 1. ELEMENTOS DEL DOM
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');
const themeText = document.querySelector('.theme-text');
const themeSound = document.getElementById('themeSound');
const themeAudioIndicator = document.querySelector('.theme-audio-indicator');
const hireBtn = document.getElementById('hireBtn');
const messageBtn = document.getElementById('messageBtn');
const moreBtn = document.getElementById('moreBtn');
const downloadCVBtn = document.getElementById('downloadCV');
const copyEmailBtn = document.getElementById('copyEmail');
const shareProfileBtn = document.getElementById('shareProfile');
const navLinks = document.querySelectorAll('.nav-link');
const avatarHover = document.querySelector('.avatar-hover');
const toastContainer = document.querySelector('.toast-container');

// 2. INICIALIZACIÓN DE TEMA
function initializeTheme() {
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
            themeText.textContent = 'Modo Oscuro';
        } else {
            themeText.textContent = 'Modo Claro';
        }
    } else {
        // Detecta preferencia del sistema
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.setAttribute('data-theme', 'dark');
            toggleSwitch.checked = true;
            themeText.textContent = 'Modo Oscuro';
            localStorage.setItem('theme', 'dark');
        }
    }
}

// 3. FUNCIÓN PARA CAMBIAR TEMA
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeText.textContent = 'Modo Oscuro';
        
        // Efecto visual
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
        
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeText.textContent = 'Modo Claro';
        
        // Efecto visual
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 300);
    }
    
    // Sonido (si está habilitado)
    if (themeAudioIndicator.classList.contains('active')) {
        themeSound.currentTime = 0;
        themeSound.play().catch(e => console.log("Audio no permitido automáticamente"));
    }
    
    // Notificación
    showToast('Tema cambiado exitosamente', 'success');
}

// 4. TOGGLE DE SONIDO
themeAudioIndicator.addEventListener('click', function() {
    this.classList.toggle('active');
    const icon = this.querySelector('i');
    
    if (this.classList.contains('active')) {
        icon.className = 'fas fa-volume-up';
        showToast('Sonido activado', 'success');
    } else {
        icon.className = 'fas fa-volume-mute';
        showToast('Sonido desactivado', 'warning');
    }
    
    // Efecto visual
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

// 5. FUNCIÓN PARA MOSTRAR TOAST
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Animar entrada
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease';
    }, 10);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
    
    // Click para cerrar
    toast.addEventListener('click', () => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}

// 6. FUNCIONALIDAD DE BOTONES
hireBtn.addEventListener('click', function() {
    showToast('¡Excelente! Te contactaré pronto', 'success');
    
    // Efecto visual
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

messageBtn.addEventListener('click', function() {
    // Simular apertura de chat
    showToast('Abrir chat de mensajes', 'info');
    
    // Copiar email al portapapeles
    navigator.clipboard.writeText('maycol@example.com')
        .then(() => showToast('Email copiado al portapapeles', 'success'))
        .catch(() => showToast('Error al copiar email', 'error'));
});

moreBtn.addEventListener('click', function() {
    // Mostrar menú de opciones
    showToast('Más opciones disponibles', 'info');
    
    // Efecto visual
    this.classList.toggle('active');
    setTimeout(() => {
        this.classList.remove('active');
    }, 1000);
});

downloadCVBtn.addEventListener('click', function() {
    // Simular descarga de CV
    showToast('Descargando CV...', 'info');
    
    setTimeout(() => {
        showToast('CV descargado exitosamente', 'success');
    }, 1500);
    
    // Efecto visual
    this.style.transform = 'scale(0.9)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
});

copyEmailBtn.addEventListener('click', function() {
    // Copiar email al portapapeles
    navigator.clipboard.writeText('maycol.quispe@example.com')
        .then(() => {
            showToast('Email copiado al portapapeles', 'success');
            
            // Cambiar ícono temporalmente
            const icon = this.querySelector('i');
            const originalIcon = icon.className;
            icon.className = 'fas fa-check';
            
            setTimeout(() => {
                icon.className = originalIcon;
            }, 2000);
        })
        .catch(() => showToast('Error al copiar email', 'error'));
});

shareProfileBtn.addEventListener('click', function() {
    // Compartir perfil
    if (navigator.share) {
        navigator.share({
            title: 'Maycol R. Quispe C. - Frontend Developer',
            text: '¡Conoce el perfil profesional de Maycol!',
            url: window.location.href,
        })
        .then(() => showToast('¡Perfil compartido exitosamente!', 'success'))
        .catch(() => showToast('Compartir cancelado', 'warning'));
    } else {
        // Fallback: copiar URL
        navigator.clipboard.writeText(window.location.href)
            .then(() => showToast('URL copiada al portapapeles', 'success'))
            .catch(() => showToast('Error al copiar URL', 'error'));
    }
});

// 7. NAVEGACIÓN SUAVE
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Actualizar link activo
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        
        // Scroll suave
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
            document.querySelector(targetId)?.scrollIntoView({
                behavior: 'smooth'
            });
        }
        
        showToast(`Navegando a ${this.querySelector('i').className.replace('fas fa-', '').replace('-', ' ')}`, 'info');
    });
});

// 8. HOVER DEL AVATAR
avatarHover.addEventListener('click', function() {
    showToast('Cambiar foto de perfil', 'info');
});

// 9. RELOJ EN TIEMPO REAL
function updateDateTime() {
    const now = new Date();
    
    // Formatear hora
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
    };
    const timeString = now.toLocaleTimeString('es-ES', timeOptions);
    
    // Formatear fecha
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('es-ES', dateOptions);
    
    // Actualizar elementos
    const timeElement = document.getElementById('currentTime');
    const dateElement = document.getElementById('currentDate');
    
    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString.charAt(0).toUpperCase() + dateElement.slice(1);
}

// 10. PARTICLES.JS
function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: document.documentElement.getAttribute('data-theme') === 'dark' ? "#ffffff" : "#4361ee" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: document.documentElement.getAttribute('data-theme') === 'dark' ? "#ffffff" : "#4361ee",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
}

// 11. EFECTOS DE RATÓN
document.addEventListener('mousemove', function(e) {
    const cards = document.querySelectorAll('.card, .time-widget');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateY = (x - centerX) / 25;
        const rotateX = (centerY - y) / 25;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
});

document.addEventListener('mouseleave', function() {
    const cards = document.querySelectorAll('.card, .time-widget');
    cards.forEach(card => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// 12. ANIMACIÓN DE ENTRADA
function initAnimations() {
    const elements = document.querySelectorAll('.card, .floating-nav, .theme-switch-wrapper');
    
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// 13. KEYBOARD SHORTCUTS
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + T para cambiar tema
    if ((e.ctrlKey || e.metaKey) && e.key === 't') {
        e.preventDefault();
        toggleSwitch.click();
    }
    
    // Escape para cerrar toasts
    if (e.key === 'Escape') {
        const toasts = document.querySelectorAll('.toast');
        toasts.forEach(toast => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        });
    }
});

// 14. INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tema
    initializeTheme();
    
    // Configurar eventos
    toggleSwitch.addEventListener('change', switchTheme);
    
    // Iniciar reloj
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Iniciar partículas
    setTimeout(initParticles, 1000);
    
    // Iniciar animaciones
    setTimeout(initAnimations, 100);
    
    // Mostrar mensaje de bienvenida
    setTimeout(() => {
        showToast('Bienvenido al perfil de Maycol R. Quispe C.', 'success');
    }, 1000);
    
    // Log de consola
    console.log('%c👨‍💻 Maycol R. Quispe C.', 'color: #4361ee; font-size: 16px; font-weight: bold;');
    console.log('%cFrontend Developer | UI/UX Enthusiast', 'color: #666;');
    console.log('%cWebsite loaded successfully! 🚀', 'color: #4cc9f0;');
});

// 15. DETECCIÓN DE CONEXIÓN
window.addEventListener('online', () => {
    showToast('Conexión restablecida', 'success');
});

window.addEventListener('offline', () => {
    showToast('Sin conexión a internet', 'warning');
});