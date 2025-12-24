// Navbar scroll effect ACTUALIZADO con nuevo verde
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-custom');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(84, 92, 52, 0.95)'; // #545C34 con transparencia
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

// Carrusel Custom
class CustomCarousel {
    constructor() {
        this.slides = document.querySelectorAll('.carousel-slide');
        this.indicators = document.querySelectorAll('.indicator');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.currentSlide = 0;
        this.interval = null;
        this.intervalTime = 5000;
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) return;
        
        this.showSlide(this.currentSlide);
        
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.startAutoSlide();
        
        const carousel = document.querySelector('.custom-carousel-container');
        if (carousel) {
            carousel.addEventListener('mouseenter', () => this.stopAutoSlide());
            carousel.addEventListener('mouseleave', () => this.startAutoSlide());
        }
    }
    
    showSlide(index) {
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.remove('animate-slideInRight');
        });
        
        this.indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        this.slides[index].classList.add('active');
        this.slides[index].classList.add('animate-slideInRight');
        this.indicators[index].classList.add('active');
        
        this.currentSlide = index;
    }
    
    nextSlide() {
        let nextIndex = this.currentSlide + 1;
        if (nextIndex >= this.slides.length) {
            nextIndex = 0;
        }
        this.showSlide(nextIndex);
    }
    
    prevSlide() {
        let prevIndex = this.currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = this.slides.length - 1;
        }
        this.showSlide(prevIndex);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoSlide() {
        this.stopAutoSlide(); // Limpiar intervalo existente
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.intervalTime);
    }
    
    stopAutoSlide() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}

// Animaciones para la sección de Desarrollo de Producto
class ServiceAnimations {
    constructor() {
        this.serviceCards = document.querySelectorAll('.servicio-card');
        this.init();
    }
    
    init() {
        if (this.serviceCards.length === 0) return;
        
        // Observador para animación de entrada
        this.setupIntersectionObserver();
        
        // Efectos hover mejorados
        this.setupHoverEffects();
        
        // Efectos de click/tap
        this.setupClickEffects();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.serviceCards.forEach(card => {
            observer.observe(card);
        });
    }
    
    setupHoverEffects() {
        this.serviceCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.currentTarget);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.animateCardLeave(e.currentTarget);
            });
        });
    }
    
    setupClickEffects() {
        this.serviceCards.forEach(card => {
            card.addEventListener('click', (e) => {
                this.animateCardClick(e.currentTarget);
            });
            
            // Soporte para teclado
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.animateCardClick(e.currentTarget);
                }
            });
        });
    }
    
    animateCardHover(card) {
        const imagen = card.querySelector('.servicio-imagen');
        const title = card.querySelector('.servicio-title');
        const description = card.querySelector('.servicio-description');
        
        if (imagen) {
            imagen.style.transform = 'scale(1.1) rotate(5deg)';
        }
        
        if (title) {
            title.style.transform = 'translateY(-2px)';
            title.style.color = '#9FB254';
        }
        
        if (description) {
            description.style.transform = 'translateY(-1px)';
            description.style.color = '#333333';
        }
    }
    
    animateCardLeave(card) {
        const imagen = card.querySelector('.servicio-imagen');
        const title = card.querySelector('.servicio-title');
        const description = card.querySelector('.servicio-description');
        
        if (imagen) {
            imagen.style.transform = 'scale(1) rotate(0deg)';
        }
        
        if (title) {
            title.style.transform = 'translateY(0)';
            title.style.color = '';
        }
        
        if (description) {
            description.style.transform = 'translateY(0)';
            description.style.color = '';
        }
    }
    
    animateCardClick(card) {
        // Efecto de pulso al hacer click
        card.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
}

// Animaciones para la sección Sobre Nosotros
class SobreNosotrosAnimations {
    constructor() {
        this.section = document.querySelector('.sobre-nosotros-section');
        this.textContent = document.querySelector('.nosotros-text');
        this.visualContent = document.querySelector('.nosotros-visual');
        this.init();
    }
    
    init() {
        if (!this.section) return;
        
        this.setupIntersectionObserver();
        this.setupButtonEffects();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSectionIn();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -100px 0px'
        });
        
        observer.observe(this.section);
    }
    
    animateSectionIn() {
        // Animar texto
        setTimeout(() => {
            this.textContent.classList.add('animate-in');
        }, 200);
        
        // Animar visual
        setTimeout(() => {
            this.visualContent.classList.add('animate-in');
        }, 400);
        
        // Animar elementos flotantes
        this.animateFloatingElements();
    }
    
    animateFloatingElements() {
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.animation = 'floatElement 4s ease-in-out infinite';
            }, index * 300);
        });
    }
    
    setupButtonEffects() {
        const button = document.querySelector('.conoce-mas-btn');
        if (!button) return;
        
        button.addEventListener('click', () => {
            this.animateButtonClick(button);
            // Aquí puedes agregar la funcionalidad del botón
            console.log('Botón CONOCER MÁS clickeado');
        });
        
        button.addEventListener('mouseenter', () => {
            this.animateButtonHover(button);
        });
        
        button.addEventListener('mouseleave', () => {
            this.animateButtonLeave(button);
        });
    }
    
    animateButtonClick(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
    }
    
    animateButtonHover(button) {
        button.style.transform = 'translateY(-3px)';
    }
    
    animateButtonLeave(button) {
        button.style.transform = 'translateY(0)';
    }
}

// Animaciones para la sección Nuestros Servicios
class ServiciosAnimations {
    constructor() {
        this.section = document.querySelector('.servicios-section');
        this.cards = document.querySelectorAll('.servicio-detalle-card');
        this.init();
    }
    
    init() {
        if (!this.section) return;
        this.setupIntersectionObserver();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCardsIn();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(this.section);
    }
    
    animateCardsIn() {
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 200);
        });
    }
}

// NUEVA CLASE: Animaciones para la sección Nuestros Proyectos
class ProyectosAnimations {
    constructor() {
        this.section = document.querySelector('.proyectos-section');
        this.cards = document.querySelectorAll('.proyecto-item');
        this.init();
    }
    
    init() {
        if (!this.section) return;
        this.setupIntersectionObserver();
        this.setupHoverEffects();
    }
    
    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCardsIn();
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        observer.observe(this.section);
    }
    
    animateCardsIn() {
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-in');
            }, index * 200);
        });
    }
    
    setupHoverEffects() {
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.animateCardLeave(card);
            });
        });
    }
    
    animateCardHover(card) {
        const overlay = card.querySelector('.proyecto-overlay');
        const nombre = card.querySelector('.proyecto-nombre');
        const desc = card.querySelector('.proyecto-desc');
        const verMas = card.querySelector('.proyecto-ver-mas');
        
        if (overlay) overlay.style.opacity = '1';
        if (nombre) nombre.style.transform = 'translateY(0)';
        if (desc) desc.style.transform = 'translateY(0)';
        if (verMas) verMas.style.opacity = '1';
    }
    
    animateCardLeave(card) {
        const overlay = card.querySelector('.proyecto-overlay');
        const nombre = card.querySelector('.proyecto-nombre');
        const desc = card.querySelector('.proyecto-desc');
        const verMas = card.querySelector('.proyecto-ver-mas');
        
        if (overlay) overlay.style.opacity = '0';
        if (nombre) nombre.style.transform = 'translateY(20px)';
        if (desc) desc.style.transform = 'translateY(20px)';
        if (verMas) verMas.style.opacity = '0';
    }
}

// NUEVA CLASE: Modal para galería de proyectos - CORREGIDA
class ProyectosModal {
    constructor() {
        this.modal = document.getElementById('projectModal');
        this.modalImage = document.getElementById('modalImage');
        this.modalTitle = document.getElementById('modalTitle');
        this.modalDescription = document.getElementById('modalDescription');
        this.closeModal = document.getElementById('closeModal');
        this.prevButton = document.getElementById('prevProject');
        this.nextButton = document.getElementById('nextProject');
        this.currentProjectIndex = 0;
        
        this.proyectos = [
            {
                id: 'tambrazo',
                nombre: 'TAMBRAZO',
                imagen: 'img/photos/3pya.png',
                descripcion: 'Sistema innovador de automatización industrial para procesos de fabricación. Este proyecto ha permitido optimizar los tiempos de producción en un 40% y reducir los costos operativos en un 25%. Nuestra solución integra IoT y análisis de datos en tiempo real para maximizar la eficiencia.'
            },
            {
                id: 'prepara',
                nombre: 'PREPARA',
                imagen: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                descripcion: 'Plataforma educativa para la preparación de profesionales en tecnología. Más de 5,000 estudiantes han mejorado sus habilidades técnicas a través de nuestros programas especializados. Ofrecemos cursos en desarrollo web, ciencia de datos, inteligencia artificial y más.'
            },
            {
                id: 'innovacion',
                nombre: 'INNOVACIÓN',
                imagen: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                descripcion: 'Laboratorio de investigación y desarrollo de nuevas tecnologías. Nuestro equipo multidisciplinario trabaja en la creación de soluciones disruptivas para los desafíos del mañana. Hemos patentado 15 tecnologías innovadoras en los últimos 3 años.'
            },
            {
                id: 'sostenibilidad',
                nombre: 'SOSTENIBILIDAD',
                imagen: 'https://images.unsplash.com/photo-1569163139394-de44cb4e4a82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
                descripcion: 'Soluciones ecológicas para procesos industriales sostenibles. Hemos ayudado a más de 50 empresas a reducir su huella de carbono mediante la implementación de tecnologías verdes. Nuestras soluciones han ahorrado más de 10,000 toneladas de CO2 anualmente.'
            }
        ];
        
        this.init();
    }
    
    init() {
        if (!this.modal) {
            console.error('Modal no encontrado en el DOM');
            return;
        }
        
        // Abrir modal al hacer clic en un proyecto
        const proyectoItems = document.querySelectorAll('.proyecto-item');
        if (proyectoItems.length === 0) {
            console.error('No se encontraron elementos .proyecto-item');
            return;
        }
        
        proyectoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.currentProjectIndex = index;
                this.openModal();
            });
        });
        
        // Event listeners para controles del modal
        this.closeModal.addEventListener('click', () => this.closeModalFunc());
        this.prevButton.addEventListener('click', () => this.prevProject());
        this.nextButton.addEventListener('click', () => this.nextProject());
        
        // Cerrar modal con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModalFunc();
            }
        });
        
        // Cerrar modal al hacer clic fuera del contenido
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModalFunc();
            }
        });
        
        console.log('Modal de proyectos inicializado correctamente');
    }
    
    openModal() {
        const project = this.proyectos[this.currentProjectIndex];
        
        // Verificar que los elementos existan antes de modificarlos
        if (this.modalImage) this.modalImage.src = project.imagen;
        if (this.modalImage) this.modalImage.alt = `Proyecto ${project.nombre}`;
        if (this.modalTitle) this.modalTitle.textContent = project.nombre;
        if (this.modalDescription) this.modalDescription.textContent = project.descripcion;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll del body
        
        console.log('Modal abierto para proyecto:', project.nombre);
    }
    
    closeModalFunc() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll del body
    }
    
    prevProject() {
        this.currentProjectIndex = (this.currentProjectIndex - 1 + this.proyectos.length) % this.proyectos.length;
        this.openModal();
    }
    
    nextProject() {
        this.currentProjectIndex = (this.currentProjectIndex + 1) % this.proyectos.length;
        this.openModal();
    }
}

// Agregar estilos dinámicos para partículas
function addParticleStyles() {
    if (document.querySelector('#particle-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'particle-styles';
    style.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translate(0, 0) scale(0);
                opacity: 0.6;
            }
            100% {
                transform: translate(0, -30px) scale(1);
                opacity: 0;
            }
        }
        
        .servicio-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .servicio-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .proyecto-item {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .proyecto-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
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


// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - inicializando componentes...');
    
    // Agregar estilos primero
    addParticleStyles();
    
    // Inicializar componentes
    initNavbarScroll();
    initSmoothScroll();
    
    // Inicializar clases
    new MobileMenu();
    new CustomCarousel();
    new ServiceAnimations();
    new SobreNosotrosAnimations();
    new ServiciosAnimations();
    new ProyectosAnimations();
    new ProyectosModal(); // Esta clase ahora está corregida
    
    console.log('Todos los componentes inicializados correctamente');
});

// Fallback para asegurar que se ejecute
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
} else {
    setTimeout(initAll, 100);
}

// CLASE: Botón Volver Arriba
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTopBtn');
        this.scrollThreshold = 300; // Mostrar botón después de bajar 300px
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Event listener para el scroll
        window.addEventListener('scroll', () => {
            this.toggleVisibility();
        });
        
        // Event listener para el click
        this.button.addEventListener('click', () => {
            this.scrollToTop();
        });
        
        // Inicializar visibilidad
        this.toggleVisibility();
    }
    
    toggleVisibility() {
        if (window.pageYOffset > this.scrollThreshold) {
            this.button.classList.add('show');
            
            // Opcional: agregar efecto de pulso después de 2 segundos
            setTimeout(() => {
                this.button.classList.add('pulse');
            }, 2000);
        } else {
            this.button.classList.remove('show', 'pulse');
        }
    }
    
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Quitar efecto de pulso al hacer click
        this.button.classList.remove('pulse');
    }
}
// NUEVA CLASE: Expanding Gallery Animations
class ExpandingGallery {
    constructor() {
        this.gallery = document.querySelector('.expanding-gallery');
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
            
            // Opcional: mantener expandido al hacer click
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.resetAllItems();
                item.classList.add('active');
            });
        });
        
        // Reset al salir de la galería
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

function initAll() {
    addParticleStyles();
    initNavbarScroll();
    initSmoothScroll();
    new MobileMenu();
    new CustomCarousel();
    new ServiceAnimations();
    new SobreNosotrosAnimations();
    new ServiciosAnimations();
    new ProyectosAnimations();
    new ProyectosModal();
    new ScrollToTop();
     new ExpandingGallery();
}

