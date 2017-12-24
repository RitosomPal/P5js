let snow = [];
let textures = [];
let gravity;

function preload() {
	textures[0] = loadImage('flake1.png');
	textures[1] = loadImage('flake2.png');
	textures[2] = loadImage('flake3.png');
	textures[3] = loadImage('flake4.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	gravity = createVector(0, 0.003);
}

function draw() {
	background(0);

	let wx = map(mouseX, 0, width, -0.01, 0.01);
	let wind = createVector(wx, 0);
	let design = random(textures);
	snow.push(new Snowflake(design));

	for (flake of snow) {
		flake.apptyForce(gravity);
			flake.apptyForce(wind);
		flake.update();
		flake.render();
	}

	for (let i = snow.length-1; i >= 0; i--) {
		if (snow[i].die()) {
			snow.splice(i, 1);
		}
	}
}
