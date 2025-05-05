import React, { useContext, useEffect, useState, useRef } from "react";
import Ct from "./Ct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Disp = () => {
  let obj = useContext(Ct);
  const [taskInput, setTaskInput] = useState("");
  let [tasks, setTasks] = useState([]);
  const myRef = useRef(null); 
  const navigate = useNavigate();
  

  useEffect(() => {
    if (obj.store.token) {
      axios
        .get(`http://localhost:5001/getalltasks/${obj.store._id}`)
        .then((res) => {
          setTasks(res.data);
        })
        .catch((error) => {
          console.log("Error in getalltasks in axios", error.message);
        });
    }
  }, []);

  const handleAddTask = (index) => {
    console.log(myRef.current.innerText);
    if(myRef.current.innerText==='Save Task'){
      let editedTasks = [...tasks]
      editedTasks.splice(index, 0, taskInput);
      console.log(editedTasks);
      setTasks([...editedTasks]);

    }
    else{
      try {
        setTasks([...tasks, taskInput]);
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
        setTaskInput('')
    }
    
   
  };

  const logout = () => {
    obj.updstore({ token: "", username: "", _id: "" });
    navigate("/");
  };

  const deleteTask = (index) => {
    // console.log(index);
    try {
      let updatedTasks = tasks.filter((_,i) => i!==index)
      setTasks([...updatedTasks]);
    } catch (error) {
      console.log(error.message);
    }

    let data = {_id: obj.store._id, index: index };
    axios
      .post(`http://localhost:5001/deletetask`, data)
      .then(() => {
        console.log("task deleted");
      })
      .catch((error) => {
        console.log("Error in deleting task axios ");
      });
  };

  const handleEdit = (index,task) => {
    console.log(index,task, myRef.current.innerText);
    myRef.current.innerText = "Save Task"
    setTaskInput(task)

  }

  return (
    <div>
      <div className="disp">
        <div>logged in as {obj.store.username}</div>
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
        <button ref={myRef} onClick={handleAddTask}>Add Task</button>
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
              {tasks.map((task, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{task}</td>
                  <td>
                    <button  onClick={()=> handleEdit(index, task)}>Edit</button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteTask(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
};

export default Disp;
