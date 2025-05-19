const express = require("express")
const {reguser, userlogin, addtask, getalltasks, deletetask, updateTask, taskCompleted} = require("../controllers/usercont")

const rt = new express.Router()

rt.post("/reg",reguser)
rt.post("/login",userlogin)
rt.post('/addtask', addtask)
rt.get('/getalltasks/:_id',getalltasks)
rt.delete('/deletetask/:_id/:index',deletetask)
rt.put('/updateTask',updateTask)
rt.put('/taskCompleted',taskCompleted)

module.exports = rt