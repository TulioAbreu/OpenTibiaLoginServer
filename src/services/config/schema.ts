import * as yup from "yup";

interface ConfigVersion {
    min: number;
    max: number;
}

const CONFIG_VERSION_SCHEMA = yup.object({
    min: yup.number().required("'min' field is required"),
    max: yup.number().required("'max' field is required"),
});

interface ConfigMOTD {
    id: number;
    text: string;
}

const CONFIG_MOTD_SCHEMA = yup.object({
    id: yup.number().required("'id' field is required"),
    text: yup.string().required("'text' field is required"),
});

interface ConfigTCP {
    enabled: boolean;
    host: string;
    ports: number[];
}

const CONFIG_TCP_SCHEMA = yup.object({
    enabled: yup.boolean().required("'enabled' field is required"),
    host: yup.string().required("'host' field is required"),
    ports: yup.array().of(yup.number()).required("'ports' field is required"),
});

interface ConfigLimit {
    interval: number[];
    limit: number[];
}

const CONFIG_LIMIT_SCHEMA = yup.object({
    interval: yup.array().of(yup.number()).min(2).max(2).required("'interval' field is required"),
    limit: yup.array().of(yup.number()).min(2).max(2).required("'limit' field is required"),
});

interface ConfigSSL {
    enabled: boolean;
    cert: string;
    key: string;
    passphrase: string;
}

// TODO: remove this from config and pass to .env
const CONFIG_SSL_SCHEMA = yup.object({
    enabled: yup.boolean().required("'enabled' field is required"),
    cert: yup.string().required("'cert' field is required"),
    key: yup.string().required("'key' field is required"),
    passphrase: yup.string().required("'passphrase' field is required"),
});

interface ConfigHTTP {
    enabled: boolean;
    host: string;
    ports: number[];
    ssl: ConfigSSL;
}

const CONFIG_HTTP_SCHEMA = yup.object({
    enabled: yup.boolean().required("'enabled' field is required"),
    host: yup.string().required("'host' field is required"),
    ports: yup.array().of(yup.number()).required("'ports' field is required"),
    ssl: CONFIG_SSL_SCHEMA,
});

export interface Config {
    keyFile: string;
    version: ConfigVersion;
    encryption: string;
    motd: ConfigMOTD;
    tcp: ConfigTCP;
    http: ConfigHTTP;
    casts: boolean;
    cams: boolean;
    limits: {
        connections: ConfigLimit;
        authorizations: ConfigLimit;
    };
}

export const CONFIG_SCHEMA = yup.object({
    keyFile: yup.string().required("'keyFile' is required"),
    encryption: yup.string().required("'encryption' is required"),
    version: CONFIG_VERSION_SCHEMA,
    motd: CONFIG_MOTD_SCHEMA,
    tcp: CONFIG_TCP_SCHEMA,
    http: CONFIG_HTTP_SCHEMA,
    casts: yup.boolean().required("'casts' field is required"),
    cams: yup.boolean().required("'cams' field is required"),
    limits: yup.object({
        connections: CONFIG_LIMIT_SCHEMA,
        authorizations: CONFIG_LIMIT_SCHEMA,
    }),
});
