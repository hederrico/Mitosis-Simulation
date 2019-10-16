class Cell {
  constructor(pos, radius, colors) {

    //Lógica para usar o .copy()
    this.pos = pos ? pos.copy(): createVector(random(width),random(height));

    this.r = radius || 70;
    this.c = colors || color(random(100, 255), random(100, 255), random(100, 255), 100);

    //Mantém as ellipses dentro do canvas.
    this.pos.x = constrain(this.pos.x, 0 + this.r, width - this.r);
    this.pos.y = constrain(this.pos.y, 0 + this.r, height - this.r);
  }


  draw() {
    //Sensação de que a celula está vibrando.
    var vel = p5.Vector.random2D();
    this.pos.add(vel);
  }

  move() {
    noStroke();
    fill(this.c);
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.r);
  }

  //Verifica se uma celular foi clicada
  clicked(mouseX, mouseY) {
    if (dist(this.pos.x, this.pos.y, mouseX, mouseY) <= this.r / 2) {
      return true;
    } else {
      return false;
    }
  }

  //Cria uma nova celula em uma posição perto da célula clicada.
  mitosis() {
    this.pos.x += random(-this.r/3, this.r/3);
    this.pos.y += random(-this.r/3, this.r/3);

    //novo raio da celula possui tamanho perfeito
    var cell = new Cell(this.pos, sqrt(2)/2*this.r, this.c);
    return cell
  }

  //Contrário da mitose onde duas celulas se juntam e vira uma unica maior que as duas antigas.
  willJoin(cell) {
    if (dist(this.pos.x, this.pos.y, cell.pos.x, cell.pos.y) <= 8) {
      return true;
    } else {
      return false;
    }
  }

}
