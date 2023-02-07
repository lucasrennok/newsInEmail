const newsTemplate = require("./templates/newsTemplate");

const generateHtml = (articles, limit = 9999) => {
	const emailData = [];

	for (let i = 0; i < articles.length; i++) {
		if (i >= limit) {
			break;
		}
		emailData.push(newsTemplate(articles[i]));
	}

	return emailData.join("");
};

module.exports = generateHtml;
