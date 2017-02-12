var mapimg;
var mw = 1200, mh = 600, md = (mh/2),mlat = 0, mlon = 0, mz = 1;
var clat = 0, clon = 0, lat = 0, lon = 0;

function preload() {
  mapimg = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/'+mlat+','+mlon+','+mz+'/'+mw+'x'+mh+'?access_token=pk.eyJ1Ijoicml0b3NvbSIsImEiOiJjaXoybnRlbnkwNTg5MnFwaGZrYnNjeHh1In0.Li8FTxlfn0u20G432b1DeA');
}

function mercX(lon) {
  lon = radians(lon);
  var a = (md / PI) * pow(2, mz);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (md / PI) * pow(2, mz);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);
  return a * c;
}

function setup() {
  createCanvas(mw,mh);
  translate(width/2, height/2);
  imageMode(CENTER);
  image(mapimg, 0, 0);

}

function gotData(data) {
  translate(width/2, height/2);

  var cx = mercX(clon);
  var cy = mercY(clat);

  var lat = data.iss_position.latitude;
  var lon = data.iss_position.longitude;
  var x = mercX(lon) - cx;
  var y = mercY(lat) - cy;

  // stroke(255,0,255);
  // fill(255, 0, 255,50);
  // ellipse(x,y,1,1);

  stroke(255,255,0,20);
  strokeWeight(2);
  point(x,y);

}

function draw() {

  loadJSON('http://api.open-notify.org/iss-now.json', gotData);

}
