function calculateArea(length, width) {
  return length * width;
}

function calculateVolume(length, width, height) {
  return length * width * height;
}

function calculateSquare(length) {
  return length * length;
}

module.exports = { calculateArea, calculateVolume, calculateSquare };
