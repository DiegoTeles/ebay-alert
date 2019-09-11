const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass} = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user,   pass  }
});

const handlebarOptions = {
    viewEngine: 'handlebars',
    viewPath: path.resolve("./src/resource/mail/"),
    extName: ".html"
}

transport.use("compile", hbs(handlebarOptions));

module.exports = transport;