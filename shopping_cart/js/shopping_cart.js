/* ADDCLASS ON MOBILE */
(function($) {
  var $window = $(window),
      $menu = $('#menu');
  $window.resize(function resize(){
    if ($window.width() < 960) {
      return $menu.addClass('mobile');
    }
    $menu.removeClass('mobile');
  }).trigger('resize');

  //initial load
  createShoppingCart();

  var items = localStorage.getItem('token');
  if (items === null || items.length === 0){
    $('#loggedInHeader').addClass('header_login');
    $('#shoppingCart').addClass('header_login');
  }else{
    $('#loginHeader').addClass('header_login');
  }


})(jQuery);

function createShoppingCart(){
	var count = 0;
	var headerInfo = {
		userid : Number.parseInt(localStorage.getItem("token"))
	};
	console.log(headerInfo);
		$.ajax({
			url: "https://foodscribe-backend.herokuapp.com/cart/getCartItemList",
			type: "get", //send it through get method
			headers : {
				userid : Number.parseInt(localStorage.getItem("token"))
			},
			contentType:"application/json",
			success: function(json) {
				var resString = '';
				console.log(json);
				if(json!=''){
					var cart = '<div class="row desktop" style="border-bottom: 1px solid grey;">'+
						'<div class="six columns ">Item</div>'+
						'<div class="two columns ">Quantity</div>'+
						'<div class="two columns ">Price</div>'+
						'<div class="two columns ">SubTotal</div>'+
					'</div>';
					$.each(json, function(i, item) {
						count = count + Number.parseFloat(item.subtotal);
						cart = cart+'<div class="row box" >'+
						  '<div class="six columns order-label">'+
							'<div class="row restaurentName" >'+item.menuItem.itemName+'</div>'+
							'<div class="row restaurentInfo" >'+item.menuItem.itemDesc+'</div>'+
							'<div class="row" ><a href="javascript:void(0)" onclick="deleteItem('+item.id+');">Delete</a></div>'+
						  '</div>'+
						  '<div class="two columns">'+
							'<input type="number" style="height:2em;" value="'+item.qty+'" min="1" max="10" onchange="updateServerSideCart('+item.id+',this.value);"/>'+
						  '</div>'+
						  '<div class="two columns">'+
							'<span>$'+item.menuItem.itemPrice+'</span>'+
						  '</div>'+
						  '<div class="two columns">'+
							'<span>$'+item.subtotal+'</span>'+
						  '</div>'+
						'</div>';
					});
					var tax = count * 0.08;
					var total  = count + (count *0.08);
					cart = cart +'<div style="float:right; text-align:right;">Subtotal: '+count.toFixed(2)+'<br/>Discount: -$0</br>Tax(@ 8.0%): '+tax.toFixed(2)+'</br>Total: '+total.toFixed(2)+'</div>';
					cart = cart +'<div style="float:right;clear:both;margin-top:20px;"><input type="button" class="checkout-button" onclick="checkout();" value="Proceed to Checkout"/></div>';
					$('#shoppingCartSec').html(cart);
				}else{
          $('#shoppingCartSec').html('<br/><br/><p style="text-align:middle;">The cart is currently empty. <a href="../index.html">Click</a> to add more items </p>');
        }
			},
			error: function(xhr) {
				console.log(xhr);
			//Do Something to handle error
			}
		});
}

function checkout(){
  window.location.href = "../payment_page/payment_page.html";
}

function updateServerSideCart(id,quantity){
	 console.log('id:'+id);
	 var dataSet = JSON.stringify({
			cartItemId : id,
			qty: quantity
		});
	$.ajax({
		url: "https://foodscribe-backend.herokuapp.com/cart/updateCartItem",
		data :dataSet,
		contentType: "application/json; charset=utf-8",
		type: "POST", //send it through get method
		success: function(json) {
			console.log('success');
			createShoppingCart();
		},
		error: function(xhr) {
		//Do Something to handle error
		}
	});
 }


function deleteItem(itemid){
	$.ajax({
		url: "https://foodscribe-backend.herokuapp.com/cart/removeItem",
		data : ''+itemid,
		contentType: "text/xml",
		type: "POST", //send it through get method
		success: function(json) {
			console.log('deleted item successfully');
			createShoppingCart();
		},
		error: function(xhr) {
		//Do Something to handle error
		}
	});
}

function updateModalWindow(type){
	var title,content;

	switch(type){
		case 'FAQ':
			title = 'FAQs';
			content = '<p>This is a FAQ section</p>';
			break;
		case 'Privacy':
			title = 'Privacy Policy';
			content = '<p>This is a FAQ section</p>';
			break;
		case 'Cancel':
			title = 'Order Cancellation Policy';
			content = '<p>This is a FAQ section</p>';
			break;
		case 'Delivery':
			title = 'Delivery Policy';
			content = '<p>This is a FAQ section</p>';
			break;
		default:
			title = 'Help';
			content = '<p>Email us and we will be happy to help</p>';
			break;
	}
	$('#modalHeading').html(title);
	$('#modalContent').html(content);

}


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

function login(){
	localStorage.setItem("backAfterLogin", window.location.href);
}

function logoutLogic(){
  localStorage.removeItem("token");
}
