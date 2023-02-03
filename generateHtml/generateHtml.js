const newsTemplate = require("./templates/newsTemplate");

const generateHtml = (articles) => {
	const emailData = [];

	emailData.push(`
	  <head>
		<meta charset="UTF-8" />
		<style>
			@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
			.page-break {
			page-break-before: always;
			}
			.custom-font {
			font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
			}
		</style>
	  </head>`);

	for (let i = 0; i < articles.length; i++) {
		emailData.push(newsTemplate(articles[i]));
	}

	return emailData;
};

module.exports = generateHtml;
