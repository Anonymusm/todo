import TodoContainer from "./components/TodoContainer/TodoContainer";
import Context from "./context/TodoContext";

export default function TodosPage() {
  return (
    <Context>
      <TodoContainer />
    </Context>
  );
}
