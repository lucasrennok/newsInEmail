const handlebars = require("handlebars");

// eslint-disable-next-line quotes
const html = `
  <div class="newsComponent">
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
  </div>
`;

function newsTemplate(context) {
	return handlebars.compile(html)(context);
}

module.exports = newsTemplate;
