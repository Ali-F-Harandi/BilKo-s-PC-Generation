export class BinaryWriter {
    private buffer: Uint8Array;
    private offset: number = 0;

    constructor(sizeOrBuffer: number | Uint8Array) {
        if (typeof sizeOrBuffer === 'number') {
            this.buffer = new Uint8Array(sizeOrBuffer);
        } else {
            this.buffer = sizeOrBuffer;
        }
    }

    seek(offset: number) {
        this.offset = offset;
    }

    tell() {
        return this.offset;
    }

    u8(value: number) {
        this.buffer[this.offset++] = value & 0xFF;
    }

    u16be(value: number) {
        this.buffer[this.offset++] = (value >> 8) & 0xFF;
        this.buffer[this.offset++] = value & 0xFF;
    }

    u24be(value: number) {
        this.buffer[this.offset++] = (value >> 16) & 0xFF;
        this.buffer[this.offset++] = (value >> 8) & 0xFF;
        this.buffer[this.offset++] = value & 0xFF;
    }

    string(str: string, length: number) {
        // Simple mapping for now, should use a proper encoder if needed
        for (let i = 0; i < length; i++) {
            if (i < str.length) {
                // This is a placeholder for actual Gen 1 encoding
                this.buffer[this.offset++] = str.charCodeAt(i);
            } else {
                this.buffer[this.offset++] = 0x50; // Terminator
            }
        }
    }

    bcd(value: number, length: number) {
        let str = value.toString().padStart(length * 2, '0');
        for (let i = 0; i < length; i++) {
            const high = parseInt(str[i * 2]);
            const low = parseInt(str[i * 2 + 1]);
            this.buffer[this.offset++] = (high << 4) | low;
        }
    }

    getBuffer() {
        return this.buffer;
    }
}
