'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var fs = require('fs');
module.exports = app; // for testing


var loadFile = function (file, results) {
  const reSpace = /\s/;
  var lowerCasedSet = new Set([]);
  var lineNumber = 0;

  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(file, {encoding: 'utf8'})
  });

  rl.on('line', function (line) {
    lineNumber += 1;

    var trimmedLine = line.trim();
    var match;
    if (trimmedLine.length == 0) {
      console.log(`[${file}] ignoring line ${lineNumber} (empty line)`);
    }
    else if ((match = reSpace.exec(trimmedLine)) !== null) {
      console.log(`[${file}] ignoring line ${lineNumber} (contains blank character): ${trimmedLine}`);
    } else if (lowerCasedSet.has(trimmedLine.toLowerCase())) {
      console.log(`[${file}] ignoring line ${lineNumber} (duplicate "${trimmedLine}")`);
    } else {
      lowerCasedSet.add(trimmedLine.toLowerCase());
      results.push(trimmedLine);
    }
  });


  // readline emits a close event when the file is read.
  rl.on('close', function(){
    console.log(`${file} loaded. ${results.length} lines loaded over a total of ${lineNumber}`);
  });
}
  
app.locals.left = [];
app.locals.right = [];
loadFile("data/fr/left.txt", app.locals.left);
loadFile("data/fr/right.txt", app.locals.right);


var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);
});
