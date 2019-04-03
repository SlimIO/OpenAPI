// Symbols
const SymApache2 = Symbol("Apache 2.0");
const SymMIT = Symbol("MIT");

// URLs
const LicensesURL = {
    [SymApache2]: {
        name: "Apache2.0",
        url: "https://www.apache.org/licenses/LICENSE-2.0.html"
    },
    [SymMIT]: {
        name: "MIT",
        url: "https://opensource.org/licenses/MIT"
    }
};

/**
 * @class License
 *
 * @property {String} name The license name used for the API.
 * @property {String} [url] A URL to the license used for the API. MUST be in the format of a URL.
 */
class License {
    /**
     * @constructor
     * @memberof License#
     * @param {!(String | Symbol)} name The license name used for the API.
     * @param {String} [url] A URL to the license used for the API. MUST be in the format of a URL.
     *
     * @throws {TypeError}
     * @throws {Error}
     */
    constructor(name, url) {
        const tName = typeof name;
        if (tName !== "string" && tName !== "symbol") {
            throw new TypeError("name must be a string or a symbol");
        }

        if (tName === "symbol") {
            if (!Reflect.has(LicensesURL, name)) {
                throw new Error(`Unable to found Symbol ${name} in LicensesURL`);
            }

            const match = LicensesURL[name];
            this.name = match.name;
            this.url = match.url;
        }
        else {
            this.name = name;
            this.url = url;
        }
    }
}

License.List = {
    Apache2: SymApache2,
    MIT: SymMIT
};

module.exports = License;
