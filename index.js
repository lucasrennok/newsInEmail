const generateHtml = require("./generateHtml/generateHtml");

const axios = require("axios");
require("dotenv").config();

const today = new Date().toISOString().split("T")[0];

const baseUrl = `https://newsapi.org/v2/top-headlines?country=br&from=${today}&apiKey=`;
const apiKey = process.env.API_KEY;

axios.get(baseUrl + apiKey).then((response) => {
	if (response.data.articles) {
		const email = generateHtml(response.data.articles);
		console.log(email.join(""));
	}
});
