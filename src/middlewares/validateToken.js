//Middlewares son funciones que se ejecutan antes de que la petición llegue a la ruta y verifica si está bien o mal que según tu contexto puedas ingresar a esa ruta.
//(req: me da información de la petición)
//(res: me da metodos para enviar en una respuesta)
//(next: indica que en vez de retornar una respuesta debe continuar la ejecucción porque hay otra función por ejecutarse.)
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
export const authRequired = (req, res, next) => {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });

        //guardo el usuario dentro de req.user, lo guardo ahi ya que todas las peticiones tienen el parametro req, asi puedo acceder al user de ese momento desde todas mis rutas
        req.user = user;
    })

    next();
}