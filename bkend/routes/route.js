let express = require("express")
const { addAdmin, login, isLogin, getBook, getBookById, updateBook, deleteBook, addBook, addUser, userlogin } = require("../controllers/bookCon")

let route =  new express.Router()
route.post("/addadmin",addAdmin)
route.post("/login",login)
route.post("/addBook",isLogin,addBook)
route.get("/getBook",isLogin,getBook)
route.get("/getbookbyid/:id",getBookById)
route.put("/update",isLogin,updateBook)
route.delete("/delete/:id",isLogin,deleteBook)
route.post("/adduser",addUser)
route.post("/userlogin",userlogin)

module.exports = route


