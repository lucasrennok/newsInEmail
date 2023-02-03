const newsTemplate = require("./templates/newsTemplate");

const generateHtml = (articles) => {
	const emailData = [];

	for (let i = 0; i < articles.length; i++) {
		emailData.push(newsTemplate(articles[i]));
	}

	return emailData;
};

module.exports = generateHtml;
