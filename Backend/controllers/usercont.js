const bcrypt = require("bcrypt");
const userm = require("../model/userm");
const taskm = require("../model/taskm");
let jwt = require("jsonwebtoken");

const reguser = async (req, res) => {
  try {
    let hashpwd = await bcrypt.hash(req.body.pass, 10);
    let data = new userm({ ...req.body, pass: hashpwd });
    await data.save();
    res.json({ msg: "user Registered" });
  } catch (error) {
    // console.log(error.message);
    if (error.message.includes("duplicate key error collection")) {
      res.json({ err: "user already exists! please login" });
    } else {
      res.json({ err: "Error in registration" });
    }
  }
};

const userlogin = async (req, res) => {
  try {
    let user = await userm.findById(req.body._id);
    if (user) {
      let f = await bcrypt.compare(req.body.pass, user.pass);
      if (f) {
        res.json({
          token: jwt.sign({ _id: user._id }, "abcd"),
          username: user.username,
          _id: user._id,
        });
        // res.json({"msg":"Login Success"})
      } else {
        res.json({ msg: "wrong password" });
      }
    } else {
      res.json({ msg: "user not found" });
    }
  } catch (error) {
    res.json({ err: "Error in login" });
  }
};

const addtask = async (req, res) => {
  // console.log(req.body.tasks);
  try {
    const updatedUser = await taskm.findByIdAndUpdate(
      req.body._id,
      { $push: { tasks: req.body.tasks } }, // add to array
      { new: true, upsert: true } // return updated doc; create if not exists
    );
    
    res.json({ msg: "task added" });
  } catch (err) {
    res.json({ err: err.message });
  }
};

const getalltasks = async (req, res) => {
  try {
    const tasks = await taskm.findById({ ["_id"]: req.params._id });
    // console.log(tasks.tasks);
    res.json(tasks.tasks);
  } catch (error) {
    res.json({ err: "Error in getalltasks bkend" });
  }
};

const deletetask = async (req, res) => {
  // console.log(req.body);
  try {
    const { _id, index } = req.params;
    
    const user = await taskm.findById(_id);

    user.tasks.splice(index, 1);
    // user.tasks = user.tasks.filter((_, i) => i !== index);
    await user.save();

    res.send({ message: "Task deleted"});
  } catch (err) {
    res.status(500).send({ message: "Error deleting task", error: err });
  }
};

const updateTask = async(req,res) => {
  try {
    const { _id, index, task } = req.body;
    const user = await taskm.findById(_id);
    user.tasks[index].task = task
    await user.save();
    res.send({ message: "Task updated"});
  } catch (error) {
    res.status(500).send({ message: "Error updating task", error: error });
  }
}

const taskCompleted = async(req,res) => {
  try {
    const { _id, index} = req.body;
    const user = await taskm.findById(_id);
    user.tasks[index].isCompleted = !user.tasks[index].isCompleted
    await user.save()
    res.send({message: "Task Completed"})
  } catch (error) {
    res.status(500).send({ message: "Error in task completed", error: error });
  }
}
 

module.exports = { reguser, userlogin, addtask, getalltasks, deletetask, updateTask, taskCompleted };
