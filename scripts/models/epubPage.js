var _ = require("underscore");
var Page = require('./page');

function EpubPage(number, content) {
	Page.call(number);
	this.content = content;
}
EpubPage.prototype = Object.create(Page.prototype);

module.exports = EpubPage;