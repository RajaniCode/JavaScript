var fs = require('fs');

var file = fs.createReadStream("readme.md");
var newFile = fs.createWriteStream("readme_copy1.md");
file.pipe(newFile);

// node app3.js

