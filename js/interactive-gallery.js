// Interactive Thumbnail Gallery JavaScript

document.addEventListener('DOMContentLoaded', function () {
    const radioInputs = document.querySelectorAll("[type='radio'].gallery-radio");

    if (radioInputs.length === 0) return;

    // Initialize gallery
    for (const radio of radioInputs) {
        radio.addEventListener("input", e => reorderThumbnails(e.target, radioInputs));
    }

    // Set first image as active by default
    if (radioInputs[0]) {
        radioInputs[0].checked = true;
        reorderThumbnails(radioInputs[0], radioInputs);
    }

    // Inject Floating Shapes for background decoration
    const gallerySection = document.querySelector('.gallery-section');
    if (gallerySection && !gallerySection.querySelector('.floating-shape')) {
        // Ensure relative positioning
        if (getComputedStyle(gallerySection).position === 'static') {
            gallerySection.style.position = 'relative';
            gallerySection.style.overflow = 'hidden';
        }

        const shapes = ['shape-1', 'shape-2', 'shape-3', 'shape-logo', 'shape-logo-2'];
        shapes.forEach(shapeClass => {
            const div = document.createElement('div');
            div.classList.add('floating-shape', shapeClass);
            gallerySection.insertBefore(div, gallerySection.firstChild);
        });
    }
});

function reorderThumbnails(targetEl, allRadios) {
    const nItems = allRadios.length;
    let processedUncheck = 0;

    for (const radio of allRadios) {
        const containerEl = radio.nextElementSibling;

        if (radio === targetEl) {
            // Checked radio - expand to full view
            containerEl.style.setProperty("--w", "100%");
            containerEl.style.setProperty("--l", "0");
        } else {
            // Unchecked radios - arrange as thumbnails
            containerEl.style.setProperty("--w", `${100 / (nItems - 1)}%`);
            containerEl.style.setProperty("--l", `${processedUncheck * 100 / (nItems - 1)}%`);
            processedUncheck += 1;
        }
    }
}
