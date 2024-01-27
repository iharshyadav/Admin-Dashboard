import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        lowercase:true,
        unique:true,
        min:3,
        max:20,
    },
    email:{
        type: String,
        unique:true,
        required:true,    
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    phone:{
        type:String,
    },
    address:{
        type:String
    }
},
{
    timestamps:true,
}
)

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
        unique:true,
    },
    desc:{
        type: String,
        unique:true,
    },
    price:{
        type:String,
        required:true,
        min:0,
    },
    img:{
        type:String,
    },
    stock:{
        type:Number,
        required:true,
        min:0,
    },
    isActive:{
        type:Boolean,
        default:true,
    },
    color:{
        type:String,
    },
    size:{
        type:String
    }
},
{
    timestamps:true,
}
)

export const User = mongoose.models.User || mongoose.model("User",userSchema);
export const Product = mongoose.models.Product || mongoose.model("Product",productSchema);