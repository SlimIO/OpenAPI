"use strict";

const OpenAPI = require(".");

const _t = new OpenAPI({
    security: { api_key: [] }
});
_t.info({
    version: "3.0.0",
    contact: new OpenAPI.Contact("Support", "http://google.fr", "gentilhomme.thomas@gmail.com"),
    license: OpenAPI.License.List.Apache2
});

console.log(JSON.stringify(_t, null, 4));
