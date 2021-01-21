$(function () {});

var today = moment().format("ddd, MMM D YYYY");
var timeNow = moment().format('LT');

var workDayHours = [
    { time: "9 AM", event: "" },
    { time: "10 AM", event: "" },
    { time: "11 AM", event: "" },
    { time: "12 PM", event: "" },
    { time: "1 PM", event: "" },
    { time: "2 PM", event: "" },
    { time: "3 PM", event: "" },
    { time: "4 PM", event: "" },
    { time: "5 PM", event: "" },
  ];

  $("#currentDay").text(today);


