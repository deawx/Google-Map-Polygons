//Initializing the google map with roadmap view

function init(){
	var myDiv = document.getElementById("mymap");
	var mapOptions = {
		center: new google.maps.LatLng(37.820667, -122.478526),
		zoom: 3,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(myDiv, mapOptions);

	var locations = [
	new google.maps.LatLng(36.255123, -115.2383485),
	new google.maps.LatLng(40.7143528, -74.00597309999),
	new google.maps.LatLng(23.634501, -102.552784)
	];

	var polyggonOptions = {
		path: locations,
		editable: true,
		draggable: true
	};

	polygon = new google.maps.Polygon(polyggonOptions);

	polygon.setMap(map);

	google.maps.event.addListener(polygon.getPath(), "insert_at", polygonCoordinates);
	google.maps.event.addListener(polygon.getPath(), "set_at", polygonCoordinates);

}

//Imported latitudes and longitudes from textarea and spliting them based on comma seperators

function importLatLng(splitValue){
	var latlng = [];
	var locations = [];
	for (var i = 0; i < splitValue.length; i++) {
		latlng = splitValue[i].split(",");
		locations.push ( new google.maps.LatLng(latlng[0], latlng[1]) );
	}

	var polyggonOptions = {
		path: locations,
		editable: true,
		draggable: true
	};

	polygon.setMap(null);

	polygon = new google.maps.Polygon(polyggonOptions);

	polygon.setMap(map);

	google.maps.event.addListener(polygon.getPath(), "insert_at", polygonCoordinates);
	google.maps.event.addListener(polygon.getPath(), "set_at", polygonCoordinates);
};

//Printing the coordinates as result/output

function polygonCoordinates(){
	var len = polygon.getPath().getLength();
	var str = "";
	for (var i = 0; i < len; i++) {
		if(i==len-1){
			str+= polygon.getPath().getAt(i).toUrlValue(3); 
		}else{
			str+= polygon.getPath().getAt(i).toUrlValue(3) + "\n"; 
		}

	}

	var p = document.getElementById("info");
	p.value = str;

};

// Getting the latlng from textarea and Spliting the latlng based on new line

function textArea(){
	var text = document.getElementById("info").value;
	var splitValue = [];
	splitValue = text.split("\n");
	importLatLng(splitValue);
}

window.onload = init;
