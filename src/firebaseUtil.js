import * as firebase from "firebase";
import $ from "jquery";

var user;
var token;

var config = {
    apiKey: "AIzaSyB4sGO9iLFVYPNqSiG15KWnSuCQvOj2icY",
    authDomain: "ocdtherapy-f7706.firebaseapp.com",
    databaseURL: "https://ocdtherapy-f7706.firebaseio.com",
    projectId: "ocdtherapy-f7706",
    storageBucket: "ocdtherapy-f7706.appspot.com",
    messagingSenderId: "170742234268"
};

firebase.initializeApp(config);

var database = firebase.database();

firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
        //token = result.credential.accessToken;
        //localStorage.setItem("token", token);
        //user = result.user;
        //localStorage.setItem("user", JSON.stringify(user));
        user = firebase.auth().currentUser;
        localStorage.setItem("user", JSON.stringify(user));
        user.getToken().then(function(idToken){
            token = idToken;
            localStorage.setItem("token", token);
        });
    } else {
        authenticate();
    }
}).catch(function(error) {
    console.log(error.message);
    authenticate();
});

var authenticate = function() {
    if(!firebase.auth().currentUser) {
        var provider = new firebase.auth.GoogleAuthProvider();
        //provider.addScope('https://www.googleapis.com/auth/plus.login');
        firebase.auth().signInWithRedirect(provider);
    } else {
        user = firebase.auth().currentUser;
        localStorage.setItem("user",JSON.stringify(user));
        user.getToken().then(function(idToken) {
            token = idToken;
            localStorage.setItem("token", token);
        });
    }
};

var writeInitialUser = function() {
    database.ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        photoUrl: user.photoUrl
    });
};

var firebaseUtil = {
    getUser: function() {
        return user;
    },
    getToken: function() {
        return token;
    },
    saveOcdItem: function(ocdItem) {
        return $.ajax({
            url: "https://ocdtherapy-f7706.firebaseio.com/users/" + user.uid + "/ocditems.json?auth=" + token,
            data: JSON.stringify(ocdItem),
            type: "POST",
            dataType: 'json',
            processData: false,
            beforeSend: function(xhr) {xhr.setRequestHeader('Authorization', 'Bearer ' + token)},
            contentType: "application/json"
        });
    }
};

export default firebaseUtil;