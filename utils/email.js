const nodemailer = require('nodemailer');
const path = require('path');

/**
 * Genera el encabezado del correo
 */
const generateEmailHeader = () => {
    return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
        <tr>
            <td align="center" style="padding: 40px 0; background-color: #545c34; border-radius: 12px 12px 0 0;">
                <img src="cid:logo_pya" alt="Punto y Aparte Logo" style="display:block; width:180px; height:auto; border:0;" />
            </td>
        </tr>
        <tr>
            <td align="center" style="padding: 30px 0 20px 0;">
                <div style="font-size:16px; letter-spacing: 1px; color:#545c34; font-weight:400; font-family: 'Poppins', Arial, sans-serif; text-transform: uppercase;">
                    Tu socio estratégico en Punto de Venta
                </div>
            </td>
        </tr>
    </table>
    `;
};

/**
 * Genera el pie de página del correo
 */
const generateEmailFooter = () => {
    const year = new Date().getFullYear();
    return `
    <hr style="margin: 30px 0; border:0; border-top:1px solid #edf2f7;" />
    <div style="text-align:center; font-family: Arial, sans-serif;">
        <div style="font-size:15px; color:#545c34; font-weight:700; letter-spacing: 0.5px;">
            Punto y Aparte
        </div>
        <div style="font-size:12px; color:#a0aec0; margin-top: 5px;">
            Innovación y calidad en material POP y exhibidores.
        </div>
        
        <div style="margin: 25px 0;">
            <a href="https://puntoyaparte.com.sv" target="_blank" style="display:inline-block; padding: 12px 24px; background-color: #545c34; color: #ffffff; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; box-shadow: 0 4px 6px rgba(84, 92, 52, 0.2);">Visitar Sitio Web</a>
        </div>
        
        <div style="font-size:12px; color:#718096; margin-top: 30px; border-top: 1px solid #f7fafc; padding-top: 20px;">
            <p style="margin: 5px 0;">© ${year} Punto y Aparte by Kerbrum Agency. Todos los derechos reservados.</p>
        </div>
    </div>
    `;
};

/**
 * Layout general del correo
 */
const generateEmailLayout = (contentHtml) => {
    return `
    <div style="background-color:#f3f4f6; padding:24px 0; font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
            <tr>
                <td align="center">
                    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; background-color:#ffffff; color:#1f2937; border:1px solid #e5e7eb; border-radius:16px; padding:24px;">
                        <tr>
                            <td>
                                ${generateEmailHeader()}
                                ${contentHtml}
                                ${generateEmailFooter()}
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </div>
    `;
};

/**
 * Genera el contenido específico para un mensaje de contacto
 */
const generateContactEmail = (data) => {
    return generateEmailLayout(`
    <div style="padding: 10px 0;">
        <h2 style="color: #545c34; font-size: 22px; margin-bottom: 20px; font-weight: 700; font-family: 'Poppins', Arial, sans-serif;">Nuevo Mensaje de Contacto</h2>
        
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc; border-radius:12px; margin-bottom:25px; border: 1px solid #e2e8f0;">
            <tr>
                <td style="padding: 20px;">
                    <p style="margin: 0 0 10px 0; font-size: 14px; color: #718096; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Información del Cliente</p>
                    <div style="font-size: 16px; color: #2d3748; line-height: 1.8;">
                        <strong>Nombre:</strong> ${data.nombre} ${data.apellido || ''}<br>
                        <strong>Email:</strong> <a href="mailto:${data.email}" style="color: #545c34; text-decoration: none; font-weight: 500;">${data.email}</a><br>
                        <strong>Teléfono:</strong> ${data.telefono || '<span style="color:#a0aec0; font-style:italic;">No proporcionado</span>'}
                    </div>
                </td>
            </tr>
        </table>
        
        <div style="margin-top: 25px;">
            <p style="margin: 0 0 12px 0; font-size: 14px; color: #718096; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje Recibido</p>
            <div style="background-color: #ffffff; padding: 20px; border: 2px solid #545c34; border-radius: 12px; line-height: 1.7; color: #2d3748; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                ${data.mensaje}
            </div>
        </div>
    </div>
    `);
};

/**
 * Envía el correo usando las credenciales de .env
 */
const sendEmail = async ({ emailDestination, subject, htmlContent }) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT) || 465,
            secure: process.env.SMTP_PORT == 465,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.EMAIL_USER,
            to: emailDestination,
            subject: subject,
            html: htmlContent,
            attachments: [
                {
                    filename: 'logo.png',
                    path: path.resolve(__dirname, '../img/header/LOGOO.png'),
                    cid: 'logo_pya',
                    contentDisposition: 'inline'
                }
            ]
        };

        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error("❌ Error detallado de Nodemailer:", {
            code: error.code,
            command: error.command,
            response: error.response,
            stack: error.stack
        });
        throw error;
    }
};

module.exports = {
    sendEmail,
    generateContactEmail
};
