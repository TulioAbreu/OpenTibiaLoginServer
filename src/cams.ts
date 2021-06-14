import DB, { Character } from './db';
import { config } from './services/config';

class Cams {
    get = async (name: string, password: string): Promise<Character[]> => {
        if (config.cams !== true) {
            return null;
        }
        if (name.toLocaleLowerCase().indexOf("!cam") == 0) {
            return [];
        }
        return null;
    }
}

export default new Cams;