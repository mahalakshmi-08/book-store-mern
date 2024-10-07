let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
let admin = require("../models/adminModel")
let book = require("../models/bookModel")
let user = require("../models/userModel")

let addAdmin = async (req,res) =>{
    let det = req.body
    let hcode = await bcrypt.hash(det.password,10)
    det = {...det, "password":hcode}
    let data = new admin(det)
    data.save().then(()=>{
        res.send("Admin added successfully")
    }).catch((err)=>{
        res.send(err) 
    })
}

let login = async(req,res) =>{
    let data = await admin.findById({"_id":req.body._id})
    if (data) {
        let f  = await bcrypt.compare(req.body.password,data.password)
        if(f){
            res.json({
                "token":jwt.sign({"_id":data._id},"123456"),
                "name":data.name
            })

        }
        else{
            res.json({
                "err":"Check Password"
            })
        }

    }
    else{
        res.json({
            "err":"Check UserName"
        })
    }

}

//middleware

let isLogin = (req,res,next) =>{
    try{
        jwt.verify(req.headers.authorization,"123456")
        next()
    }
    catch(err){
        res.json({
            "err":"Please Login"
        })
    }

}

//addbook
let addBook = (req,res)=>{
    let id=uuidv4()
    let bookdata={"_id":id,...req.body}
    let data=new book(bookdata)
    data.save().then(()=>{
        res.json({"msg":"Record added successfully"})
    }).catch((err)=>{
        res.json({"err":"Error in adding data"})
    })
}


let getBook = async(req,res) =>{
    try{
    let data = await book.find()
    res.json(data)
    }
    catch(err){
        console.log(err)
    }

}

let getBookById = async(req,res) =>{
    let data = await book.findById({"_id":req.params.id})
    if (data){
        res.json(data)
    }
    else{
        res.json({
            "err":"Check Book Id"
        })
    }
}

let updateBook = async(req,res)=>{
    try{
        await book.findByIdAndUpdate({"_id":req.body._id},req.body)
        res.json({
            "msg":"Update Done Successfully"
        })
    }
    catch(err){
        res.json({
            "err":"Error updating Book"
        })
    }
}

let deleteBook = async (req,res)=>{
    try{
        await book.findOneAndDelete({"_id":req.params.id})
        res.json({
            "msg":"Book deleted successfully"
        })
    }
    catch(err){
        res.json({
            "err":"Error deleting Book"
        })
    }
}

let addUser = async (req,res) =>{
    let det = req.body
    let hcode = await bcrypt.hash(det.password,10)
    det = {...det, "password":hcode}
    let data = new user(det)
    data.save().then(()=>{
        res.send("User added successfully")
    }).catch((err)=>{
        res.send("Error in adding data")
    })

}


let userlogin = async(req,res) =>{
    let data = await user.findById({"_id":req.body._id})
    if (data) {
        let f  = await bcrypt.compare(req.body.password,data.password)
        if(f){
            res.json({
                "token":jwt.sign({"_id":data._id},"123456"),
                "name":data.name
            })

        }
        else{
            res.json({
                "err":"Check Password"
            })
        }

    }
    else{
        res.json({
            "err":"Check UserName"
        })
    }

}



module.exports = {addAdmin,login,isLogin,addAdmin,addBook,getBook,getBookById,updateBook,deleteBook,addUser,userlogin}