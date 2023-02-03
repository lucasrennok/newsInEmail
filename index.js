const generateHtml = require("./generateHtml/generateHtml");
const nodemailer = require("nodemailer");

const axios = require("axios");
require("dotenv").config();

const today = new Date().toISOString().split("T")[0];

const baseUrl = `https://newsapi.org/v2/top-headlines?country=br&from=${today}&apiKey=`;
const apiKey = process.env.API_KEY;

const sendMail = (htmlEmail) => {
	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com", // We also used gmail smtp
		port: 587,
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
			console.log(error);
		} else {
			console.log("Email sent | response: " + info.response);
		}
	});
};

axios.get(baseUrl + apiKey).then((response) => {
	if (response.data.articles) {
		const email = generateHtml(response.data.articles);
		const htmlEmailData = email.join("");

		sendMail(htmlEmailData);
	}
});
