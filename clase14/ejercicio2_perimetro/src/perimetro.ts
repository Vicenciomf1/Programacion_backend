export class Perimetro {

  static cuadrado = (lado: number): number => (lado * 4);
  static rectangulo = (base: number, altura: number): number => ((base * 2) + (altura * 2));
  static circulo = (radio: number): number => (radio * Math.PI * 2);

  constructor() {}
}