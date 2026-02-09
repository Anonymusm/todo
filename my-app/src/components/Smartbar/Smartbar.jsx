import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import s from "../Smartbar/Smartbar.module.css";

function Smartbar() {
  const {
    newTaskQuery,
    searchQuery,
    handleNewTaskChange,
    handleSearchChange,
    addTask,
    deleteAllTasks,
    completed,
    todos,
    isOnlySpaces,
  } = useContext(TodoContext);

  return (
    <div className="smartbar__wrapper">
      <div className="add__wrapper">
        <label className={s.addLabel}>
          New Task:
          <input
            className={s.addInput}
            type="text"
            value={newTaskQuery}
            onChange={handleNewTaskChange}
            placeholder="e.g. Buy Milk"
          />
        </label>
        {isOnlySpaces ? (
          <p style={{ color: "#ff0000" }}>The field cannot be empty!</p>
        ) : null}
        <button
          type="button"
          onClick={addTask}
          disabled={newTaskQuery.trim().length === 0}
          className={s.addButton}
        >
          Add Task
        </button>
      </div>
      <label>
        Search:
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="e.g. Do homeworks"
        />
      </label>
      <span className={s.done}>{`Done ${completed.length}/${todos.length}`}</span>
            <button
        type="button"
        className={s.deleteAllBtn}
        onClick={deleteAllTasks}
      >
        Delete all todos!
      </button>
      <hr className={s.hr} />
    </div>
  );
}

export default Smartbar;
