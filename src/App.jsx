import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskContent from "./TaskContent";

let id = 0

export default function App() {
  const [ tasks, setTasks] = useState([])

  function handleAddTask(getTask) {
    if (getTask === '') {
      alert('Please enter your task');
    } else {
      const newTask = { id: id++, text: getTask };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasksToLocalStorage(updatedTasks);
    }
  }


  function handleEditTask(nextTask) {
    setTasks((tasks) => {
      const updatedTasks = tasks.map((task) =>
        task.id === nextTask.id ? nextTask : task
      );
      saveTasksToLocalStorage(updatedTasks);
      return updatedTasks;
    });
  }

  function handleDeleteTask(id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  }

  function handleDeleteAllTask() {
    const q = confirm('Are you sure want to delete all your tasks>')
    if(q) {
      setTasks([])
      localStorage.removeItem('tasks')
    } else {
      return
    }
  }

  function saveTasksToLocalStorage(updatedTasks) {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  return (
    <div className="wrapper max-w-md p-5 mx-auto">
      <header>
        <h1 className="text-sky-500 font-bold text-3xl mb-5">Todo App</h1>
        <AddTask
          handleAddTask={handleAddTask}  />
      </header>
      <main>
        <TaskContent
          tasks={tasks}
          setTasks={setTasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
          handleDeleteAllTask={handleDeleteAllTask} />
      </main>
    </div>
  )
}