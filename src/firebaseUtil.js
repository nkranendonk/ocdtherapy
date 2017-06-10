import * as firebase from "firebase";

var user = JSON.parse(localStorage.getItem("user"));
var token = localStorage.getItem("token");

firebase.initializeApp({
    apiKey: "AIzaSyB4sGO9iLFVYPNqSiG15KWnSuCQvOj2icY",
    authDomain: "ocdtherapy-f7706.firebaseapp.com",
    databaseURL: "https://ocdtherapy-f7706.firebaseio.com",
    projectId: "ocdtherapy-f7706",
    storageBucket: "ocdtherapy-f7706.appspot.com",
    messagingSenderId: "170742234268"
});

firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        token = result.credential.accessToken;
        localStorage.setItem("token", token);
        user = result.user;
        localStorage.setItem("user", JSON.stringify(user));
    } else {
        authenticate();
    }
}).catch(function(error) {
    console.log(error.message);
    authenticate();
});

var authenticate = function() {
    if(!user && !firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        //provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider).then(function(result) {
            localStorage.setItem("user", JSON.stringigy(result.user));
        });
    }
};

var firebaseUtil = {
    getUser: function() {
        return user;
    },
    getToken: function() {
        return token;
    }
};

export default firebaseUtil;