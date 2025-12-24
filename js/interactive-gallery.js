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
