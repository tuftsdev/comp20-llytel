var map;
var myLat = 0;
var myLng = 0;
var me = new google.maps.LatLng(myLat, myLng);
var myOptions = {
	zoom: 13,
	center: me, };
	var infowindow = new google.maps.InfoWindow();

	function initMap() {
		map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
		getMyLocation();
	}

	function getMyLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				myLat = position.coords.latitude;
				myLng = position.coords.longitude;
				renderMap();
				userdata();
			});
		} 
		else {
			alert("Geolocation is not supported by your browser. Sad.");
		}
	}

	function renderMap() {
		me = new google.maps.LatLng(myLat,myLng);
		map.panTo(me)
		var marker = new google.maps.Marker ({
			position: me,
			title: "Here is me!"
		});
		marker.setMap(map);
		google.maps.event.addListener(marker,'click', function() {
			infowindow.setContent(this.title);
			infowindow.open(map,this);
		});
	}

	function userdata() {
		var request = new XMLHttpRequest();
		var data = 'username=ajNnfhJj&lat='+myLat+'&lng='+myLng;
		var url = 'https://hans-moleman.herokuapp.com/rides';

		request.open('POST', url, true)

		request.setRequestHeader('Content-type','application/x-www-form-urlencoded')

		request.onreadystatechange = function() {
			if (request.readyState == 4 && request.status == 200) {
				userdata = JSON.parse(request.responseText);
				//console.log(userdata);
				displaymarkers(userdata);		
			}
		}
		request.send(data);
	}
	function displaymarkers(userdata) { 
		console.log(userdata);
		if (userdata.passengers) { 
			for (i = 0; i < userdata.passengers.length; i++) { 
				if (userdata.passengers[i].username === 'WEINERMOBILE') {
					var marker = new google.maps.Marker ({
						position: new google.maps.LatLng(userdata.passengers[i].lat, userdata.passengers[i].lng),
						title: "WEINERMOBILE",
						icon: "weinermobile.png",
					});
					marker.setMap(map);
					google.maps.event.addListener(marker,'click', function() {
						infowindow.setContent(this.title);
						infowindow.open(map,this);
					});
				}
				else { 
					var marker = new google.maps.Marker ({
						position: new google.maps.LatLng(userdata.passengers[i].lat, userdata.passengers[i].lng),
						title: userdata[i].passengers.id,
						icon: "passenger.png"
					});
					marker.setMap(map);
					google.maps.event.addListener(marker,'click', function() {
						infowindow.setContent(this.title);
						infowindow.open(map,this);
					});
				}
			}
		} else if (userdata.vehicles) {
			for (i = 0; i < userdata.vehicles.length; i++) {
				if(userdata.vehicles[i].username === 'WEINERMOBILE') {
					var marker = new google.maps.Marker ({
						position: new google.maps.LatLng(userdata.vehicles[i].lat, userdata.vehicles[i].lng),
						title: "WEINERMOBILE",
						icon: "weinermobile.png"
					});
					marker.setMap(map);
					google.maps.event.addListener(marker,'click', function() {
						infowindow.setContent(this.title);
						infowindow.open(map,this);
					});
				}
				else {
					var marker = new google.maps.Marker ({
						position: new google.maps.LatLng(userdata.vehicles[i].lat, userdata.vehicles[i].lng),
						title: userdata.vehicles[i].id,
						icon: "car.png"
					});
					marker.setMap(map);
					/*var name = userdata.vehicles[i].username;
					var userloc = [ userdata.vehicles[i].lat, userdata.vehicles[i].lng ];
					var myloc = [ myLat, myLng ];
					console.log(myloc);
					// google.maps.geometry.spherical.computeDistanceBetween(myloc, userloc);
					var info = "<p> Username is: " + name + "</p> <p> I am";
					google.maps.event.addListener(marker,'click', function() {
						infowindow.setContent(info);
						infowindow.open(map,this);
					});*/
				}
			}
		}
	}