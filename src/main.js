import firebaseUtil from "./firebaseUtil.js";
import $ from "jquery";

$(document).ready(function() {
    $("#addBehaviors").click(function () {
        var ocdItem = {
            priority: 1,
            title: $("#behavior1").val()
        };

        firebaseUtil.saveOcdItem(ocdItem).then(function (response) {
            console.log(response);
        })
    });
});
