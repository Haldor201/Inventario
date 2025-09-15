import jwt from 'jsonwebtoken';

const validateAuth = (req, res, next) => {
    try {
        // 1. Obtener el token de la cookie
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ message: "You need Login." });
        }

        // 2. Verificar el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 3. Adjuntar la información del usuario a la solicitud (req)
        req.user = decoded; 

        // 4. Continuar al siguiente middleware o ruta
        next();

    } catch (error) {
        // Si la verificación falla (token inválido o expirado)
        return res.status(401).json({ message: "Token inválido o expirado." });
    }
};

export default validateAuth;