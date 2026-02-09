import { memo, useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import s from "../TodoItem/TodoItem.module.css";

export function TodoItem({
  todo,
  isFirst,
  firstIncompleteRef,
  handleCompleteChange,
  deleteTask,
}) {
  const { toggleEdit, handleEditChange, appearingTaskId, disAppearingTaskId } =
    useContext(TodoContext);
  return (
    <li
      className={`
        ${s.item}
        ${disAppearingTaskId === todo.id ? s.dis : ""}
        ${appearingTaskId === todo.id ? s.app : ""}
        `}
      ref={isFirst ? (el) => (firstIncompleteRef.current = el) : null} // ref на DOM елемент
    >
      <div className={s.wrapper}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={(e) => handleCompleteChange(todo.id, e)}
        />
        <a
          href={`/tasks/${todo.id}`}
          className={s.link}
          style={{ textDecoration: todo.completed ? "line-through" : "none" }}
        >
          {todo.title}
        </a>
        <button
          type="button"
          className={s.deleteBtn}
          onClick={() => deleteTask(todo.id)}
        >
          <MdDeleteForever />
        </button>
      </div>
      <button
        type="button"
        className={s.editBtn}
        onClick={() => toggleEdit(todo.id)}
      >
        {todo.isEditing ? "Save Changes" : <MdEdit />}
      </button>
      {todo.isEditing && (
        <>
          <label>
            Current Task:
            <input
              type="text"
              value={todo.editQuery}
              onChange={(e) => handleEditChange(todo.id, e.target.value)}
            />
          </label>
        </>
      )}
    </li>
  );
}

export default memo(TodoItem);
