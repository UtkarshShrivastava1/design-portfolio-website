import mongoose, { model } from "mongoose";

const projectSchema = new mongoose.Schema({
    thumbnailURL:{
        type:String,
        required:true,
    },
    youtubeLink:{
        type:String,
    },
    instagramLink:{
        type:String,
    }
}, { _id: false })

const clientProjectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    company:{
        type:String,
        required:true,
    },
    workDid:{
        type:String,
        required:true,
    },
    testimonial:{
        type:String,
    },
    projects:{
        type:[projectSchema],
        required:true,
    }
},{timestamps:true});

const ClientProject = mongoose.models.clientProject ||model("clientProject",clientProjectSchema);

export default ClientProject;