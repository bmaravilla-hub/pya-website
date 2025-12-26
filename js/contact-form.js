// Formulario de Contacto - EmailJS
(function () {
    // Inicializar EmailJS con tu Public Key
    emailjs.init("gxQgdOXvBwW8kKNAC"); // Public Key de EmailJS
})();

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const btnText = document.querySelector('.btn-text');
    const btnSpinner = document.querySelector('.btn-spinner');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Mostrar spinner
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';
        formMessage.style.display = 'none';

        // Obtener valores del formulario
        const templateParams = {
            from_name: document.getElementById('nombre').value + ' ' + document.getElementById('apellido').value,
            from_email: document.getElementById('email').value,
            phone: document.getElementById('telefono').value,
            message: document.getElementById('mensaje').value,
            to_email: 'blanca@kerbrumagency.com'
        };

        // Enviar email usando EmailJS
        emailjs.send('service_pya', 'template_pya', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                showMessage('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
                form.reset();
            }, function (error) {
                console.log('FAILED...', error);
                showMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
            })
            .finally(function () {
                // Restaurar botón
                btnText.style.display = 'inline';
                btnSpinner.style.display = 'none';
            });
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';

        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});
