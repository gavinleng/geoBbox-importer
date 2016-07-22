/*
 * Created by G on 24/05/2016.
 */


"use strict";

module.exports = exports = function(config, data, cb) {
    var JSONImport = require("./jsonImporter");

    // Create a JSON importer instance.
    var importer = new JSONImport();
    
    console.log("import is started, please waiting......");

    // Initiate the import with our configuration.
    importer.start(config, data, function(err, id) {
        if (err) {
            console.log("failure during import: %s", err.message);
            process.exit(-1);
        } else {
            console.log("import finished");
            cb(id);
        }
    });
};
