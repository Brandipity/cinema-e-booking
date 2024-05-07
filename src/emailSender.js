import emailjs from 'emailjs-com';

export async function sendPromotionEmail(promoCode) {
    const promotionContent = `We have added a new promotion! Use promo code ${promoCode} for discounts.`;

    const templateParams = {
        promotion_content: promotionContent,
    };

    try {
        await emailjs.send('service_pfnvmol', 'template_uyzt4iv', templateParams, '0yAX7vO20pm2Hs_Ye');
        console.log('Promotion email sent successfully');
    } catch (error) {
        console.error('Error sending promotion email:', error);
    }
}

export async function sendConfirmationEmail(email, username, confirmationToken) {
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
