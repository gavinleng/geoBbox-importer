/*
 * Created by G on 19/07/2016.
 */



"use strict";

var request = require("request");
var nqmgeotools = require("nqm-geojson-tools");

module.exports = exports = function(url, idType, cb) {
	var i, bbox, geoObj;
	
	var type = 'bbox';
	
	var bboxArray = [];
	
	request(url, { json: true }, function(err, resp, body) {
		if (err || (resp && resp.statusCode !== 200)) {
			var msg = err ? err.message : body && body.message;
			console.log("failure running the input data query: " + msg);
			process.exit(-1);
		} else {
			var geodata = body.data; //geojson array
			
			var lengeodata = geodata.length;
			
			for (i = 0; i < lengeodata; i++) {
				geoObj = {};
				geoObj.properties = {};
				geoObj.geometry = {};
				
				bbox = nqmgeotools.getBBox(geodata[i]);
				
				geoObj.type = type;
				geoObj.properties.area_type = idType;
				geoObj.properties.area_id = geodata[i].properties[idType];
				geoObj.bbox = [bbox.southWest.lng, bbox.southWest.lat, bbox.northEast.lng, bbox.northEast.lat];
				
				bboxArray.push(geoObj);
			}
			
			cb(bboxArray);
		}
	});
};