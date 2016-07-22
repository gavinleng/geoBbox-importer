/*
 * Created by G on 19/07/2016.
 */


var geoBbox = require('./lib/geoBbox.js');
var config = require('./geoBbox-config.js');
var nqmgeotools = require("nqm-geojson-tools");

// tdxconfig file
var tdxConfig = require('./tdx-config.js');
var import2Tdx = require('./lib/import2Tdx.js');

geoBbox(config.url, config.id_type, function (bboxArray) {
	console.log("one of the bbox is: " + bboxArray[0].bbox);
	
	var jsonData = {'type':'geobbox', 'data':bboxArray};
	
	nqmgeotools.jsonSave(jsonData, config.outPath);
	
	var datasetName = 'LSOA 2011 EW BFE V2 wgs84_bbox';
	var tdxConfig1 = {};
	tdxConfig1.credentials = tdxConfig.credentials;
	tdxConfig1.basedOnSchema = tdxConfig.basedOnSchema;
	tdxConfig1.targetFolder = tdxConfig.targetFolder;
	//tdxConfig1.upsertMode = tdxConfig.upsertMode;
	//tdxConfig1.schema = tdxConfig.schema;
	
	tdxConfig1.datasetName = datasetName;
	
	import2Tdx(tdxConfig1, bboxArray, function(id) {
		console.log('the bbox data id is: ' + id);
		console.log('The bbox data set is saved to TDX.');
		
		var urlOut = 'https://q.nqminds.com/v1/datasets/' + id + '/data?opts={"limit":450000}';
		
		console.log('the url of the bbox data id is: ' + urlOut);
	});
});
