import { Router } from "express";
import validateAuth from "../Middleware/authMiddleware.js";
import jwt from 'jsonwebtoken';
import user from "../models/user.js"; 
const router = Router();

// Ruta para el login
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

        // 1. Crear el payload del token (información que quieres guardar)
        const payload = { userId: foundUser._id, role: foundUser.role, email:foundUser.email };

        // 2. Firmar el token con la clave secreta
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        // 3. Guardar el token en una cookie
        res.cookie('auth_token', token, {
            httpOnly: true, // La cookie no es accesible por JavaScript en el navegador
            secure: process.env.NODE_ENV === 'production', // Solo se envía sobre HTTPS en producción
            sameSite: 'strict'
        });

        res.status(200).json({ message: "Inicio de sesión exitoso." });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor.", error: error.message });
    }
});

// Ruta para agregar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "Todos los campos son requeridos." });
        }

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "El correo electrónico ya está en uso." });
        }

        const newUser = new user({ name, email, password });
        await newUser.save();

        const payload = { userId: newUser._id, role: newUser.role,role:newUser.email };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(201).json({ message: "Usuario registrado con éxito." });
        
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el usuario.", error: error.message });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('auth_token', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    res.status(200).json({ message: "Sesión cerrada con éxito." });
});

router.get('/profile', validateAuth, (req, res) => {
    try {
        const { email, role } = req.user;
        res.status(200).json({
            email,
            role
        });

    } catch (error) {
        res.status(500).json({ message: "Error en el servidor.", error: error.message });
    }
});


export default router;