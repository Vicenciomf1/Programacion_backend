// Ejercicio 1 -------------------------
use empresa;

db.createCollection('clientes');

db.clientes.insertOne({
  nombre: 'Josue',
  edad: 30
});

db.clientes.insertMany([{
  nombre: 'Julio',
  edad: 24
},{
  nombre: 'Mario',
  edad: 21
},{
  nombre: 'Ana',
  edad: 18
}]);

db.articulos.insertMany([{
  nombre: 'Iphone 14',
  precio: 1000,
  stock: 40
},{
  nombre: 'Nintendo Switch',
  precio: 300,
  stock: 10
},{
  nombre: 'JBL',
  precio: 100,
  stock: 50
},{
  nombre: 'PS5',
  precio: 500,
  stock: 5
}]);

show collections;

db.clientes.find();
db.articulos.find();

db.articulos.countDocuments();

// Ejemplo 1 -------------------------

//Filtros generales
db.articulos.find({ precio: { $gte: 500 } });
db.articulos.find({ precio: { $lte: 500 } });
db.articulos.find({ precio: { $in: [500, 1000] } });
db.articulos.find({ precio: { $nin: [500, 1000] } });
db.articulos.find({ precio: { $ne: 1000 } });
db.articulos.find({ $and: [ { precio: {$lte: 300} } , { nombre: 'Nintendo Switch' } ] });
db.articulos.find({ $or: [ { precio: {$lte: 300} } , { nombre: 'Nintendo Switch' } ] });
db.articulos.find({ precio: { $exists: true } });

//Distincts
db.articulos.distinct('precio');
db.clientes.distinct('edad');

//Order
db.articulos.find().sort({ stock: 1 });

//Proyections
db.articulos.find({}, { 'nombre': 1 });
db.articulos.find({}, { 'nombre': 0, 'precio': 0 });

//Paginacion
db.articulos.find().limit(2);
db.articulos.find().skip(2);

//Pagina 1
db.articulos.find().limit(2).skip(0);
//Pagina 2
db.articulos.find().limit(2).skip(2);



// Ejercicio 2 -------------------------

db.clientes.insertMany([
{ "nombre" : "Pablo", "edad" : 25 },
{ "nombre" : "Juan", "edad" : 22 },
{ "nombre" : "Lucia", "edad" : 25 },
{ "nombre" : "Juan", "edad" : 29 },
{ "nombre" : "Fede", "edad" : 35 }
  ]);
  
db.clientes.find().sort({ edad: -1 });

db.clientes.find().sort({ edad: 1 }).limit(1);

db.clientes.find({ nombre: 'Juan' });

db.clientes.find({$and: [{ nombre: 'Juan' },{ edad: 29 }] });

db.clientes.find({ $or: [ { nombre: 'Juan' }, { nombre: 'Lucia' } ] });
db.clientes.find({ nombre: {$in: ['Juan', 'Lucia'] } });

db.clientes.find({ edad: { $gt: 25 } });

db.clientes.find({ edad: { $lte: 25 } });

db.clientes.find({ edad: { $ne: 25 }  });

db.clientes.find({ $and: [ { edad: {$gte: 26} }, { edad: {$lte: 35} } ] });

db.clientes.updateOne({nombre: 'Fede'}, { $set: { edad: 36 } });

db.clientes.updateMany({ edad: 25 }, { $set: { edad: 26 } });

db.clientes.deleteMany({ nombre: 'Juan' });

