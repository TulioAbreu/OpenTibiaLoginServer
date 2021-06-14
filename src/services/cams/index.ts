import { Character } from "../../db";
import { Maybe } from "../../utils/maybe";
import { config } from "../config";

const CONFIG_CAMS_ENABLED = config.cams;

class Cams {
    async get(name: string, _password: string): Promise<Maybe<Character[]>> {
        if (!CONFIG_CAMS_ENABLED) {
            return null;
        }
        if (name.toLocaleLowerCase().indexOf("!cam") == 0) {
            return [];
        }
        return null;
    }
}

export default new Cams();
