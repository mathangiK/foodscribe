/* ADDCLASS ON MOBILE */
var count = 0;
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

	var orderId = getUrlParameter('orderId') || '';
	if(orderId == ''){
		window.location.href = '../error.html'
	}

	var items = localStorage.getItem('token');
	if (items === null || items.length === 0){
			localStorage.setItem("backAfterLogin", window.location.href);
			window.location.href="../login_page/login_page.html";
		}else{
			$.ajax({
				url: "https://foodscribe-backend.herokuapp.com/user/getLastName/"+items,
				contentType: "text/xml",
				type: "GET", //send it through get method
				success: function(json) {
					console.log('test');
						$('#loggedUser').html('Welcome back '+json+'!');
				},
				error: function(xhr) {
				//Do Something to handle error
				}
			});


	}

	function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };

  $('#cover-spin').show();
	$.ajax({
		url: "https://foodscribe-backend.herokuapp.com/order/"+orderId,
		type: "get", //send it through get method
		success: function(json) {

			if(json!=''){
			console.log(json);
				var step1,step2,step3,step4;
				switch(json.orderStatus){
					case "created" : count = 0;
								step1='style = "color:orange;"';
								step2='';
								step3='';
								step4='';
								break;
					deafult : count = 1;
								step1 = 'style="color:green;"';
								step2='style = "color:orange;"';
								step3='';
								step4='';
								break;
				}

				var trackingData = '<div id="orderProgress ">'+
				  '<div class="row mascot-container">'+
					'<div id="mascot-animation">'+
					 ' <img src="images/mascot.png" style="margin-left:30%;display:block;max-width:100px;max-height:70px;width:auto;height:auto;" />'+
					'</div>'+
				  '</div>'+

				  '<div class="row" style="font-weight: bold;margin-top:10px;">'+
					'<div class="three columns">'+
					  '<p '+step1+'">Order Placed</p>'+
					'</div>'+
					'<div class="three columns">'+
					  '<p '+step2+'>Order Preparation</p>'+
					'</div>'+
					'<div class="three columns">'+
					  '<p '+step3+'>Out for Delivery</p>'+
					'</div>'+
					'<div class="three columns">'+
					  '<p '+step4+'>Order Delivered</p>'+
					'</div>'+
				  '</div>'+
			  '</div>'+
			  '<hr/>'+
			  '<form >'+
				'<div class="row">'+
				  '<h4>Order Details</h4>'+
				'</div>'+
				'<div class="order-form">'+
				'<div class="row box">'+
				  '<div class="one-half column order-label">'+
					'<label for="orderNumber">Order Number:</label>'+
				  '</div>'+
				  '<div class="one-half column">'+
					'<label for="orderNumber">'+json.id+'</label>'+
				  '</div>'+
				'</div>'+
				' <hr>'+
				'<div class="row box">'+
				  '<div class="six columns">'+
					'<label for="deliveryAddress">Delivery Address:</label>'+
				  '</div>'+
				  '<div class="six columns">'+
					'<div class="row">'+
					'<label for="deliveryAddress">'+json.deliveryAddress.shippingAddressStreet1+'</label>'+
					'</div>'+
					'<div class="row">'+
					'<label for="deliveryAddress">'+json.deliveryAddress.shippingAddressCity+' '+json.deliveryAddress.shippingAddressZipcode+'</label>'+
					'</div>'+
				  '</div>'+
				'</div>'+
				   '<hr>'+
				 '<div class="row box">'+
				  '<div class="six columns">'+
					'<label for="totalAmount">Invoice Amount:</label>'+
				  '</div>'+
				  '<div class="six columns">'+
					'<label for="totalAmount">$'+json.orderTotal+'</label>'+
				  '</div>'+
				'</div>'+
				'</div>'+
			  '</form>';


				$('#orderSection').html(trackingData);

				if(count>0){
					var precent = (count * (32-(count*1.5)));
					count += 1;
					if(count >4) return;
					$("#mascot-animation").animate({
						left: precent+"%"
					},2000);
				}
			}else{
				$('#orderSection').html('<p>Oops! There is no order history associated with this order.</p>');
			}
			$('#cover-spin').hide();
		},
		error: function(xhr) {
						$('#cover-spin').hide();
		//Do Something to handle error
		}
	});



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


function logoutLogic(){
  localStorage.removeItem("token");
  window.location.href="../index.html"
}
