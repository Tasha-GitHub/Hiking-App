
//button function for Tasha
  $(document).ready(function(){
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
    // window.scrollTo(0, 1300);
    $('html, body').animate({
          scrollTop: $("."+sectionName).offset().top
        }, 1000);
    
}


//----------------------------------------------------------//
//             Quote Generator controls                     //
//----------------------------------------------------------//
var quotes = ["Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful. - Albert Schweitzer",
"Try not to become a man of success but a man of value. - Albert Einstein", 
"Happiness is when what you think, what you say, and what you do are in harmony. - Mahatma Gandhi"];



//----------------------------------------------------------//
//             Nav Bar Date controls                        //
//----------------------------------------------------------//

$(document).ready(function(){
    var date = moment().format('MM/DD/YY');
    $("#navDate").html("Date: "+ date);
    
  });