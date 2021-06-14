import Crypto from "../../crypto";

export class InputPacket {
    private buffer: Buffer;
    private position: number;

    constructor(buffer: Buffer) {
        this.buffer = buffer;
        this.position = 0;
    }

    public getU8(): number {
        this.check(1);
        const returnValue = this.buffer.readUInt8(this.position);
        this.position += 1;
        return returnValue;
    }

    public peekU8(): number {
        this.check(1);
        return this.buffer.readUInt8(this.position);
    }

    public getU16(): number {
        this.check(2);
        const returnValue = this.buffer.readUInt16LE(this.position);
        this.position += 2;
        return returnValue;
    }

    public peekU16(): number {
        this.check(2);
        return this.buffer.readUInt16LE(this.position);
    }

    public getU32(): number {
        this.check(4);
        const returnValue = this.buffer.readUInt32LE(this.position);
        this.position += 4;
        return returnValue;
    }

    public peekU32(): number {
        this.check(4);
        return this.buffer.readUInt32LE(this.position);
    }

    public getString(size?: number): string {
        if (!size) {
            size = this.getU16();
        }
        this.check(size);
        const returnValue = this.buffer.toString('ascii', this.position, this.position + size);
        this.position += size;
        return returnValue;
    }

    public peekString(size?: number): string {
        if (!size) {
            size = this.peekU16();
        }
        this.check(size);
        return this.buffer.toString('ascii', this.position + 2, this.position + 2 + size);
    }

    public getBytes(size: number): Buffer {
        this.check(size);
        const returnValue = this.buffer.slice(this.position, this.position + size);
        this.position += size;
        return returnValue;
    }

    // TODO: Why is that here?
    public rsaDecrypt(): InputPacket {
        return new InputPacket(Crypto.rsaDecrypt(this.getBytes(128)));
    }

    // TODO: Why is that here?
    public adler32(): number {
        return Crypto.adler32(this.buffer, this.position + 4, this.buffer.length - this.position - 4);
    }

    public toHexString(): string {
        return this.buffer.toString('hex');
    }

    private check(size: number) {
        if (this.position + size > this.buffer.length) {
            throw `Packet overflow (size: ${this.buffer.length})`;
        }
    }
}
