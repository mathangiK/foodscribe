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
  
  var form = $("#example-form");
	form.validate({
		errorPlacement: function errorPlacement(error, element) { element.before(error); }
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
					$.ajax({
						url: "https://foodscribe-backend.herokuapp.com/checkout/checkout",
						data: jsonData,
						type: "POST", //send it through get method
						success: function(json) {
							console.log(json);	
							if(json!=''){
								$('#info').html('<p>Order Placed. Please track your order <a href="tracking_page/tracking_page.html?orderId='+json.id+'">here</a></p>'); 
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
						},
						contentType: 'application/json; charset=UTF-8',
						dataType : 'text'
					});
				
				
				
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

