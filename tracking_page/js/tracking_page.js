/* ADDCLASS ON MOBILE */
var count = 2;
(function($) {
  var $window = $(window),
      $orderprogress = $('#orderprogress'),
      $menu = $('#menu');
  $window.resize(function resize(){
    if ($window.width() < 960) {
      $orderprogress.addClass('mobile');
      return $menu.addClass('mobile');
    }
    $menu.removeClass('mobile');
    $orderprogress.removeClass('mobile');
  }).trigger('resize');
  
	var precent = (count * (32-(count*1.5)));
	count += 1;
	if(count >4) return;
	$("#mascot-animation").animate({
		left: precent+"%"
	},2000);

})(jQuery);
/* OPEN SUB-MENU ON CLICK */
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
/* Sources : 
https://cssdeck.com/labs/another-simple-css3-dropdown-menu
http://jsfiddle.net/Kiki_Dee/4UTQk/
*/


/*Order Management Begin*/

/*Order Management End*/


/* Google API stuff*/
var placeSearch, autocomplete;

var initAutocomplete = function() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
    {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

var fillInAddress = function() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log(place.geometry.location.lat());

}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
var geolocate = function() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}