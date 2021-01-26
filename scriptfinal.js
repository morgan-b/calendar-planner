$(document).ready(function () {
  //add variable for the date and time today from moment.js
  let today = moment().format("ddd, MMM D YYYY, h:mm a");
  let timeNow = moment().format('h:mm a');

  //Add todays date to current day element
  $("#currentDay").text(today);

  let workDayHours = [
    { time: "9 AM", appointment: ""},
    { time: "10 AM", appointment: ""},
    { time: "11 AM", appointment: ""},
    { time: "12 PM", appointment: ""},
    { time: "1 PM", appointment: ""},
    { time: "2 PM", appointment: ""},
    { time: "3 PM", appointment: ""},
    { time: "4 PM", appointment: ""},
    { time: "5 PM", appointment: ""},
    { time: "6 PM", appointment: ""},
  ];


// adding rows and ids for each hour of the calendar
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
    addColors();
  });

  // adds colors to the rows based on time 

  function addColors() {

    $(".hour").each(function () {

      let timeBlockId = $(this).text();
      let closestText = $(this).closest("textarea")
      let timeHour = moment(timeBlockId, ('h a'));
      console.log(timeHour);
      let timerNow = moment(timeNow, ('h a'));
      console.log(timeNow);
      if ((timeHour.isBefore(timerNow)) === true) {
        $(this).addClass("past");
      }

      else if ((timeHour.isAfter(timerNow)) === true) {
        $(this).addClass("future");
      }
      else {
        $(this).addClass("present");
      }
    });
  }

  //function getStorage(){
   // let local = localStorage.getItem("Schedule")
     //   console.log(local);
     // }


  // save appointments for calendar
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
    
    console.log(textEntry)
    console.log(timeInfo)

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


  //var appointments = 
  
  /*$(".time-block").each(function(){
    inputID = parseInt($(this).attr("id"));
    $("textarea").val(localStorage.getItem("Schedule"[inputID]));
    console.log(inputID);
    console.log(localStorage.getItem("Schedule"))
  
  })*/






});