// Initialize Firebase
var config = {
	apiKey: "AIzaSyDER1hEA5D9g6NyypKg8MY_kbE1BuKM-F0",
	authDomain: "bet-sample.firebaseapp.com",
	databaseURL: "https://bet-sample.firebaseio.com",
	projectId: "bet-sample",
	storageBucket: "bet-sample.appspot.com",
	messagingSenderId: "403051426152"
};

firebase.initializeApp(config);

var database = firebase.database();

var postRef = database.ref('posts');

var storage = firebase.storage();

var storageRef = firebase.storage().ref();

var provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged(function(user) {

  if (user) {
    // 1. Logged In - Show Logout
    // console.log("User is Logged In");
    // console.log(user);
    // console.log("Email:",user.email,user.displayName,user.photoURL);

    $('#logout').show();
    $('#add_post').show();
    $('#login').hide();

  } else {
    // 2. Logged Out/ Not Logged In - Show "Login with Google"
    // console.log("User is not logged in");

    $('#logout').hide();
    $('#add_post').hide();
    $('#login').show();

  }

});



$('#login').click(function(){

	firebase.auth().signInWithRedirect(provider).then(function(result) {
	  // This gives you a Google Access Token. You can use it to access the Google API.
	  var token = result.credential.accessToken;
	  // The signed-in user info.
	  var user = result.user;
	  // ...
	}).catch(function(error) {
	  // Handle Errors here.
	  var errorCode = error.code;
	  var errorMessage = error.message;
	  // The email of the user's account used.
	  var email = error.email;
	  // The firebase.auth.AuthCredential type that was used.
	  var credential = error.credential;
	  // ...
	});

});

$('#logout').click(function(){

	firebase.auth().signOut().then(function() {
	  // Sign-out successful.
	}).catch(function(error) {
	  
	});

});


// 1. Take the file from user

// 2. Upload the file to firebase storage