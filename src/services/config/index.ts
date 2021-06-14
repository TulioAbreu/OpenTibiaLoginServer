import { readJSONFileSync } from "../../utils/read-json";
import { CONFIG_SCHEMA, Config } from "./schema";

const CONFIG_PATH = "./config/general.json";
export const config = initConfig();

function initConfig(): Config {
    const rawConfig = readJSONFileSync(CONFIG_PATH);
    const config: Config = CONFIG_SCHEMA.validateSync(rawConfig);
    return config;
}
