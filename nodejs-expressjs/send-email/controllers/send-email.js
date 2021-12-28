const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')


//send to ethereal.email
const sendEmailEthereal = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount()

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'zhoyfs2w4vaw3hjj@ethereal.email',
            pass: 'pAKgNpJcSetYVjFXGf'
        }
    })

    let info = await transporter.sendMail({
        from: '"Minh Hoang" <foo@example.com>', // sender address
        to: "bar@example.com, baz@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
    });

    res.json({ info })
}
const sendEmail = async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: 'minhhoang7412@gmail.com', // Change to your recipient
        from: 'hoangle1413@gmail.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    try {
        const result = await sgMail.send(msg)
        res.json({ result })
    } catch (error) {
        console.log(error);
    }
}
module.exports = sendEmail