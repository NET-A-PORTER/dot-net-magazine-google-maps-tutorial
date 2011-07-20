MapTutorial.Controllers.MapController = function(){
	var map;
	var markerIcon;
	var marker;
	var infoBox;
	var infoBoxContent;
	
	this.initialiseMap = function(){
        // Centre the map and markers to start
		var latlng = new google.maps.LatLng(0, 0);
        // Construct the map element and specify "mapContainer" as it's container div id
	    var mapOptions = {
	      zoom: 3,                                      
	      center:latlng,                                
	      mapTypeId: google.maps.MapTypeId.SATELLITE    // Use default satelite tiles
	    };
	    map = new google.maps.Map(document.getElementById("mapContainer"), mapOptions);


        // Create a MarkerImage that will be used as the icon in the marker
		markerIcon = new google.maps.MarkerImage("images/MarkerIcon.png");
	    
        // Create the actual Marker object by passing a reference to the map and the marker icon
	    marker = new google.maps.Marker({
		    position: latlng,
		    map: map,
		    icon:markerIcon,
		    animation: google.maps.Animation.DROP,
		    visible:false   // Invisible to start as we have nothing to show
		});


        // Create the InfoBox content div container and assign it with a class name
        // so we can style with CSS
		infoBoxContent = document.createElement("div");
		infoBoxContent.className="infoBoxContent";

        // Create the InfoBox element.  Note that the default class name assigned to the 
        // InfoBox is "infoBox" - see CSS file.
        var ibOptions = {
                // Include the content container div
                content: infoBoxContent,    

                // Position and style the info box properties not managed in ".infoBox" CSS  
                // See http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/docs/reference.html#InfoBoxOptions
                pixelOffset: new google.maps.Size(-5, -10),
                closeBoxMargin: "0px 0px 0px 0px",
                closeBoxURL: "images/CloseButton.png",
                infoBoxClearance: new google.maps.Size(1, 1),

                // Invisible to start as we have nothing to show
                isHidden:false 
        };
        infoBox = new InfoBox(ibOptions)
	    
	    // Reveal the InfoBox when the user clicks the Marker
        google.maps.event.addListener(marker, 'click', function() {
        		infoBox.open(map,marker);
        		infoBox.show();
	    });
        // Hide the InfoBox when the user clicks the close box in the InfoBox
        google.maps.event.addListener(infoBox, 'closeclick', function() {
                infoBox.hide();
        });



	}
	
	// Moves the marker to the lat & long of the new phot.  
	// Fills the infobox with the new photo data and displays additional data
	this.addNewActivity = function(photo){
		// Workaround issue with IE
		infoBox.close();
		
        // Derive the lat-long from the photo. Pan the map to that location
		var latLng = new google.maps.LatLng(photo.latitude,photo.longitude);
		map.panTo(latLng);
		
		// Also update the poistion of the marker to that location and ensure it's visible
		marker.setPosition(latLng);
		marker.setVisible(true);  		
		
		// Construct the image URL that will retrieve the current photograph
		// using the standard Flickr URL convention
		var imageURL= "http://farm" + photo.farm + ".static.flickr.com/"
		                  + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg";

        // Build a string containing the InfoBox contents HTML
		var infoBoxContentsHTML = '<div class="imageBorder imageBorderTop"></div>';
		infoBoxContentsHTML +=    '<img class="flickrImage" width="240" src="' + imageURL + '" />';
		infoBoxContentsHTML +=    '<div class="imageBorder imageBorderBottom"></div>';
		infoBoxContentsHTML +=    '<div class="photoInfoContainer"><ul>';
		infoBoxContentsHTML +=    '<li class="flickrPhotoTitle">' + photo.title + '</li>'
		infoBoxContentsHTML +=    '<li class="flickrPhotoUser">' + photo.ownername + '</li></ul></div>';
		
		// Set this string as the content HTML
		infoBoxContent.innerHTML = infoBoxContentsHTML;
		
		// Set the new content div to the infoBox container and open
		infoBox.setContent(infoBoxContent);
        infoBox.open(map,marker);
	}
	

	

}