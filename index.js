var qqwry = require('./lib/qqwry.js');


var qqwryInstance = null;

function getQqwryInstance() {
    if (!qqwryInstance) {
        qqwryInstance = qqwry(true);
    }
    return qqwryInstance;
}


module.exports.initializer = function (context, callback) {
    console.log("initializing");
    getQqwryInstance();
    callback(null, "");
};


function sendSearchIpResponse(ipv4, resp) {
    resp.setHeader("Content-Disposition", "");
    resp.setHeader("Content-Type", "application/json");

    resp.setHeader("Access-Control-Allow-Origin", "*");
    resp.setHeader("Access-Control-Allow-Methods", "*");
    resp.setHeader("Access-Control-Allow-Headers", "*");
    resp.setHeader("Access-Control-Allow-Credentials", "true");
    resp.setHeader("XDomainRequestAllowed","1");


    if (!ipv4) {
        resp.send("ipv4 is null");
        return;
    }

    var ipv4_region;
    try {
        ipv4_region = getQqwryInstance().searchIP(ipv4);
        ipv4_region = JSON.stringify(ipv4_region);
    } catch (e) {
        ipv4_region = e.toString();
    }
    resp.send(ipv4_region);
}


module.exports.handler = function (req, resp, context) {
    var queries = req.queries || {};
    var path = req.path;
    if (path === '/search_ip') {
        var ipv4 = queries['ipv4'];
        sendSearchIpResponse(ipv4, resp);
    }

    else if (path === '/search_my_ip') {
        var myipv4 = req.clientIP;
        sendSearchIpResponse(myipv4, resp);
    }
    else {
        resp.send("404");
    }
};