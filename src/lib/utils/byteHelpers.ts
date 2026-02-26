export function getUInt16BigEndian(view: Uint8Array, offset: number): number {
  return (view[offset] << 8) | view[offset + 1];
}

export function getUInt24BigEndian(view: Uint8Array, offset: number): number {
  return (view[offset] << 16) | (view[offset + 1] << 8) | view[offset + 2];
}

export function parseBCD(view: Uint8Array, offset: number, length: number): number {
  let result = 0;
  for (let i = 0; i < length; i++) {
    const byte = view[offset + i];
    result = result * 100 + ((byte >> 4) * 10) + (byte & 0x0F);
  }
  return result;
}

export function countSetBits(view: Uint8Array, offset: number, length: number): number {
  let count = 0;
  for (let i = 0; i < length; i++) {
    let byte = view[offset + i];
    while (byte > 0) {
      if (byte & 1) count++;
      byte >>= 1;
    }
  }
  return count;
}

export function decodeStatus(byte: number): string {
  if (byte === 0) return 'OK';
  if (byte & 0x40) return 'SLP';
  if (byte & 0x20) return 'PSN';
  if (byte & 0x10) return 'BRN';
  if (byte & 0x08) return 'FRZ';
  if (byte & 0x04) return 'PAR';
  return 'OK';
}

export function getAsciiString(view: Uint8Array, offset: number, length: number): string {
  let result = '';
  for (let i = 0; i < length; i++) {
    const charCode = view[offset + i];
    if (charCode === 0) break;
    result += String.fromCharCode(charCode);
  }
  return result;
}
