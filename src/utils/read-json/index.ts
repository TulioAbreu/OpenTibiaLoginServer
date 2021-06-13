import { readFileSync } from "fs";
import type { Maybe } from "../maybe"

export function readJSONFileSync(filepath: string): Maybe<unknown> {
    try {
        return JSON.parse(readFileSync(filepath, "utf8"));
    } catch (error) {
        throw new Error(`Failed to read JSON file: ${error}`);
    }
}
