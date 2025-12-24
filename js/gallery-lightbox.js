class LightboxGallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = this.lightbox.querySelector('.lightbox-image');
        this.lightboxCaption = this.lightbox.querySelector('.lightbox-caption');
        this.closeButton = this.lightbox.querySelector('.lightbox-close');
        
        this.init();
    }

    init() {
        if (!this.galleryItems.length || !this.lightbox) return;

        // Open Lightbox
        this.galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h3').textContent;
                this.openLightbox(img.src, title);
            });
        });

        // Close Lightbox
        this.closeButton.addEventListener('click', () => this.closeLightbox());
        
        // Close on background click
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.lightbox.classList.contains('active')) {
                this.closeLightbox();
            }
        });

        // Initialize animation for gallery items
        this.initEntryAnimation();
    }

    openLightbox(src, caption) {
        this.lightboxImage.src = src;
        this.lightboxCaption.textContent = caption;
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closeLightbox() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    initEntryAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        this.galleryItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            item.style.transitionDelay = `${(index % 3) * 100}ms`; // Stagger effect
            
            observer.observe(item);
        });
    }
}
