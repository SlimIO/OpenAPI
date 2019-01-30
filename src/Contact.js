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
     */
    constructor(name, url, email) {
        // TODO: validate url and email
        this.name = name;
        this.url = url;
        this.email = email;
    }
}

module.exports = Contact;
