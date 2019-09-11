const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mailer = require("../../modules/mailer");

const authConfig = require("../../config/auth");

const router = express.Router();

function generateToken(params = {}) {
	return jwt.sign(params, authConfig.secret, {
		expiresIn: 86400,
	});
}
router.post("/register", async (req, res) => {
	const { email } = req.body;
	try {
		if (await User.findOne({ email })) return res.status(400).send({ error: "User already exist" });

		const user = await User.create(req.body);

		user.password = undefined;

		// return res.send({ user, token: generateToken({ id: user.id }) });
		return res.send({ user });
	} catch (error) {
		return res.status(400).send({ error: "Registration failed" });
	}
});

router.post("/autenticate", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select("+password");

	if (!user) return res.status(400).send({ error: "User not found" });

	if (!(await bcrypt.compare(password, user.password)))
		return res.status(400).send({ error: "Invalid password" });

	user.password = undefined;

	// res.send({ user, token: generateToken({ id: user.id }) });
	res.send({ user });
});

router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) return res.status(400).send({ error: "User not found" });

		const token = crypto.randomBytes(20).toString("hex");
		const now = new Date();
		now.setHours(now.getHours() + 1);

		const params = {
			'$set': {
				passwordResetToken: token,
				passwordResetExpires: now,
			}
		}
		await User.findOneAndUpdate(user.id, params);

		return res.status(200).send(`token ${token}`);

		const options = {
			to: email,
			from: "telles@unicorn.com",
			template: "auth/forgot-password",
			context: { token },
		};
		mailer.sendMail(options, err => {
			console.log("err :", err);
			if (err) 
			return res.status(400).send({ error: "Cannot send forgot password email" });

			return res.send();
		});
	} catch (err) {
		return res.status(400).send({ message: "Erro on forgot password, try again", error: error });
	}
});

router.post("/reset-password", async (req, res) => {
	const { email, token, password } = req.body;
	try {
        const user = await User.findOne({ email })
        // .select("+passwordResetToken passwordResetExpire");
		// if (token !== user.passwordResetToken) return res.status(400).send({ error: "Token invalid", user });

		// const now = new Date();

		// if (now > user.passwordResetExpires)
		// 	return res.status(400).send({ error: "Token expired, generate a new one" });

		user.password = password;

		await user.save();

		res.status(200).send(`Password updated`);
	} catch (error) {
		res.status(400).send({ message: "Cannot reset password, try again", error: error});
	}
});

module.exports = app => app.use("/auth", router);
