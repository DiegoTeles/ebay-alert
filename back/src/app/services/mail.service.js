const nodemailer = require("nodemailer");

class MailService {
	constructor() {
		this.transport = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASS,
			},
		});

		this.mailOptions = {
			from: "diego@telles.io",
			subject: "Hey! Here is your alert",
			layout: "<h1>Hey!</h1>",
		};
	}

	send({ to, subject, layout, callback }) {
		if (!to) {
			this.message = "You need to provide an e-mail";
			callback(this.message, null);
		}

		this.mailOptions.subject = subject || this.mailOptions;
		this.mailOptions.to = to;
		this.mailOptions.html = layout;

		this.transport.sendMail(this.mailOptions, callback);
	}
}

module.exports = MailService;
