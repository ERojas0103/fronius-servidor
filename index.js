const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000; // Render usa una variable de entorno para el puerto

app.use(express.json());

let ultimoDatoFronius = { 
  mensaje: "Aún no se han recibido datos.",
  timestamp: new Date().toISOString() 
};

// Ruta para RECIBIR datos desde Fronius
app.post("/fronius-data", (request, response) => {
  console.log("Datos POST recibidos de Fronius!");
  ultimoDatoFronius = request.body;
  ultimoDatoFronius.recibidoEnServidor = new Date().toISOString();
  console.log(ultimoDatoFronius);
  response.status(200).send("Datos recibidos correctamente.");
});

// Ruta para que tu App Local PIDA los datos
app.get("/get-data", (request, response) => {
  console.log("Petición GET recibida.");
  response.json(ultimoDatoFronius);
});

// Ruta principal de bienvenida
app.get("/", (request, response) => {
  response.send("✅ Servidor para Fronius funcionando en Render.");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
