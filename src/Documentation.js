/**
 * @class Documentation
 */
class Documentation {
    /**
     * @constructor
     * @param {!String | URL} url The URL for the target documentation.
     * @param {String} [description] A short description of the target documentation.
     */
    constructor(url, description) {
        this.url = new URL(url);
        this.description = description;
    }

    /**
     * @method toJSON
     * @memberof Documentation#
     * @returns {Object}
     */
    toJSON() {
        return { url: this.url.href, description: this.description };
    }
}

module.exports = Documentation;
