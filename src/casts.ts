import DB, { Character } from './db';
import { config } from './services/config';

class Casts {
    get = async (name: string, password: string): Promise<Character[]> => {
        if (config.casts !== true) {
            return null;
        }
        if (name.length == 0 || name.toLocaleLowerCase().indexOf("!cast") == 0) {
            return [];
        }
        return null;
    }
}

export default new Casts;