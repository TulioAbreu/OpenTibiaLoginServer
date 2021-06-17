import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import * as constants from 'constants';
import {authenticator} from 'otplib';

import Config from './config';

authenticator.options = {
    window: 2,
};

class Crypto {
    privateKey: string = null;

    init = () => {
        if (this.privateKey) {
            throw 'Crypto is already initialized';
        }
        try {
            const keyFilePath = path.resolve(Config.keyFile);
            this.privateKey = fs
                .readFileSync(keyFilePath, 'utf-8')
                .toString()
                .trim();
            crypto.publicEncrypt(this.privateKey, Buffer.from('Test'));
        } catch (e) {
            throw `Can't load private key from ${Config.keyFile}`;
        }
    };

    rsaDecrypt = (buffer: Buffer): Buffer => {
        if (buffer.length != 128) {
            throw `rsaDecrypt: Invalid buffer length: ${buffer.length}`;
        }
        return crypto.privateDecrypt(
            {
                key: this.privateKey,
                padding: constants.RSA_NO_PADDING,
                passphrase: '',
            },
            buffer,
        );
    };

    hash = (algorithm: string, data: string): string => {
        return crypto.createHash(algorithm).update(data).digest('hex');
    };

    validateToken = (token: string, secret: string): boolean => {
        return authenticator.check(token, secret);
    };
}

export default new Crypto();
