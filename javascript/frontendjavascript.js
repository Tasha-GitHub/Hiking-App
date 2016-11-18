
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

//----------------------------------------------------------//
//           index.html scroll controls                     //
//----------------------------------------------------------//
  


