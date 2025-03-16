let numLines = 35; // 線條的數量
let lines = [];
let fish;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  strokeWeight(50); // 設定線條粗細為 50px
  blendMode(BLEND); // 設定混合模式為 BLEND
  clear(); // 設定背景為透明

  // 初始化線條的起始位置、高度、搖晃速度、初始角度和顏色
  for (let i = 0; i < numLines; i++) {
    lines.push({
      x: (i + 1) * width / (numLines + 1),
      height: random(height / 4, height / 2),
      angle: random(TWO_PI),
      speed: random(0.01, 0.05),
      color: [random(255), random(255), random(255), 150] // 設定顏色並增加透明度
    });
  }

  fish = new Fish();
}

function draw() {
  clear(); // 設定背景為透明

  for (let i = 0; i < numLines; i++) {
    let x = lines[i].x; // 線條的 x 座標
    let y = height; // 線條的起始 y 座標
    let length = lines[i].height; // 線條的長度
    let segments = 20; // 線條分成的段數
    let segmentLength = length / segments; // 每段的長度

    let currentX = x;
    let currentY = y;

    // 設定彩色線條並增加透明度
    stroke(lines[i].color[0], lines[i].color[1], lines[i].color[2], lines[i].color[3]);
    noFill();

    beginShape();
    curveVertex(currentX, currentY); // 起始點

    for (let j = 0; j < segments; j++) {
      let offsetX = sin(lines[i].angle + j * 0.5) * 10; // 使用正弦函數計算偏移量，10 是搖動的幅度
      let nextX = currentX + offsetX;
      let nextY = currentY - segmentLength;

      curveVertex(nextX, nextY);

      currentX = nextX;
      currentY = nextY;
    }

    curveVertex(currentX, currentY); // 結束點
    endShape();

    // 更新角度
    lines[i].angle += lines[i].speed; // 每條線條有不同的搖晃速度
  }

  fish.update();
  fish.display();
}

class Fish {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    this.size = 50;
    this.speedX = random(1, 3);
    this.speedY = random(1, 3);
    this.color = [random(255), random(255), random(255)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    // 碰到邊界反彈
    if (this.x > width || this.x < 0) {
      this.speedX *= -1;
    }
    if (this.y > height || this.y < 0) {
      this.speedY *= -1;
    }
  }

  display() {
    fill(this.color[0], this.color[1], this.color[2]);
    noStroke();

    // 畫魚的身體
    ellipse(this.x, this.y, this.size * 2, this.size);

    // 畫魚的尾巴
    triangle(
      this.x - this.size, this.y,
      this.x - this.size * 1.5, this.y - this.size / 2,
      this.x - this.size * 1.5, this.y + this.size / 2
    );

    // 畫魚的眼睛
    fill(0);
    ellipse(this.x + this.size / 2, this.y - this.size / 4, this.size / 5, this.size / 5);
  }
}