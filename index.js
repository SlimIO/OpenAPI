// Node.js Dependencies
const { readFileSync } = require("fs");
const { join } = require("path");

// Third-party Dependencies
const is = require("@slimio/is");
const semver = require("semver");

/**
 * @class OpenAPI
 */
class OpenAPI {
    /**
     * @constructor
     * @param {Object} fields OpenAPI root fields
     * @param {String} [fields.openapi=3.0.2] Semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
     *
     * @throws {Error}
     * @doc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#openapi-object
     */
    constructor(fields = Object.create(null)) {
        const isOpenApiStr = is.string(fields.openapi);
        if (isOpenApiStr && semver.valid(fields.openapi) === null) {
            throw new Error("openapi must be a valid semver version");
        }

        this.openapi = isOpenApiStr ? fields.openapi : "3.0.2";
        this._info = Object.create(null);
    }

    /**
     * @method info
     * @desc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#info-object
     * @memberof OpenAPI#
     * @param {Object} fields Information Fields
     * @returns {void}
     *
     * @throws {TypeError}
     * @doc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#info-object
     */
    info(fields = Object.create(null)) {
        if (!is.nullOrUndefined(fields.title) && !is.string(fields.title)) {
            throw new TypeError("title must be a string");
        }
        if (!is.nullOrUndefined(fields.description) && !is.string(fields.description)) {
            throw new TypeError("description must be a string");
        }
        if (!is.nullOrUndefined(fields.version) && !is.string(fields.version)) {
            throw new TypeError("version must be a string");
        }

        // Parse and read local package.json
        const pkgDefault = Object.create(null);
        try {
            const buf = readFileSync(join(process.cwd(), "package.json"));
            const { name: title, description, version } = JSON.parse(buf);

            Object.assign(pkgDefault, { title, description, version });
        }
        catch (err) {
            // do nothing...
        }

        const { title, description, version } = fields;
        Object.assign(this._info, { title, description, version }, pkgDefault);
    }

    /**
     * @method toJSON
     * @memberof OpenAPI#
     * @returns {Object}
     */
    toJSON() {
        return {
            openapi: this.openapi,
            info: this._info
        };
    }
}

module.exports = OpenAPI;
