import emailjs from 'emailjs-com';

async function ForgotPasswordEmailSender(email, resetLink) {
    const templateParams = {
        to_email: email,
        reset_link: resetLink,
    };

    try {
        await emailjs.send('service_pfnvmol', 'template_uyzt4iv', templateParams, '0yAX7vO20pm2Hs_Ye');
        console.log('Forgot password email sent successfully');
    } catch (error) {
        console.error('Error sending forgot password email:', error);
    }
}

export default ForgotPasswordEmailSender;
