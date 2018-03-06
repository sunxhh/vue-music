let sendJsonp = require("./request/jsonp");

module.exports = function(url, data, option) {
    return new Promise((resolve, reject) => {
        sendJsonp({
            jsonp: option.param,
            data: data,
            success: function(result) {
                resolve(result);
            },
            url,
            error: function(err) {
                reject(err);
            }
        });
    });
};
