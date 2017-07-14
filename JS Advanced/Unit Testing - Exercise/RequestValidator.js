function validator(obj) {
    const methods = ['GET', 'POST', 'DELETE','CONNECT'];
    if (!obj.hasOwnProperty('method') || !methods.includes(obj.method)) {
        throw new Error("Invalid request header: Invalid Method");
    }

    let uriRegex = /^[a-zA-Z0-9\.]+$|^\*$/;
    if (!obj.hasOwnProperty('uri') || !uriRegex.test(obj.uri)) {
        throw new Error("Invalid request header: Invalid URI");
    }

    const versions = ['HTTP/0.9', 'HTTP/1.0', 'HTTP/1.1','HTTP/2.0' ];
    if (!obj.hasOwnProperty('version') || !versions.includes(obj.version)) {
        throw new Error("Invalid request header: Invalid Version");
    }

    let messageRegex = /^[^<>\\&'"]*$/;
    if (!obj.hasOwnProperty('message') || !messageRegex.test(obj.message)) {
        throw new Error("Invalid request header: Invalid Message");
    }

    return obj;
}

validator({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
});