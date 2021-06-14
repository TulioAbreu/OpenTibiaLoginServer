import { Character } from "../../db";
import { Maybe } from "../../utils/maybe";
import { config } from "../config";

class Cams {
    async get(name: string, _password: string): Promise<Maybe<Character[]>> {
        if (config.cams !== true) {
            return null;
        }
        if (name.toLocaleLowerCase().indexOf("!cam") == 0) {
            return [];
        }
        return null;
    }
}

export default new Cams();
