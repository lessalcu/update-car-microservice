const express = require('express');
const cors = require('cors'); // Importar el paquete cors
const app = express();
const vehicleRoutes = require('./routes/vehicleRoutes');
const dotenv = require('dotenv');

dotenv.config();

// Habilitar CORS para todas las rutas y orígenes
app.use(cors());

// Usar express.json() para que el servidor pueda procesar JSON
app.use(express.json());

// Rutas
app.use('/api/vehicle', vehicleRoutes);

// Configura el puerto 3001 si no está en .env
const PORT = process.env.PORT || 3001;

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Update Vehicle microservice running on port ${PORT}`);
});
