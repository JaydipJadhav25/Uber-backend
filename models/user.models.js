import mongoose, { Types }  from "mongoose";
// import bcrpyt from "bcrpyt"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const userSchem = mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3 , "must be at least 3 char"]
        },
        lastname : {
            type : String,
            minlength : [3 , "must be at least 3 char"]
        }
    },
    email : {
            type : String,
            required : true,
            minlength : [3 , "must be at least 3 char"]
    },
    password : {
        type : String,
        required : true,
        select : false
        
    },
    socketID : {
        type : String
    }

});


userSchem.methods.authtoken = function(){

    const token  = jwt.sign({
        _id : this._id ,
        email : this.email
    } , process.env.JWT_SCERET)

    return token;
}

userSchem.methods.chechuserpassword = async function(password){
    return await bcrypt.compare(password , this.password);
}

userSchem.statics.hashpassword = async function(password){
    return  await bcrypt.hash(password , 10);
}


export const userModel = mongoose.model("user" , userSchem);