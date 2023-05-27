const dm = require("./bmpDataManager");
const bm = require('./byteModifier');


function encodeMessage(filePath, message) {
    if (!dm.isBmp24bitNoCompression(filePath)) {
        console.log("I cannot use this image, I need to have a 24 bit non compressed bmp image")
        return;
    }

    const maxMessageLength = Math.floor(dm.getBmpPixelCount(filePath) / 4) - 3
    if (message.length > maxMessageLength) {
        console.log('');
        console.log("You chose too much content to be encoded.  I can't work with people like you.");
        console.log({ MessageLength: message.length, MaxMessageLength: maxMessageLength });
        throw new Error("Content too large")
    }


    let pixelArr = dm.readBmpPixels(filePath);
    let modifiedArr = injectMessage(message, pixelArr);
    dm.writeBmpPixels(filePath, modifiedArr)
}

function injectMessage(message, array) {
    const messageWithEnding = message + "\t\t\t";
    rgbArrayCount = 0;
    for (let i = 0; i < messageWithEnding.length; i++) {
        const char = messageWithEnding[i]
        const code = bm.charToInt(char);
        const bitArray = bm.separateByteToBits(code);
        for (let n = 0; n < 4; n++) {
            const { x, y } = getIndexIndex(i * 4 + n);

            const origValue = array[x][y]
            const newValue = bm.modifyLastTwoBits(origValue, bitArray[n])
            array[x][y] = newValue
        }
    }
    return array;
}

function getIndexIndex(position) {
    const x = Math.floor(position / 3);
    const y = position % 3;
    return { x, y }
}

module.exports = {
    encodeMessage
}