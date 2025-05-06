import React, { useState } from "react";
import Ct from "./Ct";

const Edit = () => {
    const [taskInput, setTaskInput] = useState("");
    let obj = useContext(Ct);
    console.log(obj);

    const handleAddTask = () => {
      
    }
    
    

  return (
    <div>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter a task"
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
    </div>
  );
};

export default Edit;
