function modifyLastTwoBits(byte, newBits) {
    // Clear the last two bits by ANDing with 0xFC (binary 11111100)
    const maskedByte = byte & 0xFC;
    const maskedLastTwoBits = newBits & 0x3;

    // Add the new bits by ORing with the new value shifted left by two positions
    const modifiedByte = maskedByte | maskedLastTwoBits;

    return modifiedByte;
}

function getLastTwoBits(byte) {
    // Use bitwise AND to extract the last two bits
    return byte & 0b11;
}

function logByte(number) {
    const byteMask = 0xFF; // binary 11111111
    const lastByte = number & byteMask;
    const binaryString = lastByte.toString(2).padStart(8, '0');
    console.log(`The last byte of ${number} in binary is ${binaryString}`);
}

function logChar(char) {
    const charCode = char.charCodeAt(0);
    console.log(charCode);
    const binaryString = charCode.toString(2).padStart(8, '0');
    console.log(`The character '${char}' in binary is ${binaryString}`);
}

function bitSetsToByte(bitSet1, bitSet2, bitSet3, bitSet4) {
    const byte = (bitSet1 << 6) | (bitSet2 << 4) | (bitSet3 << 2) | bitSet4;
    return byte;
}

function separateByteToBits(byte) {
    const bitSet1 = byte >> 6;
    const bitSet2 = (byte >> 4) & 0x03;
    const bitSet3 = (byte >> 2) & 0x03;
    const bitSet4 = byte & 0x03;
    return [bitSet1, bitSet2, bitSet3, bitSet4];
}

function byteToChar(byte) {
    return String.fromCharCode(byte);
}

function charToInt(char) {
    return char.charCodeAt(0);
}





module.exports = {
    logByte,
    logChar,
    modifyLastTwoBits,
    getLastTwoBits,
    charToInt,
    separateByteToBits,
    bitSetsToByte,
    byteToChar
}