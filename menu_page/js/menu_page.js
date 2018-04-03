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
				url: "https://foodscribe-backend.herokuapp.com/restaurant/"+parameters,
				type: "get", //send it through get method
				success: function(json) {
					var count = 0;
					var resString = '';
					$.each(json, function(i, item) {
						resString = '<div class="restaurent_header">'+
										'<div id="open_timings" >Open Hours: '+item.OpenHours+'</div>'+     
									'</div>'+
									'<div class="row restaurent_highlight">'+
										'<img class="display-inline-item" src="//logo.clearbit.com/'+item.LogoName+'?size=60" alt="'+item.Name+'" />'+
										'<span class="display-inline-item" >'+
											'<div id="RestaurentName">'+item.Name+'</div>'+
											'<div id="RestaurentInfo">'+item.Rating+' - '+item.Cusine+' - '+item.Expense+'</div>'+
										'</span>'+
									'</div>';
						
					})
					$("#"+divElement).html(resString);
				},
				error: function(xhr) {
				//Do Something to handle error
				}
			});
			
			/*
			$.getJSON("../selectedrest.json", function(json) {
				var count = 0;
				var resString = '';
				$.each(json, function(i, item) {
					resString = '<div class="restaurent_header">'+
									'<div id="open_timings" >Open Hours: '+item.OpenHours+'</div>'+     
								'</div>'+
								'<div class="row restaurent_highlight">'+
									'<img class="display-inline-item" src="//logo.clearbit.com/'+item.LogoName+'?size=60" alt="'+item.Name+'" />'+
									'<span class="display-inline-item" >'+
										'<div id="RestaurentName">'+item.Name+'</div>'+
										'<div id="RestaurentInfo">'+item.Rating+' - '+item.Cusine+' - '+item.Expense+'</div>'+
									'</span>'+
								'</div>';
					
				})
				$("#"+divElement).html(resString);
			});	*/					
		}
		
		if(divElement == 'menu_sections'){
			
			$.ajax({
				url: "https://foodscribe-backend.herokuapp.com/menu/"+parameters,
				type: "get", //send it through get method
				success: function(json) {
					console.log(json);
					var resString = '<table id="cart" class="table table-hover table-condensed menu-list">'+
					'<thead><tr>'+
						'<td  style="display:inline-block;width:100%;text-align:left;border-bottom: 1px solid #E1E1E1;">'+
							'<h4 id="category_heading">'+json[0].itemCategory+'</h4>'+
						'</td>'+
					'</tr></thead>'+
					'<tbody>';
					var categoryName = json[0].itemCategory;
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
									'<td data-th="Product" style="width:70%">'+
										'<div>'+
											'<span>'+
											  '<h5 id="product_name">'+item.itemName+'</h5>'+
											  '<p id="product_description">'+item.itemDesc+'</p>'+
											'</span>'+
										'</div>'+
									'</td>'+
									'<td data-th="Price" style="width:30%">'+item.itemPrice+'</td>'+	
									'<td data-th="Quantity" style="width:30%">'+
										'<input type="number" id="'+item.id+'" class="form-control text-center" value="0" min="0" max="10">'+
									'</td>'+
								'</tr>';
					});
					
					resString = resString + '</tbody></table><div style="margin-top:5px;"><div style="float:left;margin-left:2%"><button class="button-primary"><i class="fa fa-angle-left"></i>More Food</button></div><div style="float:right;margin-right:2%"><button class="button-primary">Checkout <i class="fa fa-angle-right"></i></button></div></div>';
				$("#" + divElement).html(resString);
				},
				error: function(xhr) {
				//Do Something to handle error
				}
			});
			
			
			/*
			$.getJSON("../menuitems.json", function(json) {
				var resString = '<table id="cart" class="table table-hover table-condensed menu-list">'+
					'<thead><tr>'+
						'<td  style="display:inline-block;width:100%;text-align:left;border-bottom: 1px solid #E1E1E1;">'+
							'<h4 id="category_heading">'+json[0].Category+'</h4>'+
						'</td>'+
					'</tr></thead>'+
					'<tbody>';
				var categoryName = json[0].Category;
				$.each(json, function(i, item) {
					if(categoryName != item.Category){
						resString = resString + '</tbody></table><table id="cart" class="table table-hover table-condensed menu-list">'+
						'<thead><tr>'+
							'<td  style="display:inline-block;width:100%;text-align:left;border-bottom: 1px solid #E1E1E1;">'+
								'<h4 id="category_heading">'+item.Category+'</h4>'+
							'</td>'+
						'</tr></thead>'+
						'<tbody>';
						categoryName = item.Category;
					}
					resString = resString + '<tr>'+
								'<td data-th="Product">'+
									'<div>'+
										'<span>'+
										  '<h5 id="product_name">'+item.Name+'</h5>'+
										  '<p id="product_description">'+item.Ingredients+'</p>'+
										'</span>'+
									'</div>'+
								'</td>'+
								'<td data-th="Price">'+item.Cost+'</td>'+	
								'<td data-th="Quantity">'+
									'<input type="number" id="'+item.MenuItemId+'" class="form-control text-center" value="0" min="0" max="10">'+
								'</td>'+
							'</tr>';
				});
				
				resString = resString + '</tbody></table><div class="row"><div class="one column"><button class="button-primary"><i class="fa fa-angle-left"></i>More Food</button></div><div class="offset-by-nine one column"><button class="button-primary">Checkout <i class="fa fa-angle-right"></i></button></div></div>';
				$("#" + divElement).html(resString);
			});*/
		}

    }


  // The rest of your code goes here!

}));
