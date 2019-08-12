
// Global Variables
var name;
var destination;
var firstArrival;
var frequency;
var minAway;
// var database;
var trainFirebaseData;
var newFirebaseData;
var time;
var clock;
$(document).ready(function () {


    // the timer at the top
    function runningClock() {
        time = moment().format("hh:mm:ss A");
        $("#time").text(time);
    }
    //  Call function with setInterval
    clock = setInterval(runningClock , 1000);
 
         // Your web app's Firebase configuration
         var firebaseConfig = {
            apiKey: "AIzaSyAowoj5m78XUKJUi_xLBcccTlzIYqbRosA",
            authDomain: "trainscheduler-619b5.firebaseapp.com",
            databaseURL: "https://trainscheduler-619b5.firebaseio.com",
            projectId: "trainscheduler-619b5",
            storageBucket: "trainscheduler-619b5.appspot.com",
            messagingSenderId: "614612854656",
            appId: "1:614612854656:web:14cb857bac896e58"
          };
          // Initialize Firebase
          firebase.initializeApp(firebaseConfig);
        
   var database = firebase.database();

    $("#submitButton").on("click", function (event) {
    
        event.preventDefault();

        //  Grab Input values IF the conditon above is true
        name = $("#trainNameInput").val().trim();
        destination = $("#destinationInput").val().trim();
        firstArrival = $("#firstTrainTimeInput").val().trim();
        frequency = $("#frequencyInput").val().trim();
        
        // var document = document.getElementById("SubmitButton");
        
        console.log(firstArrival);


        //  Link and assign variable for firebase
            trainFirebaseData = {
            DatatrainName: name,
            Datadest: destination,
            DatafirstArrival: firstArrival,
            Datafrequency: frequency,
            // DataminAyay:minAway,
            // TimeStamp: firebase.database.ServerValue.TIMESTAMP
        };
        console.log("name",name);
        console.log("destination",destination);
        console.log("firdtArrival",firstArrival);
        console.log("frequency",frequency);
        // console.log("minAway",minAway);

        //    Variable for firebase to link train easier
        database.ref().push(trainFirebaseData);

    //  Make sure fields are back to blank after adding a train
        clear();

    });
    database.ref().on("child_added", function (childSnapshot) {
        //  make variable to ease reference
        var snapName = childSnapshot.val().DatatrainName;
        var snapDest = childSnapshot.val().Datadest;
        var snapFreq = childSnapshot.val().Datafrequency;
        var snapArrival = childSnapshot.val().DatafirstArrival;

       
        //  Current Time
        var currentTime = moment();
        console.log(currentTime);
        //  Convert Time and configure for Future use by pushing firstArrival back 1 year
        var firstArrivalConverted = moment(snapArrival , "HH:mm A").subtract(1, "years");
        console.log(firstArrivalConverted);
        //  Calculate now vs First Arrival
        var diff = moment().diff(moment(firstArrivalConverted) , "minutes");
        console.log(diff);

        var left = diff % snapFreq;
        //  How long till train
        var timeLeft = snapFreq - left;
        var newArrival = moment().add(timeLeft , "m").format("HH:mm: A");


        $("#table-info").append("<tr><td>" + snapName +"</td><td>" + snapDest + "</td><td>" + snapFreq + "</td><td>" +
               newArrival + "</td><td>" + timeLeft + "</td></tr>");


    });

  
    

        
    }



});


