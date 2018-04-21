var parameters = '';
var minPassLen = 8, maxPassLen = 4096;
var passwordMsg = "Password must greater than " + minPassLen + " characters";
var usernameMsg = "Please enter a valid email address";
var matchpassword = "The Passwords do not match";
jQuery.validator.setDefaults({
	    //Avoids form submit. Comment when in production.
	success: "valid",
	submitHandler: function() {
	   alert("Success! The form was pretend-submitted!");
	}
});
(function(yourcode) {
    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);
}(function($, window, document) {
    // The $ is now locally scoped 
    $(function() {
        // The DOM is ready!
		
		var headers = {
			userid: Number.parseInt(localStorage.getItem("token"))
		};
		var color_code ='';
		$.ajax({
			url: "https://foodscribe-backend.herokuapp.com/order/orderList",
			headers : headers,
			contentType: "application/json; charset=utf-8",
			type: "get", //send it through get method
			success: function(json) {
				console.log(json);
				if(json != ''){
					$.each(json, function(i, item) {

						//$('#orderTable').addClass('emptyjson');
						/*
						switch(item.orderStatus){
							case "In Progress": color_code = 'color-code-progress';
											break;
							case "Delivered":  color_code = 'color-code-delivered';
											break;
							default:  color_code = 'color-code-progress';
											break;
						}*/
						var tableRec =	'<tr>'+
								'<td class="'+color_code+'"><a href="../tracking_page/tracking_page.html?orderId='+item.id+'">#'+item.id+'</a></td>'+
								'<td>'+item.orderDate+'</td>'+
								'<td>'+item.orderTotal+'</td>'+
								'<td>'+item.orderStatus+'</td>'+
							'</tr>';
							$('#tableBody').append(tableRec);
					
					});
				}
				var table = $('#orderTable').DataTable({
					responsive: true
				});
				
				table.on( 'click', 'tr', function () {
					if ( $(this).hasClass('selected') ) {
						$(this).removeClass('selected');
					}
					else {
						table.$('tr.selected').removeClass('selected');
						$(this).addClass('selected');
						
					}
				});
				
			},
			error: function(xhr) {
			//Do Something to handle error
			}
		});	
		
		
		
		
		
		
		
    });
	
  // The rest of your code goes here!
}));
