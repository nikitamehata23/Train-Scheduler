//set page refresh
setTimeout(function() {
    window.location.href = window.location;
  }, 60000);
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
      apiKey: "AIzaSyAEmjmPYxDXloD7O7Cm9pqJ2yJoXetwFLM",
      authDomain: "trainassignment-afbef.firebaseapp.com",
      databaseURL: "https://trainassignment-afbef.firebaseio.com",
      projectId: "trainassignment-afbef",
      storageBucket: "trainassignment-afbef.appspot.com",
      messagingSenderId: "672292163021",
      appId: "1:672292163021:web:9cf0d865bf07841f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
      // the timer at the top
      function runningClock() {
              time = moment().format("hh:mm:ss A");
              $("#time").text(time);
      }
      //  Call function with setInterval
      clock = setInterval(runningClock , 1000);
  
  //variable for database
  database = firebase.database();
  
  //initial values
  var name = "";
  var destination = "";
  var time = "";
  var frequency = "";
  
  //display current time & update every second
  // function displaytime(){
  //   intervalId = setInterval ($(".current-time").text(moment().format("HH mm a")), 1000)
  // };
  // displaytime();
  
  // Capture Button Click
  $("#add-train").on("click", function (event) {
    event.preventDefault();
  
    // Grabbed values from text boxes
    name = $("#name").val().trim();
    destination = $("#destination").val().trim();
    time = $("#time").val().trim();
    frequency = parseInt($("#frequency").val().trim());
  
    if(name === "" || destination === "" || time === "" || frequency === ""){
      return;
    }
  
    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      time: time,
      frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  
    $("#name").val("");
    $("#destination").val("")
    $("#time").val("")
    $("#frequency").val("")
  
  });
  
  // Firebase watcher .on("child_added"
  database.ref().on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();
  
    //variables and calculations for train arrival and minutes to arrival
    var trainFrequency = (sv.frequency);
    var firstTime = (sv.time);
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var different = moment().diff(moment(firstTimeConverted), "minutes");
    var timeRemaining = different % trainFrequency;
    var minAway = trainFrequency - timeRemaining;
    var nextArrival = moment().add(minAway, "minutes").format("MMM Do HH:mm a");
    // Console.loging the last user's data
    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);
  
    //change html text to display train info
    var row = $("<tr>").append($("<td class='nameCell'>").text(sv.name), $("<td class='destinationCell'>").text(sv.destination), $("<td class='frequencyCell'>").text(sv.frequency), $("<td class='arrivalCell'>").text(nextArrival), $("<td class='minCell'>").text(minAway));
    $("#all-display").append(row);
  });
  