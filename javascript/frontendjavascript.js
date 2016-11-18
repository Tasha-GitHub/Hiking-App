
// hide and show on-click function
$(document).ready(function(){
    $("button").click(function(){
        $("p").hide(1000);
    });
});


//button function for Tasha
  $(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
    
  });

//----------------------------------------------------------//
//           index.html scroll controls                     //
//----------------------------------------------------------//


$("#map").on("click", scrollMapWin);

function scrollMapWin(event) {
    event.preventDefault();

    window.scrollTo(0, 1300);
    
}


$("#forecast").on("click", scrollForecastWin);

function scrollForecastWin(event) {
    event.preventDefault();

    window.scrollTo(0, 650);
    
}

  


