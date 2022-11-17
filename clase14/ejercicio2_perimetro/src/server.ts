import express from "express";
import { Perimetro } from "./perimetro";
import { Superficie } from "./superficie";

const app = express();

interface respuestaDTO {
  parametros: {
    lado?: number,
    base?: number,
    altura?: number,
    radio?: number
  },
  figura: string,
  resultado: {
    perimetro: number,
    superficie: number
  }
}

app.get('/cuadrado', (req, res) => {
  const lado: number = parseInt( <string> req.query.lado);
  const perimetro = Perimetro.cuadrado(lado);
  const superficie = Superficie.cuadrado(lado);
  const respuesta: respuestaDTO = {
    parametros: {
      lado
    },
    figura: 'cuadrado',
    resultado: {
      perimetro,
      superficie 
    }
  };
  res.json(respuesta);
});

app.get('/rectangulo', (req, res) => {
  const base: number = parseInt( <string> req.query.base );
  const altura: number = parseInt( <string> req.query.altura );
  const perimetro = Perimetro.rectangulo(base, altura);
  const superficie = Superficie.rectangulo(base, altura);

  const respuesta: respuestaDTO = {
    parametros: {
      base,
      altura
    },
    figura: 'rectangulo',
    resultado: {
      perimetro,
      superficie
    }
  };
  res.json(respuesta);
});

app.get('/circulo', (req, res) => {
  const radio: number = parseInt( <string> req.query.radio );
  const perimetro = Perimetro.circulo(radio);
  const superficie = Superficie.circulo(radio);
  const respuesta: respuestaDTO = {
    parametros: {
      radio
    },
    figura: 'circulo',
    resultado: {
      perimetro,
      superficie
    }
  };
  res.json(respuesta);
} );


const server = app.listen(8080);