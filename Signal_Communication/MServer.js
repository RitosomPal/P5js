class mServer {
  constructor(x, y, lab) {
    this.pos = createVector(x, y);
    this.r = 30;
    this.radi = this.r*2;
    this.lable = lab || '';
    this.client = false;
    this.server = true;
    this.range = 300;
  }

  intersects(ob) {
    let d = dist(this.pos.x, this.pos.y, ob.pos.x,ob.pos.y);
    return (d < this.r, ob.r)
  }

  signalRange() {
    noFill();
    stroke(100, 255, 100);
    ellipse(this.pos.x, this.pos.y, this.range, this.range);
  }

  display() {
    fill(255,0,0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
    noFill();
    stroke(255);
    ellipse(this.pos.x, this.pos.y, this.radi, this.radi);
    fill(0);
    noStroke();
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(this.lable, this.pos.x, this.pos.y);
  }
}
