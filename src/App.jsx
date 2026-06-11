import "./App.css";
import { useState } from "react";

function App() {

  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

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

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter(
        (task) => task.id !== id
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

function handleFilterChange(e) {
    setFilter(e.target.value);
}

let filteredTasks;
let completedCount = 0;
let pendingCount = 0;



if (filter === "Pending") {
    filteredTasks = tasks.filter(
        task => !task.completed
    );
}
else if (filter === "Completed") {
    filteredTasks = tasks.filter(
        task => task.completed
    );
}
else {
    filteredTasks = tasks;
}

tasks.forEach(task => {
    if (task.completed)
        completedCount++;
    else
        pendingCount++;
});

function handleClearCompleted() {
    const updatedTasks = tasks.filter(
        task => !task.completed
    );

    setTasks(updatedTasks);
}

function handlePrint() {
    window.print();
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

       <button
        value="All"
        className={filter === "All" ? "active" : ""}
         onClick={handleFilterChange} >
            All
      </button>

<button
    value="Pending"
     className={filter === "Pending" ? "active" : ""}
    onClick={handleFilterChange}
>
    Pending
</button>

<button
    value="Completed"
     className={filter === "Completed" ? "active" : ""}
    onClick={handleFilterChange}
>
    Completed
</button>
      </div>

      <div className="task-list">

      {   filteredTasks.length > 0 ?(filteredTasks.map((item, index) => (
        
           <div className="task-item" key={item.id}>

                 <input type="checkbox" checked={item.completed} onChange={()=>handleToggleTask(item.id)} />

                <span
                     style={{ textDecoration: item.completed ? "line-through" : "none" }} >
                                 {item.text}
          </span>

               <button onClick={() => handleDeleteTask(item.id)}>
                   🗑
              </button>

            </div>

      )) ) : <p>
    {filter === "All"
        ? "There are no tasks."
        : `No ${filter.toLowerCase()} tasks found.`}
</p>}

      </div>

      <div className="footer">
        <button onClick={handleClearCompleted}>
    ♻
      </button>

        <p>
          <span>{completedCount} completed</span> • <span>{pendingCount} pending</span>
        </p>

        <button onClick={handlePrint}>
    🖨
         </button>
      </div>

    </div>
  );
}

export default App;