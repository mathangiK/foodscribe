(function($) {
        // The DOM is ready!
        console.log('test');
})(jQuery);


function updateUser(){
  console.log("updateUser");
    $('#registerForm').validate({
      rules: {
          lastName: {
              required: true
          },
          phoneno : {
              minlength:10,
              maxlength:10
          }
      },
      messages: {
          lastName: {
              required: "Last Name required"
          }
      },
      submitHandler: function(form) {
          console.log(localStorage.getItem('token'));

          $.ajax({
              url: "https://foodscribe-backend.herokuapp.com/user/updateUserInfo",
              data: JSON.stringify({
                  userid: Number.parseInt(localStorage.getItem('token')),
                  firstName: $('#firstName').val(),
                  lastName: $('#lastName').val(),
                  phone: $('#phoneno').val()
              }),
              type: "POST", //send it through get method
              success: function(json) {
                  var resString = '';
                  console.log(json);
                  if (json == "Update Success") {
                      var backaction = localStorage.getItem('backAfterLogin');
                      console.log('backaction:' + backaction);
                      localStorage.removeItem('backAfterLogin');
                      if(backaction == null || typeof(backaction) == 'undefined')
                          window.location.href = '../index.html';
                      else
                        window.location.href= backaction;
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
  }
