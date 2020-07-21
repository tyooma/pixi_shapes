import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';

const app = new PIXI.Application({
  width: 700,
  heigth: 700,
  antialias: true,
  transparent: false,
  resolution: 1,
  backgroundColor: 0xfff0fa,
});

document.body.appendChild(app.view);

app.stage.interactive = true;

window.app = app;
app.renderer.plugins.interaction.on('pointerdown', onPointerDown);

app.renderer.view.addEventListener('click', (event) => {
  coords = [];
  coords.push(event.offsetX, event.offsetY);
});

let coords = [];
let time = 5;
let shapesPerSecond = 1;
let shapesQuantity = 0;

function onPointerDown() {
  const shape = new PIXI.Graphics();

  shape.beginFill(getRandomColor());

  const shapeType = shapeTypeGenerator();

  if (shapeType === 'Circle') {
    shape.drawCircle(0, 0, Math.random() * 32);
    shape.endFill();
    shape.x = coords[0];
    shape.y = coords[1];
  }

  if (shapeType === 'Ellipse') {
    shape.drawEllipse(0, 0, Math.random() * 50, Math.random() * 20);
    shape.endFill();
    shape.x = coords[0];
    shape.y = coords[1];
  }

  if (shapeType === 'Polygon') {
    const path = shapeSidesGenerator(3, 6);

    shape.drawPolygon(path);
    shape.endFill();
    shape.x = coords[0] - path[0];
    shape.y = coords[1] - path[1];
  }

  gsap.to(shape, {
    y: 600, duration: time, repeat: 0,
  });

  shapesQuantity++;

  document.getElementById('shapes-quantity')
    .innerHTML = `Num of current shapes: ${shapesQuantity}`;

  app.stage.addChild(shape);
}

function shapesCreator() {
  for (let i = 1; i <= shapesPerSecond; i++) {
    const shape = new PIXI.Graphics();

    shape.beginFill(getRandomColor());

    const shapeType = shapeTypeGenerator();

    if (shapeType === 'Circle') {
      shape.drawCircle(0, 0, Math.random() * 32);
      shape.endFill();
      shape.x = Math.random() * 600;
      shape.y = Math.random() * 600;
    }

    if (shapeType === 'Ellipse') {
      shape.drawEllipse(0, 0, Math.random() * 50, Math.random() * 20);
      shape.endFill();
      shape.x = Math.random() * 600;
      shape.y = Math.random() * 600;
    }

    if (shapeType === 'Polygon') {
      const path = shapeSidesGenerator(3, 6);

      shape.drawPolygon(path);
      shape.endFill();
      shape.x = Math.random() * 600;
      shape.y = Math.random() * 600;
    }

    gsap.to(shape, {
      y: 600, duration: time, repeat: 0,
    });

    app.stage.addChild(shape);
  }

  shapesQuantity += shapesPerSecond;

  document.getElementById('shapes-quantity')
    .innerHTML = `Num of current shapes: ${shapesQuantity}`;
}

setInterval(shapesCreator, 1000);

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

function shapesPerSecondIncrease() {
  shapesPerSecond++;

  document.getElementById('shapes-per-sec-value')
    .innerHTML = `Number of shapes per sec: ${shapesPerSecond}`;

  return shapesPerSecond;
}

function shapesPerSecondDecrease() {
  if (shapesPerSecond > 0) {
    shapesPerSecond--;

    document.getElementById('shapes-per-sec-value')
      .innerHTML = `Number of shapes per sec: ${shapesPerSecond}`;

    return shapesPerSecond;
  }
}

document.getElementById('shapes-per-sec-increase')
  .addEventListener('click', shapesPerSecondIncrease);

document.getElementById('shapes-per-sec-decrease')
  .addEventListener('click', shapesPerSecondDecrease);

function gravityIncrease() {
  time++;

  document.getElementById('gravity-value')
    .innerHTML = `Gravity value: ${time}`;

  return time;
}

function gravityDecrease() {
  if (time > 0) {
    time--;

    document.getElementById('gravity-value')
      .innerHTML = `Gravity value: ${time}`;

    return time;
  }
}

document.getElementById('gravity-increase')
  .addEventListener('click', gravityIncrease);

document.getElementById('gravity-decrease')
  .addEventListener('click', gravityDecrease);
