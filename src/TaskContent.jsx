import { useState } from "react";

const TaskContent = ({ tasks, handleEditTask , handleDeleteTask, handleDeleteAllTask }) => {
  const element = tasks.length !== 0 ? (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">
          <i className="ri-list-check-3"></i> Your task
        </h2>
        {
          tasks.length > 1 ? (
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleDeleteAllTask()}>
              Delete all tasks
            </button>
          ) : (<></>)
        }
      </div>
      <ul>
        {tasks.map(task => (
          <li className="flex justify-between items-center gap-x-3 bg-slate-300 p-4 font-semibold rounded-lg mb-4" key={task.id}>
            <Task 
              task={task}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask} />
          </li>
        ))}
      </ul>
    </div>
    ) : (
      <div className="flex flex-col items-center gap-y-5 mt-10">
        <img src="do-task.png" alt="do task image" className="w-52" />
        <h3 className="text-2xl text-cyan-700 font-bold text-center">You haven't added a task yet</h3>
      </div>
    );

  return element
}

const Task = ({ task, handleEditTask, handleDeleteTask }) => {
  const [isEditing, setIsEditing] = useState(false)
  let todoContent

  if(isEditing) {
    todoContent = (
      <>
        <label htmlFor="taskText" className="w-64">
          <input
            type="text"
            id="taskText"
            placeholder="Add your task"
            className="pb-1 bg-transparent border-b-2 border-slate-500 focus:outline-none"
            value={task.text}
            onChange={e => {
              handleEditTask({
                ...task,
                text: e.target.value
              })
            }} 
            autoFocus/>
        </label>
        <div className="action_button self-start flex gap-x-3">
          <button 
            className="text-cyan-600 text-2xl px-1 bg-slate-100 rounded-e-md"
            onClick={() => setIsEditing(false)} title="Save">
            <i className="ri-save-fill"></i>
          </button>
          <button
            className="text-red-500 text-2xl px-1 bg-slate-100 rounded-md"
            onClick={() => handleDeleteTask(task.id)} title="Delete">
            <i className="ri-delete-bin-fill"></i>
          </button>
        </div>
      </>
    )
  } else {
    todoContent = (
      <>
        <p className="w-64">{task.text}</p>
        <div className="action_button self-start flex gap-x-3">
          <button 
            className="text-cyan-600 text-2xl px-1 bg-slate-100 rounded-md"
            onClick={() => setIsEditing(true)} title="Edit">
            <i className="ri-edit-2-fill"></i>
          </button>
          <button
            className="text-red-500 text-2xl px-1 bg-slate-100 rounded-md"
            onClick={() => handleDeleteTask(task.id)} title="Delete">
            <i className="ri-delete-bin-fill"></i>
          </button>
        </div>
      </>
    )
  }

  return todoContent
}

export default TaskContent;