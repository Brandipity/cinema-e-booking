import emailjs from 'emailjs-com';

async function sendPasswordResetEmail(email, username, resetToken) {
    const resetUrl = `http://localhost:3001/reset-password/${resetToken}`;

    const templateParams = {
        to_email: email,
        username: username,
        reset_url: resetUrl,
    };

    try {
        await emailjs.send('service_pfnvmol', 'template_reset_password', templateParams, '0yAX7vO20pm2Hs_Ye');
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
    }
}
export default ForgotPasswordEmailSender;
