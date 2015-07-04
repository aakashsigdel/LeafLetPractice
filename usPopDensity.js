var map = L.map('map').setView([37.8, -96], 4);

L.tileLayer('http://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	id: 'examples.map-20v6611k',
	maxZoom: 18,
	accessToken: 'pk.eyJ1IjoiYWFrYXNoc2lnZGVsIiwiYSI6ImJjMzQ0M2U0ODg2MmQzNTNiNTc5NjlhYjhkZmYzMmNiIn0.cWIfdnXG_BI_XNm0J2I1Ng',
	attribution:'aakash &copy;[...]'
}).addTo(map);
var geoJson;
/*
function getColor(d) {
	return d > 4000 ?  '#7f0000' :
		d > 1000 ? '#b30000' :
		d > 500 ? '#d7301f' :
		d > 200 ? '#ef6548' :
		d > 100 ? '#fc8d59' :
		d > 50 ? '#fdbb84' :
		d > 20 ? '#fdd49e' :
		d > 10 ? '#fee8c8' :
			 '#fff7ec';
}
*/

function getColor(d) {
    return d > 1000 ? '#800026' :
           d > 500  ? '#BD0026' :
           d > 200  ? '#E31A1C' :
           d > 100  ? '#FC4E2A' :
           d > 50   ? '#FD8D3C' :
           d > 20   ? '#FEB24C' :
           d > 10   ? '#FED976' :
                      '#FFEDA0';
}

function style(feature) {
	console.log(feature.properties);
	return {
		fillColor: getColor(feature.properties.density),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

function highlightFeature(e) {
	//console.log(e);
	var layer = e.target;
	
	layer.setStyle({
		weight: 5,
		color: '#666',
		dashArray: '',
		fillOpacity: 0.7	
	});

	if(!L.Browser.ie && !L.Browser.opera) {
		layer.bringToFront();
	}
}

function resetHighlight(e) {
	//console.log('Aakash ' + e.target.feature);
	geoJson.resetStyle(e.target);
}

function zoomToFeature(e) {
	map.fitBounds(e.target.getBounds());
}


function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

geoJson = L.geoJson(statesData, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);
