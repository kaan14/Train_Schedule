// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyAIqSEpYV6AViIuQE8TnIjcksuV23QU9WU",
    authDomain: "myfirstdatabaseproject-fded7.firebaseapp.com",
    databaseURL: "https://myfirstdatabaseproject-fded7.firebaseio.com",
    projectId: "myfirstdatabaseproject-fded7",
    storageBucket: "",
    messagingSenderId: "177944424989"
};
firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding Employees
$("#add-employee-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#txtbxTrainName").val().trim();
  var destination = $("#txtbxDestination").val().trim();
  var departureTime = $("#txtbxDepartureTime").val().trim();
  var departureTime = $("#txtbxDepartureTime").val().trim();
  var AMPM = $("select").val().trim();
  var seatAva = $("#txtbxNumberSeats").val().trim(); 

  // Creates local "temporary" object for holding employee data
  var newTrain = {
    name: trainName,
    des: destination,
    depart: departureTime,
    timeSc: AMPM,
    seatNumber: seatAva,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.role);
  console.log(newTrain.start);
  console.log(newTrain.rate);

  alert("Employee successfully added");

  // Clears all of the text-boxes
  $("#employee-name-input").val("");
  $("#role-input").val("");
  $("#start-input").val("");
  $("#rate-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var empName = childSnapshot.val().name;
  var empRole = childSnapshot.val().role;
  var empStart = childSnapshot.val().start;
  var empRate = childSnapshot.val().rate;

  // Employee Info
  console.log(empName);
  console.log(empRole);
  console.log(empStart);
  console.log(empRate);

  
 
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(empName),
    $("<td>").text(empRole),
    $("<td>").text(empStartPretty),
    $("<td>").text(empMonths),
    $("<td>").text(empRate),
    $("<td>").text(empBilled)
  );

  // Append the new row to the table
  $("#employee-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
