import { useContext } from "react";
import TodoItem from "../TodoItem/TodoItem";
import { TodoContext } from "../../context/TodoContext";

function TodoList() {
  const { filtered, find, firstIncompleteRef, handleCompleteChange, deleteTask } = useContext(TodoContext);

  return (
    <div className="todo-list__wrapper">
      <h2>Todos:</h2>
      <ul className="todos-list">
        {filtered.map((todo) => (
         <TodoItem
            key={todo.id}
            todo={todo} 
            isFirst={todo.id === find} 
            firstIncompleteRef={firstIncompleteRef} 
            handleCompleteChange={handleCompleteChange}
            deleteTask={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList
