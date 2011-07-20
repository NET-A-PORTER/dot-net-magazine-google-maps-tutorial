function CustomMapType(){
}

CustomMapType.prototype.tileSize = new google.maps.Size(256, 256);
CustomMapType.prototype.maxZoom = 5;		
CustomMapType.prototype.minZoom = 3;		        
CustomMapType.prototype.getTile = function(coord, zoom, ownerDocument){
    var div = ownerDocument.createElement('DIV');
    var numTiles = 1 << zoom;
    var wrappedX = coord.x % numTiles;
    wrappedX = wrappedX >= 0 ? wrappedX : wrappedX + numTiles; 
    div.innerHTML = '<img src="'+appConfig.mapPath+zoom + '/' + wrappedX + '/' + (Math.pow(2,zoom)-coord.y-1)+'.png" />'
    div.style.width = this.tileSize.width + 'px';
    div.style.height = this.tileSize.height + 'px';
    return div;
		
};

CustomMapType.prototype.name = "naplive";
CustomMapType.prototype.alt = "naplive";


// Now attach the custom map type to the map's registry
map.mapTypes.set('coordinate',coordinateMapType);
map.setMapTypeId('coordinate');
