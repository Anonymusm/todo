import Smartbar from "../Smartbar/Smartbar";
import { useContext } from "react";
import { TodoContext } from "../../context/TodoContext";
import TodoList from "../TodoList/TodoList";
import s from "../TodoContainer/TodoContainer.module.css"

// логіку перенести у кастомний хук ------

// додати контекст -------

// Додати:
// помилку якщо поле не порожнє, але тільки пробіли є, -- searchQuery --
// скільки завдань виконано, -----
// заблокувати кнопку додавання, якщо поле порожнє ------

// json-server ------
// db.json --------
// tasksAPI.js ---------

// useReducer ------- 

// мемоїзація 
// стилі 
// додавання завдань після ентера

export default function TodoContainer() {
  const { firstIncompleteRef, filtered, todos, error, isLoading } = useContext(TodoContext);

  if(isLoading) return <p>Loading...</p>
  if(error) return <p>{error.message}</p>

  return (
    <div className="container">
      <Smartbar />
      <button
        type="button"
        className={s.showBtn}
        disabled={todos.length === 0}
        onClick={() =>
          firstIncompleteRef.current?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Show first incomplete task!
      </button>
      {filtered.length > 0 ? <TodoList /> : <p>No todos found!</p>}
    </div>
  );
}
