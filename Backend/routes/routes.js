const express = require("express")
const {reguser, userlogin, addtask, getalltasks, deletetask, updateTask} = require("../controllers/usercont")

const rt = new express.Router()

rt.post("/reg",reguser)
rt.post("/login",userlogin)
rt.post('/addtask', addtask)
rt.get('/getalltasks/:_id',getalltasks)
rt.delete('/deletetask/:_id/:index',deletetask)
rt.put('/updateTask',updateTask)

module.exports = rt