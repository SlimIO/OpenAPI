"use strict";

// Third-party Dependencies
const is = require("@slimio/is");

/**
 * @class Servers
 * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#serverObject
 */
class Servers {
    /**
     * @class
     * @memberof Servers#
     * @param {!string} url A URL to the target host
     * @param {object} options Servers options
     * @param {string} [options.description] An optional string describing the host designated by the URL.
     * @param {Map<string, any>} [options.variables] A map between a variable name and its value.
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
     * @function toJSON
     * @memberof Servers#
     * @returns {object}
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
