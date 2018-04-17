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
				
				var deliveryAdd = {
				name : $('#customerName').val(),
				shippingAddres : $('#shippingAddress').val(),
				shippingCity : $('#shippingCity').val(),
				shippingState : $('#shippingState').val(),
				shippingZipcode : $('#shippingZipcode').val()
				};
				var paymentInfo = {
					cardType : $('#cardType').val(),
					cardHolder : $('#cardHolder').val(),
					cardNumber : $('#cardNumber').val(),
					expiryMonth : $('#expiryMonth').val(),
					expiryYear : $('#expiryYear').val(),
					cardCVC : $('#cardCVC').val()				
				}
				console.log(deliveryAdd);
				console.log(paymentInfo);
				
				if(true){
					$('#info').html('<p>Order Placed. Please track your order <a href="#">here</a></p>'); 
					if(form.valid()){
						$("#wizard .actions a[href='#finish']").hide();
						$("#wizard .actions a[href='#previous']").hide();
						
						$('.steps .current').prevAll().removeClass('done').addClass('disabled');
						$('.steps .current').removeClass('done current').addClass('disabled');
						return true;
					}
					return false;
				}else{
					$('#info').html('<p>Order could not be placed. Sorry for the inconvenience</p>'); 
					if(form.valid()){
						$("#wizard .actions a[href='#finish']").hide();
						$("#wizard .actions a[href='#previous']").hide();
						
						$('.steps .current').prevAll().removeClass('done').addClass('disabled');
						$('.steps .current').removeClass('done current').addClass('disabled');
						return true;
					}
					return false;
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

