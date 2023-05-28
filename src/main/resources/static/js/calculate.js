//Grade Boundary Input Array
var BoundInput = [];
var grades = [65.95, 56.98, 78.62, 96.1, 90.3, 72.24, 92.34, 60.00, 81.43, 86.22, 88.33, 9.03,
  49.93, 52.34, 53.11, 50.10, 88.88, 55.32, 55.69, 61.68, 70.44, 70.54, 90.0, 71.11, 80.01];


//function to start grade array
function initializeGrades() {
  var boundlength = document.getElementsByClassName('BoundI')[0].length;
  for (var i = 0; i < boundlength; i++) {
    BoundInput.push(Number(document.getElementsByClassName('BoundI')[0][i].value));
    document.getElementsByClassName('BoundI')[0][i].addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        var newValue = this.value;
        var BoundPos = this.getAttribute("data-index");
        updateArray(Number(newValue), Number(BoundPos));
      }
    })
  }
}

function updateArray(value, index) {
  if (value < 0 || value > 100 || value.length == 0) {
    alert("Please enter a value from 0 to 100");
  } else if (index == 0 && value <= BoundInput[index + 1]) {
    alert("Entered value is less than or equal to the grade lower");
  } else if (index == 11 && value >= BoundInput[index - 1]) {
    alert("Entered value is higher than or equal to the grade higher");
  } else if (value <= BoundInput[index + 1] || value >= BoundInput[index - 1]) {
    alert("Entered value doesn't follow grading constraints");
  } else {
    BoundInput[index] = value;
    histogram();
  }
}

//function that adds grade value to grade list
function addGrade() {
  var tempgrade = document.getElementsByClassName('GI')[0].value;
  if (tempgrade < 0 || tempgrade > 100) {
    alert("Please enter a new grade value between 0 and 100");
  } else {
    grades.push(tempgrade);
    histogram();
  }
}

//histogram generator
function histogram() {
  if (grades.length != 0) {
    var output = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (var i = 0; i < grades.length; i++) {
      var trigger = false;
      if (grades[i] == 100) {
        output[0] += 1;
        trigger = true;
      } else {
        for (var j = 0; j < BoundInput.length - 1; j++) {
          if (parseFloat(grades[i]) < parseFloat(BoundInput[j]) && parseFloat(grades[i]) >= parseFloat(BoundInput[j + 1])) {
            output[j] += 1;
            trigger = true;
          }
        }
      }


      if (!trigger) {
        console.log("The user data for", grades[i], "has been omitted");
      }
    }

    //display histogram
    for (var i = 0; i < 11; i++) {
      var text = "";
      for (var j = 0; j < output[i]; j++) {
        text += "0";
      }
      document.getElementsByClassName('BarLabel')[i].innerHTML = text;
    }

  } else {
    console.log("no grades exist for graphing");
  }
}

//function to start other functions/processes on startup
function init() {
  initializeGrades();
  var gradeInput = document.getElementsByClassName('GI')[0];
  // Execute a function when the user presses a key on the keyboard
  gradeInput?.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addGrade();
    }
  });
  histogram();
}

window.addEventListener("DOMContentLoaded", init);

