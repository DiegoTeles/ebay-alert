const cron = require("node-cron");
const CronService = require("./cron.service");

 module.exports = function cronAlert() {
	cron.schedule("*/2 * * * *", () => {
		const now = new Date();
		console.log(`Alert 2m started: ${now.toString()}`);

		const cronService = new CronService();
		cronService.sendAlertEmail({ frequency: 2 });
	});

	cron.schedule("*/5 * * * *", () => {
		const now = new Date();
		console.log(`Alert 5m started: ${now.toString()}`);

		const cronService = new CronService();
		cronService.sendAlertEmail({ frequency: 5 });
	});

	cron.schedule("*/30 * * * *", () => {
		const now = new Date();
		console.log(`Alert 30m started: ${now.toString()}`);

		const cronService = new CronService();
		cronService.sendAlertEmail({ frequency: 30 });
	});
}
