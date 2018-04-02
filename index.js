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
		 /*$.ajax({url: "https://maps.googleapis.com/maps/api/geocode/json?place_id="+place.place_id+"&key=AIzaSyDXKFvzCmG6NLSr244J5O-UP0av6b22Ufw", success: function(result){
			console.log(result);
			
			locationInfo = result.results[0].address_components[6].long_name;
		}});*/
      })


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

function redirectToRestPage(){
	window.location.href = '../restaurent_page/restaurent_page.html?locationInfo='+locationInfo;
}

/* Sources : 
https://cssdeck.com/labs/another-simple-css3-dropdown-menu
http://jsfiddle.net/Kiki_Dee/4UTQk/
*/
