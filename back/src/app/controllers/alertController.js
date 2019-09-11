const express = require("express");

const router = express.Router();
const Alert = require("../models/alert");

router.get("/", async (req, res) => {
	try {
		let alerts = await Alert.find({});
		return res.status(200).json({ alerts });
	} catch (error) {
		return res.status(400).send({ error: `Error: ${error}` });
	}
});

router.get("/:id", (req, res) => {
	try {
		const { id } = req.params;
		let alert = Alert.findById(id);
		return res.json({ alert });
	} catch (error) {
		return res.status(400).send({ error: `Error: ${error}` });
	}
});

router.post("/", async (req, res) => {
	try {
		const { email, term, frequency } = req.body;
		const selectedMinutes = [2, 5, 30];

		let alert = await Alert.findOne({ email, term }).exec();

		if (alert) {
			return res.status(422).json({ errors: "Term has been registered for this user" });
		}

		if (selectedMinutes.indexOf(frequency) > -1) {
			return res
				.status(422)
				.json({ errors: `Frequency can only be ${selectedMinutes.join(", ")}` });
		}

		const alertSave = await Alert.create(req.body);
		return res.status(201).json({ alertSave });
	} catch (error) {
		return res.status(400).send({ error: `Error: ${error}` });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { email, frequency, term } = req.body;

		let alert = await Alert.findById(id).exec();

		if (!alert) {
			res.status(400).json({ error: "Alert error" });
		}

		alert.email = email || alert.email;
		alert.frequency = frequency || alert.frequency;
		alert.term = term || alert.term;

		try {
			alert = await alert.save();
			return res.status(200).json({ alert });
		} catch (error) {
			return res.status(400).json({ error });
		}
	} catch (error) {
		return res.status(400).send({ error: `Error: ${error}` });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await Alert.deleteOne({ _id: id});
		res.json({
			_id: id,
			message: "Alert has been deleted",
		});
	} catch (error) {
		return res.status(400).send({ error: `Error: ${error}` });
	}
});

module.exports = app => app.use("/alert", router);
