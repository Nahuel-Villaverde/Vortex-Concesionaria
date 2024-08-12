// middleware/auth.js
export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).send('No autorizado'); // Envía un estado 401 para no autenticado
};