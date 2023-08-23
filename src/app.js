import express from "express";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js"
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/tasks.routes.js";
import cors from "cors";
const app = express();

//Extencion para determinar que se pueda comunicar el dominio del front con el del back.
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
//middlewares
//morgan muestra la peticion que llega
app.use(morgan('dev'));
app.use(express.json());

//Convierte las cookies a un objeto json
app.use(cookieParser());

app.use('/api/',authRoutes);
app.use('/api/', taskRoutes);
export default app;