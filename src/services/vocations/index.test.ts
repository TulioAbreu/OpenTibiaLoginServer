import {VocationsSchema} from './schema';
import Vocations from '.';
import * as fs from 'fs';

describe('Vocations', () => {
    describe('Schema', () => {
        it('should pass', () => {
            const dummyVocations = [
                {
                    id: 0,
                    name: 'DummyVocation0',
                },
                {
                    id: 1,
                    name: 'DummyVocation1',
                },
            ];
            expect(VocationsSchema.isValidSync(dummyVocations)).toBeTruthy();
        });

        describe('should not pass', () => {
            test('with vocation without name', () => {
                const dummyVocations = [
                    {
                        id: 0,
                    },
                ];
                expect(VocationsSchema.isValidSync(dummyVocations)).toBeFalsy();
            });

            test('without vocations', () => {
                const dummyVocations = [];
                expect(VocationsSchema.isValidSync(dummyVocations)).toBeFalsy();
            });
        });
    });

    describe('Vocations', () => {
        describe('getVocationNameByID', () => {
            test('it should return correct names', () => {
                jest.spyOn(fs, 'readFileSync').mockReturnValueOnce(
                    JSON.stringify([
                        {
                            id: 0,
                            name: 'Knight',
                        },
                        {
                            id: 1,
                            name: 'Sorcerer',
                        },
                    ]),
                );
                Vocations.loadVocationsFile();
                expect(Vocations.getVocationNameByID(0)).toBe('Knight');
                expect(Vocations.getVocationNameByID(1)).toBe('Sorcerer');
            });
        });
    });
});
