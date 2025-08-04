import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    // username:{
    //     type:String,
    //     required:true,
    // },
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    category:{
        type:String,
        trim:true
    },
    imageURL:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Blog = mongoose.models.blogs||mongoose.model("blogs",blogSchema)

export default Blog;