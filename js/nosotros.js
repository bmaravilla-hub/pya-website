// JavaScript para la página About

// Navbar scroll effect
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-custom');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(84, 92, 52, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--color-verde)';
            header.style.backdropFilter = 'none';
        }
    });
}

// Menú Mobile functionality
class MobileMenu {
    constructor() {
        this.menuBtn = document.querySelector('.mobile-menu-btn');
        this.mobileNav = document.querySelector('.mobile-nav-container');
        this.mobileLinks = document.querySelectorAll('.mobile-nav-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        if (!this.menuBtn) return;
        
        this.menuBtn.addEventListener('click', () => this.toggleMenu());
        
        this.mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });
    }
    
    toggleMenu() {
        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            this.openMenu();
        } else {
            this.closeMenu();
        }
    }
    
    openMenu() {
        this.mobileNav.classList.add('open');
        const menuIcon = this.menuBtn.querySelector('.menu-icon');
        if (menuIcon) {
            menuIcon.style.transform = 'rotate(90deg)';
        }
        
        this.mobileLinks.forEach((link, index) => {
            link.style.transitionDelay = `${index * 100}ms`;
        });
    }
    
    closeMenu() {
        this.mobileNav.classList.remove('open');
        const menuIcon = this.menuBtn.querySelector('.menu-icon');
        if (menuIcon) {
            menuIcon.style.transform = 'rotate(0deg)';
        }
        this.isOpen = false;
        
        this.mobileLinks.forEach(link => {
            link.style.transitionDelay = '0ms';
        });
    }
}

// Expanding Gallery para Instalaciones
class ExpandingGallery {
    constructor() {
        this.gallery = document.querySelector('.instalaciones-gallery');
        this.items = document.querySelectorAll('.gallery-item');
        this.init();
    }
    
    init() {
        if (!this.gallery) return;
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateItemsIn();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(this.gallery);
    }
    
    animateItemsIn() {
        this.items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 200);
        });
    }
    
    setupHoverEffects() {
        this.items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.resetAllItems();
                item.classList.add('active');
            });
            
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetAllItems();
                item.classList.add('active');
            });
        });
        
        this.gallery.addEventListener('mouseleave', () => {
            this.resetAllItems();
        });
    }
    
    resetAllItems() {
        this.items.forEach(item => {
            item.classList.remove('active');
        });
    }
}

// Animaciones para las secciones
class AboutAnimations {
    constructor() {
        this.sections = document.querySelectorAll('.historia-section, .mvv-section, .instalaciones-section, .equipo-section');
        this.init();
    }
    
    init() {
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSection(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    animateSection(section) {
        const elements = section.querySelectorAll('.timeline-item, .mvv-card, .info-item, .equipo-card');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
}

// Smooth scroll para enlaces internos
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Botón Volver Arriba
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTopBtn');
        this.scrollThreshold = 300;
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', () => {
            this.toggleVisibility();
        });
        
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
        
        this.toggleVisibility();
    }
    
    toggleVisibility() {
        if (window.pageYOffset > this.scrollThreshold) {
            this.button.classList.add('show');
        } else {
            this.button.classList.remove('show');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initSmoothScroll();
    new MobileMenu();
    new ExpandingGallery();
    new AboutAnimations();
    new ScrollToTop();
    
    // Añadir estilos iniciales para animaciones
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item, .mvv-card, .info-item, .equipo-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .gallery-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .gallery-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});