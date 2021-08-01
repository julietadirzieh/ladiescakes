$(".onLog").hide();
 
 
 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCXZUv8ct3TB62OuN4nTJQUSu6lixkPeqU",
    authDomain: "ladiescakes-c06f0.firebaseapp.com",
    projectId: "ladiescakes-c06f0",
    storageBucket: "ladiescakes-c06f0.appspot.com",
    messagingSenderId: "1043015326795",
    appId: "1:1043015326795:web:86d474a173072478dd81ce"
    // apiKey: "AIzaSyCAG6jZJoV_Uhb5L_wc4q4c7Ra3BYCq4yk",
    // authDomain: "aromarte-web.firebaseapp.com",
    // databaseURL: "https://aromarte-web.firebaseio.com",
    // projectId: "aromarte-web",
    // storageBucket: "aromarte-web.appspot.com",
    // messagingSenderId: "931826286770",
    // appId: "1:931826286770:web:8eaa68cc3f4d2a3507c9ab",
    // measurementId: "G-X84GP08LHW"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


var ui = new firebaseui.auth.AuthUI(firebase.auth());


  var uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
 
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return false;
      },
      uiShown: function() {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };
  // The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
   
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch(function(error) {
    // Handle Errors here.
    
    var errorCode = error.code;
    var errorMessage = error.message;
  });
  

  initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        $(".noLog").hide();
        $(".onLog").show();
        $(".header__logOutButton").show();
      } else {
        // User is signed out.
        $(".noLog").show();
        $(".onLog").hide();
        $(".header__logOutButton").hide();
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });
  function LogOut() {
    firebase.auth().signOut()
  }