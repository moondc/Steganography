const dm = require("./bmpDataManager");
const bm = require('./byteModifier');

function decodeMessage(filePath) {

    let simpleArray = dm.readBmpPixels(filePath);
    return extractMessage(simpleArray);
}

function extractMessage(array) {
    let message = '';
    let breakoutCount = 0;
    let shouldBreak = false;
    let tempBuffer = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < 3; j++) {
            tempBuffer.push(array[i][j])
            if (tempBuffer.length === 4) {
                const a = bm.getLastTwoBits(tempBuffer[0])
                const b = bm.getLastTwoBits(tempBuffer[1])
                const c = bm.getLastTwoBits(tempBuffer[2])
                const d = bm.getLastTwoBits(tempBuffer[3])
                tempBuffer = [];
                const fullCode = bm.bitSetsToByte(a, b, c, d);
                const char = bm.byteToChar(fullCode);
                message = message + char;
                if (char === '\t') {
                    breakoutCount++;
                    if (breakoutCount === 3) {
                        message = message.slice(0, -3);
                        shouldBreak = true;
                        break;
                    }
                }
                else {
                    breakoutCount = 0;
                }
            }
        }
        if (shouldBreak) break;
    }

    return message;
}

module.exports = {
    decodeMessage: decodeMessage
}

