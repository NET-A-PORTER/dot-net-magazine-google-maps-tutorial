MapTutorial.Service.Photos = {
	
	search: function(success,error){
		var _url = "http://api.flickr.com/services/rest/"
		    
		    +"?method=flickr.panda.getPhotos"             // The API method to get photos
		    
		    +"&api_key="+MapTutorial.configObject.apiKey  // Our unique API key
		    
		    +"&panda_name=wang+wang"                      // Panda server with Geo-tagged images
    		    +"&extras=geo"                                // Include lat-long values in response
   		    
   		    +"&per_page=1&page=1"                         // Pagination of results
		    
		    +"&format=json"                               // Response in JSON notation
		    
		    +"&jsoncallback=?";	                          // JSONP wrapper function name. 
		                                                  // "?" replaced by jQuery with callback
		                                                  // function name
		    
		$.ajax({
			url:_url,
			dataType:'jsonp',
			success:success,
			error:error
		})
	}
}