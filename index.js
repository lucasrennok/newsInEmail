const axios = require("axios");

const baseUrl =
	"https://newsapi.org/v2/top-headlines?sources=google-news-br&apiKey=";
const apiKey = "";

const response = axios.get(baseUrl + apiKey);

console.log(JSON.stringify(response.data));
