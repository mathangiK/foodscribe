(function(yourcode) {
    // The global jQuery object is passed as a parameter
    yourcode(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped 
    $(function() {

        // The DOM is ready!

        var parameters = getUrlParameter('restInfo');
        console.log(parameters);
        //if (parameters != typeof(undefined)) 
			pullResData('restaurent_context');

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
            $("#" + divElement).html(resString);
        });		
			
			
		}
		

    }


  // The rest of your code goes here!

}));

function redirectToMenuPage(resId) {
    console.log(resId);
    return null;
}