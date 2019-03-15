var qqwry = require('./lib/qqwry.js');
// module.exports = qqwry;
var getRawBody = require('raw-body');
var getFormBody = require("body/form");
var body = require('body');


/*
   if you open the initializer feature, please implement the initializer function, as below:
*/

var qqwryInstance = null;
function getQqwryInstance() {
    if(!qqwryInstance){
        qqwryInstance = qqwry(true);
    }
    return qqwryInstance;
}


module.exports.initializer = function (context, callback) {
    console.log("initializing");
    getQqwryInstance();
    callback(null, "");
};


function sendJsonHeader(resp) {
    resp.setHeader("Content-Disposition", "");
    resp.setHeader("Content-Type", "application/json");
}


module.exports.handler = function (req, resp, context) {
    var queries = req.queries || {};
    var path = req.path;

    if (path === '/search_ip') {
        sendJsonHeader(resp);

        var ipv4 = queries['ipv4'];
        var ipv4_region;
        try {
            ipv4_region = getQqwryInstance().searchIP(ipv4);
            ipv4_region = JSON.stringify(ipv4_region);
        } catch (e) {
            ipv4_region = e.toString();
        }
        resp.send(ipv4_region);
        return;
    }


    resp.send("404");
    return;


    // console.log("hello world");
    //
    // var params = {
    //     path: req.path,
    //     queries: req.queries,
    //     headers: req.headers,
    //     method : req.method,
    //     requestURI : req.url,
    //     clientIP : req.clientIP,
    // };


    //
    // getRawBody(req, function(err, body) {
    //     for (var key in req.queries) {
    //         var value = req.queries[key];
    //         resp.setHeader(key, value);
    //     }
    //     params.body = body.toString();
    //     resp.send(JSON.stringify(params, null, '    '));
    // });

    /*
    getFormBody(req, function(err, formBody) {
        for (var key in req.queries) {
          var value = req.queries[key];
          resp.setHeader(key, value);
        }
        params.body = formBody;
        console.log(formBody);
        resp.send(JSON.stringify(params));
    });
    */
}