var express = require("express");
var router = express.Router();
const { Student } = require("../database/models");

router.get("/", async (req, res, next) => {
    // try to get student object from database
    try {
      // students will be the result of the Student.findAll promise
      const students = await Student.findAll();
      // if student is valid, it will be sent as a json response
      console.log(students);
      res.status(200).json(students);
    } catch (err) {
      // if there is an error, it'll passed via the next parameter to the error handler middleware
      next(err);
    }
  });

  module.exports = router;