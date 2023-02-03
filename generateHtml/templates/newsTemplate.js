const handlebars = require("handlebars");

// eslint-disable-next-line quotes
const html = `
  <div>
    <h1>{{title}}</h1>
    <br />
    <a href="{{url}}" target="_blank" rel="noopener noreferrer"> >>> Link para a notícia</a>
    <br /><br />
  </div>
`;

function newsTemplate(context) {
	return handlebars.compile(html)(context);
}

module.exports = newsTemplate;
