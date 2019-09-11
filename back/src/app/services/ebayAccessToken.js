const Ebay = require("ebay-node-api");
const axios = require("axios");

function getEbayToken() {
	let ebay = new Ebay({
		clientID: process.env.EBAY_APP_KEY,
		clientSecret: process.env.EBAY_CERT_KEY,
		body: {
			grant_type: "client_credentials",
			scope: process.env.EBAY_SCOPE,
		},
	});

	let userToken = ebay.getAccessToken();

	userToken.then(function(data) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${data.access_token}`;
		return data;
	});
}

module.exports = getEbayToken;
