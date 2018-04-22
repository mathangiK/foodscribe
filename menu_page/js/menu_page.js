var parameters = '';
(function(yourcode) {
    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped
    $(function() {

    // The DOM is ready!
    var $window = $(window),
		$menu = $('#menu');
		$window.resize(function resize(){
			if ($window.width() < 960) {
			  return $menu.addClass('mobile');
			}
			$menu.removeClass('mobile');
		}).trigger('resize');


    //section to get the paramter from the URL
    parameters = getUrlParameter('restid');
    console.log(parameters);
    //if (parameters != typeof(undefined))
    pullResData('restaurent_context');
    pullResData('menu_sections');

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

  		//section to check if user is logged in
  		var items = JSON.parse(localStorage.getItem('token'))
  		if (items === null || items.length === 0){
  			$('#loggedInHeader').addClass('header_login');
        $('#shoppingCart').addClass('header_login');
  		}else{
  			$('#loginHeader').addClass('header_login');
  		}

    });

	//Function to parse the parameter from the URL
    var getUrlParameter = function getUrlParameter(sParam) {
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

	//populated the data based on the divElement
    var pullResData = function(divElement) {

		if(divElement == 'restaurent_context'){
      //ajax call to retrieve the data from backend
			$.ajax({
				url: "https://foodscribe-backend.herokuapp.com/restaurant/restid/"+parameters,
				type: "get", //send it through get method
				success: function(json) {
					var resString = '';
					console.log(json);
						resString = '<div class="restaurent_header">'+
										'<div id="open_timings" >Open Hours: '+json.openingHours+'</div>'+
									'</div>'+
									'<div class="row restaurent_highlight">'+
										'<img class="display-inline-item" src="//logo.clearbit.com/'+json.logoName+'?size=60" alt="'+json.restaurantName+'" />'+
										'<span class="display-inline-item" >'+
											'<div id="RestaurentName">'+json.restaurantName+'</div>'+
											'<div id="RestaurentInfo">'+json.rating	+' - '+json.cuisine+' - '+json.costScale+'</div>'+
										'</span>'+
									'</div>';

					$("#"+divElement).html(resString);
				},
				error: function(xhr) {
				//Do Something to handle error
				}
			});
		}

		if(divElement == 'menu_sections'){

			$.ajax({
				url: "https://foodscribe-backend.herokuapp.com/menu/"+parameters,
				type: "get", //send it through get method
				header : {
					"Access-Control-Allow-Origin" : "*"
				},
				success: function(json) {
					if(json.length == 0){
						var resString = "<p style='margin-top:3	%;'>We are Sorry! No Menu associated with this Restaurant currently!</p><img style='max-height:100px;' src='images/mascot.png' />";
						$("#" + divElement).html(resString);
						return null;
					}
					var resString = '<table id="cart" class="table table-hover table-condensed menu-list">'+
					'<thead><tr>'+
						'<td  style="display:inline-block;width:100%;text-align:left;border-bottom: 1px solid #E1E1E1;">'+
							'<h4 id="category_heading">'+json[0].itemCategory+'</h4>'+
						'</td>'+
					'</tr></thead>'+
					'<tbody>';
					var categoryName = json[0].itemCategory;
					//console.log(json)
					$.each(json, function(i, item) {
						if(categoryName != item.itemCategory){
							resString = resString + '</tbody></table><table id="cart" class="table table-hover table-condensed menu-list">'+
							'<thead><tr>'+
								'<td  style="display:inline-block;width:100%;text-align:left;border-bottom: 1px solid #E1E1E1;">'+
									'<h4 id="category_heading">'+item.itemCategory+'</h4>'+
								'</td>'+
							'</tr></thead>'+
							'<tbody>';
							categoryName = item.itemCategory;
						}
						resString = resString + '<tr>'+
									'<td data-th="Product" class="product">'+
										'<div>'+
											'<span>'+
											  '<h5 id="product_name">'+item.itemName+'</h5>'+
											  '<span id="product_description">'+item.itemDesc+'</span>'+
											'</span>'+
										'</div>'+
									'</td>'+
									'<td data-th="Price" class="price" >$ '+item.itemPrice+'</td>'+
									'<td data-th="Quantity" class="quantity" >'+
										'<input type="number" id="'+item.id+'" onchange="changeOfQuantity('+item.id+',this.value);" class="text-center" value="0" min="0" max="10">'+
									'</td>'+
								'</tr>';
					});

					resString = resString + '</tbody></table><div style="margin-top:10px;"><div style="float:left;margin-left:2%"><button class="btn"><i class="fa fa-angle-left"></i>More Food</button></div><div style="float:right;margin-right:2%"><button class="btn" onclick="proceed();">Confirm Items<i class="fa fa-angle-right"></i></button></div></div>';
				$("#" + divElement).html(resString);
				},
				error: function(xhr) {
				//Do Something to handle error
				}
			});
		}
    }
	// The rest of your code goes here!
}));

function changeOfQuantity(itemid,quantity){
	//console.log(localStorage.getItem("token"));

	$.ajax({
		url: "https://foodscribe-backend.herokuapp.com/cart/add",
		data: JSON.stringify({
				menuItemId: itemid,
				qty: quantity,
				userid:localStorage.getItem("token")
			}),
		type: "POST", //send it through get method
		success: function(json) {
			var resString = '';
			console.log(json);
		},
		error: function(xhr) {
		//Do Something to handle error
			console.log(xhr);
		},
		contentType: 'application/json; charset=UTF-8',
		dataType : 'text'
	});
	//window.localStorage
}

function proceed(){
	var items = JSON.parse(localStorage.getItem('token'))
	if (items === null || items.length === 0){
		window.location.href = '../login_page/login_page.html';
	}
	window.location.href = '../shopping_cart/shopping_cart.html';
}

function login(){
	localStorage.setItem("backAfterLogin", window.location.href);
}

function logoutLogic(){
  localStorage.removeItem("token");
}


//header section - for mobile and subheader
