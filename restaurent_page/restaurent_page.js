(function(yourcode) {
    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped 
    $(function() {

        // The DOM is ready!

        var parameters = getUrlParameter('locationInfo');
        console.log(parameters);
        if (parameters != typeof(undefined)) pullResData('nearestRestaurents');

        //$('#showMoreFreeDelivery').click(hideSection('FreeDelivery'));
        //$('#showMoreNearest').click(hideSection('Nearest'));
        $('#showMoreNearest').bind('click', function() {
            hideSection('Nearest')
        });
        $('#showMoreFreeDelivery').bind('click', function() {
            hideSection('FreeDelivery')
        });
        //$('div.restaurent-card').on('click',function(){console.log('test');redirectToMenuPage()});

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

        $.getJSON("../rest.json", function(json) {
            var count = 0;
            var resString = '<div class="row">';
            $.each(json, function(i, item) {

                if (i % 4 == 0 && i != 0) {
                    resString = resString + '</div><div class="row">';
                }
                var cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
                switch (item.Cusine) {
                    case 'Indian':
                    case 'Thai':
                    case 'Burger':
                    case 'Italian':
                        cusineURL = "images/" + item.Cusine + ".jpg";
                        break;
                    default:
                        cusineURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/203277/oatmeal.jpg";
                        break;
                }

                resString = resString + '<div class="three columns">' +
                    '<div class="restaurent-card" style="cursor:pointer;" onClick="redirectToMenuPage(' + item.RestId + ')">' +
                    '<div class="aside">' +
                    '<img style="height: auto; width:100%; overflow:hidden;"  src="' + cusineURL + '" alt="' + item.Cusine + '">' +
                    '</div>' +
                    '<article>' +
                    '<div class="mobile_cards">' +
                    '<img class="inline-item" src="//logo.clearbit.com/' + item.LogoName + '?size=60" alt="' + item.Name + '" />' +
                    '<span class="inline-item">' +
                    '<div class="checkoverflow textStyling" title="' + item.Name + '">' + item.Name + '</div>' +
                    '<div>' + item.Cusine + '</div>' +
                    '<div>This is a test</div>' +
                    '</span>' +
                    '</div>' +
                    '<div class="row desktop_card">' +
                    '<div class="three columns ">' +
                    '<img class="image_box" src="//logo.clearbit.com/' + item.LogoName + '?size=60" alt="Ihop" />' +
                    '</div>' +
                    '<div class="eight columns">' +
                    '<div class="checkoverflow restaurent-name" title="' + item.Name + '" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">' + item.Name + '</div>' +
                    '<div class="restaurent-cuisine"><i>' + item.Cusine + '</i></div>' +
                    '<div>This is a test</div>' +
                    '</div>' +
                    '</div>' +
                    '</article>' +
                    '</div></div>';

            })
            resString = resString + '</div>';
            $("#" + divElement).html(resString);
        });



        /*$.ajax({
		  url: "ajax.aspx",
		  type: "get", //send it through get method
		  data: { 
			ajaxid: 4, 
			UserID: UserID, 
			EmailAddress: EmailAddress
		  },
		  success: function(response) {
			//Do Something
		  },
		  error: function(xhr) {
			//Do Something to handle error
		  }
		});
		*/

    }


    var hideSection = function(type) {
        console.log("yoyo");
        $('#initialSection').hide();


        $('#showMore').show();
        pullResData('restaurentList');
        //
    }
    // The rest of your code goes here!

}));

function redirectToMenuPage(resId) {
    console.log(resId);
    return null;
}