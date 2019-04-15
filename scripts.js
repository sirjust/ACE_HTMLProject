$(function(){
    if(!localStorage["slideNumber"] || localStorage["slideNumber"]=== NaN){
        localStorage.setItem("slideNumber", 1);
    }

    if(!localStorage["quizzesComplete"]){
        localStorage.setItem("quizzesComplete", 0);
    }

    if(!localStorage["lastPageWasQuiz"]){
        localStorage.setItem("lastPageWasQuiz", false);
    }

    console.log(localStorage["slideNumber"]);
    console.log(localStorage["quizzesComplete"]);
    console.log(localStorage["lastPageWasQuiz"]);

    if(localStorage["lastPageWasQuiz"] && localStorage["quizzesComplete"] == 1){
        forward();
        localStorage["lastPageWasQuiz"] = false;
    }

    $("#back").click(function(){
        goBack();
    });
    
    $("#forward").click(function(){
        forward();
    });

    $("#complete").click(function(){
        // evaluate the number of checks
        console.log("complete button pressed");
        let totalChecks = document.querySelectorAll('input[type="checkbox"]:checked').length;
        console.log(totalChecks);
        // if the total is 3, continue to the next page
        if(totalChecks >= 3){
            localStorage.setItem("quizzesComplete", 1);
            localStorage.setItem("lastPageWasQuiz", true);
            window.location.replace('index.html');
        } else {
        // otherwise go to slide1 for review
        localStorage["slideNumber"]=1;
        window.location.replace('index.html');
        // take care, this alert occurs before the redirect.. need to find a way to do it afterwards
        alert("Sorry, you did not pass this quiz.");
        }
    })
});

function goBack() {
    if(localStorage["slideNumber"]>1){
        localStorage["slideNumber"]--;
    } else {
        localStorage["slideNumber"] = 1;
    }
    document.getElementById("myImage").src = `/CourseImages/Slide${localStorage["slideNumber"]}jpg_800x600.jpg`;
}

function forward() {
    if(localStorage["slideNumber"]==4 && localStorage["quizzesComplete"] == 0){
        window.location.replace('quiz.html');
    } else {
        localStorage["slideNumber"]++;
        document.getElementById("myImage").src = `/CourseImages/Slide${localStorage["slideNumber"]}jpg_800x600.jpg`;
    }
    console.log(localStorage["slideNumber"]);
}
