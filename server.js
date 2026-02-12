require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

process.on('uncaughtException', (err) => {
    console.error('>>> [CRITICAL] Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('>>> [CRITICAL] Unhandled Rejection at:', promise, 'reason:', reason);
});

const app = express();
const PORT = process.env.PORT || 3000;

console.log('>>> [INFO] Iniciando servidor con lógica modular de correos...');
console.log(`>>> [CONFIG] EMAIL_USER: ${process.env.EMAIL_USER}`);
console.log(`>>> [CONFIG] SMTP_TO: ${process.env.SMTP_TO}`);

app.use((req, res, next) => {
    console.log(`>>> [REQUEST] ${req.method} ${req.url} desde ${req.headers.origin || 'desconocido'}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Servidor de Punto&Aparte funcionando correctamente.');
});

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());
app.use(express.static('./'));

const { sendEmail, generateContactEmail } = require('./utils/email');

app.post('/api/contact', async (req, res) => {
    console.log('>>> [DEBUG] 1. Petición recibida en /api/contact');
    try {
        const { nombre, apellido, email, telefono, mensaje } = req.body;
        console.log('>>> [DEBUG] 2. Datos extraídos:', { nombre, email });

        if (!nombre || !email || !mensaje) {
            console.log('>>> [DEBUG] 3. Error: Faltan campos obligatorios');
            return res.status(400).json({ success: false, message: 'Faltan campos obligatorios' });
        }

        console.log('>>> [DEBUG] 4. Generando HTML del correo...');
        const htmlContent = generateContactEmail({ nombre, apellido, email, telefono, mensaje });

        console.log('>>> [DEBUG] 5. Intentando enviar correo...');
        await sendEmail({
            emailDestination: process.env.SMTP_TO,
            subject: `Nuevo mensaje de contacto: ${nombre}`,
            htmlContent: htmlContent
        });

        console.log('>>> [DEBUG] 6. Correo enviado con éxito');
        res.status(200).json({ success: true, message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('>>> [ERROR] Falla en /api/contact:', error);
        res.status(500).json({
            success: false,
            message: 'Error al enviar el correo',
            details: error.message,
            stack: error.stack
        });
    }
});

const serverless = require('serverless-http');

module.exports.handler = serverless(app);

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
