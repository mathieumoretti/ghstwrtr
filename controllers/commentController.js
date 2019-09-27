const express = require('express');
var router = express.Router();

const Comment = require('../models/comment')

router.get('/', (req, res) => {
    const comment = Comment();
    comment.nouns.push("mountain");
    comment.nouns.push("beer");
    comment.nouns.push("dog");

    comment.adjectives.push("brilliant");
    comment.verbs.push("think");
    comment.adverbs.push("extremely");
    comment.slang.push("Dang");

  res.render('comment', { model: comment });
});

module.exports = router;