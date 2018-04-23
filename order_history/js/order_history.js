var parameters = '';
var minPassLen = 8,
    maxPassLen = 4096;
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

        //section to check if user is logged in
        var items = localStorage.getItem('token');
        if (items === null || items.length === 0) {
            localStorage.setItem("backAfterLogin", window.location.href);
            window.location.href = "../login_page/login_page.html";
        }

        var headers = {
            userid: Number.parseInt(localStorage.getItem("token"))
        };
        var color_code = '';
        $.ajax({
            url: "https://foodscribe-backend.herokuapp.com/order/orderList",
            headers: headers,
            contentType: "application/json; charset=utf-8",
            type: "get", //send it through get method
            success: function(json) {
                console.log(json);
                if (json != '') {
                    var tableRec = '';

                    $.each(json, function(i, item) {

                        switch (item.orderStatus) {
                            case "In Progress":
                                color_code = 'color-code-progress';
                                break;
                            case "Delivered":
                                color_code = 'color-code-delivered';
                                break;
                            default:
                                color_code = 'color-code-progress';
                                break;
                        }

                        tableRec = tableRec + '<tr>' +
                            '<td class="' + color_code + '"><a href="../tracking_page/tracking_page.html?orderId=' + item.id + '">#' + item.id + '</a></td>' +
                            '<td>' + item.orderDate + '</td>' +
                            '<td>' + item.orderTotal + '</td>' +
                            '<td>' + item.orderStatus + '</td>' +
                            '</tr>';
                        console.log(tableRec);

                    });
                    $('#tableBody').html(tableRec);
                } else {
                    $('#orderTable').addClass('emptyjson');
                }

                var table = $('#orderTable').DataTable({
                    responsive: true
                });

                table.on('click', 'tr', function() {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    } else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');

                    }
                });

            },
            error: function(xhr) {
                //Do Something to handle error
            }
        });

        //header section - for mobile and subheader
        $('#menu li.sub').on('click', function(e) {
            e.stopPropagation();
            $(this).toggleClass('open');
            $(this).siblings().removeClass('open');
        });
        $(document).on('click', function() {
            $('#menu li.sub').removeClass('open');
        });
        /* TOGGLE SLIDE MOBILE MENU */
        $('#mobbtn').on('click', function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).html("&#9776;");
                $('.mobile').animate({
                    right: "-220px"
                });
                $(this).animate({
                    right: "0"
                });
            } else {
                $(this).addClass('active');
                $(this).html("&#9587;");
                $('.mobile').animate({
                    right: "0",
                });
                $('#mobbtn').animate({
                    right: "220px"
                });
            }
        });
        $('.content').on('click', function() {
            if ($('#mobbtn').hasClass('active')) {
                $('#mobbtn').removeClass('active');
                $('#mobbtn').html("&#9776;");
                $('.mobile').animate({
                    right: "-220px"
                });
                $('#mobbtn').animate({
                    right: "0"
                });
            }
        });

    });

    // The rest of your code goes here!
}));

function login() {
    localStorage.setItem("backAfterLogin", window.location.href);
}

function logoutLogic() {
    localStorage.removeItem("token");
    window.location.href = "../index.html";
}
