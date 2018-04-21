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
    });
	
	$("#updateInfo").click(function(){
		$("#registerForm").validate({
            rules: {
               lastName: {
                  required: true
               }
            },
            messages: {
               lastName: {
                  required: "Last Name required",
               }
            },
			submitHandler : function(form){
				console.log(localStorage.getItem('token'));
				$.ajax({
					url: "https://foodscribe-backend.herokuapp.com/user/updateUserInfo",
					data: JSON.stringify({ 
							userid : Number.parseInt(localStorage.getItem('token')),
							firstName: $('#firstName').val(), 
							lastName: $('#lastName').val(),
							phone: $('#phone').val()
						}),
					type: "POST", //send it through get method
					success: function(json) {
						var resString = '';
						console.log(json);
						if(json == "Update Success"){
							//var backAction = localStorage.getItem('backFromLogin');
							//window.location.href=backAction;
						}
					},
					error: function(xhr) {
					//Do Something to handle error
					console.log('error');
					},
					contentType: "application/json; charset=utf-8"
				});
			}
         });
	});
	
	
	$("#signup").click(function(){
		$("#signupForm").validate({
            rules: {
               signup_email: {
                  required: true,
                  email:true
               },
               signup_password: {
                  required: true,
                  minlength: minPassLen
               },
			   signup_confirmPass: {
				   equalTo: "#signup_password"
			   }
            },
            messages: {
               login_username: {
                  required: "Username required",
                  email: usernameMsg
               },
               login_password: {
                  required: "Password required",
                  minlength: passwordMsg
               },
			   signup_confirmPass : {
				   equalTo : matchpassword
			   }
            },
			submitHandler : function(form){
				console.log('signup');
				/*$.ajax({
					url: "https://foodscribe-backend.herokuapp.com/token",
					data: { 
							username: $('#login_username').value, 
							password: $('#login_password').value 
						},
					type: "post", //send it through get method
					success: function(json) {
						var resString = '';
						console.log(json);
						window.localStorage.setItem(token, json.token);
					},
					error: function(xhr) {
					//Do Something to handle error
					}
				});*/
			}
         });
	});
	
  // The rest of your code goes here!
}));
