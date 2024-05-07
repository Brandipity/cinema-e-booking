import emailjs from 'emailjs-com';

async function sendPromotionEmail(promoCode) {
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

export default sendPromotionEmail;
