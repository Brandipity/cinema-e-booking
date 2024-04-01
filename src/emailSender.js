import emailjs from 'emailjs-com';

async function sendConfirmationEmail(email, username, confirmationToken) {
    const confirmationUrl = `http://localhost:3000/confirm/${confirmationToken}`;

    const templateParams = {
        to_email: email,
        username: username,
        confirmation_url: confirmationUrl,
    };

    try {
        await emailjs.send('service_pfnvmol', 'template_uyzt4iv', templateParams, '0yAX7vO20pm2Hs_Ye');
        console.log('Confirmation email sent successfully');
    } catch (error) {
        console.error('Error sending confirmation email:', error);
    }
}


export default sendConfirmationEmail;