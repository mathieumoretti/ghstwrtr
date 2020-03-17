var utils = require("../utils");

function Sentence(rank, content)
{
    this.rank = rank;
    this.content = content;
    this.clone = utils.clone;
}

module.exports = Sentence;