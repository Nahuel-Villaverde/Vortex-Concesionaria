// middleware/auth.js
export const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
      return next();
  }
  return res.status(401).send('No autorizado');
};


export const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).send('Acceso denegado');
    }
  };
  