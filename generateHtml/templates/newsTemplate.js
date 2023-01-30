const handlebars = require("handlebars");

// eslint-disable-next-line quotes
const html = `
<!DOCTYPE html>
<html lang="br">
  <head>
    <meta charset="UTF-8" />
  </head>
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");
    .page-break {
      page-break-before: always;
    }
    .custom-font {
      font-family: Roboto, "Helvetica Neue", Arial, sans-serif;
    }
  </style>
  <body>
    <h1>{{title}}</h1>
    <div>
      {{description}}
    </div>
    <br /><br />
    <div>
      {{author}}
    </div>
    <br /><br />
    <div class="custom-font">
      {{url}}
    </div>
    <br /><br />
    <img
      src="{{urlToImage}}"
      alt="News"
    />
  </body>
</html>
`;

function newsTemplate(context) {
	return handlebars.compile(html)(context);
}

module.exports = newsTemplate;
