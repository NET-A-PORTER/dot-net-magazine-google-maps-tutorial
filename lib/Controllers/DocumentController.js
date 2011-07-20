MapTutorial.Controllers.DocumentController = function(){
	this.init = function(){
		
		//set up event routing
		$(document).bind('newFlickrActivity',function(data){
			var photo = contentControl.currentPhoto;
			mapControl.addNewActivity(photo);
			
		})
		
		var mapControl = new MapTutorial.Controllers.MapController();
		mapControl.initialiseMap();
		
		var contentControl = new MapTutorial.Controllers.ContentController();
		contentControl.fetchNewPhotos();
	}
}