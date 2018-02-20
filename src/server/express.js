var mongoose = require('mongoose');
var TooLateComers = require('./toolatecomermodel');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const express = require('express');
const server = express();
const bodyParser = require('body-parser');

server.use(bodyParser());
server.use(cookieParser());
server.use(session({
  secret: 'mySecretKey',
  resave: true,
  saveUnitialized: true
}));
mongoose.connect('mongodb://localhost/latecomer');

const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const webpack = require('webpack');
  const config = require('../../config/webpack.dev.js');
  const compiler = webpack(config);
  const webpackDevMiddleware = require('webpack-dev-middleware')(
    compiler,
    config.devServer
  );

  server.use(webpackDevMiddleware);

  const webpackHotMiddleware = require('webpack-hot-middleware')(compiler);
  server.use(webpackHotMiddleware);

}
const staticMiddleware = express.static('dist');
server.use(staticMiddleware);

server.post('/toolatecomers', auth, function(req, res) {
  console.log(req.body);

  if(!req.body.name || !req.body.date || !req.body.time) {
    return res.send({err: 'name, date and time required'});
  }

  var newTooLateComer = new TooLateComers(req.body);
  newTooLateComer.save(function(err, t) {
    if(err) {
      return res.send({err: err});
    }
    
    console.log('new laty has been saved successfully');
    return res.send({ newTooLateComer: t })
  });
});

// load student info via id 
server.get('/toolatecomers', auth, function(req, res) {
  // read statement
  TooLateComers.find({}, function(err, latys) {
    
    if(!latys)
      return res.send({err: 'latys not found'});  

    console.log(latys);
    return res.send(latys);
  });
});

// delete a student
server.delete('/toolatecomers/:id', auth, function(req, res) {
  TooLateComers.findById(req.params.id, function(err, laty) {
    if(!laty)
      return res.send({err: 'laty not found'});

    laty.remove(function(err) {
      if(err) {
        return res.send(err);
      }

      console.log('laty deleted');
      return res.send(laty);
    });
  });
});

server.post('/login', function(req, res) {
  if(!req.body.username || !req.body.password) {
      res.send({err: 'username and password required'});
  }
  else if(req.body.username === 'jan' && req.body.password === 'foobar') {
    req.session.user = 'jan';
    req.session.admin = true;
    res.send({err: 0});
  }
});

server.post('/logout', function(req, res) {
   req.session.destroy();
   res.send({err: 0});
});

function auth(req, res, next) {
  if(req.session && req.session.user === 'jan' && req.session.admin) {
      return next();
  }
  else {
      return res.sendStatus(401);
  }
}

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('server is listening on port ' + port);
});