declare class License {
    constructor(name: OpenAPI.AvailableLicenses | string, url?: string);

    public static List: OpenAPI.AvailableLicenses;

    public name: string;
    public url: string;
}

declare class Contact {
    constructor(name: string, url: string | URL, email: string);
    toJSON(): OpenAPI.ContactJSON;

    public name: string;
    public url: URL;
    public email: string;
}

declare class Servers {
    constructor(url: URL | string, options?: { description?: string; variables?: Map<any, any> });
    toJSON(): OpenAPI.ServersJSON;

    public url: URL;
    public description: string;
    public variables: Map<string, any>;
}

declare class Documentation {
    constructor(url: URL | string, description: string);
    toJSON(): OpenAPI.DocumentationJSON;

    public url: URL;
    public description: string;
}

declare class OpenAPI {
    public static License: typeof License;
    public static Contact: typeof Contact;
    public static Servers: typeof Servers;
    public static Documentation: typeof Documentation;

    constructor(options?: OpenAPI.Root);
    info(fields?: OpenAPI.Info): void;
    toJSON(): OpenAPI.JSON;
}

declare namespace OpenAPI {
    interface AvailableLicenses {
        Apache2: symbol;
        MIT: symbol;
    }

    interface Root {
        openapi?: string;
        servers?: Servers | Servers[];
    }

    interface DocumentationJSON {
        url: string;
        description?: string;
    }

    interface ContactJSON {
        name: string;
        email: string;
        url: string;
    }

    interface Info {
        title?: string;
        description?: string;
        version?: string;
        termsOfService?: string;
        license?: License | string | symbol,
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
        externalDocs?: DocumentationJSON;
        info: {
            title: string;
            version: string;
            description?: string;
            termsOfService?: string;
            license?: {
                name: string;
                url?: string;
            };
            contact?: ContactJSON
        }
    }
}

export as namespace OpenAPI;
export = OpenAPI;
