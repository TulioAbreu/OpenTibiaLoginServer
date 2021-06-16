import {readFileSync} from 'fs';

export function readJSONFileSync(filepath: string): unknown {
    const fileContent = readFileSync(filepath, 'utf8');
    return JSON.parse(fileContent);
}
