var mobile = false;
(function($) {
        // The DOM is ready!
        // The DOM is ready!
        var $window = $(window),
        $menu = $('#menu');
        $window.resize(function resize(){
          if ($window.width() < 960) {
            mobile=true;
            return $menu.addClass('mobile');
          }
          mobile=false;
          $menu.removeClass('mobile');
        }).trigger('resize');



          //section to check if user is logged in
          var items = localStorage.getItem('token');
          if (items === null || items.length === 0){
            $('#loggedInHeader').addClass('header_login');
            $('#shoppingCart').addClass('header_login');
          }else{
            $('#loginHeader').addClass('header_login');
            $.ajax({
              url: "https://foodscribe-backend.herokuapp.com/user/getLastName/"+items,
              contentType: "text/xml",
              type: "GET", //send it through get method
              success: function(json) {
                console.log('test');
                  $('#loggedUser').html('Welcome back '+json+'!');
              },
              error: function(xhr) {
              //Do Something to handle error
              }
            });

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

              doAjax();
              var interval = 5000;


})(jQuery);

function login(){
	localStorage.setItem("backAfterLogin", window.location.href);
}

function doAjax() {
    $.ajax({
            type: 'GET',
            url: 'https://foodscribe-backend.herokuapp.com/cart/funfacts',
            contentType: 'xml/text',
            success: function (data) {
              console.log(data);
                    $('#facts').html('<p>'+data+'</p>');// first set the value
            },
            complete: function(data){
                if(mobile)
                setTimeout(doAjax, 3000);
            }
    });
}

function logoutLogic(){
  localStorage.removeItem("token");
}


//header section - for mobile and subheader
