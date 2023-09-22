import { useState } from "react";

const AddTask = ({ handleAddTask }) => {
  const [ getTask, setGetTask ] = useState('')

  return (
    <form
      className="flex"
      onSubmit={e => e.preventDefault()}>
      <label htmlFor="taskText" className="flex-1">
        <input
          type="text"
          id="taskText"
          placeholder="Add your task"
          className="w-full p-2 rounded-s-lg border-2 border-sky-500 focus:outline-none focus:ring focus:ring-sky-300"
          value={getTask}
          onChange={e => setGetTask(e.target.value)}
          onKeyDown={e => {
            if(e.keyCode === 13) {
              handleAddTask(getTask)
              setGetTask('')
            }
          }} />
      </label>
      <button
        type="button"
        className="px-4 rounded-e-lg text-white font-semibold bg-sky-500 hover:bg-sky-600 active:bg-sky-700 focus:outline-none focus:ring focus:ring-sky-300"
        onClick={() => {
          handleAddTask(getTask)
          setGetTask('')
        }}>Add</button>
    </form>
  );
}

export default AddTask;