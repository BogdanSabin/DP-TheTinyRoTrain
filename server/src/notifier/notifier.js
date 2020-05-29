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


var templateUrl = "http://" + hostname + ':' + port + "/api/authentication/confirmation/"


module.exports.sendConfirmationEmail = function (token, emailToSend, next) {
    let url = templateUrl + token;
    
    let mailOptions = {
        from: config.local.gmail.email,
        to: emailToSend,
        subject: 'Account confirmation - TinyRoTRain',
        text: "Congratulations! Your account has been created.\n Please click the following link to confirm your email: " + `${url}`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            return next(serverError.InteralError(error));

        console.log('Email sent: ' + info.response);
        return next(null, info.response);
    });
}

module.exports.sendTicketEmail = function(data, emailToSend, next){
    let text = "Dear, " + data.customerName + " \n Here are the details of your trip to " + data.destination + " \n train: " + data.train + " \n wagon: " + data.wagon + " \n seats: " + data.seats + "departure time:" + data.depatureTime + " arrival time: " + data.arrivalTime + " price: " + data.price + " RON";
    
    let mailOptions = {
        from: config.local.gmail.email,
        to: emailToSend,
        subject: "Booking confirmation for trip to " + data.destination,
        text: text
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error)
            return next(serverError.InteralError(error));

        console.log('Email sent: ' + info.response);
        return next(null, info.response);
    });
    
}

