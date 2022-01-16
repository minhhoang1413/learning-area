const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({ name, email, verificationToken, origin }) => {

    const link = `<a href="${origin}/user/verify-email?token=${verificationToken}&email=${email}">Verify email</a> `
    const message = `<p>please confirm your email by click on the following link: 
    ${link}</p>`
    return sendEmail({
        to: email,
        subject: 'Verify email',
        html: `<h4>Hello ${name}<h4>,${message}`
    })
}

module.exports = sendVerificationEmail