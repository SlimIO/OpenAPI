const OpenAPI = require(".");

const _t = new OpenAPI();
_t.info({
    contact: new OpenAPI.Contact("Support", "http://google.fr", "gentilhomme.thomas@gmail.com"),
    license: OpenAPI.License.List.Apache2
});

console.log(JSON.stringify(_t.toJSON(), null, 4));
