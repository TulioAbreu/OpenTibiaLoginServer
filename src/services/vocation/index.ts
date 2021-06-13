import { readJSONFileSync } from "../../utils/read-json";
import { CONFIG_VOCATIONS_SCHEMA } from "./schema";

const VOCATIONS_CONFIG_PATH = "./config/vocations.json";
const vocationsMap = initVocationsMap();

export function getVocationNameById(ID: number): string {
    return vocationsMap.get(ID) ?? "Unknown";
}

function initVocationsMap(): Map<number, string> {
    const vocationsFile = readJSONFileSync(VOCATIONS_CONFIG_PATH);
    const { vocations } = CONFIG_VOCATIONS_SCHEMA.validateSync(vocationsFile);
    const map = new Map<number, string>();
    vocations.forEach((vocation) => {
        map.set(vocation.id, vocation.name);
    });
    return map;
}
