"use strict";

// Node.js Dependencies
const { readFileSync } = require("fs");
const { join } = require("path");

// Third-party Dependencies
const is = require("@slimio/is");
const argc = require("@slimio/arg-checker");
const semver = require("semver");

// Internal
const { License, Contact, Servers, Documentation } = require("./src");

// CONSTANTS
const OPENAPI_VERSION = "3.0.2";

/**
 * @class OpenAPI
 *
 * @version 0.1.0
 * @author GENTILHOMME Thomas <gentilhomme.thomas@gmail.com>
 */
class OpenAPI {
    /**
     * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#openapi-object
     *
     * @class
     * @memberof OpenAPI#
     * @description This is the root document object of the OpenAPI document.
     *
     * @param {object} fields OpenAPI root fields
     * @param {string} [fields.openapi=3.0.2] Semantic version number of the OpenAPI Specification version that the OpenAPI document uses.
     * @param {Servers | Servers[]} [fields.servers] An array of Server Objects, which provide connectivity information to a target server.
     * @param {Documentation} [fields.externalDocs] Additional external documentation.
     *
     * @throws {Error}
     */
    constructor(fields = Object.create(null)) {
        const isOpenApiStr = is.string(fields.openapi);
        if (isOpenApiStr && semver.valid(fields.openapi) === null) {
            throw new Error("openapi must be a valid semver version");
        }

        this.openapi = isOpenApiStr ? fields.openapi : OPENAPI_VERSION;
        this.paths = [];
        this.externalDocs = fields.externalDocs || null;

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
     * @see https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#info-object
     *
     * @function info
     * @memberof OpenAPI#
     * @description The object provides metadata about the API.
     * The metadata MAY be used by the clients if needed, and MAY be presented in editing or documentation generation tools for convenience.
     *
     * @param {object} fields Information Fields
     * @param {string} [fields.title] The title of the application.
     * @param {string} [fields.description] A short description of the application. CommonMark syntax MAY be used for rich text representation.
     * @param {string} [fields.version] The version of the OpenAPI document (which is distinct from the OpenAPI Specification version)
     * @param {string} [fields.termsOfService] A URL to the Terms of Service for the API. MUST be in the format of a URL.
     * @param {License} [fields.license] The license information for the exposed API.
     * @param {Contact[] | Contact} [fields.contact] The contact information for the exposed API.
     * @returns {void}
     */
    info(fields = Object.create(null)) {
        argc(fields.title, [is.nullOrUndefined, is.string]);
        argc(fields.description, [is.nullOrUndefined, is.string]);
        argc(fields.version, [is.nullOrUndefined, is.string]);
        argc(fields.termsOfService, [is.nullOrUndefined, is.string]);
        argc(fields.termsOfService, [is.nullOrUndefined, (value) => value instanceof Contact]);

        // Parse and read local package.json
        const pkgDefault = Object.create(null);
        try {
            const buf = readFileSync(join(process.cwd(), "package.json"));
            const { name: title, description, version, license } = JSON.parse(buf);

            let finalLicense = license;
            const isPrimitive = is.symbol(fields.license) || is.string(fields.license);
            if (fields.license instanceof License || isPrimitive) {
                finalLicense = isPrimitive ? new License(fields.license) : fields.license;
            }
            delete fields.license;

            Object.assign(pkgDefault, {
                title, description, version, license: finalLicense
            });
        }
        catch (err) {
            console.error(err);
        }

        Object.assign(this._info, pkgDefault, fields);
    }

    /**
     * @function toJSON
     * @memberof OpenAPI#
     * @returns {object}
     */
    toJSON() {
        return {
            openapi: this.openapi,
            info: this._info,
            servers: this.servers,
            paths: this.paths,
            externalDocs: this.externalDocs
        };
    }
}

// Exports Class Members
OpenAPI.License = License;
OpenAPI.Contact = Contact;
OpenAPI.Servers = Servers;
OpenAPI.Documentation = Documentation;

module.exports = OpenAPI;
