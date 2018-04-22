/* ADDCLASS ON MOBILE */
var locationInfo ='77801';
(function($) {
  var $window = $(window),
    $menu = $('#menu');
    $window.resize(function resize(){
    if ($window.width() < 960) {
      return $menu.addClass('mobile');
    }
    $menu.removeClass('mobile');
}).trigger('resize');


    //section to check if user is logged in
    var items = JSON.parse(localStorage.getItem('token'))
    if (items === null || items.length === 0){
      $('#loggedInHeader').addClass('header_login');
      $('#shoppingCart').addClass('header_login');
    }else{
      $('#loginHeader').addClass('header_login');
    }

      var input = document.getElementById('autocomplete');
	      var options = {
			types: ['(regions)']
		}
      var autocomplete = new google.maps.places.Autocomplete(input);

      google.maps.event.addListener(autocomplete, 'place_changed', function(){
         var place = autocomplete.getPlace();
		 console.log(place);
		  $.each(place.address_components, function(index,item) {
			$.each(item.types, function(index,itemTypes){
				if(itemTypes == "postal_code")
					locationInfo = item.long_name;
			});
		  });
		 console.log(locationInfo);
      })


})(jQuery);
/* OPEN SUB-MENU ON CLICK */

//redirect to restaurant page when valid zipcode is chosen.
function redirectToRestPage(){
	window.location.href = 'restaurent_page/restaurent_page.html?locationInfo='+locationInfo;
}

//save the currentURL to be used as back URL after login
function login(){
	localStorage.setItem("backAfterLogin", window.location.href);
}


//header section - for mobile and subheader
$('#menu li.sub').on('click', function(e) {
  e.stopPropagation();
  $(this).toggleClass('open');  $(this).siblings().removeClass('open');
});
$(document).on('click', function() {
   $('#menu li.sub').removeClass('open');
});
/* TOGGLE SLIDE MOBILE MENU */
$('#mobbtn').on('click', function(){
  if($(this).hasClass('active')){
  $(this).removeClass('active');
    $(this).html("&#9776;");
  $('.mobile').animate({
    right:"-220px"
  });
  $(this).animate({
    right:"0"
  });
  }
  else {
  $(this).addClass('active');
  $(this).html("&#9587;");
  $('.mobile').animate({
    right:"0",
  });
  $('#mobbtn').animate({
    right:"220px"
  });
  }
});
$('.content').on('click', function() {
  if($('#mobbtn').hasClass('active')){
    $('#mobbtn').removeClass('active');
    $('#mobbtn').html("&#9776;");
    $('.mobile').animate({
      right:"-220px"
    });
    $('#mobbtn').animate({
      right:"0"
    });
  }
});


function login(){
	localStorage.setItem("backAfterLogin", window.location.href);
}

function logoutLogic(){
  localStorage.removeItem("token");
	window.location.href="../index.html";
}
