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

  var items = localStorage.getItem('token');
  if (items === null || items.length === 0){
      localStorage.setItem("backAfterLogin",'../index.html');
      window.location.href="../login_page/login_page.html";
      $('#loggedInHeader').addClass('header_login');
      $('#shoppingCart').addClass('header_login');
  }else{
      $('#loginHeader').addClass('header_login');
  }

  var form = $("#example-form");
	form.validate({
		errorPlacement: function errorPlacement(error, element) { element.before(error); },
		rules : {
			cardNumber : {
				minlength : 16,
        maxlength:16,
				digits: true
			},
      cardCVC : {
        minlength : 3,
        maxlength:3,
        digits: true
      }
		}
	});
	form.children("div").steps({
		headerTag: "h3",
		bodyTag: "fieldset",
		transitionEffect: "slideLeft",
		onStepChanging: function (event, currentIndex, newIndex)
		{
			if (currentIndex > newIndex){
				return true;
			}

			if(currentIndex == 1 && newIndex == 2){
				//attach user id in data for post request
				var deliveryAddress = {
					shippingAddressName : $('#customerName').val(),
					shippingAddressStreet1 : $('#shippingAddress').val(),
					shippingAddressStreet2 : $('#shippingAddress').val(),
					shippingAddressCity : $('#shippingCity').val(),
					shippingAddressState : $('#shippingState').val(),
					shippingAddressCountry : $('#shippingAddress').val(),
					shippingAddressZipcode : $('#shippingZipcode').val()
				};
				var payment = {
					type : $('#cardType').val(),
					holderName : $('#cardHolder').val(),
					cardNumber : $('#cardNumber').val(),
					expiryMonth : $('#expiryMonth').val(),
					expiryYear : $('#expiryYear').val(),
					cvc : $('#cardCVC').val()
				}
				//console.log(deliveryAddress);


				var jsonData = JSON.stringify({
								deliveryAddress: deliveryAddress,
								payment: payment,
								userid: Number.parseInt(localStorage.getItem("token"))
							});
				console.log(jsonData);
        if(form.valid()){
          $('#cover-spin').show();
					$.ajax({
						url: "https://foodscribe-backend.herokuapp.com/checkout/checkout",
						data: jsonData,
						type: "POST", //send it through get method
						success: function(json) {
              var jsonObject = JSON.parse(json);
							console.log(jsonObject.id);
              $('#cover-spin').hide();
							if(json!=''){
								$('#info').html('<p>Order Placed. Please track your order <a href="../tracking_page/tracking_page.html?orderId='+jsonObject.id+'">here</a></p>');
								if(form.valid()){
									$("#wizard .actions a[href='#finish']").hide();
									$("#wizard .actions a[href='#previous']").hide();

									$('.steps .current').prevAll().removeClass('done').addClass('disabled');
									$('.steps .current').removeClass('done current').addClass('disabled');
									return true;
								}
								return false;
							}else{
								$('#info').html('<p>Order could not be placed. Sorry for the inconvenience. Please contact the administrator for more information. Ph: 9897655432</p>');
								if(form.valid()){
									$("#wizard .actions a[href='#finish']").hide();
									$("#wizard .actions a[href='#previous']").hide();

									$('.steps .current').prevAll().removeClass('done').addClass('disabled');
									$('.steps .current').removeClass('done current').addClass('disabled');
									return true;
								}
								return false;
							}
						},
						error: function(xhr) {
						//Do Something to handle error
							console.log(xhr);

              $('#spinner').addClass('spinner_hide');
						},
						contentType: 'application/json; charset=UTF-8',
						dataType : 'text'
					});
        }



			}
			form.validate().settings.ignore = ":disabled,:hidden";
			return form.valid();

		},
		onFinishing: function (event, currentIndex){
			form.validate().settings.ignore = ":disabled";
			return form.valid();
		},
		onFinished: function (event, currentIndex){

		}
	});

})(jQuery);

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
}
