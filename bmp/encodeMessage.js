const dm = require("./bmpDataManager");
const bm = require('./byteModifier');
const prompt = require("prompt-sync")({ sigint: true });

function getMessage(filePath) {
    const maxMessageLength = Math.floor(dm.getBmpPixelCount(filePath) / 4) - 3
    let message = prompt(`Your message can be at max ${maxMessageLength} chars, please enter it now: `);
    if (message.length > maxMessageLength) {
        console.log('');
        console.log("I gave you simple instructions and yet you choose a message greater than allowed.  I can't work with people like you.");
        console.log('');
        throw new Error("Trust betrayed")
    }
    return message
}

function encodeMessage() {
    const filePath = prompt('Enter the path to your image: ');
    if (!dm.isBmp24bitNoCompression(filePath)) {
        console.log("I cannot use this image, I need to have a 24 bit non compressed bmp image")
        return;
    }
    const message = getMessage(filePath);

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