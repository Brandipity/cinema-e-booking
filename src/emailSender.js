const nodemailer = require('nodemailer');

// Function to send a confirmation email
async function sendConfirmationEmail(email) {
    // Create a transporter object using nodemailer
    let transporter = nodemailer.createTransport({
        // Configure your email service provider settings here
        service: 'gmail',
        auth: {
            user: 'movietheater1225@gmail.com',
            pass: 'SEproject'
        }
    });

    // Email content
    let mailOptions = {
        from: 'movietheater1225@gmail.com',
        to: email,
        subject: 'Account Registration Confirmation',
        text: 'Thank you for registering an account with us. Your account has been successfully created!'
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}

module.exports = sendConfirmationEmail;
