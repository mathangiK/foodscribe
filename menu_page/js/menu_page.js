var parameters = '';
(function(yourcode) {
    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped 
    $(function() {

        // The DOM is ready!

        parameters = getUrlParameter('restid');
        console.log(parameters);
        //if (parameters != typeof(undefined)) 
			pullResData('restaurent_context');
		pullResData('menu_sections');

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

    var pullResData = function(divElement) {
		
		if(divElement == 'restaurent_context'){
			
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
	console.log(itemid + ":$::" +quantity);
	
	$.ajax({
		url: "https://foodscribe-backend.herokuapp.com/cart/add",
		data: JSON.stringify({ 
				'menuitemid': itemid, 
				'qty': quantity
			}),
		type: "POST", //send it through get method
		success: function(json) {
			var resString = '';
			console.log(json);	
		},
		error: function(xhr) {
		//Do Something to handle error
		console.log(xhr)
		},
		contentType: "application/json; charset=utf-8",
		dataType : "json"
	});
	
}

function proceed(){
	window.location.href = '../shopping_cart/shopping_cart.html';
}