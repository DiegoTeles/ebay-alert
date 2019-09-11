const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	frequency: {
		type: Number,
		required: true,
	},
	term: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Alert", alertSchema);
