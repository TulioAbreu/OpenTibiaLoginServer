import {readJSONFileSync} from '../../read-json-file';
import {VocationsSchema} from './schema';

const VocationsPath = './config/vocations.json';
const UnknownVocation = 'Unknown';

export interface Vocation {
    id: number;
    name: string;
}

export default class Vocations {
    private vocations: Map<number, Vocation>;

    constructor() {
        this.loadVocationsFile();
    }

    public loadVocationsFile(): void {
        this.vocations = this.parseVocations(
            this.validateVocations(this.readVocationsFile()),
        );
    }

    public getVocationNameByID(id: number): string {
        return this.vocations.get(id)?.name ?? UnknownVocation;
    }

    private readVocationsFile(): unknown {
        return readJSONFileSync(VocationsPath);
    }

    private validateVocations(vocationsFileContent: unknown): Vocation[] {
        return VocationsSchema.validateSync(vocationsFileContent);
    }

    private parseVocations(vocations: Vocation[]): Map<number, Vocation> {
        const vocationsMap = new Map<number, Vocation>();
        vocations.forEach((vocation: Vocation) => {
            const {id} = vocation;
            vocationsMap.set(id, vocation);
        });
        return vocationsMap;
    }
}
