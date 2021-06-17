import * as Crypto from '../../utils/crypto';
import * as NativeCrypto from 'crypto';

export enum CryptoAlgorithm {
    SHA1 = 'sha1',
    SHA2 = 'sha2',
    SHA256 = 'sha256',
    SHA512 = 'sha512',
    MD5 = 'md5',
    BCRYPT = 'bcrypt',
}

interface CryptoOptions {
    bcryptSaltRounds: number;
    hashPasswordMethod: CryptoAlgorithm;
}

class Passwords {
    private bcryptSaltRounds: number;
    private hashPasswordAlgorithm: CryptoAlgorithm;

    constructor(settings?: CryptoOptions) {
        this.bcryptSaltRounds = settings?.bcryptSaltRounds ?? 0;
        this.hashPasswordAlgorithm =
            settings.hashPasswordMethod ?? CryptoAlgorithm.BCRYPT;
    }

    public async equals(
        plainText: string,
        encrypted: string,
    ): Promise<boolean> {
        if (this.hashPasswordAlgorithm === CryptoAlgorithm.BCRYPT) {
            return Crypto.bcryptCompare(plainText, encrypted);
        }
        const hashedPassword = await this.hash(plainText);
        return hashedPassword === encrypted;
    }

    public async hash(password: string): Promise<string> {
        const algorithms: Record<CryptoAlgorithm, () => Promise<string>> = {
            bcrypt: () => Crypto.bcrypt(password, this.bcryptSaltRounds),
            sha1: () => Crypto.sha1(password),
            sha2: () => Crypto.sha2(password),
            sha256: () => Crypto.sha256(password),
            sha512: () => Crypto.sha512(password),
            md5: () => Crypto.md5(password),
        };
        return algorithms[this.hashPasswordAlgorithm]();
    }

    public hashSync(password: string): string {
        const nativeHash = (algorithm: string, data: string) => {
            return NativeCrypto.createHash(algorithm)
                .update(data)
                .digest('hex');
        };

        const algorithms: Record<CryptoAlgorithm, () => string> = {
            bcrypt: () => Crypto.bcrpytSync(password, this.bcryptSaltRounds),
            sha1: () => nativeHash('sha1', password),
            sha2: () => nativeHash('sha2', password),
            sha256: () => nativeHash('sha256', password),
            sha512: () => nativeHash('sha512', password),
            md5: () => nativeHash('md5', password),
        };
        return algorithms[this.hashPasswordAlgorithm]();
    }
}

export default new Passwords();
