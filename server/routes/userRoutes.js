import { Router } from "express";
import mongoose from "mongoose";
import user from "../models/user.js"; // Asegúrate de que la ruta sea correcta
const router = Router();

// Ruta para el login (ya la tenías)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email y contraseña son requeridos." });
        }

        const foundUser = await user.findOne({ email });

        if (!foundUser) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }

        const isMatch = await foundUser.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña incorrecta." });
        }

        res.status(200).json({ message: "Inicio de sesión exitoso.", user: foundUser });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor.", error: error.message });
    }
});

// Ruta para agregar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const {  email, password } = req.body;

        // 1. Validar que los campos necesarios estén presentes
        if (!email || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        // 2. Verificar si el usuario ya existe en la base de datos
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "El correo electrónico ya está en uso." });
        }

        // 3. Crear una nueva instancia del modelo de usuario
        const newUser = new user({
            email,
            password,
        });

        // 4. Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // 5. Enviar una respuesta exitosa
        res.status(201).json({ message: "Usuario registrado con éxito.", user: newUser });
        
    } catch (error) {
        // 6. Manejar errores del servidor o de la base de datos
        res.status(500).json({ message: "Error al registrar el usuario.", error: error.message });
    }
});

export default router;