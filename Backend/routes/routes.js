const express = require("express")
const {reguser, userlogin, addtask, getalltasks, deletetask} = require("../controllers/usercont")

const rt = new express.Router()

rt.post("/reg",reguser)
rt.post("/login",userlogin)
rt.post('/addtask', addtask)
rt.get('/getalltasks/:_id',getalltasks)
rt.post('/deletetask',deletetask)

module.exports = rt