/**
 * Configuración global del frontend
 * Determina la URL de la API según dónde se esté ejecutando la web
 */
const CONFIG = {
    // Si estamos en localhost o 127.0.0.1, usamos el backend local
    // De lo contrario, usamos la URL de producción (AWS Lambda/Serverless)
    API_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
        ? 'http://localhost:3000/api/contact'
        : 'https://i4xe9n3ui6.execute-api.us-east-1.amazonaws.com/dev/api/contact'
};

// Exportar para uso en otros scripts si fuera módulo, pero aquí será global
window.APP_CONFIG = CONFIG;
