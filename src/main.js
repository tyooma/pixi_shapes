import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

const app = new PIXI.Application({
  width: 600,
  heigth: 600,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xfff0fa,
});

document.body.appendChild(app.view);

app.stage.interactive = true;

window.app = app;
app.renderer.plugins.interaction.on('pointerdown', onPointerDown);

let time = 5;
let numOfShapes = 0;

function onPointerDown() {
  const shape = new PIXI.Graphics();

  shape.beginFill(getRandomColor());

  const shapeType = shapeTypeGenerator();

  if (shapeType === 'Circle') {
    shape.drawCircle(0, 0, 32);
    shape.endFill();
    shape.x = Math.random() * 500;
    shape.y = Math.random() * 500;
  }

  if (shapeType === 'Ellipse') {
    shape.drawEllipse(0, 0, 50, 20);
    shape.endFill();
    shape.x = Math.random() * 500;
    shape.y = Math.random() * 500;
  }

  if (shapeType === 'Polygon') {
    const path = shapeSidesGenerator(3, 8);

    shape.drawPolygon(path);
    shape.x = Math.random() * 500;
    shape.y = Math.random() * 500;
    shape.endFill();
  }

  gsap.to(shape, {
    y: 600, duration: time, repeat: 0,
  });

  numOfShapes = numOfShapes + 1;

  app.stage.addChild(shape);
}

function shapeTypeGenerator() {
  const shapes = [
    'Circle',
    'Ellipse',
    'Polygon',
  ];
  const value = Math.floor(Math.random() * shapes.length);

  return shapes[value];
}

function shapeSidesGenerator(min, max) {
  const path = [];
  const pathLength = Math.floor(Math.random() * (max - min) + min);
  const shapeMax = 300;
  const shapeMin = 100;

  for (let i = 0; i < pathLength; i++) {
    path.push(Math.floor(Math.random() * (shapeMax - shapeMin) + shapeMin));
    path.push(Math.floor(Math.random() * (shapeMax - shapeMin) + shapeMin));
  }

  return path;
}

function getRandomColor() {
  let color = Math.floor(Math.random() * Math.pow(256, 3)).toString(16);

  while (color.length < 6) {
    color = '0' + color;
  }

  return '0x' + color;
}

function gravityIncrease() {
  document.getElementById('gravity-value')
    .innerHTML = `Gravity value: ${time}`;

  return time++;
}

function gravityDecrease() {
  if (time > 0) {
    document.getElementById('gravity-value')
      .innerHTML = `Gravity value: ${time}`;

    return time--;
  }
}

document.getElementById('gravity-increase')
  .addEventListener('click', gravityIncrease);

document.getElementById('gravity-decrease')
  .addEventListener('click', gravityDecrease);
