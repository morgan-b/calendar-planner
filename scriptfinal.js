
$(document).ready(function () {
  //set text for calendar meetings if the local storage is not null
  if (localStorage.getItem("Schedule") !== null) {
    
      $(".time-block").each(function () {
        let id = $(this).attr("id");
        let textAreaInfo = JSON.parse(localStorage.getItem("Schedule"));
        let addText = textAreaInfo[id].appointment;
        let text = ($(this).children().children("textarea"));
        text.text(addText);

      });
  }

});

//add variable for the date and time today from moment.js and set to update on interval
var update = function () {
  let today = moment().format("ddd, MMM D YYYY, h:mm:ss a");

  //Add todays date to current day element
  $("#currentDay").text(today);
};
setInterval(update, 1);

function timenow() {
  let timeNow = moment().format('h:mm:ss a');
  addColors(timeNow);
}
setInterval(timenow, 1000);

//Set calendar hours and meeting appointments
let workDayHours = [
  { time: "9 AM", appointment: "" },
  { time: "10 AM", appointment: "" },
  { time: "11 AM", appointment: "" },
  { time: "12 PM", appointment: "" },
  { time: "1 PM", appointment: "" },
  { time: "2 PM", appointment: "" },
  { time: "3 PM", appointment: "" },
  { time: "4 PM", appointment: "" },
  { time: "5 PM", appointment: "" },
  { time: "6 PM", appointment: "" },
];


// add rows and ids and a save button for each hour of the calendar and append to container
workDayHours.forEach(function (workDayHours, hour) {
  let timeEl = workDayHours.time;
  let eachTimeRow =
    '<div class="time-block" id="' +
    hour +
    '"><div class="row no-gutters input-group"> <div class="col-2 hour">' +
    timeEl +
    '</div><textarea class="form-control"">' +
    workDayHours.appointment +
    '</textarea><div class="col-2 input-group-append"><button class="saveBtn w-100" type="submit"><i class="far fa-calendar-check"></i></button></div></div></div>';

  $(".container").append(eachTimeRow);

});

// adds colors to the rows based on current time of day
function addColors(timeNow) {

  $(".hour").each(function () {

    let timeBlockId = $(this).text();
    let timeHour = moment(timeBlockId, ('h a'));
    let timerNow = moment(timeNow, ('h a'));

    if ((timeHour.isBefore(timerNow)) === true) {
      ($(this).siblings("textarea")).addClass("past");
    }

    else if ((timeHour.isAfter(timerNow)) === true) {
      ($(this).siblings("textarea")).addClass("future");

    }
    else {
      ($(this).siblings("textarea")).addClass("present");
    }
  });
}



// save appointments to local storage on click for calendar
$(".saveBtn").on("click", function () {

  let textEntry = (
    $(this)
      .parent()
      .siblings("textarea")
      .val()
  );
  let timeInfo = (
    $(this)
      .closest(".time-block")
      .attr("id")

  );

  workDayHours[timeInfo].appointment = textEntry;

  // Set local storage with work hours and appointment
  localStorage.setItem("Schedule", JSON.stringify(workDayHours));

});

//adding button and ability to clear the calendar
let clearrow =
  '<div class="row">' +
  '<div class="col-sm text-center">' +
  '<button type="button"  class="btn btn-danger" id="clearbutton" >Clear Calendar</button></div></div>';

$(".container").append(clearrow);

$("#clearbutton").css("marginTop", "15px");

$("#clearbutton").on("click", function () {
  window.localStorage.removeItem("Schedule");
  $("textarea").val("");
  workDayHours.forEach(function (workDayHours) {
    workDayHours.appointment = "";
  });
  
});








