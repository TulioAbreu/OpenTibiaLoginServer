import { Character } from '../../db';
import { Maybe } from '../../utils/maybe';
import { config } from '../config';

const CONFIG_CASTS_ENABLED = config.casts;

class Casts {
    async get(name: string, _password: string): Promise<Maybe<Character[]>> {
        if (!CONFIG_CASTS_ENABLED) {
            return null;
        }
        if (name.length == 0 || name.toLocaleLowerCase().indexOf("!cast") == 0) {
            return [];
        }
        return null;
    }
}

export default new Casts();