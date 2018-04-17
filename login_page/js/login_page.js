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
		$(".email-signup").hide();
		$("#signup-box-link").click(function(){
		  $(".email-login").fadeOut(100);
		  $(".email-signup").delay(100).fadeIn(100);
		  $("#login-box-link").removeClass("active");
		  $("#signup-box-link").addClass("active");
		});
		$("#login-box-link").click(function(){
		  $(".email-login").delay(100).fadeIn(100);;
		  $(".email-signup").fadeOut(100);
		  $("#login-box-link").addClass("active");
		  $("#signup-box-link").removeClass("active");
		});
    });
	
	$("#login").click(function(){
		$("#signinForm").validate({
            rules: {
               login_username: {
                  required: true,
                  email:true
 
               },
               login_password: {
                  required: true,
                  minlength: minPassLen
 
               },
            },
            messages: {
               login_username: {
                  required: "Username required",
                  email: usernameMsg
               },
               login_password: {
                  required: "Password required",
                  minlength: passwordMsg
               }
            },
			submitHandler : function(form){
				$.ajax({
					url: "https://foodscribe-backend.herokuapp.com/token",
					data: JSON.stringify({ 
							username: $('#login_username').value, 
							password: $('#login_password').value 
						}),
					type: "POST", //send it through get method
					success: function(json) {
						var resString = '';
						console.log(json);
						window.localStorage.setItem("token", json.token);
					},
					error: function(xhr) {
					//Do Something to handle error
					},
					contentType: "application/json; charset=utf-8",
					dataType : "json"
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
				//window.location.href = '../register_page/register_page.html';
				$.ajax({
					type: "POST",
					url: "https://foodscribe-backend.herokuapp.com/user/newUser",
					data: JSON.stringify({
							'username': 'test', 
							'email' : $('#signup_email').value,
							'password' : $('#signup_password').value							
						}),
					contentType: "application/json; charset=utf-8",
					dataType : "json",
					 //send it through get method
					success: function(json) {
						var resString = '';
						console.log(json);
						window.localStorage.setItem(token, json.token);
						window.location.href = '../register_page/register_page.html';
					},
					error: function(xhr) {
					//Do Something to handle error
					}
				});
			}
         });
	});
	
  // The rest of your code goes here!
}));
