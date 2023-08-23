import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(['The email is already in use']);
        //encriptado de contraseña
        const passwordHash = await bcrypt.hash(password, 10)
        //se crea el nuevo usuario
        const newUser = new User({
            username,
            email,
            password: passwordHash
        });
        //Guardo el usuario en le DB
        const userSaved = await newUser.save();

        //Creo el Token
        const token = await createAccessToken({ id: userSaved._id })
        //Guardo en una cookie
        res.cookie('token', token);
        //respuesta el front
        res.json(
            {
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
                createAt: userSaved.createdAt,
                updatedAt: userSaved.updatedAt
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //Comparo si el mail existe
        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(404).json({ message: "User not found" });

        //Comparo la contraseña que entra con la del usuario seleccionado
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        //Creo el Token
        const token = await createAccessToken({ id: userFound._id })
        //Guardo en una cookie
        res.cookie('token', token);
        //respuesta el front
        res.json(
            {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                createAt: userFound.createdAt,
                updatedAt: userFound.updatedAt
            }
        );

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ message: "User not found" });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updateAt: userFound.updatedAt
    })
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "Unauthorized" });
    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: "Unauthorized" });
        const userFound = await User.findById(user.id);
        if (!userFound) return res.status(401).json({ message: "Unauthorized" });

        return res.json({ 
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        });
    });
}