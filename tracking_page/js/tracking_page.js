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

/*Order Management Begin*/
/*Order Management End*/
