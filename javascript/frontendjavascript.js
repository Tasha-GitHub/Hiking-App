//button function for Tasha
$(document).ready(function() {
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();

});

//----------------------------------------------------------//
//           index.html scroll controls                     //
//----------------------------------------------------------//


$(".navBtn").on("click", scrollWin);

function scrollWin(event) {
    event.preventDefault();
    var sectionName = $(this).data("name");
    $('html, body').animate({
        scrollTop: $("." + sectionName).offset().top
    }, 1000);

}


//----------------------------------------------------------//
//             Quote Generator controls                     //
//----------------------------------------------------------//
var quoteList = ["Be happy for this moment. This moment is your life. - Omar Khayyam",
    "Try not to become a man of success but a man of value. - Albert Einstein",
    "Happiness is when what you think, what you say, and what you do are in harmony. -  Mahatma Gandhi"
];
var quoteNumb = 0;
var currentQuote = quoteList[0];


$(document).ready(function() {
    var randNumb = Math.round(Math.random() * (quoteList.length - 1));
    currentQuote = quoteList[randNumb];
    $(".quote").html("<p>" + currentQuote + "</p>");
});


//----------------------------------------------------------//
//             Nav Bar Date controls                        //
//----------------------------------------------------------//

$(document).ready(function() {
    var date = moment().format('MM/DD/YY');
    $("#navDate").html("Date: " + date);

});

// --------------------------------------------------------//
//               Input Warning Display                     //
// --------------------------------------------------------//
$(".inputWarning").hide();
$(".inputWarning").css("color", "red");
$(".inputWarning").css("font-size", "14px");


//---------------------------------------------------------//
//          Text box for city/zip input forecast section   //
//---------------------------------------------------------// 
$("#weatherZipCode").css("text-transform", "capitalize");
