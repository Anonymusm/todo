import { useEffect, useState } from "react";
import tasksAPI from "../api/tasksAPI";

export default function TodoPage({ params }) {
  const taskId = params.id;

  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    tasksAPI
      .getById(taskId)
      .then((todo) => setTodo(todo))
      .catch(() => setError(true))
      .finally(() => setIsLoading(false));
  }, [taskId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Task not found</p>;

  return (
    <div className="todo__link">
      <h3>{todo.title}</h3>
      <p>{todo.completed ? "Task completed" : "Task incompleted"}</p>
    </div>
  );
}
