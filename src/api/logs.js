// a router that has multiple routes for interacting with our log entry store

const { Router } = require('express');

const LogEntry = require('../../src/models/LogEntry');

const router = Router();

router.get('/', async (req, res) => {
    const getAllInformationFromDatabase = await LogEntry.find();
    res.send(getAllInformationFromDatabase)

})

  router.post('/', async (req, res, next) => {
      try {
          //create schema with the data sent from the frontend
          const logEntryUsingOurSchema = new LogEntry(req.body);
          const savedInDatabase = await logEntryUsingOurSchema.save();
          res.json(savedInDatabase)
      }
      catch(error) {
          if(error.name === 'ValidationError') {
              console.log(error.name)
              res.status(402)
          }
          next(error)

      }
  })

module.exports = router;