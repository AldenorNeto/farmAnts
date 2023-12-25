class Ant {
  constructor(anthill) {
    this.element = document.createElement('div');
    this.element.className = 'ant';
    this.direction = this.getRandomDirection();
    this.anthill = anthill;
    this.trail = []; // Array para armazenar trilhas
    this.setPosition();
    document.body.appendChild(this.element);

    // Change direction every second
    setInterval(() => this.changeDirection(), 1000);

    // Move the ant gradually
    this.moveInterval = setInterval(() => this.move(), 50);

    // Create a trail every second
    setInterval(() => this.createTrail(), 1000);
  }

  getRandomDirection() {
    const angle = Math.random() * 2 * Math.PI;
    return {
      x: Math.cos(angle),
      y: Math.sin(angle)
    };
  }

  calculateWeightedAverage(currentDirection, newDirection, weight) {
    const normalizedWeight = 1 - weight;
    return {
      x: currentDirection.x * normalizedWeight + newDirection.x * weight,
      y: currentDirection.y * normalizedWeight + newDirection.y * weight
    };
  }

  normalizeVector(vector) {
    const magnitude = Math.sqrt(vector.x ** 2 + vector.y ** 2);
    return {
      x: vector.x / magnitude,
      y: vector.y / magnitude
    };
  }

  setPosition() {
    const anthillPosition = this.anthill.getPosition();
    const offset = 50; // offset from the anthill
    this.position = {
      x: anthillPosition.x + offset,
      y: anthillPosition.y + offset
    };
    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  changeDirection() {
    const newDirection = this.getRandomDirection();
    const smoothingFactor = 0.2; // Ajuste o fator de suavização conforme necessário
    this.direction = this.calculateWeightedAverage(this.direction, newDirection, smoothingFactor);
    this.direction = this.normalizeVector(this.direction); // Normaliza o vetor de direção
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

    this.element.style.left = `${this.position.x}px`;
    this.element.style.top = `${this.position.y}px`;
  }

  createTrail() {
    // Cria uma nova trilha e a adiciona ao array de trilhas
    const trail = new Trail(this.position.x, this.position.y);
    this.trail.push(trail);
  }
}


class Anthill {
  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'anthill';
    this.setPosition();
    document.body.appendChild(this.element);
  }

  getPosition() {
    const rect = this.element.getBoundingClientRect();
    return {
      x: rect.left,
      y: rect.top
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
    this.element = document.createElement('div');
    this.element.className = 'food';
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
  constructor(x, y) {
    this.element = document.createElement('div');
    this.element.className = 'trail';
    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
    document.body.appendChild(this.element);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Create an anthill
  const anthill = new Anthill();

  // Create 5 ants with the anthill as a dependency
  for (let i = 0; i < 5; i++) {
    new Ant(anthill);
  }

  // Create food
  const food = new Food();
});
