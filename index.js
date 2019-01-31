// Node.js Dependencies
const { readFileSync } = require("fs");
const { join } = require("path");

// Third-party Dependencies
const is = require("@slimio/is");
const semver = require("semver");

// Internal
const { License, Contact, Servers } = require("./src");

// CONSTANTS
const OPENAPI_VERSION = "3.0.2";
const DEFAULT_ENDPOINT = "/";

/**
 * @class OpenAPI
 *
 * @version 0.1.0
 * @author GENTILHOMME Thomas <gentilhomme.thomas@gmail.com>
 */
class OpenAPI {
    /**
     * @doc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#openapi-object
     *
     * @constructor
     * @memberof OpenAPI#
     * @desc This is the root document object of the OpenAPI document.
     *
     * @param {Object} fields OpenAPI root fields
     * @param {String} [fields.openapi=3.0.2] Semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
     * @param {String} [fields.paths=/] The available paths and operations for the API.
     * @param {Servers | Servers[]} [fields.servers] An array of Server Objects, which provide connectivity information to a target server.
     *
     * @throws {Error}
     * @throws {TypeError}
     */
    constructor(fields = Object.create(null)) {
        const isOpenApiStr = is.string(fields.openapi);
        if (isOpenApiStr && semver.valid(fields.openapi) === null) {
            throw new Error("openapi must be a valid semver version");
        }
        if (!is.nullOrUndefined(fields.paths) && !is.string(fields.paths)) {
            throw new TypeError("paths must be a string");
        }

        this.openapi = isOpenApiStr ? fields.openapi : OPENAPI_VERSION;
        this.paths = fields.paths || DEFAULT_ENDPOINT;
        this._info = Object.create(null);
        if (fields.servers instanceof Servers) {
            this.servers = fields.servers;
        }
        else if (Array.isArray(fields.servers)) {
            this.servers = fields.servers.filter((row) => row instanceof Servers);
        }
        else {
            this.servers = { url: "/" };
        }
    }

    /**
     * @doc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#info-object
     *
     * @method info
     * @memberof OpenAPI#
     * @desc The object provides metadata about the API.
     * The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.
     *
     * @param {Object} fields Information Fields
     * @param {String} [fields.title] The title of the application.
     * @param {String} [fields.description] A short description of the application. CommonMark syntax MAY be used for rich text representation.
     * @param {String} [fields.version] The version of the OpenAPI document (which is distinct from the OpenAPI Specification version)
     * @param {String} [fields.termsOfService] A URL to the Terms of Service for the API. MUST be in the format of a URL.
     * @param {License} [fields.license] The license information for the exposed API.
     * @param {Contact[] | Contact} [fields.contact] The contact information for the exposed API.
     * @returns {void}
     *
     * @throws {TypeError}
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
        if (!is.nullOrUndefined(fields.termsOfService) && !is.string(fields.termsOfService)) {
            throw new TypeError("termsOfService must be a string");
        }
        if (!is.nullOrUndefined(fields.license) && !(fields.license instanceof License)) {
            throw new TypeError("license must be a valid License Object");
        }
        if (!is.nullOrUndefined(fields.contact) && !(fields.contact instanceof Contact)) {
            throw new TypeError("contact must be a valid Contact Object");
        }

        // Parse and read local package.json
        const pkgDefault = Object.create(null);
        try {
            const buf = readFileSync(join(process.cwd(), "package.json"));
            const { name: title, description, version, license } = JSON.parse(buf);
            // TODO: read local LICENSE file if exist ?

            Object.assign(pkgDefault, {
                title, description, version, license: new License(license)
            });
        }
        catch (err) {
            // do nothing...
        }

        const { title, description, version, licence, termsOfService, contact } = fields;
        Object.assign(this._info, {
            title, description, version, licence, termsOfService, contact
        }, pkgDefault);
    }

    /**
     * @method toJSON
     * @memberof OpenAPI#
     * @returns {Object}
     */
    toJSON() {
        return {
            openapi: this.openapi,
            info: this._info,
            servers: this.servers,
            paths: this.paths
        };
    }
}

// Exports Class Members
OpenAPI.License = License;
OpenAPI.Contact = Contact;
OpenAPI.Servers = Servers;

module.exports = OpenAPI;
