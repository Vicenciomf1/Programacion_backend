const sumar = () => {
  let suma = 0;
  for (let i = 0; i < 5e9; i++) {
    suma += i;
  }
  return suma;
};

process.on('message', () => {
  const suma = sumar();
  process.send(suma);
});

process.send('listo');