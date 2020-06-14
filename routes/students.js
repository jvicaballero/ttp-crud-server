var express = require("express");
var router = express.Router();
const { Campus , Student } = require("../database/models");

router.get("/", async (req, res, next) => {
    // try to get student object from database
    try {
      // students will be the result of the Student.findAll promise
      const students = await Student.findAll({ include: Campus });
      // if student is valid, it will be sent as a json response
      console.log(students);
      res.status(200).json(students);
    } catch (err) {
      // if there is an error, it'll passed via the next parameter to the error handler middleware
      next(err);
    }
  });

  // Route to serve single student based on its id
// /api/students/:id
// /api/students/456 would respond with a campus with id 456
router.get("/:id", async (req, res, next) => {
  // take the id from params
  const { id } = req.params;
  // query the database for a campus with matching id
  try {
    // if successful:
    const student = await Student.findByPk(id , {include : Campus});
    // send back the campus as a response
    res.status(200).json(student);
  } catch (err) {
    // if error:
    // handle error
    next(err);
  }
});

// Route to handle adding a student
// /api/campuses/
router.post("/", async (req, res, next) => {
  // Take the form data from the request body
  const { firstName, lastName, email, gpa, imageUrl } = req.body;
  // Create a campus object
  const studentObj = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    gpa: gpa,
    imageUrl: imageUrl,
  };
  try {
    // Create a new campus on the database
    const newStudent = await Student.create(studentObj);
    // The database would return a campus
    // send that campus as a json to the client
    res.status(201).send(newStudent);
  } catch (err) {
    next(err);
  }
});

  module.exports = router;