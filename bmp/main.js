const em = require('./encodeMessage');
const dm = require('./decodeMessage');
const fh = require('./fileHandler');



function main(file, flag = 'd', message = '') {

    if (flag.includes('d')) {
        const isFile = true
        let message = dm.decodeMessage(file);
        //message = fh.decompressString(message);
        console.log(message.length)
        if (isFile) {
            fh.stringToBitsFile(message)
        }
        else {
            console.log(message.length);
            console.log(message);
        }

    }
    else if (flag.includes('e')) {
        let contentToEncode = message
        if (fh.isFile(message)) {
            contentToEncode = fh.fileBitsToString(message);
            console.log('original message length: ' + contentToEncode.length);
        }

        //contentToEncode = fh.compressString(contentToEncode);
        console.log('base64 message length: ' + contentToEncode.length);
        em.encodeMessage(file, contentToEncode);
    }
}

main(process.argv[2], process.argv[3], process.argv[4]);

//C:\Users\vboxuser\Desktop\Untitled.bmp