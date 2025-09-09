import React, { useContext, useEffect, useState } from "react";
import Ct from "./Ct";
import axios from "axios";
import './Disp.css'
import { useNavigate } from "react-router-dom";

const Disp = () => {
  let obj = useContext(Ct);
  const [taskInput, setTaskInput] = useState("");
  let [tasks, setTasks] = useState([]);
  let [f, setF] = useState(false);
  let [flag, setFlag] = useState(false);
  let [showCompleted, setShowCompleted] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (obj.store.token) {
      axios
        .get(`http://localhost:5001/getalltasks/${obj.store._id}`)
        .then((res) => {
          setTasks(res.data);
          // console.log("flag changed", flag);
        })
        .catch((error) => {
          console.log("Error in getalltasks in axios", error.message);
        }); 
    }
  }, [flag]);
 
  const handleAddTask = (index) => {
    let task = {taskInput}
    let data = { tasks: {task:taskInput,isCompleted:false}, _id: obj.store._id };
    axios
      .post(`http://localhost:5001/addtask`, data)
      .then(() => {
        console.log("task added");
        setFlag(!flag);
      })
      .catch((error) => {
        console.log("Error in adding task axios ");
      });
    setTaskInput("");
  };

  const logout = () => {
    obj.updstore({ token: "", username: "", _id: "" });
    navigate("/");
  };

  const deleteTask = (index) => {
    axios
      .delete(`http://localhost:5001/deletetask/${obj.store._id}/${index}`)
      .then(() => {
        console.log("task deleted");
        setFlag(!flag);
      })
      .catch((error) => {
        console.log("Error in deleting task axios ");
      });
  };

  const handleEdit = (ind) => {
    obj.updstore(ind);
    // console.log(obj);
    setF(true);
    setTaskInput(tasks[ind.index].task);

    // navigate("/edit")
  };

  const updateTask = () => {
    let data = { _id: obj.store._id, index: obj.store.index, task: taskInput };
    axios
      .put(`http://localhost:5001/updateTask/`, data)
      .then(() => {
        console.log("task updated");
        setF(false);
        setFlag(!flag);
        setTaskInput("");
      })
      .catch((error) => {
        console.log("Error in updating task axios ");
      });
  };

  const toggleCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const handleTaskCompleted = (index) => {
    let data = { _id: obj.store._id, index };
    axios
      .put(`http://localhost:5001/taskCompleted/`, data)
      .then(() => {
        console.log("task completed");
        setFlag(!flag);
      })
      .catch((error) => {
        console.log("Error in task completed axios ");
      });
  }
  

  return (
    <div>
      <div className="disp">
        <div>logged in as [{obj.store.username}]</div>
        <div>
          <button onClick={logout}>logout</button>
        </div>
      </div>
      <hr />
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={f ? updateTask : handleAddTask}>
          {f ? "Update" : "Add"} Task
        </button>
        <input
          type="checkbox"
          id="show"
          checked={showCompleted}
          onChange={toggleCompleted}
        />
        <label htmlFor="show"></label>Show Completed Tasks
      </div>

      <div>
        <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          {tasks.length > 0 && (
            <tbody>
              {tasks.map((task, index) => {
                return (
                  (showCompleted || !task.isCompleted) &&
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td className={task.isCompleted?"completed":''}>
                    <input type="checkbox" onChange={() => handleTaskCompleted(index)} checked={task.isCompleted}/>
                    {task.task}</td>
                  <td>
                    <button onClick={() => handleEdit({ index: index })} disabled={task.isCompleted}>
                      Edit
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteTask(index)}
                      disabled={f}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })}                   
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Disp;
