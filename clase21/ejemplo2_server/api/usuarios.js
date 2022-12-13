import ContenedorMemoria from "../contenedores/contenedorMemoria.js";
import faker from "faker";
faker.locale = 'es';

class ApiUsuariosMock extends ContenedorMemoria {
  constructor() { super() }

  popular (cant = 50) {
    const usuariosNuevos = [];
    for (let index = 0; index < cant; index++) {
      const usuarioNuevo = {
        id: index + 1,
        nombre: faker.name.findName(),
        email: faker.internet.email(),
        website: faker.internet.url(),
        image: faker.image.avatar()
      };
      this.guardar(usuarioNuevo);
      usuariosNuevos.push(usuarioNuevo);
    }
    return usuariosNuevos;
  }
};

export default ApiUsuariosMock;