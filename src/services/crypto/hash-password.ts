import { createHash } from "crypto";

enum EncryptionMethod {
    SHA = "sha",
    SHA1 = "sha1",
    SHA2 = "sha2",
    SHA256 = "sha256",
    SHA512 = "sha512",
    MD5 = "md5",
}

// TODO: Add support for methods with salt/hash
export function encryptPassword(algorithm: EncryptionMethod, password: string): string {
    return createHash(algorithm)
        .update(password)
        .digest("hex");
}
