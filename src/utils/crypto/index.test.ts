import {bcrypt, bcryptCompare, md5, sha1, sha2, sha256, sha512} from '.';

describe('Crypto', () => {
    test('md5', async () => {
        const str = 'hello, world!';
        const hashedStr = '3adbbad1791fbae3ec908894c4963870';
        const result = await md5(str);
        expect(result).toBe(hashedStr);
    });

    test('sha1', async () => {
        const str = 'hello, world!';
        const hashedStr = '1f09d30c707d53f3d16c530dd73d70a6ce7596a9';
        const result = await sha1(str);
        expect(result).toBe(hashedStr);
    });

    test('sha2', async () => {
        const str = 'hello, world!';
        const hashedStr =
            '68e656b251e67e8358bef8483ab0d51c6619f3e7a1a9f0e75838d41ff368f728';
        const result = await sha2(str);
        expect(result).toBe(hashedStr);
    });

    test('sha256', async () => {
        const str = 'hello, world!';
        const hashedStr =
            '68e656b251e67e8358bef8483ab0d51c6619f3e7a1a9f0e75838d41ff368f728';
        const result = await sha256(str);
        expect(result).toBe(hashedStr);
    });

    test('sha512', async () => {
        const str = 'hello, world!';
        const hashedStr =
            '6c2618358da07c830b88c5af8c3535080e8e603c88b891028a259ccdb9ac802d0fc0170c99d58affcf00786ce188fc5d753e8c6628af2071c3270d50445c4b1c';
        const result = await sha512(str);
        expect(result).toBe(hashedStr);
    });

    test('bcrypt', async () => {
        const str = 'hello, world!';
        const result = await bcrypt(str, 10);
        const sameText = await bcryptCompare(str, result);
        expect(sameText).toBeTruthy();
    });
});
