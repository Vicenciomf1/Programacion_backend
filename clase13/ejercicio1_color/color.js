class Color {
  constructor() {
    this.color = {
      r: 0,
      g: 0,
      b: 0
    }
  }

  generateColor = () => {
    const r = Math.floor(Math.random() * 256);
    this.color.r = r;
    const g = Math.floor(Math.random() * 256);
    this.color.g = g;
    const b = Math.floor(Math.random() * 256);
    this.color.b = b;
  };

  getColor = () => {
    return this.color;
  };

  printColor = () => {
    console.log(`R: ${this.color.r}, G: ${this.color.g}, B: ${this.color.b}`);
  };
}

const color = new Color();
color.generateColor();
color.printColor();
