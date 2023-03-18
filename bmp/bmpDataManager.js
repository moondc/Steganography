const fs = require('fs');

function readBmpPixels(filepath) {
  const buffer = fs.readFileSync(filepath);
  const headerSize = buffer.readUIntLE(10, 4);
  const width = buffer.readUIntLE(18, 4);
  const height = buffer.readUIntLE(22, 4);
  const pixelDataOffset = headerSize;
  const bytesPerPixel = 3; // assuming 24 bits per pixel
  const pixelArray = [];

  // loop through each row of pixels
  for (let y = height - 1; y >= 0; y--) {
    const rowOffset = pixelDataOffset + (y * width * bytesPerPixel);

    // loop through each pixel in the row
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + (x * bytesPerPixel);
      const red = buffer.readUInt8(pixelOffset + 2);
      const green = buffer.readUInt8(pixelOffset + 1);
      const blue = buffer.readUInt8(pixelOffset);
      pixelArray.push([red, green, blue]);
    }
  }
  return pixelArray;
}

function getBmpPixelCount(filepath) {
  const buffer = fs.readFileSync(filepath);
  const width = buffer.readUIntLE(18, 4);
  const height = buffer.readUIntLE(22, 4);
  const pixelCount = width * height;

  return pixelCount;
}

function writeBmpPixels(filepath, pixels) {
  const buffer = fs.readFileSync(filepath);
  const headerSize = buffer.readUIntLE(10, 4);
  const width = buffer.readUIntLE(18, 4);
  const height = buffer.readUIntLE(22, 4);
  const pixelDataOffset = headerSize;
  const bytesPerPixel = 3; // assuming 24 bits per pixel

  // loop through each row of pixels
  for (let y = height - 1; y >= 0; y--) {
    console.log(y);
    const rowOffset = pixelDataOffset + (y * width * bytesPerPixel);

    // loop through each pixel in the row
    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + (x * bytesPerPixel);
      const [red, green, blue] = pixels.shift(); // take the next pixel from the array
      buffer.writeUInt8(blue, pixelOffset);
      buffer.writeUInt8(green, pixelOffset + 1);
      buffer.writeUInt8(red, pixelOffset + 2);
    }
  }

  fs.writeFileSync(filepath, buffer);
}

function isBmp24bitNoCompression(filepath) {
  const buffer = fs.readFileSync(filepath);
  const headerSize = buffer.readUIntLE(10, 4);
  const compression = buffer.readUIntLE(30, 4);
  const bitsPerPixel = buffer.readUIntLE(28, 2);

  // check that the header size is valid
  if (headerSize < 54) {
    return false;
  }

  // check that the compression is set to 0 (no compression)
  if (compression !== 0) {
    return false;
  }

  // check that the bits per pixel is 24
  if (bitsPerPixel !== 24) {
    return false;
  }

  // BMP is 24-bit with no compression
  return true;
}


module.exports = {
  readBmpPixels,
  writeBmpPixels,
  getBmpPixelCount,
  isBmp24bitNoCompression
}