const fs = require('fs');
const zlib = require('zlib');

function isFile(path) {
    console.log(path);
    try {
        const stats = fs.statSync(path);
        return stats.isFile();
    } catch (err) {
        return false;
    }
}

function fileBitsToString(filePath) {
    try {
        const data = fs.readFileSync(filePath);
        const bitString = data.toString('binary');
        return bitString;
    } catch (err) {
        console.error(`Error: ${err}`);
        return null;
    }
}

function stringToBitsFile(bitString) {
    try {
        const data = Buffer.from(bitString, 'binary');
        fs.writeFileSync("output", data);
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}

function compressString(inputString) {
    try {
        const compressed = zlib.gzipSync(inputString);
        const compressedString = compressed.toString('base64');
        return compressedString;
    } catch (err) {
        console.error(`Error: ${err}`);
        return null;
    }
}

function decompressString(compressedString) {
    try {
        const compressedBuffer = Buffer.from(compressedString, 'base64');
        const decompressed = zlib.gunzipSync(compressedBuffer);
        return decompressed.toString();
    } catch (err) {
        console.error(`Error: ${err}`);
        return null;
    }
}

module.exports = {
    isFile,
    fileBitsToString,
    stringToBitsFile,
    compressString,
    decompressString
}