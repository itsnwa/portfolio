$(document).ready(function() {

  // Reveal project categories on hover
  $('.project').hover(function() {
    $('p.category', $(this)).slideToggle(150, 'swing');
  });

	var isTouchDevice = 'ontouchstart' in document.documentElement;
	if( isTouchDevice ) {
		$('p.category').show();
	}

  // Unwrap images from p tags
  $('.project-content p > img').unwrap();

  // My info section
  $('.my-info-toggle').click(function() {
    $('.my-info').velocity().slideToggle(600);
  });

  // Fetching all my Instagram photos
  var token = '781603.655b187.9a8d7aedc0d344c08e3cb4d418c09667',
        num_photos = 10;

  $.ajax({
  	url: 'https://api.instagram.com/v1/users/self/media/recent',
  	dataType: 'jsonp',
  	type: 'GET',
  	data: {access_token: token, count: num_photos},
  	success: function(data){
   		console.log(data);
  		for( x in data.data ){
  			$('.instagram-container').append('<div class="instagram-post"><img src="'+data.data[x].images.standard_resolution.url+'"></div>');
  		}
  	},
  	error: function(data){
  		console.log(data);
  	}
  });

  // // Get my current neighborhood location based on Swarm check-ins
  // var config = {
  //   apiKey: 'OA2VTCBFDZYE0KGYDFKSOS1KZ3JH5QORVA4Q551IPYCHHP1I',
  //   authUrl: 'https://foursquare.com/',
  //   apiUrl: 'https://api.foursquare.com/'
  // };

});
