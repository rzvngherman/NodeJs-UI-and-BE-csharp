const _reqProcess = require("./helpers/request_processors.js");
const _respFct = require("./helpers/response_functions");

//method 'requestListener'
const requestListener = function (req, res) {
    //Serving JSON
    res.setHeader("Content-Type", "application/json");
    switch (req.method) {
        case "GET":
            _reqProcess.ProcessGet(req, res);
            break

        case "POST":
            _reqProcess.ProcessPost(req, res);
            break

        case "DELETE":
            _reqProcess.ProcessDelete(req, res);
            break

        default:
            _respFct.get405(res);
            break;
    }
};

module.exports = requestListener;