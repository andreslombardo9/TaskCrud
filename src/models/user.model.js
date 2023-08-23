import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    }
    //guardo la fecha en la que se crea el usuario
},{timestamps: true});

export default mongoose.model('User', userSchema);