declare class License {
    constructor(name: OpenAPI.AvailableLicenses | string, url?: string);
    public name: string;
    public url: string;
}

declare class Contact {
    constructor(name: string, url: string, email: string);
    public name: string;
    public url: string;
    public email: string;
}

declare class OpenAPI {
    constructor(options: OpenAPI.Root);
    toJSON(): any;
}

declare namespace OpenAPI {
    enum AvailableLicenses {
        MIT, GPL, WTFPL, MSPL, ISC, UNLICENSE,
        ZLIB
    }

    interface Root {
        openapi?: string;
    }
}

export as namespace OpenAPI;
export = OpenAPI;
