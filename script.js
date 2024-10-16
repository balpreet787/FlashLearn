function writeWeek1() {
    // Split the text into lines
    $('#content').empty();
    $.get("notes/week1.txt", function (data) {

        var lines = data.split('\n');
        var contentDiv = $('#content');
        var question = '';
        var answer = '';

        lines.forEach(function (line) {
            if (line.trim().length === 0 && question && answer) {
                // Create question and answer elements
                var qElem = $('<div class="question"></div>').text(question);
                var aElem = $('<div class="answer hidden bg-slate-500 text-white"></div>').html(answer.replace(/\n/g, '<br>')); // Replace newlines with HTML line breaks for multiline answers

                // Append to container
                contentDiv.append(qElem);
                contentDiv.append(aElem, '<br>');

                // Reset question and answer for next pair
                question = '';
                answer = '';
            } else if (!question) {
                question = line; // Current line is a question
            } else {
                answer += (answer ? '\n' : '') + line; // Append line to answer, preserving multiline format
            }
        });
        $('.question').click(function () {
            $(this).next('.answer').slideToggle();
        });
    });
}

function writeFlashWeek1() {

    flashDict = {};
    $('#content').empty();
    $.get("notes/week1.txt", function (data) {

        var lines = data.split('\n');

        var question = '';
        var answer = '';

        lines.forEach(function (line) {
            if (line.trim().length === 0 && question && answer) {



                // Append to container
                flashDict[question] = answer;

                // Reset question and answer for next pair
                question = '';
                answer = '';
            } else if (!question) {
                question = line; // Current line is a question
            } else {
                answer += (answer ? `\n<br/>` : '') + line; // Append line to answer, preserving multiline format
            }
        });
        let keys = Object.keys(flashDict);
        let randomKey = keys[Math.floor(Math.random() * keys.length)];
        $('#content').append('<h1 id="question" class="flex items-center justify-center min-h-screen text-4xl">' + randomKey + '</h1>');
        $("#question").click(function () {
            $("#question").html(flashDict[randomKey]);
        });
    });
}

function setup() {
    $("#mod9").click(writeWeek1);
    $("#flashMod9").click(writeFlashWeek1);
}

$(document).ready(setup);
