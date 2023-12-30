class Ant {
  constructor(anthill) {
    this.element = document.createElement("div");
    this.element.className = "ant";
    this.direction = this.getRandomDirection();
    this.anthill = anthill;

    this.withFood = false;
    this.sensor1 = false;
    this.sensor2 = false;

    this.elementsens1 = document.createElement("div");
    this.elementsens2 = document.createElement("div");
    this.elementsens1.className = "sensor1";
    this.elementsens2.className = "sensor2";

    this.setPosition();
    document.body.appendChild(this.element);
    this.element.appendChild(this.elementsens1);
    this.element.appendChild(this.elementsens2);

    // Change direction every second
    setInterval(() => this.changeDirection({ x: 0.2, y: 0.2 }), 1000);

    // Move the ant gradually
    this.moveInterval = setInterval(() => {
      this.move(this.withFood);
    }, 50);

    // Create a trail every second
    setInterval(() => {
      this.createTrail(this.withFood);
    }, 500);
  }

  rotate(angle) {
    // Adiciona o ângulo à direção atual
    const rotatedAngle = Math.atan2(this.direction.y, this.direction.x) + angle;

    // Calcula a nova direção com base no ângulo girado
    this.direction = {
      x: Math.cos(rotatedAngle),
      y: Math.sin(rotatedAngle),
    };

    // Normaliza a nova direção
    this.direction = this.normalizeVector(this.direction);

    // Atualiza a rotação da formiga
    const newAngle = Math.atan2(this.direction.y, this.direction.x);
    this.element.style.transform = `rotate(${newAngle + 4.8}rad)`;
  }

  getRandomDirection() {
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle),
    };
  }

  calculateWeightedAverage({
    currentDirection,
    newDirection,
    weightX,
    weightY,
  }) {
    const normalizedWeightX = 1 - weightX;
    const normalizedWeightY = 1 - weightY;
    return {
      x: currentDirection.x * normalizedWeightX + newDirection.x * weightX,
      y: currentDirection.y * normalizedWeightY + newDirection.y * weightY,
    };
  }

  normalizeVector(vector) {
    const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude,
    };
  }

  setPosition() {
    const anthillPosition = this.anthill.getPosition();
    const offset = 10; // offset from the anthill
    this.position = {
      x: anthillPosition.x + offset,
      y: anthillPosition.y + offset,
    };
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  changeDirection({ x: smoothingFactorX, y: smoothingFactorY }) {
    const newDirection = this.getRandomDirection();
    this.direction = this.calculateWeightedAverage({
      currentDirection: this.direction,
      newDirection,
      weightX: smoothingFactorX,
      weightY: smoothingFactorY,
    });
    this.direction = this.normalizeVector(this.direction); // Normaliza o vetor de direção
  }

  detectCollision(selector) {
    const getBounding1 = this.elementsens1.getBoundingClientRect();
    const getBounding2 = this.elementsens2.getBoundingClientRect();

    const elementsBelowSensor1 = document.elementsFromPoint(
      getBounding1.x,
      getBounding1.y
    );

    const elementsBelowSensor2 = document.elementsFromPoint(
      getBounding2.x,
      getBounding2.y
    );

    // Verifica se algum dos elementos abaixo dos sensores corresponde ao seletor
    const collidedElementeSensor1 = elementsBelowSensor1.find((element) =>
      element.matches(selector)
    );

    const collidedElementeSensor2 = elementsBelowSensor2.find((element) =>
      element.matches(selector)
    );

    return { sens1: collidedElementeSensor1, sens2: collidedElementeSensor2 };
  }

  move(withFood) {
    this.withFood = withFood;
    const speed = 2; // Velocidade constante

    this.position.x += this.direction.x * speed;
    this.position.y += this.direction.y * speed;

    // Ensure ants stay within the screen boundaries
    const maxX = window.innerWidth - 20;
    const maxY = window.innerHeight - 20;
    this.position.x = Math.max(0, Math.min(this.position.x, maxX));
    this.position.y = Math.max(0, Math.min(this.position.y, maxY));

    if (this.position.x === 0 || this.position.x === maxX) {
      this.changeDirection({ x: 1, y: 0.2 });
      return;
    }

    if (this.position.y === 0 || this.position.y === maxY) {
      this.changeDirection({ x: 0.2, y: 1 });
      return;
    }

    // Calcula o ângulo do vetor de movimento
    const angle = Math.atan2(this.direction.y, this.direction.x);

    // Atualiza a rotação da formiga
    this.element.style.transform = `rotate(${angle + 4.8}rad)`;

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;

    // Checks if the ant is superimposed on an anthill
    const anthillBelow = this.detectCollision(".anthill");
    if ((anthillBelow.sens1 || anthillBelow.sens2) && this.withFood) {
      console.log("A formiga está sobreposta ao formigueiro!");
      this.withFood = false;
      setTimeout(() => this.rotate(1), 1);
      setTimeout(() => this.rotate(1), 1);
      setTimeout(() => this.rotate(1), 1);
      setTimeout(() => this.rotate(1), 1);
    }

    // Check if the ant is overlapping the food
    const foodBelow = this.detectCollision(".food");
    if ((foodBelow.sens1 || foodBelow.sens2) && !this.withFood) {
      console.log("A formiga está sobreposta à comida!");
      this.withFood = true;
      setTimeout(() => this.rotate(1), 1);
      setTimeout(() => this.rotate(1), 1);
      setTimeout(() => this.rotate(1), 1);
      setTimeout(() => this.rotate(1), 1);
    }
    // Checks if the ant is overlapping a trail
    const trailBelow = this.detectCollision(
      withFood ? ".path" : ".pathWithFood"
    );

    if (trailBelow.sens1 && trailBelow.sens2) {
      this.rotate(0.6);
    } else {
      if (trailBelow.sens1) {
        this.rotate(0.35);
      }
      if (trailBelow.sens2) {
        this.rotate(-0.35);
      }
    }
  }

  createTrail(withFood) {
    // Cria uma nova trilha e a adiciona
    if (this.lastPosition) {
      const path = new Path(this.position, this.lastPosition, withFood);
    }

    this.lastPosition = { ...this.position };
  }
}

class Anthill {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "anthill";
    this.setPosition();
    document.body.appendChild(this.element);
  }

  getPosition() {
    const rect = this.element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top,
    };
  }

  setPosition() {
    const maxX = window.innerWidth - 40;
    const maxY = window.innerHeight - 40;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    this.element.style.left = `${randomX}px`;
    this.element.style.top = `${randomY}px`;
  }
}

class Food {
  constructor() {
    this.element = document.createElement("div");
    this.element.className = "food";
    this.setPosition();
    document.body.appendChild(this.element);
  }

  setPosition() {
    const maxX = window.innerWidth - 30;
    const maxY = window.innerHeight - 30;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    this.element.style.left = `${randomX}px`;
    this.element.style.top = `${randomY}px`;
  }
}

class Path {
  constructor({ x: x1, y: y1 }, { x: x2, y: y2 }, withFood, notExclude) {
    this.startX = x1;
    this.startY = y1;
    this.endX = x2;
    this.endY = y2;
    this.pathElement = this.createPathElement(withFood);
    document.body.appendChild(this.pathElement);
    if (!notExclude) {
      if (withFood) {
        setTimeout(() => this.pathElement.remove(), 30000);
      } else {
        setTimeout(() => this.pathElement.remove(), 30000);
      }
    }
  }

  createPathElement(withFood) {
    const pathElement = document.createElement("div");
    pathElement.className = withFood ? "pathWithFood" : "path";
    const deltaX = this.endX - this.startX;
    const deltaY = this.endY - this.startY;

    const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const angle = Math.atan2(deltaY, deltaX);

    pathElement.style.width = `${length}px`;
    pathElement.style.left = `${this.startX}px`;
    pathElement.style.top = `${this.startY}px`;
    pathElement.style.transform = `rotate(${angle}rad)`;
    return pathElement;
  }
}

const mouseCoordinates = document.getElementById("mouse-coordinates");
mouseCoordinates.innerHTML = `X -, Y -`;

document.addEventListener("mousemove", (event) => {
  const mouseX = event.clientX;
  const mouseY = event.clientY;

  mouseCoordinates.innerHTML = `X ${mouseX}, Y ${mouseY}`;
});

document.addEventListener("DOMContentLoaded", () => {
  // Create an anthill
  const anthill = new Anthill();

  // Create 5 ants with the anthill as a dependency
  for (let i = 0; i < 5; i++) {
    new Ant(anthill);
  }
  // Create food
  const food = new Food();
});
