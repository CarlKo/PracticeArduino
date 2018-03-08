(async function () {

var y;
var x;
var rgbled;


boardReady({board: 'Smart', url: '192.168.31.30'}, async function (board) {
  board.systemReset();
  board.samplingInterval = 50;
  y = 0;
  x = 1;
  while (!(x == 3000)) {
    y = x % 3;
    if (y == 1) {
      rgbled = getRGBLedCathode(board, 15, 12, 13);
      rgbled.setColor('#ff0000');
    }
    if (y == 2) {
      rgbled = getRGBLedCathode(board, 15, 12, 13);
      rgbled.setColor('#ffff66');
    }
    if (y == 0) {
      rgbled = getRGBLedCathode(board, 15, 12, 13);
      rgbled.setColor('#009900');
    }
    x = x + 1;
    await delay(0.5);
  }
});

}());
