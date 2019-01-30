/**
 * @class License
 *
 * @property {String} name The license name used for the API.
 * @property {String} url A URL to the license used for the API. MUST be in the format of a URL.
 */
class License {
    /**
     * @constructor
     * @memberof License#
     * @param {!String} name The license name used for the API.
     * @param {String} [url] A URL to the license used for the API. MUST be in the format of a URL.
     *
     * @throws {TypeError}
     */
    constructor(name, url) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }

        this.name = name;
        this.url = url;
    }
}

module.exports = License;
