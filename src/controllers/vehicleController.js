const db = require('../config/db');

// Actualizar vehículo
exports.updateVehicle = async (req, res) => {
    const { id } = req.params; // ID del vehículo a actualizar
    const { licensePlate, brand, model, color } = req.body;

    // Validar campos
    if (!licensePlate || !brand || !model || !color) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Verificar si el vehículo existe
        const [vehicle] = await db.execute('SELECT * FROM Cars WHERE id = ?', [id]);
        if (vehicle.length === 0) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        // Actualizar vehículo en la base de datos
        await db.execute(
            'UPDATE Cars SET licensePlate = ?, brand = ?, model = ?, color = ? WHERE id = ?',
            [licensePlate, brand, model, color, id]
        );

        res.status(200).json({ message: "Vehicle updated successfully" });
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ message: "Error updating vehicle" });
    }
};
