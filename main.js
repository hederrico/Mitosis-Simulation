var cells = [];
var cell;

function setup() {
  createCanvas(800, 800);
  for (var i = 0; i < 5; i++) {
    cell = new Cell();
    cells.push(cell);
  }
}

function draw() {
  background(51);
  for (var i = 0; i < cells.length; i++) {
    cells[i].draw();
    cells[i].move();

    for (var j = 0; j < cells.length; j++) {

      if (cells[i].willJoin(cells[j]) && i != j) {
        console.log(cells[i], cells[j]);

        var newPos = (cells[i].pos.add(cells[j].pos / 2)) ;
        var newColor = (cells[i].c + cells[j].c) / 2;
        var newR = (cells[i].r + cells[j].r)*2 / sqrt(2);

        cells.splice(j, 1);
        cells[i].pos = newPos;
        cells[i].c = newColor;
        cells[i].r = newR;
      }
    }

  }
}

function mousePressed() {
  //Começa no final para nao entrar em um loop infinito
  for (var i = cells.length - 1; i >= 0; i--) {
    if (cells[i].clicked(mouseX, mouseY)) {
      cells.push(cells[i].mitosis());
      cells.push(cells[i].mitosis());
      cells.splice(i, 1);
    }
  }
}
