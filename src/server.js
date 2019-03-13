var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');
var path = require('path');
var profile;
const feed = [
  {
    name: 'MusicAcademy',
    publishTime: 1552260754000,
    description: "Do you think that people going through a divorce should be allowed to be on a worship team?",
    comments: [{
      name: 'Dave Dringenburg',
      publishTime: 1552265432300,
      description: "This is the most absurd question I have ever read",
    }, {
      name: 'Dave Dringenburg',
      publishTime: 1552260754023,
      description: "I don't want to lay into the people saying no",
      comments: [{
        name: 'MusicAcademy',
        publishTime: 1552316503256,
        description: "It's interesting to see that comments have been deleted",
      }]
    }
    ]
  }, {
    name: 'MusicAcademy',
    publishTime: 1552260754234,
    description: "Do you think that people going through a divorce should be allowed to be on a worship team?",
    comments: [{
      name: 'Dave Dringenburg',
      publishTime: 1526075400012,
      description: "This is the most absurd question I have ever read",
    }, {
      name: 'Dave Dringenburg',
      publishTime: 1552260751012,
      description: "I don't want to lay into the people saying no",
      comments: [{
        name: 'MusicAcademy',
        publishTime: 1552316503256,
        description: "It's interesting to see that comments have been deleted",
      }]
    }
    ]
  }
  ]
app.listen(3000);

function handler (request, response) {
  console.log('request ', request.url);

  var filePath = '.' + request.url;
  if (filePath == './') {
      filePath = './index.html';
  }

  var extname = String(path.extname(filePath)).toLowerCase();
  var mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.png': 'image/png',
      '.jpg': 'image/jpg',
      '.gif': 'image/gif',
      '.wav': 'audio/wav',
      '.mp4': 'video/mp4',
      '.woff': 'application/font-woff',
      '.ttf': 'application/font-ttf',
      '.eot': 'application/vnd.ms-fontobject',
      '.otf': 'application/font-otf',
      '.svg': 'application/image/svg+xml'
  };

  var contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, function(error, content) {
      if (error) {
          if(error.code == 'ENOENT') {
              fs.readFile('./404.html', function(error, content) {
                  response.writeHead(200, { 'Content-Type': contentType });
                  response.end(content, 'utf-8');
              });
          }
          else {
              response.writeHead(500);
              response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
              response.end();
          }
      }
      else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
      }
  });
}

io.on('connection', function (socket) {
  console.log('created new connection');
  // clear profile of another client.
  if(profile) {
      profile = null;
  }
  socket.on('subscribeToFeed', function() {
    console.log("client subscribed to feed");
    // as of now feed is hardcoded we can have async function to fetch from db.
    socket.emit('feed', feed);
  });
  socket.on('publishPost', function (post) {
    console.log("client subscribed to publishPost");
    feed.push({name: profile.name, publishTime: +new Date(), description: post.description})
    // send the updated feed.
    socket.emit('feed', feed);
  });
  socket.on('signUp', function (userProfile) {
    console.log("client subscribed to signUp");
    profile = userProfile;
  });
});