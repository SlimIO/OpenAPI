"use strict";

/**
 * @class Documentation
 *
 * @property {URL} url
 * @property {string} description
 */
class Documentation {
    /**
     * @function
     * @param {!string | URL} url The URL for the target documentation.
     * @param {string} [description] A short description of the target documentation.
     */
    constructor(url, description = "") {
        this.url = new URL(url);
        this.description = description;
    }

    /**
     * @function toJSON
     * @memberof Documentation#
     * @returns {object}
     */
    toJSON() {
        return {
            url: this.url.href,
            description: this.description
        };
    }
}

module.exports = Documentation;
