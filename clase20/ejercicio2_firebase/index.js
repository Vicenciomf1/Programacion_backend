var admin = require("firebase-admin");

var serviceAccount = require("./clase20-b18e0-firebase-adminsdk-lgz80-b3f9e78026.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

(async () => {
  const db = admin.firestore();
  const coloresModel = db.collection('colores');

  //CREATE
  const red = await coloresModel.add({ nombre: 'red' });
  const green = await coloresModel.add({ nombre: 'green' });
  const blue = await coloresModel.add({ nombre: 'blue' });

  //READ ALL
  const colores = await coloresModel.get();
  colores.forEach(element => {
    console.log({ id: element.id, ...element.data() });
  });

  //UPDATE
  await coloresModel.doc(blue.id).update({ nombre: 'navy' });

  //DELETE
  await coloresModel.doc(green.id).delete();
})();