import { Router } from "express";
import ApiUsuariosMock from "../api/usuarios.js";

const apiUsuarios = new ApiUsuariosMock();

const router = Router();

router.post('/popular', (req, res) => {
  const cant = parseInt(req.query.cant);
  const usuariosNuevos = apiUsuarios.popular(cant);
  res.json({
    status: 'ok',
    data: usuariosNuevos
  });
});

router.get('/', (req, res) => {
  const usuarios = apiUsuarios.listarAll();
  res.json({
    status: 'ok',
    data: usuarios
  });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = apiUsuarios.listar(id);
  res.json({
    status: 'ok',
    data: usuario
  });
});

router.post('/', (req, res) => {
  const usuario = req.body;
  apiUsuarios.guardar(usuario);
  res.json({
    status: 'ok'
  });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = req.body;
  usuario.id = id;
  apiUsuarios.actualizar(usuario);
  res.json({
    status: 'ok'
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  apiUsuarios.borrar(id);
  res.json({
    status: 'ok'
  });
});

export default router;