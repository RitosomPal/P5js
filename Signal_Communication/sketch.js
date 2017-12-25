let poles = [];
let totalPoles = 13;

let popSize = 500;
let population = [];
let fitness = [];

let recordDistance = Infinity;
let bestEver;
let currentBest;

let server;
let lsI;
let msI;

function setup() {
	createCanvas(windowWidth, windowHeight);

  let order = [];

	server = new mServer(mouseX, mouseY, 'S');

	for (let i=0; i<totalPoles; i++) {
		poles.push(new pole(random(150, width-150), random(150, height-150), i+1));
		order[i] = i;
	}

	lsI = findServer(poles);

	for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }

}

function draw() {
	background(51);

	// GA
  calculateFitness();
  normalizeFitness();
  nextGeneration();

	//Path
	stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    let n = bestEver[i];
    vertex(poles[n].pos.x, poles[n].pos.y);
  }
  endShape();

	communicate();

	//Server
	server.pos.x = mouseX;
	server.pos.y = mouseY;
	server.signalRange();
	server.display();

	//Node
	let c = 0;
	for (p of poles) {
		c++;
		if (c == lsI+1 || c == msI+1) {
			p.server = true;
		} else {
			p.server = false;
		}
		p.display();
		p.signalRange();
	}

}

function findServer(a) {
	let minIndex;
	let cr = Infinity;
	let sum  = 0;
	for (let i=0; i<a.length; i++) {
		for (let j=0; j<a.length; j++) {
			if (i != j) {
				let pointA = a[i].pos;
				let pointB = a[j].pos;
				let d = dist(pointA.x, pointA.y, pointB.x, pointB.y);
				sum += d;
			}
		}
		if (sum < cr) {
			cr = sum;
			minIndex = i;
		}
		sum = 0;
	}
	a[minIndex].server = true;
	return minIndex;
}

function communicate() {
	let md = Infinity;
	stroke(0,100,255);
	strokeWeight(2);
	for (let i=0; i<totalPoles; i++) {
		let msd = dist(poles[i].pos.x, poles[i].pos.y, server.pos.x, server.pos.y);
		if (msd < md) {
			md = msd;
			msI = i;
		}
		let lsd = dist(poles[i].pos.x, poles[i].pos.y, poles[lsI].pos.x, poles[lsI].pos.y);
		if (lsd < msd) {
			line(poles[i].pos.x, poles[i].pos.y, poles[lsI].pos.x, poles[lsI].pos.y);
		} else {
			line(poles[i].pos.x, poles[i].pos.y, server.pos.x, server.pos.y);
		}
	}
	noFill();
	stroke(255,100,0);
	strokeWeight(3);
	if (sdist(lsI) <= sdist(msI)) {
		line(poles[lsI].pos.x, poles[lsI].pos.y, server.pos.x, server.pos.y);
	} else {
		poles[msI].server = true;
		line(poles[lsI].pos.x, poles[lsI].pos.y, poles[msI].pos.x, poles[msI].pos.y);
		line(poles[msI].pos.x, poles[msI].pos.y, server.pos.x, server.pos.y);
	}
	//console.log(msI, lsI);
}

function sdist(i) {
	return dist(poles[i].pos.x, poles[i].pos.y, server.pos.x, server.pos.y);
}
