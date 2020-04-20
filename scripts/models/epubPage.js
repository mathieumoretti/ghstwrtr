var _ = require("underscore");
var Page = require('./page');

function EpubPage(number, lines) {
	Page.call(number);
	this.lines = lines;
}
EpubPage.prototype = Object.create(Page.prototype);

module.exports = EpubPage;