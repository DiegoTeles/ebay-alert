const axios = require("axios");
const MailService = require("./mail.service");
const Alert = require("../models/alert");

class CronService {
	constructor() {
		this.mailService = new MailService();
	}
	async sendAlertEmail({ frequency }) {
		const alerts = await Alert.find({ frequency }).exec();
		alerts.forEach(async alert => {
			let layout = "<ul>";
			const product = await this.findProducts(alert.term);

			layout += `<li>${product.itemId} - ${product.title} - <a href="${product.itemWebUrl}">view product</a> </li>`;
			layout += "</ul>";

			this.mailService.send({
				to: alert.email,
				subject: `Hey, here is your ebay alert for the keyword ${alert.term}`,
				layout,
			});
		});
	}

	async findProducts(term) {
		const ebayEndpoint = `${process.env.EBAY_ENDPOINT}/item_summary/search?q=${term}&limit=3`;
		const ebaySearch = await axios.get(ebayEndpoint);
		return ebaySearch.data.itemSummaries[0] || [];
	}
}

module.exports = CronService;
