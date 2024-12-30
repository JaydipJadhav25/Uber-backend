import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


const captionSchema = mongoose.Schema({
    fullname :{
        firstname : {
            type : String,
            required : true,
            trim : true,
            min : [3 , "first name must be at least 3 char"],
        },
        lastname : {
            type : String,
            trim : true,
            min : [3 , "last name must be at least 3 char"],
        },

    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        min : [3 , "email must be at least 3 char"],
        match : [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ , "email is not valid"]
    },
    password : {
        type : String,
        required : true,
         select : false,
        min : [5 , "password must be at least 5 char"],
    },
    socketID : {
        type : String,

    },
    status :{
        type : String,
        enum : ["active" , "inactive"],
        default : "inactive"
    },

    vehicle : {

        color : {
            type : String,
            required : true,
            min : [3 , "color must be at least 3 char"],
        },
        plate : {
            type : String,
            required : true,
            min : [3 , "plate must be at least 3 char"],
        },
        capacity : {
            type : Number,
            required : true,
            min : [1 , "capacity must be at least 1 char"],
        },
        vehicaltype :{
            type : String,
            required : true,
            enum : ["car" , "bike" , "auto" , "bus"]
        }

    },
    location : {
        lat : {
            type : Number,
            
        },
        long : {
            type : Number,
            
        }
    }
        

} ,{
    TimeRanges : true
})


captionSchema.methods.authtoken = function(){
    const token = jwt.sign({
        _id : this._id,
        email : this.email
    }, process.env.JWT_SCERET , {
        expiresIn : "24h"
    })
    return token;
}

captionSchema.methods.checkpassword = async function(password){
    return await bcrypt.compare(password , this.password);
}
captionSchema.statics.hashpassword = async function(password){
    return await bcrypt.hash(password , 10);
}


export const captionModel = mongoose.model("caption" , captionSchema);
