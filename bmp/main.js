const em = require('./encodeMessage');
const dm = require('./decodeMessage');
const bm = require('./byteModifier');

const prompt = require("prompt-sync")({ sigint: true });

function main() {
    bm.logChar('b')
    const input = prompt("(e)ncode or (d)ecode?");
    if (input === "e") em.encodeMessage();
    if (input === "d") dm.decodeMessage()
}

main();

//C:\Users\Jack Frost\Desktop\modded.bmp