import React, { useContext, useEffect, useState } from "react";
import Ct from "./Ct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Disp = () => {
  let obj = useContext(Ct);
  const [taskInput, setTaskInput] = useState("");
  let [tasks, setTasks] = useState([]);
  const navigate = useNavigate()
  console.log(obj);

  useEffect(() => {
  if(obj.store.token){
    axios
    .get(`http://localhost:5001/getalltasks/${obj.store._id}`)
    .then((res) => {
      console.log("got all tasks");
      setTasks(res.data);
    })
    .catch((error) => {
      console.log("Error in getalltasks in axios", error.message);
    });
  }
  }, []);

  const handleAddTask = () => {
    try {
      setTasks([...tasks, taskInput])
      
    } catch (error) {
      console.log(error.message);
      
    }

    let data = { tasks: taskInput, _id: obj.store._id };
    axios
      .post(`http://localhost:5001/addtask`, data)
      .then(() => {
        console.log("task added");
      })
      .catch((error) => {
        console.log("Error in adding task axios ");
      });
  };

  const logout = () => {
    obj.updstore({ token: "", username: "", _id:""})
    navigate("/")

  }
  

  return (
    <div>
     <div className="disp">
     <div>logged in as {obj.store.username}</div>
     <div><button onClick={logout}>logout</button></div>
     </div>
     <hr/>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div>
        <table
          border="1"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          {tasks.length>0&&<tbody>
            {tasks.map((task, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{task}</td>
                <td>
                  <button>Edit</button>
                  <button style={{ marginLeft: "10px" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    </div>
  );
};

export default Disp;
