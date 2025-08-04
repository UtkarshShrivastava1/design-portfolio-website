import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type :String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const admin = mongoose.models.Admin || mongoose.model("Admin",adminSchema,"admin");

export default admin;