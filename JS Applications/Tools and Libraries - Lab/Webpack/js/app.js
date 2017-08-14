module. exports = (function () {
    let loggingModule = require('./module.js');
    document.write(`<h1>Hello, ${loggingModule.toolName}!</h1>`);
    loggingModule.greet();
})();