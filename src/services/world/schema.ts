import * as yup from "yup";

export interface World {
    id: number;
    name: string;
    host: string;
    port: number;
    preview: boolean;
    location: string;
    pvptype: number;
    status_port: number;
    maxplayers: number;
    monsters: number;
    npcs: number;
    url: string;
    owner: {
        name: string;
        email: string;
    };
    rates: {
        experience: string;
        skill: string;
        loot: string;
        magic: string;
        spawn: string;
    };
    map: {
        name: string;
        author: string;
        width: string;
        height: string;
    };
}

export const WORLD_SCHEMA = yup.object({
    id: yup.number().required("'' field is required"),
    name: yup.string().required("'name' field is required"),
    host: yup.string().required("'host' field is required"),
    port: yup.number().required("'' field is required"),
    preview: yup.boolean().required(),
    location: yup.string().required("'location' field is required"),
    pvptype: yup.number().required("'' field is required"),
    status_port: yup.number().required("'' field is required"),
    maxplayers: yup.number().required("'' field is required"),
    monsters: yup.number().required("'' field is required"),
    npcs: yup.number().required("'' field is required"),
    url: yup.string().required("'url' field is required"),
    owner: yup.object({
        name: yup.string().required("'name' field is required"),
        email: yup.string().required("'email' field is required")
    }),
    rates: yup.object({
        experience: yup.string().required("'experience' field is required"),
        skill: yup.string().required("'skill' field is required"),
        loot: yup.string().required("'loot' field is required"),
        magic: yup.string().required("'magic' field is required"),
        spawn: yup.string().required("'spawn' field is required"),
    }),
    map: yup.object({
        name: yup.string().required("'name' field is required"),
        author: yup.string().required("'author' field is required"),
        width: yup.string().required("'width' field is required"),
        height: yup.string().required("'height' field is required"),
    }),
});
