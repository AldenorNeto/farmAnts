class Ant {
  constructor(anthill, i) {
    this.element = document.createElement("div");
    this.element.className = "ant";
    this.direction = this.getRandomDirection();
    this.anthill = anthill;
    this.id = i;
    this.withFood = false;
    this.trail = []; // Array para armazenar trilhas
    this.setPosition();
    document.body.appendChild(this.element);
    this.createEyes();

    // Change direction every second
    setInterval(() => this.changeDirection({ x: 0.2, y: 0.2 }), 1000);

    // Move the ant gradually
    this.moveInterval = setInterval(() => this.move(), 50);

    // Create a trail every second
    setInterval(() => this.createTrail(this.withFood), 500);
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

  createEyes() {
    // Cria divs para representar os olhos
    this.leftEye = document.createElement("div");
    this.rightEye = document.createElement("div");

    // Adiciona classes e estilos aos olhos
    this.leftEye.className = "eye";
    this.rightEye.className = "eye";

    // Adiciona olhos ao corpo da formiga
    document.body.appendChild(this.leftEye);
    document.body.appendChild(this.rightEye);
  }

  moveEyes() {
    // Posiciona os olhos perto da formiga
    const eyeOffsetX = 4;
    const eyeOffsetY = 8;

    this.leftEye.style.left = `${this.position.x}px`;
    this.leftEye.style.top = `${this.position.y}px`;

    this.rightEye.style.left = `${this.position.x}px`;
    this.rightEye.style.top = `${this.position.y}px`;
  }

  detectCollisionWithEyes(selector) {
    // Detecta colisão para cada olho separadamente
    const leftEyeCollision = this.detectCollision(selector, this.leftEye);
    const rightEyeCollision = this.detectCollision(selector, this.rightEye);

    // Retorna true se houver colisão em qualquer olho
    return leftEyeCollision || rightEyeCollision;
  }

  detectCollision(selector, eye) {
    // Usa elementosFromPoint para verificar colisão no ponto do olho
    const elementsBelowEye = document.elementsFromPoint(
      parseInt(eye.style.left) + eye.clientWidth / 2,
      parseInt(eye.style.top) + eye.clientHeight / 2
    );

    // Verifica se algum dos elementos abaixo do olho corresponde ao seletor
    return elementsBelowEye.some((element) => element.matches(selector));
  }

  move() {
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

    if (this.id === 1)
      console.log(this.leftEye.style.left, this.element.style.left);

    this.moveEyes();

    // Verifica colisão com os olhos
    const anthillBelow = this.detectCollisionWithEyes(".anthill");
    if (anthillBelow) {
      // console.log("A formiga está sobreposta ao formigueiro!");
    }

    const foodBelow = this.detectCollisionWithEyes(".food");
    if (foodBelow) {
      // console.log("A formiga está sobreposta à comida!");
      this.withFood = true;
    }

    const trailBelow = this.detectCollisionWithEyes(".trailWithFood");
    if (trailBelow) {
      // console.log("A formiga está sobreposta à trilha!");
    }
  }

  createTrail(withFood) {
    // Cria uma nova trilha e a adiciona ao array de trilhas
    const trail = new Trail(this.position.x, this.position.y, withFood);
    this.trail.push(trail);
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

class Trail {
  constructor(x, y, withFood) {
    const offset = 5; // offset from the trail
    this.element = document.createElement("div");
    this.element.className = withFood ? "trailWithFood" : "trail";
    this.element.style.left = `${x + offset}px`;
    this.element.style.top = `${y + offset}px`;
    document.body.appendChild(this.element);
    if (withFood) {
      setTimeout(() => this.element.remove(), 25000);
    } else {
      setTimeout(() => this.element.remove(), 10000);
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Create an anthill
  const anthill = new Anthill();

  // Create 5 ants with the anthill as a dependency
  for (let i = 0; i < 9; i++) {
    new Ant(anthill, i);
  }

  // Create food
  const food = new Food();
});
