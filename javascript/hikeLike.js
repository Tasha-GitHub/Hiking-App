 var name;
 var photoURL;
 var url;
 var trailName;

 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA9Sbrd5SkfRkjVEHaX16S8VO-0vb-JKTo",
    authDomain: "hikingapp-11bf4.firebaseapp.com",
    databaseURL: "https://hikingapp-11bf4.firebaseio.com",
    storageBucket: "hikingapp-11bf4.appspot.com",
    messagingSenderId: "186630289575"
  };
  firebase.initializeApp(config);

  // Get a reference to the database service
var database = firebase.database();


database.ref().orderByChild("dateAdded").limitToLast(20).on("child_added", function(childsnapshot) {

      photoURL = childsnapshot.val().url;
      trailName = childsnapshot.val().name;
      $(".photoBlock").append("<div class= \"photo\">"+"<h3 class=\"capitalize\">"+trailName+"</h3>"+"<img src=\""+photoURL +"\"></div>");
 
    }, function(errorObject) {

      // In case of error this will print the error
      console.log("The read failed: " + errorObject.code);
    });

$("#photoSubmit").on("click", function(event){
    	event.preventDefault();
    	url = $("#photoInput").val().trim();
    	name = $("#nameInput").val().trim();  

      //if users doesnt input both values, it will prevent a post
      if(url.length === 0 || name.length === 0){
        return;

      } else {
      	database.ref().push({
          name: name,
          url : url,
          dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
      }

    });