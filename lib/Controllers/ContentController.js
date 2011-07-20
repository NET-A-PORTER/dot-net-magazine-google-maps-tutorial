MapTutorial.Controllers.ContentController = function(){
	var topScope = this;

    // Publically available to DocumentController to process update event.
    // Could pass this in custom event if jQuery > 1.6
   	this.currentPhoto;   	
    
    var apiFetchTimer;
	var updateDisplayTimer;

    // Call the Photo service to load more photos, passing callback functions
	this.fetchNewPhotos = function(){
		MapTutorial.Service.Photos.search(processNewPhotos,error);
	}
	
	// Function to process a whole new set of photos
	var processNewPhotos = function(flickrResponse){

        // Confusingly flickrResponse.photos.photo is actually an array
        var currentPhotoSet = flickrResponse.photos.photo;

        // For simplicity, we always cancel the 'update display' timer
        // and re-check we have anything to show
        if (updateDisplayTimer) {
            clearInterval(updateDisplayTimer);
        }
        if ((currentPhotoSet) && (currentPhotoSet.length > 0)) { 
            // Process the first photo
            updateDisplayWithNextPhotoInSet(currentPhotoSet);
            
            // Setup timer to process remaining photos in set
            updateDisplayTimer = setInterval(function(){
                updateDisplayWithNextPhotoInSet(currentPhotoSet);
            },4000); // Update display every 4 seconds
        }
        
        // If first response from the API start the API fetch timer
        if (!apiFetchTimer) { 

            // Update the fetch interval based on API response (returned in seconds)
            // (Demo assumes this won't change)
            var apiFetchIntervalMs = flickrResponse.photos.interval * 1000; 
       		
            // Start the API fetch timer		
		    apiFetchTimer = setInterval(topScope.fetchNewPhotos,apiFetchIntervalMs);
        };

	}

	var updateDisplayWithNextPhotoInSet = function(currentPhotoSet){
        var photo = currentPhotoSet.shift(); 
        if(photo){
            topScope.currentPhoto = photo;
            var evt = jQuery.Event("newFlickrActivity");
            $(document).trigger(evt);
		}
	}
	
	var error = function(data){
		// TODO Handle errors!
	}
}