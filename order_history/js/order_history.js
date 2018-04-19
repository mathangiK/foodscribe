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
		} );
		
    });
	
  // The rest of your code goes here!
}));
