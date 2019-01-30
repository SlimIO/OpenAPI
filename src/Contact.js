// Third-party Dependencies
const EmailValidator = require("email-validator");

/**
 * @class Contact
 * @doc https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.2.md#contactObject
 *
 * @property {String} name The identifying name of the contact person/organization.
 * @property {String} url The URL pointing to the contact information. MUST be in the format of a URL.
 * @property {String} email The email address of the contact person/organization. MUST be in the format of an email address.
 */
class Contact {
    /**
     * @constructor
     * @memberof Contact#
     * @param {!String} name The identifying name of the contact person/organization.
     * @param {!String} url The URL pointing to the contact information. MUST be in the format of a URL.
     * @param {!String} email email The email address of the contact person/organization. MUST be in the format of an email address.
     *
     * @throws {TypeError}
     * @throws {Error}
     */
    constructor(name, url, email) {
        if (typeof name !== "string") {
            throw new TypeError("name must be a string");
        }
        if (!EmailValidator.validate(email)) {
            throw new Error("email must be a valid email string");
        }

        // TODO: validate url and email
        this.name = name;
        this.url = new URL(url);
        this.email = email;
    }

    /**
     * @method toJSON
     * @memberof Contact#
     * @returns {Object}
     */
    toJSON() {
        return { name: this.name, url: this.url.href, email: this.email };
    }
}

module.exports = Contact;