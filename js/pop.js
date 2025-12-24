// JavaScript para Rotulación e Instalación

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

// Typewriter Effect
class Typewriter {
    constructor() {
        this.textElement = document.querySelector('.typewriter-text');
        this.cursorElement = document.querySelector('.typewriter-cursor');
        this.init();
    }

    init() {
        if (!this.textElement) return;
        const text = this.textElement.getAttribute('data-text');
        this.type(text);
    }

    type(text, i = 0) {
        if (i < text.length) {
            this.textElement.textContent += text.charAt(i);
            setTimeout(() => this.type(text, i + 1), 100);
        } else {
            // Optional: Blink cursor after typing finishes
        }
    }
}

// Number Counter Animation
class NumberCounter {
    constructor() {
        this.stats = document.querySelectorAll('.stat-number');
        this.init();
    }

    init() {
        if (!this.stats.length) return;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        this.stats.forEach(stat => observer.observe(stat));
    }

    animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const suffix = element.getAttribute('data-suffix') || '';
        const duration = 2000;
        const startTime = performance.now();
        const startValue = 0;

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
            element.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target + suffix;
            }
        };

        requestAnimationFrame(update);
    }
}

// Features Animation
class FeatureAnimation {
    constructor() {
        this.features = document.querySelectorAll('.feature');
        this.init();
    }

    init() {
        if (!this.features.length) return;
        this.setupIntersectionObserver();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFeatures();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        const list = document.querySelector('.features-list');
        if (list) observer.observe(list);
    }

    animateFeatures() {
        this.features.forEach((feature, index) => {
            setTimeout(() => {
                feature.classList.add('animate-in');
            }, index * 150);
        });
    }
}

// Gallery Animation removed (handled by CSS Infinite Scroll)

// Mobile Menú functionality
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
        this.isOpen ? this.openMenu() : this.closeMenu();
    }
    
    openMenu() {
        this.mobileNav.classList.add('open');
        const menuIcon = this.menuBtn.querySelector('.menu-icon');
        if (menuIcon) menuIcon.style.transform = 'rotate(90deg)';
        
        this.mobileLinks.forEach((link, index) => {
            link.style.transitionDelay = `${index * 100}ms`;
        });
    }
    
    closeMenu() {
        this.mobileNav.classList.remove('open');
        const menuIcon = this.menuBtn.querySelector('.menu-icon');
        if (menuIcon) menuIcon.style.transform = 'rotate(0deg)';
        this.isOpen = false;
        
        this.mobileLinks.forEach(link => {
            link.style.transitionDelay = '0ms';
        });
    }
}

// Expanding Gallery
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
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        
        observer.observe(this.gallery);
    }
    
    animateItemsIn() {
        this.items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-in');
            }, index * 100);
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

// Scroll to Top
class ScrollToTop {
    constructor() {
        this.button = document.getElementById('scrollToTopBtn');
        this.scrollThreshold = 300;
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    initSmoothScroll();
    new MobileMenu();
    new ExpandingGallery();
    new ScrollToTop();
    new Typewriter();
    new NumberCounter();
    new FeatureAnimation();

    
    // Add initial styles for animations
    const style = document.createElement('style');
    style.textContent = `
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
    new LightboxGallery();
});