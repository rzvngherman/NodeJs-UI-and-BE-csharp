function get405(resp) {
	resp.writeHead(405);
    resp.end(JSON.stringify({ error: "Method not supported" }));
}

function get404(resp) {
	resp.writeHead(404);
    resp.end(JSON.stringify({ error: "Resource not found" }));
}

function get500(resp, errorMessage){
    resp.writeHead(500);
    resp.end(JSON.stringify({ error: errorMessage }));
}

function get200(resp, message){
    resp.writeHead(200);
    resp.end(JSON.stringify({ success: message }));
}

module.exports = { get405, get404, get500, get200};