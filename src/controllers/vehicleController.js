require('dotenv').config();
const db = require('../config/db');
const request = require('request-promise');

const QUERY_CAR_URL = process.env.QUERY_CAR_URL;


exports.updateVehicle = async (req, res) => {
    const { id } = req.params;
    const { licensePlate, brand, model, color } = req.body;

    if (!licensePlate || !brand || !model || !color) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const vehicle = await request({
            uri: `${QUERY_CAR_URL}/${id}`,
            json: true
        });

        if (!vehicle) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

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