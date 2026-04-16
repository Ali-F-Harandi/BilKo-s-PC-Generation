export function decodeText(data: Uint8Array, offset: number, length: number): string {
  const slice = data.slice(offset, offset + length);
  let result = '';
  for (let i = 0; i < slice.length; i++) {
    const charCode = slice[i];
    if (charCode === 0x50) { // Terminator
        break;
    }
    // Basic mapping for Gen 1 chars (incomplete)
    if (charCode >= 0x80 && charCode <= 0x99) {
        result += String.fromCharCode('A'.charCodeAt(0) + (charCode - 0x80));
    } else if (charCode >= 0xA0 && charCode <= 0xB9) {
        result += String.fromCharCode('a'.charCodeAt(0) + (charCode - 0xA0));
    } else if (charCode >= 0xF6 && charCode <= 0xFF) {
        result += (charCode - 0xF6).toString();
    } else {
        // Fallback for unknown chars
        result += '?';
    }
  }
  return result;
}
