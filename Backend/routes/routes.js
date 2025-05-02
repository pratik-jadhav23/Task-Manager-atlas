const express = require("express")
const {reguser, userlogin, addtask, getalltasks} = require("../controllers/usercont")

const rt = new express.Router()

rt.post("/reg",reguser)
rt.post("/login",userlogin)
rt.post('/addtask', addtask)
rt.get('/getalltasks/:_id',getalltasks)

module.exports = rt