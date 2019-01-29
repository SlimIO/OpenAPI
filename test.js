const OpenAPI = require("./");

const _t = new OpenAPI();
_t.info();

console.log(JSON.stringify(_t.toJSON(), null, 4));
