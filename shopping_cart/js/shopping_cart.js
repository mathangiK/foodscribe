/* ADDCLASS ON MOBILE */
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
  
  createShoppingCart();
  
  

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
					cart = cart +'<div style="float:right; text-align:right;">Subtotal: '+count+'<br/>Discount: -$0</br>Tax(@ 8.0%): '+tax+'</br>Total: '+total+'</div>';
					cart = cart +'<div style="float:right;clear:both;margin-top:20px;"><input type="button" class="checkout-button" onclick="checkout();" value="Proceed to Checkout"/></div>';
					$('#shoppingCart').html(cart);
				}
			},
			error: function(xhr) {
				console.log(xhr);
			//Do Something to handle error
			}
		});
	/*
	  var cart = '<div class="row desktop" style="border-bottom: 1px solid grey;">'+
			'<div class="six columns ">Item</div>'+
			'<div class="two columns ">Quantity</div>'+
			'<div class="two columns ">Price</div>'+
			'<div class="two columns ">SubTotal</div>'+
		'</div>';
		var id;
		cart = cart+'<div class="row box" >'+
						  '<div class="six columns order-label">'+
							'<div class="row restaurentName" >Pizookie</div>'+
							'<div class="row restaurentInfo" >IceCream With Cookie</div>'+
							'<div class="row" ><a href="javascript:void(0)" onclick="deleteItem("id");">Delete</a></div>'+
						  '</div>'+
						  '<div class="two columns">'+
							'<input type="number" style="height:2em;" value="1" min="1" max="10" onchange="updateServerSideCart("id",this.value);"/>'+
						  '</div>'+
						  '<div class="two columns">'+
							'<span>$15.22</span>'+
						  '</div>'+
						  '<div class="two columns">'+
							'<span id="total'+id+'">$15.22</span>'+
						  '</div>'+
						'</div>';
		//cart = cart +'<div style="float:right; text-align:right;">Subtotal: '+json.subtotal+'<br/>Discount: -$0</br>Tax(@ 8.0%): '+json.discount+'</br>Total: '+json.total+'</div>';
		cart = cart +'<div style="float:right;clear:both;margin-top:20px;"><input type="button" class="checkout-button" onclick="checkout();" value="Proceed to Checkout"/></div>';
	$('#shoppingCart').html(cart);
	*/
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