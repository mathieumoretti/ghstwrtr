var _ = require("underscore");
var Page = require('./page');

function EpubPage(number, lines) {
	Page.call(this, number);
	this.lines = lines;
}
EpubPage.prototype = Object.create(Page.prototype);

module.exports = EpubPage;