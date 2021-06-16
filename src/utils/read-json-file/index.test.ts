import * as fs from 'fs';
import {readJSONFileSync} from '.';

describe('readJSONFileSync', () => {
    it('should return an object', () => {
        const fakeFileContent = '{"hello": "world!"}';
        jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(fakeFileContent);
        const helloWorldObject = readJSONFileSync('');
        expect(helloWorldObject).toBeDefined();
        expect(helloWorldObject['hello']).toBe('world!');
    });

    it('should return undefined', () => {
        expect(readJSONFileSync).toThrowError();
    });
});
