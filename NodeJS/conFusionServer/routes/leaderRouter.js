const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();
const mongoose = require("mongoose");

leaderRouter.use(bodyParser.json());

//Leaders Model
const Leaders = require("../models/leaders");


//Leaders route
leaderRouter.route("/")
.get((req,res,next) => {
    Leaders.find({})
    .then((leaders) =>
    {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
    Leaders.create(req.body)
    .then((leader) =>
    {
      console.log("Leader created ", leader);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    Leaders.remove({})
    .then((resp) =>
    {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//Leader ID route
leaderRouter.route("/:leaderId")
.get((req,res,next) => {
    Leaders.findById(req.params.leaderId)
    .then((leaders) =>
    {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
  Leaders.findByIdAndUpdate(req.params.leaderId, 
  {
    $set: req.body
  }, 
  {
    new: true
  })
  .then((leaders) =>
    {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(leaders);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) => {
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) =>
    {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;

/*  PROMO ROUTER OLD

const express = require("express");
const bodyParser = require("body-parser");
const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

//promotions route
promoRouter.route("/")
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you!');
})
.post((req, res, next) => {
 res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

//promotions id route
promoRouter.route("/:promoId")
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
    res.end('Will send details of the promotion: ' + req.params.promoId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.put((req, res, next) => {
  res.write('Updating the promotion: ' + req.params.promoId + '\n');
  res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});



module.exports = promoRouter;
*/


/* LEADER ROUTER CODE OLD

const express = require("express");
const bodyParser = require("body-parser");
const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

//leaders route
leaderRouter.route("/")
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
    res.end('Will show all the leaders!');
})
.post((req, res, next) => {
 res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.put((req, res, next) => {
  res.statusCode = 403;
  res.end('PUT operation not supported on /leaders');
})
.delete((req, res, next) => {
    res.end('Deleting all leaders');
});

//leaders id route
leaderRouter.route("/:leaderId")
.all((req,res,next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
})
.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.put((req, res, next) => {
  res.write('Updating the leader: ' + req.params.leaderId + '\n');
  res.end('Will update the leader: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.delete((req, res, next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});



module.exports = leaderRouter;

*/