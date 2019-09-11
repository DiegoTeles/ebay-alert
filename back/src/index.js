require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cronAlert = require("./app/services/cron");
const getEbayToken = require("./app/services/ebayAccessToken");
const redis = require("redis");

const app = express();
getEbayToken();
app.use(bodyParser.json()).all("*", cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
require("./app/controllers/index")(app);

const redisClient = redis.createClient({
	host: process.env.REDIS_HOST,
	port: process.env.REDIS_PORT,
});

if (process.env.APP_ENVIROMENT !== "production") {
	redisClient.on("connect", () => {
		console.log(`Redis Connect Success`);
	});
	redisClient.on("error", err => {
		console.log(`Err ${err}`);
	});
}

cronAlert();

app.listen(process.env.APP_PORT);
