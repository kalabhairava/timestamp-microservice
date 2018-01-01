const express = require("express");

const app = express();
const PORT = 3000;

app.use((request, response, next) => {
  console.log(request.method, request.url);
  next();
});

app.get("/:time", (request, response) => {
  // request.params contains path params
  // request.query contains query params

  console.log(request.params.time);
  // returns Invalid date when you pass unix time as the params are strings by default, and Date constructor throws error if unix time is a string
  const date = new Date(request.params.time);
  console.log(date);

  if (date.toString() === "Invalid Date") {
    response.status(500);
    response.send({
      unix: null,
      natural: null
    });
  } else {
    response.status(200);
    response.send({
      unix: date.getTime(),
      natural: date.toDateString()
    });
  }

  // passing a value that is not a number (or a string version of number) to Number() returns isNaN
  // Number.isNaN() is stricter than global isNaN()
  // https://stackoverflow.com/questions/33164725/confusion-between-isnan-and-number-isnan-in-javascript
});

app.listen(PORT, error => {
  if (error) {
    console.log("Error connecting to a port", error);
  } else {
    console.log("Server running on port", PORT);
  }
});
