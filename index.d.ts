declare class License {
    constructor(name: OpenAPI.AvailableLicenses | string, url?: string);
    public name: string;
    public url: string;
}

declare class Contact {
    constructor(name: string, url: string | URL, email: string);
    public name: string;
    public url: URL;
    public email: string;
}

declare class Servers {
    constructor(url: URL | string, options?: { description?: string; variables?: Map });
    public url: URL;
}

declare class OpenAPI {
    public static License: typeof License;
    public static Contact: typeof Contact;
    public static Servers: typeof Servers;

    constructor(options?: OpenAPI.Root);
    info(fields?: OpenAPI.Info): void;
    toJSON(): OpenAPI.JSON;
}

declare namespace OpenAPI {
    enum AvailableLicenses {
        MIT, GPL, WTFPL, MSPL, ISC, UNLICENSE,
        ZLIB
    }

    interface Root {
        openapi?: string;
        paths?: string;
        servers?: Servers | Servers[];
    }

    interface Info {
        title?: string;
        description?: string;
        version?: string;
        termsOfService?: string;
        license?: License,
        contact?: Contact
    }

    interface ServersJSON {
        url: string;
        description?: string;
        variables?: any;
    }

    interface JSON {
        openapi: string;
        paths: string;
        servers: ServersJSON | ServersJSON[];
        info: {
            title: string;
            version: string;
            description?: string;
            termsOfService?: string;
            license?: {
                name: string;
                url?: string;
            };
            contact?: {
                name: string;
                email: string;
                url: string;
            }
        }
    }
}

export as namespace OpenAPI;
export = OpenAPI;
