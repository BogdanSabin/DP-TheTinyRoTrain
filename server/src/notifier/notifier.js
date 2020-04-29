const nodemailer = require('nodemailer');
const config = require('./../../config/config');
const serverError = require('./../lib/error');

const hostname = config.local.server.main_server.hostname;
const port = config.local.server.main_server.port;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.local.gmail.email,
        pass: config.local.gmail.password
    }
});


var url = "http://" + hostname + ':' + port + "/api/authentication/confirmation"

var mailOptions = {
    from: config.local.gmail.email,
    to: '',
    subject: 'Account confirmation - TinyRoTRain',
    text: "Congratulations! Your account has been created.\n Pleas click the following link to confirm your email: "
};

module.exports.sendConfirmationEmail = function (token, next) {
    url = url + token;
    mailOptions.text = mailOptions.text + url
    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            return next(serverError.InteralError(error));

        console.log('Email sent: ' + info.response);
        return next(null, info.response);
    });
}

