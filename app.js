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
  
app.locals.collections = {
  'fr': {
    'left': [],
    'right': []
  },
  'docker': {
    'left': [],
    'right': []
  }
};
loadFile("data/fr/left.txt", app.locals.collections.fr.left);
loadFile("data/fr/right.txt", app.locals.collections.fr.right);
loadFile("data/docker/left.txt", app.locals.collections.docker.left);
loadFile("data/docker/right.txt", app.locals.collections.docker.right);

app.get('/', function(req, res) {
    res.send(`
      <h1>Names generator</h1>
      <p>Generate easy-to-remember pseudo ids, like Docker does for container names.</p>
      <a href="https://github.com/thomasleveil/name-generator">Source code</a>
      <hr>
      <ul>
        <li>
          <a href="fr">/fr</a> : french random names
        </li>
        <li>
          <a href="docker">/docker</a> : Docker random names
        </li>
      </ul>`);
});

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  var host = process.env.HOST || "127.0.0.1";
  app.listen(port, host);
});
