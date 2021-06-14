import Crypto from "../../crypto";

export class OutputPacket {
    private buffer: Buffer;
    private pos: number;
    private header: number;

    constructor() {
        this.buffer = Buffer.allocUnsafe(8192);
        this.header = 10;
        this.pos = this.header;
    }

    public length(): number {
        return this.pos;
    }

    public getSendBuffer(): Buffer {
        return Buffer.from(this.buffer.buffer, this.header, this.pos - this.header);
    }

    public addU8(value: number): void {
        this.check(1);
        this.buffer.writeUInt8(value, this.pos);
        this.pos += 1;
    }

    public addU16(value: number): void {
        this.check(2);
        this.buffer.writeUInt16LE(value, this.pos);
        this.pos += 2;
    }

    public addU32(value: number): void {
        this.check(4);
        this.buffer.writeUInt32LE(value, this.pos);
        this.pos += 4;
    }

    public addString(value: string): void {
        this.check(value.length + 2);
        this.addU16(value.length);
        this.buffer.write(value, this.pos);
        this.pos += value.length;
    }

    public addBytes(value: Buffer): void {
        this.check(value.length + 2);
        this.addU16(value.length);
        value.copy(this.buffer, this.pos);
        this.pos += value.length;
    }

    public xteaEncrypt(xtea: number[]): void {
        // add size
        this.buffer.writeUInt16LE(this.pos - this.header, this.header - 2);
        this.header -= 2;

        // fill
        if ((this.pos - this.header) % 8 != 0) {
            const toAdd = 8 - (this.pos - this.header) % 8;
            for (let i = 0; i < toAdd; ++i) {
                this.addU8(0x33);
            }
        }

        // xtea encrypt
        if (this.header != 8) { // must have 8 reserved bytes
            throw `Invalid header size: ${this.header}`
        }
        Crypto.xteaEncrypt(this.buffer, this.pos, xtea);
    }

    public addChecksum(): void {
        this.buffer.writeUInt32LE(Crypto.adler32(this.buffer, this.header, this.pos - this.header), this.header - 4);
        this.header -= 4;
    }

    public addSize(): void {
        this.buffer.writeUInt16LE(this.pos - this.header, this.header - 2);
        this.header -= 2;
    }

    private check(size: number) {
        if (this.pos + size > this.buffer.length) {
            throw `Packet overflow (size: ${this.buffer.length})`;
        }
    }
}