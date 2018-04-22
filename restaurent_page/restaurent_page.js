var parameters = '';
var allRecords = [];
var freeDeliveryArray = [];
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


    var items = localStorage.getItem('token');
    if (items === null || items.length === 0){
      $('#loggedInHeader').addClass('header_login');
      $('#shoppingCart').addClass('header_login');
    }else{
      $('#loginHeader').addClass('header_login');
    }


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


        parameters = getUrlParameter('locationInfo');
        console.log(parameters);
        if (parameters != typeof(undefined)) {
  			     pullResData('nearestRestaurents','');
  		  }
        $('#showMoreNearest').bind('click', function() {
            hideSection('Nearest')
        });
        $('#showMoreFreeDelivery').bind('click', function() {
            hideSection('FreeDelivery')
        });
    });


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

    var pullResData = function(divElement,type) {

		if(divElement != 'restaurentList'){

			$.ajax({
			  url: "https://foodscribe-backend.herokuapp.com/restaurant/"+parameters,
			  type: "get", //send it through get method
			  success: function(json) {
				  if(json == ''){
					  $('#initialSection').hide();
					  $('#showMore').hide();
					  $('#NoRest').show();
					  return;
				  }
				allRecords = json;
				var count = 0;
				var resString = '<div class="row">';
				$.each(json, function(i, item) {
					if(item.deliveryCost == 'Free Delivery' || item.deliveryCost == 'Free delivery')
						freeDeliveryArray.push(item);
					if (i >= 4) {
						return;
					}
					var cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
					switch (item.cuisine) {
						case 'Indian':
						case 'Thai':
						case 'Italian':
						case 'Mexican':
						case 'American':
						case 'Colombian':
						case 'Mexican':
							cusineURL = "images/" + item.cuisine + ".jpg";
							break;
						default:
							cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
							break;
					}
					var code = '<div class="three columns">' +
						'<div class="restaurent-card" style="cursor:pointer;" onClick="redirectToMenuPage(' + item.id + ')">' +
						'<div class="aside">' +
						'<img style="width:100%;object-fit: cover;max-height: 90px;" src="' + cusineURL + '" alt="' + item.cuisine + '">' +
						'</div>' +
						'<article>' +
						'<div class="mobile_cards">' +
						'<img class="inline-item logo-style" src="//logo.clearbit.com/' + item.logoName + '?size=60" alt="' + item.restaurantName + '" />' +
						'<span class="inline-item">' +
						'<div class="checkoverflow textStyling" title="' + item.restaurantName + '">' + item.restaurantName + '</div>' +
						'<div>' + item.cuisine + '</div>' +
						'</span>' +
						'</div>' +
						'<div class="row desktop_card">' +
						'<div class="three columns ">' +
						'<img class="image_box" src="//logo.clearbit.com/' + item.logoName + '?size=60" alt="'+item.restaurantName+'" />' +
						'</div>' +
						'<div class="eight columns">' +
						'<div class="checkoverflow restaurent-name" title="' + item.restaurantName + '" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + item.restaurantName + '</div>' +
						'<div class="restaurent-cuisine"><i>' + item.cuisine + '</i></div>' +
						'</div>' +
						'</div>' +
						'</article>' +
						'</div></div>';
						resString = resString + code;
				});
				resString = resString + '</div>';
				$("#" + divElement).html(resString);


				var freeDeliveryString = '<div class="row">';
				$.each(freeDeliveryArray, function(i, item) {
					if (i == 4) {
						return false;
					}
					var cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
					switch (item.cuisine) {
						case 'Indian':
						case 'Thai':
						case 'Italian':
						case 'Mexican':
						case 'American':
						case 'Colombian':
						case 'Mexican':
							cusineURL = "images/" + item.cuisine + ".jpg";
							break;
						default:
							cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
							break;
					}
					var code = '<div class="three columns">' +
						'<div class="restaurent-card" style="cursor:pointer;" onClick="redirectToMenuPage(' + item.id + ')">' +
						'<div class="aside">' +
						'<img style="width:100%;object-fit: cover;max-height: 90px;" src="' + cusineURL + '" alt="' + item.cuisine + '">' +
						'</div>' +
						'<article>' +
						'<div class="mobile_cards">' +
						'<img class="inline-item logo-style" src="//logo.clearbit.com/' + item.logoName + '?size=60" alt="' + item.restaurantName + '" />' +
						'<span class="inline-item">' +
						'<div class="checkoverflow textStyling" title="' + item.restaurantName + '">' + item.restaurantName + '</div>' +
						'<div>' + item.cuisine + '</div>' +
						'</span>' +
						'</div>' +
						'<div class="row desktop_card">' +
						'<div class="three columns ">' +
						'<img class="image_box" src="//logo.clearbit.com/' + item.logoName + '?size=60" alt="'+item.restaurantName+'" />' +
						'</div>' +
						'<div class="eight columns">' +
						'<div class="checkoverflow restaurent-name" title="' + item.restaurantName + '" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + item.restaurantName + '</div>' +
						'<div class="restaurent-cuisine"><i>' + item.cuisine + '</i></div>' +
						'</div>' +
						'</div>' +
						'</article>' +
						'</div></div>';
						freeDeliveryString += code;
				});
				freeDeliveryString += '</div>';
				$("#freeDelivery").html(freeDeliveryString);
			  },
			  error: function(xhr) {
				//Do Something to handle error
			  }
			});
		}else{
			var jsonRecs =[];
			if(type == 'FreeDelivery')
				jsonRecs = freeDeliveryArray;
			else
				jsonRecs = allRecords;
			var freeDeliveryString = '<div class="row">';
			$.each(jsonRecs, function(i, item) {
				if (i % 4 == 0 && i != 0) {
					freeDeliveryString += '</div><div class="row">';
				}
				var cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
				switch (item.cuisine) {
					case 'Indian':
					case 'Thai':
					case 'Italian':
					case 'Mexican':
					case 'American':
					case 'Colombian':
					case 'Mexican':
						cusineURL = "images/" + item.cuisine + ".jpg";
						break;
					default:
						cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
						break;
				}
				var code = '<div class="three columns">' +
					'<div class="restaurent-card" style="cursor:pointer;" onClick="redirectToMenuPage(' + item.id + ')">' +
					'<div class="aside">' +
					'<img style="width:100%;object-fit: cover;max-height: 90px;" src="' + cusineURL + '" alt="' + item.cuisine + '">' +
					'</div>' +
					'<article>' +
					'<div class="mobile_cards">' +
					'<img class="inline-item logo-style" src="//logo.clearbit.com/' + item.logoName + '?size=60" alt="' + item.restaurantName + '" />' +
					'<span class="inline-item">' +
					'<div class="checkoverflow textStyling" title="' + item.restaurantName + '">' + item.restaurantName + '</div>' +
					'<div>' + item.cuisine + '</div>' +
					'</span>' +
					'</div>' +
					'<div class="row desktop_card">' +
					'<div class="three columns ">' +
					'<img class="image_box" src="//logo.clearbit.com/' + item.logoName + '?size=60" alt="'+item.restaurantName+'" />' +
					'</div>' +
					'<div class="eight columns">' +
					'<div class="checkoverflow restaurent-name" title="' + item.restaurantName + '" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + item.restaurantName + '</div>' +
					'<div class="restaurent-cuisine"><i>' + item.cuisine + '</i></div>' +
					'</div>' +
					'</div>' +
					'</article>' +
					'</div></div>';
					freeDeliveryString += code;
			});
			freeDeliveryString += '</div>';
			$("#restaurentList").html(freeDeliveryString);
		}
    }


    var hideSection = function(type) {
        console.log(type);
        $('#initialSection').hide();

        $('#showMore').show();
        pullResData('restaurentList',type);
		allRecords = [];
        //
    }




    // The rest of your code goes here!

}));


//header section - for mobile and subheader


//this function will redirect to menu page of selected restaurant
function redirectToMenuPage(resId) {
	window.location.href = '../menu_page/menu_page.html?restid='+resId;
    return null;
}


//save the currentURL to be used as back URL after login
function login(){
	localStorage.setItem("backAfterLogin", window.location.href);
}

function logoutLogic(){
  localStorage.removeItem("token");
  window.location.href="../index.html"
}
