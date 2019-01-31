// Third-party Dependencies
const is = require("@slimio/is");

/**
 * @class Servers
 * @doc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#serverObject
 */
class Servers {
    /**
     * @constructor
     * @memberof Servers#
     * @param {!String} url A URL to the target host
     * @param {Object} options Servers options
     * @param {String} [options.description] An optional string describing the host designated by the URL.
     * @param {Map<String, any>} [options.variables] A map between a variable name and its value.
     *
     * @throws {TypeError}
     */
    constructor(url, options = Object.create(null)) {
        if (typeof url !== "string") {
            throw new TypeError("url must be a string");
        }
        if (!is.plainObject(options)) {
            throw new TypeError("options must be a plain Object");
        }

        const { description, variables } = options;
        this.url = new URL(url);
        this.description = description;
        this.variables = variables;
    }

    /**
     * @method toJSON
     * @memberof Servers#
     * @returns {Object}
     */
    toJSON() {
        return {
            url: this.url.href,
            description: this.description,
            variables: this.variables
        };
    }
}

module.exports = Servers;
