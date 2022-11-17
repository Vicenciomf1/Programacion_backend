export class Superficie {

  static cuadrado = (lado: number): number => ( Math.pow(lado, 2) );
  static rectangulo = (base: number, altura: number): number => ( base * altura );
  static circulo = (radio: number): number => ( Math.PI * Math.pow(radio, 2)  );

  constructor() {}
}