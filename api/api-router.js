const express = require("express");

const Shouts = require("../shouts/shouts-model.js");

const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  // This "message of the day" variable was created to demonstrate creating
  // environment variables in the Heroku platform. You can define environment
  // variables that Heroku will create in the OS environment it makes for your
  // app by clicking on the "Settings" tab for your app in Heroku.
  const messageOfTheDay = process.env.MOTD || 'Welcome to my API server!';

  res.status(200).json({ messageOfTheDay, api: "up" });
});

router.get("/shouts", (req, res, next) => {
  Shouts.find()
    .then(shouts => {
      res.status(200).json(shouts);
    })
    .catch(error => next(error));
});

router.post("/shouts", (req, res, next) => {
  Shouts.add(req.body)
    .then(shout => {
      res.status(201).json(shout);
    })
    .catch(error => next(error));
});

router.delete("/shouts/:id", (req, res) => {
  Shouts.remove(req.params.id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(error => next(error));
});

router.use(errorHandler);

function errorHandler(error, req, res, next) {
  // Do something with error before responding
  // like saving it to a database, sending a mail to the admin
  // or using an external logging service
  res.status(500).json(error.message);
}

module.exports = router;
