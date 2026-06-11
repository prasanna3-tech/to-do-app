import "./App.css";
import { useState } from "react";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleAddTask() {

    if (task.trim() === "") {
        return;
    }

    const newTask = {
        id: Date.now(),
        text: task,
        completed: false
    };

    setTasks([...tasks, newTask]);

    setTask("");
}

  function handleDeleteTask(indexToDelete) {
    const updatedTasks = tasks.filter(
        (_, index) => index !== indexToDelete
    );

    setTasks(updatedTasks);
}

function handleToggleTask(id) {
    const updatedTasks = tasks.map(task => {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    setTasks(updatedTasks);
}

  return (
    <div className="app">

      <h1 className="title">To-Do List</h1>

      <div className="header">
        <input
          type="text"
          placeholder="type in your todo to add"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={handleAddTask}>
          ADD
          </button>
      </div>

      <div className="filters">
        <button>All</button>
        <button>Pending</button>
        <button>Completed</button>
      </div>

      <div className="task-list">

      {tasks.map((item, index) => (
        
           <div className="task-item" key={item.id}>

                 <input type="checkbox" onChange={()=>handleToggleTask(item.id)} />

                 <span>{item.text}</span>

               <button onClick={() => handleDeleteTask(index)}>
                   🗑
              </button>

            </div>

      ))}

      </div>

      <div className="footer">
        <button>♻</button>

        <p>
          <span>0 completed</span> • <span>2 pending</span>
        </p>

        <button>🖨</button>
      </div>

    </div>
  );
}

export default App;