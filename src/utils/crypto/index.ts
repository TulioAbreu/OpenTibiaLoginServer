import {hash} from '@ronomon/crypto-async';
import * as Bcrypt from 'bcrypt';

export function adler32(buffer: Buffer, offset: number, size: number): number {
    const M = 65521;
    const d = new Uint32Array(2);
    d[0] = 1;
    d[1] = 0;
    let position = offset;
    while (size > 0) {
        let tlen = size > 5552 ? 5552 : size;
        size -= tlen;
        while (tlen--) {
            d[0] = d[0] + buffer[position++];
            d[1] = d[1] + d[0];
        }
        d[0] = d[0] % M;
        d[1] = d[1] % M;
    }

    d[1] = (d[1] << 16) | d[0];
    return d[1];
}

export function xteaEncrypt(
    buffer: Buffer,
    size: number,
    xtea: number[],
): void {
    const u32 = new Uint32Array(
        buffer.buffer,
        buffer.byteOffset,
        size / Uint32Array.BYTES_PER_ELEMENT,
    );
    for (let i = 2; i < u32.length; i += 2) {
        u32[0] = 0; // sum
        for (let j = 0; j < 32; ++j) {
            u32[i] +=
                ((((u32[i + 1] << 4) >>> 0) ^ (u32[i + 1] >>> 5)) +
                    u32[i + 1]) ^
                (u32[0] + xtea[u32[0] & 3]);
            u32[0] = (u32[0] + 0x9e3779b9) >>> 0;
            u32[i + 1] +=
                ((((u32[i] << 4) >>> 0) ^ (u32[i] >>> 5)) + u32[i]) ^
                (u32[0] + xtea[(u32[0] >> 11) & 3]);
        }
    }
}

export function bcrpytSync(data: string, saltRounds: number): string {
    const salt = Bcrypt.genSaltSync(saltRounds);
    return Bcrypt.hashSync(data, salt);
}

export async function bcrypt(
    data: string,
    saltRounds: number,
): Promise<string> {
    const salt = await Bcrypt.genSalt(saltRounds);
    return Bcrypt.hash(data, salt);
}

export async function bcryptCompare(
    plainText: string,
    encrypted: string,
): Promise<boolean> {
    return Bcrypt.compare(plainText, encrypted);
}

export async function md5(data: string): Promise<string> {
    return ronomonHash('md5', data);
}

export async function sha1(data: string): Promise<string> {
    return ronomonHash('sha1', data);
}

export async function sha2(data: string): Promise<string> {
    return ronomonHash('sha2', data);
}

export async function sha256(data: string): Promise<string> {
    return ronomonHash('sha256', data);
}

export async function sha512(data: string): Promise<string> {
    return ronomonHash('sha512', data);
}

function ronomonHash(algorithm: string, data: string): Promise<string> {
    return new Promise((resolve) => {
        const buffer = Buffer.from(data, 'utf8');
        hash(algorithm, buffer, (error: Error, result: Buffer) => {
            if (error) {
                console.error(error);
                resolve(undefined);
            }
            resolve(result.toString('hex'));
        });
    });
}
