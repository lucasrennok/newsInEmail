const generateHtml = require("./generateHtml/generateHtml");
const nodemailer = require("nodemailer");
const schedule = require("node-schedule");

const axios = require("axios");
require("dotenv").config();

// Function to send the email
const sendMail = (htmlEmail) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com", // We also used gmail smtp
		port: 587, // TLS
		secure: false,
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASS,
		},
		tls: { rejectUnauthorized: false },
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to: process.env.TO_EMAIL,
		subject: `🆕 Notícias Diárias ${new Date().toLocaleDateString()} | NO-REPLY`,
		html: htmlEmail,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error(error);
		} else {
			console.info("Sent | response: " + info.response);
		}
	});
};

// This job runs at 9:00AM
const job = schedule.scheduleJob({ hour: 9, minute: 0 }, () => {
	let htmlEmailData = "";
	const today = new Date().toISOString().split("T")[0];
	const limitSetToSources = 5;
	const timeoutInSecs = 10;

	const baseUrl = `https://newsapi.org/v2/top-headlines?country=br&from=${today}&apiKey=`;
	const baseUrlUs = `https://newsapi.org/v2/top-headlines?country=us&from=${today}&apiKey=`;
	const newYorkTimesBaseUrl = `https://api.nytimes.com/svc/news/v3/content/nyt/all.json?api-key=`;

	axios.get(newYorkTimesBaseUrl + process.env.API_KEY_NYT).then((response) => {
		if (response.data.results) {
			htmlEmailData += generateHtml(response.data.results, limitSetToSources);
		}
	});

	axios.get(baseUrlUs + process.env.API_KEY).then((response) => {
		if (response.data.articles) {
			htmlEmailData += generateHtml(response.data.articles, limitSetToSources);
		}
	});

	axios.get(baseUrl + process.env.API_KEY).then((response) => {
		if (response.data.articles) {
			htmlEmailData += generateHtml(response.data.articles, limitSetToSources);
		}
	});

	setTimeout(() => {
		sendMail(htmlEmailData);
	}, timeoutInSecs * 1000);
});

job.schedule();
