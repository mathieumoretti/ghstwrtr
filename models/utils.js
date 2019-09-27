const fs = require('fs');

function random() {
    const d = new Date();
    const n = d.getTime();
    return Math.random() * n;
}

module.exports = {

    generateContent: function () {
        const fileContent = fs.readFileSync('data.txt', 'utf8');
        return fileContent.split('.');
    },

    random: random,
    
    randomCell: function (arr) {
        return arr[Math.floor(random() * arr.length) % arr.length];
    },
}