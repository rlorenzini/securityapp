const nodemailer = require('nodemailer');
const keys = require('./.env.json')

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'ruby.mcglynn48@ethereal.email',
        pass: 'TtaFjpUTeD8SRvzdUC'
    }
});

var mailOptions = {
    from: 'ruby.mcglynn48@ethereal.email',
    to: 'miglas9@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});

app.listen(PORT, () => {
    console.log(`Server running at localhost:${PORT}`);
});
