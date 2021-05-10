const mongoose=require("mongoose");
const  validator=require("validator");

const userSch= mongoose.Schema({
    name:{

        type:String,
        required:true,
        minLength:3
    },
    email:{
        type:String,
        required:true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("invalid email")
            }
        } 
    },
    message:{

        type:String,
        required:true,
        minLength:3
    },
    date:{
        type:Date,
        default:Date.now
    }
})


const User=mongoose.model("User", userSch);


module.exports=User;

