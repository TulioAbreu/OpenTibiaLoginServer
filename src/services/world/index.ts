import { readdirSync } from "fs";
import { readJSONFileSync } from "../../utils/read-json";
import { World, WORLD_SCHEMA } from "./schema";

const WORLDS_FOLDER = "./config/worlds";
export const worlds: Map<number, World> = initWorlds();

function initWorlds(): Map<number, World> {
    const worldFilepaths = readdirSync(WORLDS_FOLDER);
    const rawWorlds = worldFilepaths
        .filter((filepath: string) => {
            return filepath.toLowerCase().includes(".json");
        })
        .map((worldFilepath: string): World => {
            const rawWorldFile = readJSONFileSync(WORLDS_FOLDER + "/" + worldFilepath);
            return WORLD_SCHEMA.validateSync(rawWorldFile);
        });
    validateWorlds(rawWorlds);

    const worldMap = new Map<number, World>();
    rawWorlds.forEach((world: World) => {
        worldMap.set(world.id, world);
    });
    return worldMap;
}

function validateWorlds(worlds: World[]): void {
    const usedPorts = new Map<number, number>();
    worlds.forEach((world: World) => {
        if (usedPorts.get(world.id)) {
            throw new Error(`Invalid world id ${world.id} ${world.port}`);
        }
        usedPorts.set(world.id, world.port);
    });
}
