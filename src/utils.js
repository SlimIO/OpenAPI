"use strict";

/**
 * @namespace Utils
 */

// Require Third-party Dependencies
const is = require("@slimio/is");
const argc = require("@slimio/arg-checker");

/**
 * @function isValidSecurityObj
 * @memberof Utils#
 * @param {*} obj
 * @returns {boolean}
 */
function isValidSecurityObj(obj) {
    if (is.nullOrUndefined(obj)) {
        return true;
    }
    if (!is.plainObject(obj)) {
        return false;
    }

    for (const [key, value] of Object.entries(obj)) {
        if (!is.string(key) || !is.array(value)) {
            return false;
        }

        if (value.some((row) => !is.string(row))) {
            return false;
        }
    }

    return true;
}

/**
 * @function isValidExternalDoc
 * @memberof Utils#
 * @param {*} obj
 * @returns {boolean}
 */
function isValidExternalDoc(obj) {
    if (is.nullOrUndefined(obj)) {
        return true;
    }
    if (!is.plainObject(obj)) {
        return false;
    }

    try {
        argc(obj.url, is.string);
        argc(obj.description, [is.string | is.nullOrUndefined]);

        const keys = Object.keys(obj);
        // eslint-disable-next-line
        if (keys.length > 2 || (is.nullOrUndefined(obj.description) && keys.length > 1)) {
            return false;
        }

        return true;
    }
    catch (error) {
        return false;
    }
}

module.exports = {
    isValidSecurityObj,
    isValidExternalDoc
};
