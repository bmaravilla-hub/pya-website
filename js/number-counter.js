// Animación de contadores numéricos con efecto scroll
function initNumberCounters() {
    const counters = document.querySelectorAll('[data-counter]');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const animateCounter = (element) => {
        const target = parseInt(element.getAttribute('data-counter'));
        const originalText = element.textContent;
        const hasPlus = originalText.includes('+');
        const duration = 2000; // 2 segundos
        const startTime = performance.now();

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * target);

            // Mantener el símbolo + si existía
            element.textContent = hasPlus ? `+${current}` : current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = hasPlus ? `+${target}` : target;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNumberCounters);
} else {
    initNumberCounters();
}
