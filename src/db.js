import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://adrena2k11:contracluster@cluster0.vezgsue.mongodb.net/');
        console.log(">>>> DB is connected");
    }catch(error) {
        console.log(error);
    }
};