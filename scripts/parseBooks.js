"use strict";

var nlp = require('compromise')

const book = {
    title: "Lincoln's inaugural address",
    content: `At this second appearing to take the oath
of the presidential office, there is less occasion for an extended
address than there was at the first.  Then a statement, somewhat
in detail, of a course to be pursued, seemed fitting and proper.
Now, at the expiration of four years, during which public declarations
have been constantly called forth on every point and phase of the great
contest which still absorbs the attention and engrosses the energies
of the nation, little that is new could be presented.  The progress
of our arms, upon which all else chiefly depends, is as well known
to the public as to myself; and it is, I trust, reasonably satisfactory
and encouraging to all.  With high hope for the future, no prediction
in regard to it is ventured.

On the occasion corresponding to this four years ago, all thoughts
were anxiously directed to an impending civil war.  All dreaded it--
all sought to avert it.  While the inaugural address was being delivered
from this place, devoted altogether to saving the Union without war,
insurgent agents were in the city seeking to destroy it without war--
seeking to dissolve the Union, and divide effects, by negotiation.
Both parties deprecated war; but one of them would make war rather
than let the nation survive; and the other would accept war rather
than let it perish.  And the war came.

One-eighth of the whole population were colored slaves, not distributed
generally over the Union, but localized in the Southern part of it.
These slaves constituted a peculiar and powerful interest.  All knew
that this interest was, somehow, the cause of the war.  To strengthen,
perpetuate, and extend this interest was the object for which the
insurgents would rend the Union, even by war; while the government claimed
no right to do more than to restrict the territorial enlargement of it.

Neither party expected for the war the magnitude or the duration
which it has already attained.  Neither anticipated that the cause
of the conflict might cease with, or even before, the conflict itself
should cease.  Each looked for an easier triumph, and a result less
fundamental and astounding.  Both read the same Bible, and pray
to the same God; and each invokes his aid against the other.
It may seem strange that any men should dare to ask a just God's
assistance in wringing their bread from the sweat of other men's faces;
but let us judge not, that we be not judged.  The prayers of both
could not be answered--that of neither has been answered fully.

The Almighty has his own purposes.  "Woe unto the world because
of offenses! for it must needs be that offenses come; but woe
to that man by whom the offense cometh."  If we shall suppose
that American slavery is one of those offenses which, in the
providence of God, must needs come, but which, having continued
through his appointed time, he now wills to remove, and that he
gives to both North and South this terrible war, as the woe due
to those by whom the offense came, shall we discern therein any
departure from those divine attributes which the believers in a
living God always ascribe to him?  Fondly do we hope--fervently
do we pray--that this mighty scourge of war may speedily pass away.
Yet, if God wills that it continue until all the wealth piled by
the bondsman's two hundred and fifty years of unrequited toil
shall be sunk, and until every drop of blood drawn by the lash
shall be paid by another drawn with the sword, as was said
three thousand years ago, so still it must be said, "The
judgments of the Lord are true and righteous altogether."

With malice toward none; with charity for all; with firmness in
the right, as God gives us to see the right, let us strive on
to finish the work we are in; to bind up the nation's wounds;
to care for him who shall have borne the battle, and for his widow,
and his orphan--to do all which may achieve and cherish a just
and lasting peace among ourselves, and with all nations.`
  };
  

Object.freeze(book);
var orchestrator = 
({
    sentences : [],
    book : book,
});

var newBook = orchestrator.book.content.replace(/(\r\n|\n|\r)/gm," ");

var doc = nlp(newBook);
orchestrator.sentences = doc.sentences().data();

var pg = require("pg");
 
const config = {
  user: 'postgres',
  database: 'ghstwrtr',
  port: 5432
};



var executeQuery = function(done, client, queryString, values)
{
    client.query(queryString, values, function(err,result) {
        done(); // closing the connection;
        if(err){
            console.log(err);
        }
    });
}

var queryHandler = function(err, client, done) {
    if(err){
        console.log("not able to get connection "+ err);
    } 

    var i = 1;
    orchestrator.sentences.forEach(sentence => executeQuery(done, client, "INSERT INTO sentence (id, content) VALUES ($1, $2) ", [i++, sentence.text] )    );
}


var createQuery = function(done, client, queryString, values) {}

var pool = new pg.Pool(config);
pool.connect(queryHandler);


// pool.connect(function(err, client, done) {
//     if(err){
//         console.log("not able to get connection "+ err);
//     } 

//     var i = 1;
//     orchestrator.sentences.forEach(sentence => {
//         client.query("INSERT INTO sentence (id, content) VALUES ($1, $2) ", [i++, sentence.text] , function(err,result) {
//             done(); // closing the connection;
//             if(err){
//                 console.log(err);
//             }
//         });
//     });    
// });

// Idea for intro's of text 
// Mini-game 
// Randomize 10 sentences, ask user to choose 3.

